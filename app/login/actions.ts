'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  if (!email || !password) {
    return redirect('/login?message=Email y contraseña son requeridos.')
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Authentication Error:', error)
    return redirect('/login?message=Credenciales incorrectas.')
  }

  return redirect('/admin')
}