'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import unpdf from 'unpdf';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function uploadGuia(formData: FormData) {
  const supabase = createClient();
  
  try {
    const nombreMateria = formData.get('nombre_materia') as string;
    const nombreGuia = formData.get('nombre_guia') as string;
    const pdfFile = formData.get('pdf_file') as File;

    if (!pdfFile || pdfFile.size === 0) throw new Error('Por favor, selecciona un archivo PDF.');

    const fileName = `${Date.now()}-${pdfFile.name}`;
    await supabase.storage.from('guias-pdf').upload(fileName, pdfFile);
    const { data: urlData } = supabase.storage.from('guias-pdf').getPublicUrl(fileName);
    const publicUrl = urlData.publicUrl;

    // --- CORRECCIÓN DEL ERROR DE TIPEO ---
    // Ahora usamos los nombres de variable correctos (nombreMateria, nombreGuia)
    const { data: guiaData, error: dbError } = await supabase
      .from('guias')
      .insert({ 
        nombre_materia: nombreMateria, 
        nombre_guia: nombreGuia, 
        url_pdf: publicUrl 
      })
      .select('id')
      .single();
    if (dbError) throw dbError;
    const newGuiaId = guiaData.id;

    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
    const { text: pdfText } = await unpdf(pdfBuffer);
    
    const prompt = `
      Eres un asistente experto en analizar material académico de cálculo y física.
      A partir del siguiente texto de una guía de ejercicios, extrae TODOS los ejercicios que encuentres.
      Ignora cualquier texto que sea teoría, ejemplos resueltos o introducciones.
      Cada ejercicio debe tener su número y su enunciado completo.
      Devuelve el resultado ÚNICAMENTE en formato JSON, como un array de objetos.
      Cada objeto debe tener dos propiedades: "seccion" y "enunciado".
      Si un ejercicio no pertenece a una sección específica, usa "General" como valor para "seccion".

      Aquí tienes un ejemplo del formato de salida esperado:
      [
        { "seccion": "1.1 Límites", "enunciado": "1. Calcule el límite de f(x) cuando x tiende a 2." },
        { "seccion": "1.1 Límites", "enunciado": "2. Demuestre usando la definición épsilon-delta que..." },
        { "seccion": "2.3 Derivadas de orden superior", "enunciado": "15b. Encuentre la tercera derivada de g(t) = sin(t)." }
      ]

      Ahora, analiza el siguiente texto y genera el JSON:
      ---
      ${pdfText}
      ---
    `;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let jsonResponseString = response.text().replace(/^```json\n/, '').replace(/\n```$/, '');

    // =================================================================
    // INICIO DE LA SECCIÓN DE DEPURACIÓN
    // =================================================================

    // ESPÍA #1: Mostramos la respuesta EXACTA que nos da la IA.
    console.log("===== RESPUESTA CRUDA DE LA IA =====");
    console.log(jsonResponseString);
    console.log("====================================");

    const ejercicios = JSON.parse(jsonResponseString);

    if (Array.isArray(ejercicios) && ejercicios.length > 0) {
      const ejerciciosParaInsertar = ejercicios.map(ej => ({
        guia_id: newGuiaId,
        seccion: ej.seccion || 'General',
        enunciado: ej.enunciado,
        numero_ejercicio: ej.enunciado?.split('.')[0]?.trim() || 'N/A'
      }));

      // ESPÍA #2: Mostramos los datos que estamos a punto de insertar en la base de datos.
      console.log("===== DATOS A INSERTAR EN LA TABLA 'ejercicios' =====");
      console.log(JSON.stringify(ejerciciosParaInsertar, null, 2));
      console.log("======================================================");

      const { error: insertEjerciciosError } = await supabase.from('ejercicios').insert(ejerciciosParaInsertar);

      if (insertEjerciciosError) {
        // ESPÍA #3: Si hay un error al insertar, lo mostramos.
        console.error("===== ERROR AL INSERTAR EN SUPABASE =====");
        console.error(insertEjerciciosError);
        console.error("=======================================");
        throw insertEjerciciosError;
      }
    } else {
      console.log("La IA no devolvió un array de ejercicios o el array estaba vacío.");
    }
    
    // =================================================================
    // FIN DE LA SECCIÓN DE DEPURACIÓN
    // =================================================================

    revalidatePath('/');
    return { success: true, message: '¡Guía subida y ejercicios extraídos con éxito!' };

  } catch (error: any) {
    console.error("Error completo en uploadGuia:", error);
    return { success: false, message: `Error: ${error.message}` };
  }
}
