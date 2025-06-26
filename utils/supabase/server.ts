import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Este es el código corregido y definitivo.
// Cada método (get, set, remove) se convierte en 'async'
// para poder usar 'await' y esperar a que la promesa de las cookies se resuelva.

export function createClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          // La clave es el 'await' aquí
          const cookieStore = await cookies()
          return cookieStore.get(name)?.value
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            // Y el 'await' aquí
            const cookieStore = await cookies()
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // El método 'set' fue llamado desde un Server Component.
            // Esto se puede ignorar si tienes un middleware refrescando las sesiones.
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            // Y finalmente, el 'await' aquí
            const cookieStore = await cookies()
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // El método 'delete' fue llamado desde un Server Component.
            // Esto se puede ignorar si tienes un middleware refrescando las sesiones.
          }
        },
      },
    }
  )
}
