import { createClient } from '@supabase/supabase-js'

// Este es el cliente estándar de Supabase para el navegador.
// Lo usaremos en los componentes de cliente.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
