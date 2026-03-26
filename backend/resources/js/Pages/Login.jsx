import { useState } from 'react'
import { useForm, Head } from '@inertiajs/react'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    post('/login')
  }

  return (
    <>
      <Head title="Login — GymPlus" />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-sm sm:max-w-md">

          <h1 className="text-xl sm:text-2xl font-bold text-center text-orange-600 mb-6">
            Login — GymPlus
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="exemple@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Se souvenir de moi */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={data.remember}
                onChange={e => setData('remember', e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Se souvenir de moi
              </label>
            </div>

            {/* Bouton */}
            <button
              type="submit"
              disabled={processing}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 sm:py-3 rounded-lg text-sm sm:text-base transition disabled:opacity-50"
            >
              {processing ? 'Connexion...' : 'Se connecter'}
            </button>

          </form>
        </div>
      </div>
    </>
  )
}