"use client"

import Header from "../components/HeaderUser.jsx"
import Sidebar from "../components/SidebarUser.jsx"
import { useEffect, useState } from "react"
import { useAuth } from "../context/Authcontext.jsx"
import { useCarrito } from "../context/CarritoContext.jsx"
import { obtenerProductoPorId } from "../api/productos.js"
import { createOrder } from "../api/ordenes.js"

function CarritoPage() {
    const { user } = useAuth()
    const { carrito, eliminarProducto, actualizarCantidad, limpiarCarrito } = useCarrito()
    const [productosDetalles, setProductosDetalles] = useState([])
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        const cargarDetalles = async () => {
            setCargando(true)
            try {
                const detalles = await Promise.all(
                    carrito.map(async (item) => {
                        const respuesta = await obtenerProductoPorId(item.id)
                        return { ...respuesta.data, cantidad: item.cantidad }
                    }),
                )
                setProductosDetalles(detalles)
            } catch (error) {
                console.error("Error cargando detalles:", error)
            } finally {
                setCargando(false)
            }
        }

        if (carrito.length > 0) {
            cargarDetalles()
        } else {
            setProductosDetalles([])
        }
    }, [carrito])

    const calcularTotal = () => {
        return productosDetalles.reduce((total, producto) => total + producto.precio * producto.cantidad, 0)
    }

    const handleConfirmarOrden = async () => {
        if (!user?._id || productosDetalles.length === 0) return

        const orden = {
            userId: user._id,
            items: productosDetalles.map((producto) => ({
                productId: producto._id,
                name: producto.nombre,
                precio: producto.precio,
                cantidad: producto.cantidad,
            })),
            estado: "pendiente",
            total: calcularTotal(),
        }

        try {
            await createOrder(orden)
            limpiarCarrito()
            alert("Orden creada exitosamente")
        } catch (error) {
            console.error("Error creando orden:", error)
            alert("Error al crear la orden")
        }
    }

    return (
        <div className="min-h-screen bg-[#e5e5e5]">
            <Header />
            <Sidebar />

            {/* Main content - offset for sidebar */}
            <main className="ml-32 pt-24 px-8 pb-8">
                <div className="bg-[#d4d4d4] rounded-3xl p-8 min-h-[calc(100vh-8rem)]">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Tu carrito</h2>

                    {cargando ? (
                        <p className="text-center py-8">Cargando productos...</p>
                    ) : productosDetalles.length === 0 ? (
                        <p className="text-center py-8 text-gray-600">No hay productos en el carrito</p>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full bg-white rounded-lg overflow-hidden">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Producto</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Descripción</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Precio</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Cantidad</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subtotal</th>
                                            <th className="px-6 py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productosDetalles.map((producto) => (
                                            <tr key={producto._id} className="border-b border-gray-200 hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="bg-gray-200 rounded-lg px-4 py-2 inline-block">{producto.nombre}</div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-700">{producto.descripcion}</td>
                                                <td className="px-6 py-4 font-semibold">${producto.precio}</td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={producto.cantidad}
                                                        onChange={(e) => actualizarCantidad(producto._id, Number(e.target.value))}
                                                        className="w-20 px-3 py-1 border border-gray-300 rounded-md text-center"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 font-semibold">${producto.precio * producto.cantidad}</td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => eliminarProducto(producto._id)}
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
                                <div className="text-2xl font-bold text-gray-800">Total: ${calcularTotal()}</div>
                                <button
                                    onClick={handleConfirmarOrden}
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                                >
                                    Confirmar Orden
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default CarritoPage