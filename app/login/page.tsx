'use client' // ¡Muy importante! Esto lo convierte en un componente de cliente.

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Llamamos a nuestra nueva API de login
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (response.ok) {
      // Si el login es exitoso, redirigimos al panel de admin
      router.push('/admin')
    } else {
      // Si hay un error, lo mostramos
      setError(data.message || 'Ocurrió un error inesperado.')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="w-full p-2 border border-gray-300 rounded" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            required 
            className="w-full p-2 border border-gray-300 rounded" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Entrar
        </button>
      </form>
    </div>
  )
}
