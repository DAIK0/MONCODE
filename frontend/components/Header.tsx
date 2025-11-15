"use client"

import type React from "react"

import { useState } from "react"
import { Search, Moon } from "lucide-react"
import MoonLogo from "./MoonLogo"

interface HeaderProps {
  onNavigate?: (page: string) => void
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      onNavigate?.("search")
    }
  }

  return (
    <header className="fixed top-0 left-[120px] right-0 h-20 bg-white flex items-center justify-between px-10 shadow-md z-40">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => onNavigate?.("home")}>
        <MoonLogo />
        <span className="text-2xl font-bold tracking-widest">
          <span className="font-bold">MOON</span> <span className="font-light text-gray-600">CODE</span>
        </span>
      </div>

      <div className="flex-1 max-w-md mx-8 relative">
        <input
          type="text"
          placeholder="Busca aqui"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          className="w-full px-6 py-3 rounded-full bg-[#4a4a4a] text-[#999] placeholder-[#999] outline-none text-sm"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2">
          <Search size={20} />
        </button>
      </div>

      <div className="flex items-center gap-6">
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 hover:bg-gray-100 rounded-full transition">
          <Moon size={24} className="text-gray-800" />
        </button>
        <div className="w-12 h-12 rounded-full bg-[#4a4a4a]" />
      </div>
    </header>
  )
}
