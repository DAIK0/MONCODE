import { createContext, useContext, useState, useEffect } from "react";
import { obtenerOrdenPorId, obtenerTodasLasOrdenes, obtenerOrdenesUser } from "../api/carrito.js";
import { useAuth } from "../context/Authcontext.jsx";

const OrdenContext = createContext();

export const useOrdenes = () => useContext(OrdenContext);

export const OrdenProvider = ({ children }) => {
    const [ordenesAdmin, setOrdenesAdmin] = useState([]);
    const [ordenesUser, setOrdenesUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Traer TODAS las órdenes (admin)
    const cargarOrdenes = async () => {
        try {
            const response = await obtenerTodasLasOrdenes();
            setOrdenesAdmin(response.data.orders || []);
        } catch (error) {
            console.log("Error al obtener las ordenes", error);
        } finally {
            setLoading(false);
        }
    };

    // Traer SOLO las órdenes del usuario normal
    const cargarOrdenesUser = async () => {
        try {
            const response = await obtenerOrdenesUser();
            setOrdenesUser(response.data.orders || []);
        } catch (error) {
            console.log("Error al obtener las ordenes", error);
        } finally {
            setLoading(false);
        }
    };

    // USEEFFECT PARA DECIDIR QUÉ CARGAR SEGÚN EL ROL
    useEffect(() => {
        console.log("USER EN ORDEN PROVIDER:", user);

        if (!user) return;

        setLoading(true);

        if (user.role === "admin") {
            console.log("ES ADMIN → cargarOrdenes()");
            cargarOrdenes();
        } else {
            console.log("ES USER → cargarOrdenesUser()");
            cargarOrdenesUser();
        }
    }, [user]);

    return (
        <OrdenContext.Provider
            value={{
                ordenesAdmin,
                ordenesUser,
                loading,
                cargarOrdenes,
                cargarOrdenesUser
            }}
        >
            {children}
        </OrdenContext.Provider>
    );
};
