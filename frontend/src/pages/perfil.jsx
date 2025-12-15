import Header from "../components/HeaderUser";
import Sidebar from "../components/Sidebar";
import { useOrdenes } from "../context/ordenContext";
import { useEffect, useState } from "react";

function perfil() {
  const { ordenesAdmin, loading, cargarOrdenes } = useOrdenes();

  //  Estado local para quitar órdenes del front
  const [ordenesVisibles, setOrdenesVisibles] = useState([]);

  //  Mensaje temporal al verificar
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    cargarOrdenes();
  }, []);

  // Cuando cargan las órdenes, las guardamos en el front
  useEffect(() => {
    setOrdenesVisibles(ordenesAdmin);
  }, [ordenesAdmin]);

  // 🔥 Función para verificar orden (solo front)
  const verificarOrden = (id) => {
    setOrdenesVisibles((prev) => prev.filter((o) => o._id !== id));

    setMensaje("✅ Orden verificada");

    setTimeout(() => setMensaje(""), 2000);
  };

  return (
    <div className="min-h-screen bg-[#e5e5e5]">
      <Header />
      <Sidebar />

      {/* 🔥 Mensaje flotante */}
      {mensaje && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {mensaje}
        </div>
      )}

      <main className="ml-32 mt-20 p-8">
        <h1 className="text-3xl font-bold mb-6">📦 Órdenes realizadas</h1>

        {!loading && ordenesVisibles.length > 0 && (
          <div className="space-y-4">
            {ordenesVisibles.map((orden) => (
              <div
                key={orden._id}
                className="bg-zinc-900 shadow-lg rounded-xl p-6 relative"
              >
                {/* 🔥 Botón de palomita */}
                <button
                  onClick={() => verificarOrden(orden._id)}
                  className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white font-bold p-2 rounded-full"
                  title="Marcar como verificada"
                >
                  ✓
                </button>

                {/* Encabezado de la orden */}
                <div className="flex justify-between items-start border-b pb-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">ID de Orden</p>
                    <p className="font-mono text-sm">{orden._id}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Usuario</p>
                    <p className="font-medium">{orden.userId?.email || "—"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-900">Estado</p>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        orden.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : orden.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {orden.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-900">Fecha</p>
                    <p className="font-medium">
                      {new Date(orden.createdAt).toLocaleString("es-MX")}
                    </p>
                  </div>
                </div>

                {/* Items de la orden */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Productos:
                  </h3>

                  {orden.items &&
                    orden.items.map((item, index) => (
                      <div
                        key={item._id || index}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                      >
                        {/* ID del producto */}
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">ID Producto</p>
                          <p className="font-mono text-sm text-gray-900">
                            {item.productId?._id}
                          </p>
                        </div>

                        {/* Nombre */}
                        <div className="flex-1 text-center">
                          <p className="text-sm text-gray-900">Nombre</p>
                          <p className="font-semibold text-gray-900">
                            {item.productId?.name}
                          </p>
                        </div>

                        {/* Precio */}
                        <div className="flex-1 text-right">
                          <p className="text-sm text-gray-900">Precio</p>
                          <p className="font-semibold text-green-600">
                            ${item.productId?.price?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Total */}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-end items-center">
                    <span className="text-lg font-semibold mr-3">Total:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${orden.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default perfil;
