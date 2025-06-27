'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import pdf from 'pdf-parse'; // Ahora la importación funcionará gracias al archivo de tipos
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// Esta función ahora está diseñada para ser llamada desde un componente de cliente.
export async function uploadGuiaAction(formData: FormData): Promise<{ success: boolean; message: string }> {
  const supabase = createClient();
  
  try {
    const nombreMateria = formData.get('nombre_materia') as string;
    const nombreGuia = formData.get('nombre_guia') as string;
    const pdfFile = formData.get('pdf_file') as File;

    if (!pdfFile || pdfFile.size === 0) {
      throw new Error('Por favor, selecciona un archivo PDF.');
    }

    // Subida a Storage
    const fileName = `${Date.now()}-${pdfFile.name}`;
    await supabase.storage.from('guias-pdf').upload(fileName, pdfFile);
    const { data: urlData } = supabase.storage.from('guias-pdf').getPublicUrl(fileName);
    const publicUrl = urlData.publicUrl;

    // Guardado en DB
    const { data: guiaData, error: dbError } = await supabase
      .from('guias')
      .insert({ nombre_materia: nombreMateria, nombre_guia: nombreGuia, url_pdf: publicUrl })
      .select('id').single();
    if (dbError) throw dbError;
    const newGuiaId = guiaData.id;

    // Extracción de texto con pdf-parse
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
    const pdfData = await pdf(pdfBuffer);
    const pdfText = pdfData.text;
    
    // Llamada a la IA
    const prompt = `(Aquí va tu prompt largo para la IA...)`;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let jsonResponseString = response.text().replace(/^```json\n/, '').replace(/\n```$/, '');

    // Parseo y guardado de ejercicios
    const ejercicios = JSON.parse(jsonResponseString);
    if (Array.isArray(ejercicios) && ejercicios.length > 0) {
      const ejerciciosParaInsertar = ejercicios.map(ej => ({
        guia_id: newGuiaId,
        seccion: ej.seccion || 'General',
        enunciado: ej.enunciado,
        numero_ejercicio: ej.enunciado?.split('.')[0]?.trim() || 'N/A'
      }));
      const { error: insertEjerciciosError } = await supabase.from('ejercicios').insert(ejerciciosParaInsertar);
      if (insertEjerciciosError) throw insertEjerciciosError;
    }

    revalidatePath('/');
    return { success: true, message: '¡Guía subida y ejercicios extraídos con éxito!' };

  } catch (error: any) {
    console.error("Error en uploadGuiaAction:", error);
    return { success: false, message: `Error: ${error.message}` };
  }
}
