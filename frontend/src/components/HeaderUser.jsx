import { useState } from "react"
import { FiMoon, FiSun, FiSearch } from "react-icons/fi"
import { useNavigate } from "react-router";
import { searchProducts } from "../api/products";

function Header() {
    // const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    const handleSeaarch = async (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value.length < 2) {
            setResults([]);
            return;
        }

        try {
            const res = await searchProducts(value);
            setResults(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <header className="fixed top-0 left-0 right-0 h-20 bg-[#3a3a3a] flex items-center justify-between px-4 md:px-8 z-50">
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
                        value={search}
                        onChange={handleSeaarch}
                        className="w-full px-6 py-3 bg-[#5a5a5a] text-white placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <FiSearch className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
            </div>
            {results.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-[#5a5a5a] rounded-b-lg mt-1 max-h-60 overflow-y-auto z-10">
                    {results.map((product) => (

                        <div
                            key={product._id}
                            onClick={() => navigate(`/categoria/${product.category}`)}
                            className="flex items-center gap-3 p-3 hover:bg-[#4a4a4a] cursor-pointer"
                        >

                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded"
                            />

                            <div>
                                <p className="text-white text-sm">
                                    {product.name}
                                </p>

                                <p className="text-gray-400 text-xs">
                                    ${product.price}
                                </p>
                            </div>

                        </div>

                    ))}
                </div>
            )}


            <button
                className="text-white text-lg md:text-xl font-light transition-all duration-300 hover:scale-110"
                onClick={() => navigate("/login")}
            >
                Iniciar sesion
            </button>
        </header>
    )
}

export default Header