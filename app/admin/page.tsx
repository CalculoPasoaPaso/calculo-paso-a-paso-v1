'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionData, setSessionData] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      console.log('AdminPage: Verificando sesión...');
      
      // Esperamos un instante para darle tiempo al navegador de procesar la cookie
      await new Promise(resolve => setTimeout(resolve, 100));

      const { data, error } = await supabase.auth.getSession();
      
      console.log('AdminPage: Respuesta de getSession():', data);
      
      if (error) {
        console.error('AdminPage: Error al obtener la sesión:', error);
      }

      setSessionData(JSON.stringify(data, null, 2));

      if (!data.session) {
        console.log('AdminPage: No se encontró sesión. En un caso real, aquí te redirigiríamos.');
        // ¡LA REDIRECCIÓN ESTÁ DESACTIVADA A PROPÓSITO PARA DEPURAR!
        // router.push('/login');
      } else {
        console.log('AdminPage: ¡Sesión encontrada para el usuario:', data.session.user.email);
        setUser(data.session.user);
      }
      setIsLoading(false);
    };
    checkUser();
  }, [router]);


  if (isLoading) {
    return <div className="flex flex-col justify-center items-center h-screen"><p>Depurando página de Admin...</p></div>;
  }

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">Página de Depuración de Admin</h1>
      {user ? (
        <div>
          <p className="text-green-600 font-bold text-lg">✅ ¡Sesión Válida Detectada!</p>
          <p className="mt-2">Bienvenido, {user.email}</p>
          <p className="text-sm text-gray-600 mt-4">Ahora puedes reemplazar este código de depuración por el formulario de subida final.</p>
        </div>
      ) : (
        <div>
          <p className="text-red-600 font-bold text-lg">❌ No se detectó ninguna sesión activa.</p>
          <p className="mt-2">La página de login te habría redirigido si la redirección estuviera activa.</p>
          <p className="text-sm text-gray-600 mt-4">Revisa la consola para ver los detalles de `getSession()`.</p>
        </div>
      )}
      <hr className="my-6" />
      <h2 className="text-xl font-semibold">Datos crudos de `getSession()`:</h2>
      <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto max-h-96">
        {sessionData || 'No hay datos'}
      </pre>
    </div>
  )
}
