import { useState } from "react"
import { FiMoon, FiSun, FiSearch } from "react-icons/fi"

function Header() {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <header className="fixed top-0 left-0 right-0 h-20 bg-[#3a3a3a] flex items-center justify-between px-8 z-50">
            {/* Logo - Espacio vacío para que el usuario lo agregue */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#5a5a5a] rounded-lg"></div>
                <span className="text-white text-xl font-light">
                    MOON <span className="font-normal">CODE</span>
                </span>
            </div>

            {/* Barra de búsqueda */}
            <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Busca aquí"
                        className="w-full px-6 py-3 bg-[#5a5a5a] text-white placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <FiSearch className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
            </div>

            {/* Iconos derecha */}
            <div className="flex items-center gap-6">
                <button onClick={() => setDarkMode(!darkMode)} className="text-white hover:text-gray-300 transition-colors">
                    {darkMode ? <FiMoon size={24} /> : <FiSun size={24} />}
                </button>
                <div className="w-12 h-12 bg-[#5a5a5a] rounded-full"></div>
            </div>
        </header>
    )
}

export default Header