"use client"

import { Home, Grid3x3, Package, ShoppingCart, HelpCircle } from "lucide-react"
import { useState } from "react"

export default function Sidebar() {
  const [activeNav, setActiveNav] = useState("inicio")

  const navItems = [
    { id: "inicio", label: "INICIO", icon: Home },
    { id: "categoria", label: "CATEGORIA", icon: Grid3x3 },
    { id: "inventario", label: "INVENTARIO", icon: Package },
    { id: "carrito", label: "TU CARRITO", icon: ShoppingCart },
    { id: "ayuda", label: "AYUDA", icon: HelpCircle },
  ]

  return (
    <aside className="fixed left-0 top-20 bottom-0 w-[120px] bg-[#3a3a3a] flex flex-col gap-2 pt-5 z-50">
      {navItems.map((item) => {
        const IconComponent = item.icon
        return (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            className={`flex flex-col items-center gap-2 py-5 px-3 text-center transition ${
              activeNav === item.id ? "bg-[#4a4a4a]" : "hover:bg-[#4a4a4a]"
            }`}
          >
            <IconComponent size={32} className="text-white" />
            <span className="text-xs font-semibold text-white leading-tight">{item.label}</span>
          </button>
        )
      })}
    </aside>
  )
}
