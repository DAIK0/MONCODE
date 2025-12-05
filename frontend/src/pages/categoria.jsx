import { useState, useEffect } from "react";
import Header from "../components/HeaderUser";
import Sidebar from "../components/Sidebar";

function CategoriaPage() {
    const categorias = [
        "Tarjeta Gráfica",
        "Placa Madre",
        "Procesador",
        "Refrigeración",
        "Gabinete",
        "Almacenamiento",
        "Memoria RAM",
        "Fuente de poder",
        "Monitor",
        "Mouse / Ratón",
        "Teclado"
    ];

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [productos, setProductos] = useState([]);

    const fetchProductos = async (categoria) => {
        try {
            const res = await fetch(
                `http://localhost:3000/api/products/getallproducts?category=${encodeURIComponent(categoria)}`
            );

            if (!res.ok) {
                console.error("Error al obtener productos");
                return;
            }

            const data = await res.json();

            // Aseguramos que SIEMPRE sea un array
            setProductos(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetch:", error);
        }
    };

    useEffect(() => {
        if (categoriaSeleccionada) {
            fetchProductos(categoriaSeleccionada);
        }
    }, [categoriaSeleccionada]);

    return (
        <div className="min-h-screen bg-[#e5e5e5]">
            <Header />
            <Sidebar />

            <main className="ml-32 mt-20 p-8">
                <h1 className="text-3xl font-bold mb-6">Categorías</h1>

                {/* BOTONES DE CATEGORÍAS */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {categorias.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategoriaSeleccionada(cat)}
                            className={`px-4 py-2 rounded-lg border 
                                ${categoriaSeleccionada === cat ? "bg-blue-600 text-white" : "bg-white text-black"}
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* LISTADO DE PRODUCTOS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productos.length === 0 && categoriaSeleccionada && (
                        <p className="text-gray-700">No hay productos en esta categoría.</p>
                    )}

                    {productos.map((product) => (
                        <div key={product._id} className="bg-white p-4 rounded-lg shadow">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-40 object-cover rounded"
                            />
                            <h3 className="text-xl font-bold mt-2 text-black">{product.name}</h3>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="font-semibold text-black mt-2">${product.price}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default CategoriaPage;
