import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Hacemos que cada método sea ASÍNCRONO para poder usar 'await'
        async get(name: string) {
          // ESPERAMOS a que la promesa de las cookies se resuelva
          return (await cookies().get(name)?.value)
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            // ESPERAMOS a que la promesa de las cookies se resuelva
            await cookies().set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            // ESPERAMOS a que la promesa de las cookies se resuelva
            await cookies().set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
