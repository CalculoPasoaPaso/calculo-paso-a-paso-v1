'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function uploadGuia(formData: FormData) {
  const supabase = createClient()

  const nombreMateria = formData.get('nombre_materia') as string
  const nombreGuia = formData.get('nombre_guia') as string
  const pdfFile = formData.get('pdf_file') as File

  if (!pdfFile || pdfFile.size === 0) {
    return redirect('/admin?message=Por favor, selecciona un archivo PDF.')
  }

  const fileName = `${Date.now()}-${pdfFile.name}`
  const { error: fileError } = await supabase.storage
    .from('guias-pdf')
    .upload(fileName, pdfFile)

  if (fileError) {
    console.error('Storage Error:', fileError)
    return redirect('/admin?message=Error al subir el archivo PDF.')
  }

  const { data: urlData } = supabase.storage
    .from('guias-pdf')
    .getPublicUrl(fileName)

  const { error: dbError } = await supabase.from('guias').insert([
    {
      nombre_materia: nombreMateria,
      nombre_guia: nombreGuia,
      url_pdf: urlData.publicUrl,
    },
  ])

  if (dbError) {
    console.error('Database Error:', dbError)
    return redirect('/admin?message=Error al guardar la información de la guía.')
  }

  revalidatePath('/')
  return redirect('/admin?message=Guía subida con éxito.')
}