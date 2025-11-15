"use client"

import type React from "react"
import { useState } from "react"
import MoonLogo from "../MoonLogo"

interface RegisterPageProps {
  onNavigate: (page: string) => void
  onLogin: () => void
}

export default function RegisterPage({ onNavigate, onLogin }: RegisterPageProps) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (username && email && password === confirmPassword && password.length >= 6) {
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
          <h2 className="text-white text-4xl font-light mb-12 tracking-wide">Registrarse</h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-3 rounded-full bg-white text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-teal-400"
            />

            <input
              type="email"
              placeholder="@gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-3 rounded-full bg-white text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-teal-400"
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-3 rounded-full bg-white text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-teal-400"
            />

            <input
              type="password"
              placeholder="Repita la contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-6 py-3 rounded-full bg-white text-gray-700 placeholder-gray-500 outline-none focus:ring-2 focus:ring-teal-400"
            />

            <button
              type="submit"
              disabled={!username || !email || !password || password !== confirmPassword || password.length < 6}
              className="w-full py-3 rounded-full bg-amber-700 text-white font-semibold uppercase hover:bg-amber-800 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              Registrate
            </button>
          </form>

          <div className="mt-8 text-center text-white">
            <span className="text-gray-400">¿Ya tienes una cuenta?</span>
            <button
              onClick={() => onNavigate("login")}
              className="ml-2 text-teal-400 hover:text-teal-300 font-semibold uppercase"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
