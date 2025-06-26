import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { uploadGuia } from '@/app/admin/actions'

export default async function AdminPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Esta comprobación se hace ahora en el servidor. Si no hay usuario, el middleware ya lo habría redirigido, pero esta es una doble seguridad.
  if (!user) {
    return redirect('/login')
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Panel de Administrador</h1>
      <p className="mb-8">Bienvenido, {user.email}</p>
      
      <form action={uploadGuia} className="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Subir Nueva Guía</h2>
        
        <div className="mb-4">
          <label htmlFor="nombre_materia" className="block text-gray-700 text-sm font-bold mb-2">
            Nombre de la Materia
          </label>
          <input 
            type="text" 
            name="nombre_materia" 
            id="nombre_materia" 
            required 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="nombre_guia" className="block text-gray-700 text-sm font-bold mb-2">
            Nombre de la Guía
          </label>
          <input 
            type="text" 
            name="nombre_guia" 
            id="nombre_guia" 
            required 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="pdf_file" className="block text-gray-700 text-sm font-bold mb-2">
            Archivo PDF
          </label>
          <input 
            type="file" 
            name="pdf_file" 
            id="pdf_file" 
            required 
            accept=".pdf" 
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Subir Guía
        </button>
      </form>
    </main>
  );
}
