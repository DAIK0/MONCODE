

import Header from "../components/HeaderUser.jsx";
import Sidebar from "../components/SidebarUser.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Authcontext.jsx";
import { useCarrito } from "../context/carritoContext.jsx";


function CarritoPage() {
  const { user } = useAuth();
  const { mostrarProductosCarrito, calcularTotal, actualizarCantidad, confirmarOrden, mensaje, setMensaje, cancelarOrden, eliminarProducto, ticket } = useCarrito();
  const [productosDetalles, setProductosDetalles] = useState([]);
  const [cargando, setCargando] = useState(false);



  //funcion para mostrar los productos que se adregregaron al carrito
  useEffect(() => {
    const fetchProductosDetalles = async () => {
      setCargando(true);
      const productosDetalles = await mostrarProductosCarrito();
      setProductosDetalles(productosDetalles);
      setCargando(false);
    };
    fetchProductosDetalles();
  }, [mostrarProductosCarrito]);

  //funcion para confirmar la orden por parte del usuario
  const handleConfirmarOrden = () => {
    confirmarOrden();
    //setMensajeConfirmado("Orden confirmada exitosamente.");
    setProductosDetalles([]);
  };//fin handleConfirmarOrden

  useEffect(() => {
    if (!mensaje) return;

    const timer = setTimeout(() => {
      setMensaje("");
    }, 4000); // 4 segundos

    return () => clearTimeout(timer);
  }, [mensaje]);

  //funcion para mostrar el ticket 
  useEffect(() => {
    if (ticket) {
      console.log("Ticket de compra:", ticket);
    }
  }, [ticket]);

  //funcion para cancelar la orden por parte del usuario
  const handleCancelarOrden = () => {
    cancelarOrden();
    setProductosDetalles([]);
  };//finhandleCancelarOrden

  //funcion para elminiar el producto del carrito 
  const handleEliminarProducto = (id) => {
    console.log("Producto eliminado:", id);
    eliminarProducto(id);
  };


  //
  return (
    <div className="min-h-screen bg-[#e5e5e5]">
      <Header />
      <Sidebar />

      {/* Main content - offset for sidebar */}
      <main className="ml-32 pt-24 px-8 pb-8">
        <div className="bg-[#d4d4d4] rounded-3xl p-8 min-h-[calc(100vh-8rem)]">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Tu carrito</h2>
          {mensaje && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {mensaje}
            </div>
          )}

          {cargando ? (
            <p className="text-center py-8">Cargando productos...</p>
          ) : productosDetalles.length === 0 ? (
            <p className="text-center py-8 text-gray-600">
              No hay productos en el carrito
            </p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Producto
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Descripción
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Precio
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Cantidad
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Subtotal
                      </th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosDetalles.map((producto) => (
                      <tr
                        key={producto._id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="bg-gray-100 text-gray-900 rounded-lg px-4 py-2 inline-block">
                            {producto.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {producto.description}
                        </td>
                        <td className="bg-gray-100 text-gray-900 px-6 py-4 font-semibold">
                          ${producto.price}
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            min="10"
                            value={producto.cantidad}
                            onChange={(e) =>
                              actualizarCantidad(
                                producto._id,
                                Number(e.target.value)
                              )
                            }
                            className="w-20 px-3 py-1 border border-gray-950 rounded-md text-center"
                          />
                        </td>
                        <td className="bg-gray-100 text-gray-900 px-6 py-4 font-semibold">
                          ${producto.price * producto.quantity}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleEliminarProducto(producto._id)}
                            className="text-red-500 hover:text-red-700 font-medium"
                          >
                            Eliminar Producto
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex justify-end items-center gap-6">
                <div className="text-2xl font-bold text-gray-800">
                  Total: ${calcularTotal()}
                </div>
                <button
                  onClick={handleConfirmarOrden}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Confirmar Orden
                </button>
                <button

                  onClick={handleCancelarOrden}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Cancelar Orden
                </button>
              </div>
              {ticket && (
                <ticket ticket={ticket} />
              )

              }
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default CarritoPage;
