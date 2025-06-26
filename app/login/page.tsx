import { login } from '@/app/login/actions'

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form action={login}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input id="email" name="email" type="email" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Contraseña</label>
            <input id="password" name="password" type="password" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <button formAction={login} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Entrar
          </button>
        </form>
      </form>
    </div>
  )
}
