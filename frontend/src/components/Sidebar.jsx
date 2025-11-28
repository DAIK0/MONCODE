import { Link, useLocation } from "react-router-dom"
import { FiHome, FiGrid, FiShoppingCart, FiHelpCircle, FiUser, FiBox } from "react-icons/fi"

function Sidebar() {
    const location = useLocation();
    const path = location.pathname;

    const isActive = (path) => path === location.pathname;

    return (
        <div className="fixed left-0 top-20 bottom-0 w-32 bg-[#4a4a4a] rounded-r-3xl flex flex-col items-center py-8 gap-8 overflow-y-auto">
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

            {/*inventario*/}
            <Link
                to="/inventario"
                className={`flex flex-col items-center gap-2 w-24 py-4 rounded-2xl transition-colors ${isActive("/inventario") ? "bg-[#5a5a5a]" : "hover:bg-[#5a5a5a]"
                    }`}
            >
                <FiBox size={32} className="text-white" />
                <span className="text-white text-xs font-light">INVENTARIO</span>
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



            {/* PERFIL */}
            <Link
                to="/perfil"
                className={`flex flex-col items-center gap-2 w-24 py-4 rounded-2xl transition-colors ${isActive("/perfil") ? "bg-[#5a5a5a]" : "hover:bg-[#5a5a5a]"
                    }`}
            >
                <FiUser size={32} className="text-white" />
                <span className="text-white text-xs font-light">PERFIL</span>
            </Link>
        </div>
    )
}

export default Sidebar