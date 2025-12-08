import axiosInstance from "./axiosInstance";

// Crear orden
export const createOrder = (order) => axiosInstance.post("/orders/crear-orden", order);

// Obtener ordenes del usuario desde el token
export const obtenerOrdenes = () => axiosInstance.get("/orders");


// Obtener orden específica
export const obtenerOrdenPorId = (orderId) => axiosInstance.get(`/orders/${orderId}`);

// Eliminar producto dentro de orden
export const eliminarProductoDeOrden = (orderId, productId) =>
    axiosInstance.delete(`/orders/${orderId}/products/${productId}`);

// Cancelar orden completa
export const eliminarOrden = (orderId) => axiosInstance.delete(`/orders/${orderId}`);