import { useState, useEffect } from "react";
import Header from "../components/HeaderUser";
import Sidebar from "../components/Sidebar";
//import { getAllProducts } from "../api/products.js";
import { useProducts } from "../context/producContext.jsx";

function CategoriaPage() {
  const categorias = [
    "Tarjeta Gráfica",
    "Placa Madre",
    "Procesador",
    "Refrigeración",
    "Gabinete",
    "Almacenamiento",
    "RAM",
    "Fuente de poder",
    "Monitor",
    "Mouse / Ratón",
    "Teclado",
  ];

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const { products, getProducts } = useProducts();
  const [productos, setProductos] = useState([]);
  console.log(products);

  useEffect(() => {
    getProducts();
  }, []);

  // dame el query para las categorias
  useEffect(() => {
    if (categoriaSeleccionada) {
      const filteredProducts = products.filter(
        (product) => product.category === categoriaSeleccionada
      );
      setProductos(filteredProducts);
    } else {
      setProductos(products);
    }
  }, [categoriaSeleccionada, products]);

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
                                ${
                                  categoriaSeleccionada === cat
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-black"
                                }
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
              <h3 className="text-xl font-bold mt-2 text-black">
                {product.name}
              </h3>
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
