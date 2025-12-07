"use client";
import { FiMoon, FiSun, FiSearch } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

function Header() {
    const { darkMode, setDarkMode } = useTheme();

    return (
        <header className="
            fixed top-0 left-0 right-0 h-20 
            bg-gray-200 dark:bg-[#2b2b2b]
            flex items-center justify-between px-4 md:px-8 z-50
            transition-colors
        ">
            {/* Logo */}
            <div className="flex items-center gap-4">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-contain transition-all hover:scale-110"
                />

                <span className="text-black dark:text-white text-lg md:text-xl font-light">
                    MOON <span className="font-normal">CODE</span>
                </span>
            </div>

            {/* Buscador */}
            <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Busca aquí"
                        className="
                            w-full px-6 py-3 
                            bg-gray-300 dark:bg-[#4d4d4d] 
                            text-black dark:text-white 
                            placeholder-gray-500 dark:placeholder-gray-300
                            rounded-full focus:outline-none focus:ring-2 
                            focus:ring-gray-400 dark:focus:ring-gray-600
                            transition-colors
                        "
                    />
                    <FiSearch className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300" size={20} />
                </div>
            </div>

            {/* Botón Modo Oscuro */}
            <div className="flex items-center gap-6">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="text-black dark:text-white hover:opacity-70 transition"
                >
                    {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
                </button>

                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 dark:bg-[#4d4d4d] rounded-full"></div>
            </div>
        </header>
    );
}

export default Header;
