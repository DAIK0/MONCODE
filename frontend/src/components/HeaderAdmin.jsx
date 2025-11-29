import { useState } from "react"
import { FiMoon, FiSun, FiSearch } from "react-icons/fi"

function Header() {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <header className="fixed top-0 left-0 right-0 h-20 bg-[#0084ff] flex items-center justify-between px-4 md:px-8 z-50">
            {/* Logo */}
            <div className="flex items-center gap-4">
                <img
                    src="/Logo.png"
                    alt="Logo"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-contain transition-all duration-300 hover:scale-110"
                />
                <span className="text-white text-lg md:text-xl font-light transition-all duration-300">
                    MOON <span className="font-normal">CODE</span>
                </span>
            </div>

            {/* Barra de búsqueda */}
            <div className="flex-1 max-w-2xl mx-4 md:mx-8">
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
            <div className="flex items-center gap-4 md:gap-6">
                <button onClick={() => setDarkMode(!darkMode)} className="text-white hover:text-gray-300 transition-colors">
                    {darkMode ? <FiMoon size={24} /> : <FiSun size={24} />}
                </button>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#5a5a5a] rounded-full transition-all duration-300"></div>
            </div>
        </header>
    )
}

export default Header