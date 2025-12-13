import axiosInstance from "./axiosInstance";

// Crear orden
export const createOrder = (order) => axiosInstance.post("/orders/crear-orden", order);

// Obtener ordenes del usuario desde el token
export const obtenerOrdenesUser = () => axiosInstance.get("/orders");

//obtener todas las ordenes
export const obtenerTodasLasOrdenes = () => axiosInstance.get("/orders/admin/all");


// Obtener orden específica
export const obtenerOrdenPorId = (orderId) => axiosInstance.get(`/orders/${orderId}`);


// Cancelar orden completa
export const eliminarOrden = (orderId) => axiosInstance.delete(`/orders/${orderId}`);