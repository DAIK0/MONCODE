"use client"

import { useState } from "react"
import { Home, Grid3x3, ShoppingCart, HelpCircle, LogOut } from "lucide-react"

interface SidebarProps {
  onNavigate?: (page: string) => void
  onLogout?: () => void
}

export default function Sidebar({ onNavigate, onLogout }: SidebarProps) {
  const [activeNav, setActiveNav] = useState("inicio")

  const navItems = [
    { id: "home", label: "INICIO", icon: Home },
    { id: "category", label: "CATEGORIA", icon: Grid3x3 },
    { id: "cart", label: "TU CARRITO", icon: ShoppingCart },
    { id: "ayuda", label: "AYUDA", icon: HelpCircle },
  ]

  const handleNavClick = (id: string) => {
    setActiveNav(id)
    onNavigate?.(id)
  }

  return (
    <aside className="fixed left-0 top-20 bottom-0 w-[120px] bg-[#3a3a3a] flex flex-col gap-2 pt-5 z-50">
      {navItems.map((item) => {
        const IconComponent = item.icon
        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`flex flex-col items-center gap-2 py-5 px-3 text-center transition ${
              activeNav === item.id ? "bg-[#4a4a4a]" : "hover:bg-[#4a4a4a]"
            }`}
          >
            <IconComponent size={32} className="text-white" />
            <span className="text-xs font-semibold text-white leading-tight">{item.label}</span>
          </button>
        )
      })}
      <button
        onClick={() => {
          onLogout?.()
          setActiveNav("inicio")
        }}
        className="flex flex-col items-center gap-2 py-5 px-3 text-center transition mt-auto mb-5 hover:bg-[#4a4a4a]"
      >
        <LogOut size={32} className="text-red-500" />
        <span className="text-xs font-semibold text-red-500 leading-tight">SALIR</span>
      </button>
    </aside>
  )
}
