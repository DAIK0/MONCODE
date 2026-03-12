import axiosInstance from "./axiosInstance";

// ruta para traer todos los productos por id
export const getAllProducts = () => axiosInstance.get("/getallproducts");

export const searchProducts = () => axiosInstance.get("/search");







//ruta para traer todos los productos por id
