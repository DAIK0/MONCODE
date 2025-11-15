"use client"

import type React from "react"
import { useState } from "react"
import MoonLogo from "../MoonLogo"

interface LoginPageProps {
  onNavigate: (page: string) => void
  onLogin: () => void
}

export default function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [captcha, setCaptcha] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password && captcha) {
      onLogin()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-50" />

      <div className="relative z-10 flex gap-20 items-center max-w-5xl">
        {/* Left side - Logo */}
        <div className="hidden lg:flex flex-col items-center justify-center">
          <div className="w-48 h-48 bg-gray-700 rounded-2xl flex items-center justify-center mb-8">
            <MoonLogo size={120} />
          </div>
          <h1 className="text-white text-4xl font-light tracking-widest">
            MOON <span className="font-bold">CODE</span>
          </h1>
        </div>

        {/* Right side - Form */}
        <div className="w-full max-w-md">
          <h2 className="text-white text-4xl font-light mb-12 tracking-wide">
            INICIAR
            <br />
            SESIÓN
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-3 rounded-full bg-white text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-3 rounded-full bg-white text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div className="bg-white p-4 rounded-lg flex items-center gap-4">
              <input
                type="checkbox"
                checked={captcha}
                onChange={(e) => setCaptcha(e.target.checked)}
                className="w-5 h-5 cursor-pointer"
              />
              <span className="text-sm text-gray-700">i'm not a robot</span>
            </div>

            <button
              type="submit"
              disabled={!email || !password || !captcha}
              className="w-full py-3 rounded-full bg-teal-500 text-white font-semibold uppercase hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Iniciar
            </button>
          </form>

          <div className="mt-8 text-center text-white">
            <span className="text-gray-400">¿No tienes cuenta?</span>
            <button
              onClick={() => onNavigate("register")}
              className="ml-2 text-red-500 hover:text-red-400 font-semibold uppercase"
            >
              Regístrate
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
