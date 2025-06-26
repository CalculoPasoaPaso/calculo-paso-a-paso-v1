import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  // 1. Verificar si el usuario está autenticado
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
  }

  try {
    // 2. Parsear los datos del formulario (usando el método nativo)
    const formData = await request.formData();
    
    const nombreMateria = formData.get('nombre_materia') as string;
    const nombreGuia = formData.get('nombre_guia') as string;
    const pdfFile = formData.get('pdf_file') as File | null;

    if (!pdfFile) {
      return NextResponse.json({ message: 'No se encontró el archivo PDF' }, { status: 400 });
    }

    // 3. Subir el archivo a Supabase Storage
    const fileContent = await pdfFile.arrayBuffer();
    const fileName = `${Date.now()}-${pdfFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from('guias-pdf') // El nombre de tu bucket
      .upload(fileName, fileContent, {
        contentType: pdfFile.type || 'application/pdf',
      });

    if (uploadError) {
      throw uploadError;
    }

    // 4. Obtener la URL pública del archivo
    const { data: urlData } = supabase.storage
      .from('guias-pdf')
      .getPublicUrl(fileName);

    // 5. Guardar la información en la base de datos
    const { error: dbError } = await supabase
      .from('guias')
      .insert({
        nombre_materia: nombreMateria,
        nombre_guia: nombreGuia,
        url_pdf: urlData.publicUrl,
      });

    if (dbError) {
      throw dbError;
    }

    return NextResponse.json({ message: 'Guía subida con éxito' }, { status: 200 });
  } catch (error: any) {
    console.error('Error en la subida:', error);
    return NextResponse.json({ message: error.message || 'Error en el servidor' }, { status: 500 });
  }
}