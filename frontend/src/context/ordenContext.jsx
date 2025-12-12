import { createContext, useContext, useState, useEffect } from "react";
import { obtenerTodasLasOrdenes } from "../api/carrito.js";


const OrdenContext = createContext();

export const useOrdenes = () => useContext(OrdenContext);

export const OrdenProvider = ({ children }) => {
    const [ordenesAdmin, setOrdenesAdmin] = useState([]);
    const [loading, setLoading] = useState(true);

    const cargarOrdenes = async () => {
        try {
            const response = await obtenerTodasLasOrdenes();
            setOrdenesAdmin(response.data.orders);
        } catch (error) {
            console.log("Error al obtener las ordenes", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <OrdenContext.Provider value={{ ordenesAdmin, loading, cargarOrdenes }}>
            {children}
        </OrdenContext.Provider>
    );
};  
