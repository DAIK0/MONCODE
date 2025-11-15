"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import ProductSection from "@/components/ProductSection"
import NewsSection from "@/components/NewsSection"
import LoginPage from "@/components/pages/LoginPage"
import RegisterPage from "@/components/pages/RegisterPage"
import CartPage from "@/components/pages/CartPage"
import NewsPage from "@/components/pages/NewsPage"
import CategoryPage from "@/components/pages/CategoryPage"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<string>("login")
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
    setCurrentPage("home")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage("login")
  }

  if (!isLoggedIn) {
    if (currentPage === "register") {
      return <RegisterPage onNavigate={setCurrentPage} onLogin={handleLogin} />
    }
    return <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />
  }

  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      <Sidebar onNavigate={setCurrentPage} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col ml-[120px]">
        <Header onNavigate={setCurrentPage} />
        <main className="mt-20 pt-10 px-10 pb-10 overflow-y-auto flex-1">
          {currentPage === "home" && (
            <>
              <ProductSection />
              <NewsSection />
            </>
          )}
          {currentPage === "news" && <NewsPage />}
          {currentPage === "cart" && <CartPage />}
          {currentPage === "category" && <CategoryPage />}
          {currentPage === "ayuda" && (
            <div className="text-gray-600">
              <h1 className="text-4xl font-bold mb-8 uppercase">Ayuda y Soporte</h1>
              <p className="text-lg">
                Bienvenido a la sección de ayuda. Aquí encontrarás respuestas a preguntas frecuentes.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
