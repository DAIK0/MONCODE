import { useEffect, useState } from "react";
import { useOrdenes } from "../context/ordenContext.jsx";
import { useAuth } from "../context/Authcontext.jsx";

function AdminOrdersPage() {
    const { ordenesAdmin, loading, cargarOrdenes, cambiarEstadoOrden } = useOrdenes();
    const { isAdmin } = useAuth();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusLoading, setStatusLoading] = useState(false);

    useEffect(() => {
        if (isAdmin) {
            cargarOrdenes();
        }
    }, [isAdmin]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            setStatusLoading(true);
            await cambiarEstadoOrden(orderId, newStatus);
            // Update the selected order if it's currently open
            if (selectedOrder && selectedOrder._id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
        } catch (error) {
            console.error(error);
            alert("Error al actualizar el estado");
        } finally {
            setStatusLoading(false);
        }
    };

    if (!isAdmin) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#f3f4f6]">
                <h1 className="text-2xl font-bold text-red-600">No autorizado para ver esta página</h1>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#f3f4f6]">
                <h1 className="text-2xl font-bold text-gray-700">Cargando pedidos...</h1>
            </div>
        );
    }

    return (
        <div className="ml-32 min-h-screen bg-[#f3f4f6] p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-[#085a00] mb-8 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-16 after:h-1 after:bg-[#085a00]">
                    Gestión de Pedidos (Admin)
                </h1>

                {ordenesAdmin.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                        <p className="text-gray-500 text-lg">No hay pedidos registrados en el sistema por el momento.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#085a00] text-white">
                                        <th className="p-4 font-semibold text-sm">ID del Pedido</th>
                                        <th className="p-4 font-semibold text-sm">Usuario</th>
                                        <th className="p-4 font-semibold text-sm">Fecha</th>
                                        <th className="p-4 font-semibold text-sm">Total ($)</th>
                                        <th className="p-4 font-semibold text-sm">Estado</th>
                                        <th className="p-4 font-semibold text-sm text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ordenesAdmin.map((order) => (
                                        <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="p-4 text-sm text-gray-600 font-mono">
                                                {order._id.slice(-8)}...
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-800">
                                                        {order.userId?.username || "Usuario Desconocido"}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {order.userId?.email || "Sin email"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 font-medium text-[#085a00]">
                                                ${order.total.toFixed(2)}
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                                            order.status === 'shipped' ? 'bg-indigo-100 text-indigo-800' :
                                                                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                                    'bg-red-100 text-red-800'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <button 
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="text-[#085a00] hover:text-[#0b7a00] font-medium text-sm hover:underline transition-all"
                                                >
                                                    Ver Detalles
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal de Detalles */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Detalles del Pedido <span className="text-sm font-mono text-gray-500 ml-2">#{selectedOrder._id}</span>
                            </h2>
                            <button 
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="font-semibold text-gray-700 mb-1">Cliente</p>
                                <p className="text-gray-600">{selectedOrder.userId?.username}</p>
                                <p className="text-gray-500">{selectedOrder.userId?.email}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="font-semibold text-gray-700 mb-1">Información de Fecha</p>
                                <p className="text-gray-600">Creado: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                                <p className="text-gray-500">Actualizado: {new Date(selectedOrder.updatedAt).toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Productos</h3>
                            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                                {selectedOrder.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-800">{item.productId?.name || 'Producto Eliminado'}</p>
                                            <p className="text-xs text-gray-500">Cantidad: {item.quantity} x ${item.price?.toFixed(2)}</p>
                                        </div>
                                        <p className="font-semibold text-[#085a00]">${(item.quantity * item.price).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                                <span className="font-bold text-gray-700">Total de la Orden</span>
                                <span className="text-xl font-bold text-[#085a00]">${selectedOrder.total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 mb-4">
                            <h3 className="text-sm font-semibold text-blue-900 mb-2">Cambiar Estado del Pedido</h3>
                            <div className="flex gap-3 items-center">
                                <select 
                                    value={selectedOrder.status}
                                    onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                                    disabled={statusLoading || selectedOrder.status === 'cancelled'}
                                    className="flex-1 bg-white border border-blue-200 text-blue-900 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                                >
                                    <option value="pending">Pendiente (Pending)</option>
                                    <option value="confirmed">Confirmado (Confirmed)</option>
                                    <option value="shipped">Enviado (Shipped)</option>
                                    <option value="delivered">Entregado (Delivered)</option>
                                    <option value="cancelled">Cancelado (Cancelled)</option>
                                </select>
                                {statusLoading && <span className="text-sm text-blue-600 animate-pulse">Actualizando...</span>}
                            </div>
                            {selectedOrder.status === 'cancelled' && (
                                <p className="text-xs text-red-500 mt-2">Un pedido cancelado no puede cambiar de estado nuevamente.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminOrdersPage;
