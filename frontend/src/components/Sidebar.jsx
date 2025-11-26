import { Link, useLocation } from "react-router-dom"
import { FiHome, FiGrid, FiShoppingCart, FiHelpCircle } from "react-icons/fi"

function Sidebar() {
    const location = useLocation();
    const path = location.pathname;

    const isActive = (path) => path === location.pathname;

    return (
        <div className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-32 bg-[#4a4a4a] rounded-r-3xl flex flex-col items-center py-8 gap-8">
            {/* INICIO */}
            <Link
                to="/"
                className={`flex flex-col items-center gap-2 w-24 py-4 rounded-2xl transition-colors ${isActive("/") ? "bg-[#5a5a5a]" : "hover:bg-[#5a5a5a]"
                    }`}
            >
                <FiHome size={32} className="text-white" />
                <span className="text-white text-xs font-light">INICIO</span>
            </Link>

            {/* CATEGORIA */}
            <Link
                to="/categoria"
                className={`flex flex-col items-center gap-2 w-24 py-4 rounded-2xl transition-colors ${isActive("/categoria") ? "bg-[#5a5a5a]" : "hover:bg-[#5a5a5a]"
                    }`}
            >
                <FiGrid size={32} className="text-white" />
                <span className="text-white text-xs font-light">CATEGORIA</span>
            </Link>

            {/* TU CARRITO */}
            <Link
                to="/carrito"
                className={`flex flex-col items-center gap-2 w-24 py-4 rounded-2xl transition-colors ${isActive("/carrito") ? "bg-[#5a5a5a]" : "hover:bg-[#5a5a5a]"
                    }`}
            >
                <FiShoppingCart size={32} className="text-white" />
                <span className="text-white text-xs font-light text-center">
                    TU
                    <br />
                    CARRITO
                </span>
            </Link>

            {/* AYUDA */}
            <Link
                to="/ayuda"
                className={`flex flex-col items-center gap-2 w-24 py-4 rounded-2xl transition-colors ${isActive("/ayuda") ? "bg-[#5a5a5a]" : "hover:bg-[#5a5a5a]"
                    }`}
            >
                <FiHelpCircle size={32} className="text-white" />
                <span className="text-white text-xs font-light">AYUDA</span>
            </Link>
        </div>
    )
}

export default Sidebar