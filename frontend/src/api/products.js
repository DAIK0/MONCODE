import axiosInstance from "./axiosInstance";

// ruta para traer todos los productos por id
export const getAllProducts = () => axiosInstance.get("/getallproducts");

//ruta para traer todos los productos por id
