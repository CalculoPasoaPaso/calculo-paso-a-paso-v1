'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import pdf from 'pdf-parse';
// 1. Importamos la librería de Google
import { GoogleGenerativeAI } from '@google/generative-ai';

// 2. Inicializamos el cliente de Google AI con nuestra API Key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function uploadGuia(formData: FormData) {
  const supabase = createClient();
  let newGuiaId: number | null = null;

  try {
    // --- PASOS 1 Y 2: Subir PDF y guardar en DB (esto no cambia) ---
    const nombreMateria = formData.get('nombre_materia') as string;
    const nombreGuia = formData.get('nombre_guia') as string;
    const pdfFile = formData.get('pdf_file') as File;

    if (!pdfFile || pdfFile.size === 0) {
      throw new Error('Por favor, selecciona un archivo PDF.');
    }

    const fileName = `${Date.now()}-${pdfFile.name}`;
    await supabase.storage.from('guias-pdf').upload(fileName, pdfFile);

    const { data: urlData } = supabase.storage.from('guias-pdf').getPublicUrl(fileName);
    const publicUrl = urlData.publicUrl;

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
    newGuiaId = guiaData.id;
    if (!newGuiaId) throw new Error('No se pudo obtener el ID de la nueva guía.');

    // --- PASO 3: MAGIA DE LA IA con GOOGLE GEMINI ---
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
    const pdfData = await pdf(pdfBuffer);
    const pdfText = pdfData.text;

    // El prompt es exactamente el mismo, es agnóstico a la IA que uses
    const prompt = `
      Eres un asistente experto en analizar material académico de cálculo y física...
      // (El resto del prompt largo que te di antes va aquí)
      ---
      ${pdfText}
      ---
    `;

    // 3. Llamada a la API de Google Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let jsonResponseString = response.text();

    // Limpiamos la respuesta por si Gemini la envuelve en ```json ... ```
    jsonResponseString = jsonResponseString.replace(/^```json\n/, '').replace(/\n```$/, '');
    
    // --- PASO 4: Guardar los ejercicios extraídos (esto no cambia) ---
    try {
      const ejercicios = JSON.parse(jsonResponseString);

      if (Array.isArray(ejercicios)) {
        const ejerciciosParaInsertar = ejercicios.map(ej => ({
          guia_id: newGuiaId,
          seccion: ej.seccion,
          enunciado: ej.enunciado,
          numero_ejercicio: ej.enunciado.split('.')[0] || 'N/A'
        }));

        const { error: insertEjerciciosError } = await supabase
          .from('ejercicios')
          .insert(ejerciciosParaInsertar);

        if (insertEjerciciosError) throw insertEjerciciosError;
      }
    } catch (parseError) {
      console.error("Error al parsear el JSON de la IA. Respuesta cruda:", jsonResponseString);
      return redirect('/admin?message=Guía subida, pero falló la extracción de ejercicios.');
    }

    // --- PASO 5: Éxito total (esto no cambia) ---
    revalidatePath('/');
    return redirect('/admin?message=Guía subida y ejercicios extraídos con éxito!');

  } catch (error: any) {
    console.error("Error completo en uploadGuia:", error);
    return redirect(`/admin?message=Error: ${error.message}`);
  }
}
