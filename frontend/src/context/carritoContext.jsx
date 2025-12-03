import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();
export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    //agregar producto
    const agregarProducto = (id, cantidad = 1) => {
        setCarrito((prevCarrito) => {
            const existe = prevCarrito.find((item) => item.id === id);
            if (existe) {
                return prevCarrito.map((item) =>
                    item.id === id ? { ...item, cantidad: item.cantidad + cantidad } : item
                );
            }
            return [...prevCarrito, { id, cantidad }];
        });
    }//fin agregarProducto

    //eliminar producto
    const eliminarProducto = (id) => {
        setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
    };//fin eliminarProducto

    //limpiar carrito
    const limpiarCarrito = () => {
        setCarrito([]);
    }

    const actualizarCantidad = (id, cantidad) => {
        setCarrito((prevCarrito) =>
            prevCarrito.map((item) =>
                item.id === id ? { ...item, cantidad } : item
            )
        );
    };//fin actualizarCantidad

    return (
        <CarritoContext.Provider value={{ carrito, setCarrito, agregarProducto, eliminarProducto, limpiarCarrito, actualizarCantidad }}>
            {children}
        </CarritoContext.Provider>
    );
};