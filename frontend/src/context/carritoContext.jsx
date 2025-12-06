import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [cart, setCart] = useState([]);



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

    const agregarAlCarrito = (product) => {
        setCart((prevCart) => {
            const productoExistente = prevCart.find(
                (item) => item._id === product._id
            );

            if (productoExistente) {
                return prevCart.map((item) =>
                    item._id === product._id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, cantidad: 1 }];
        });

    };//fin agregarAlCarrito

    //funcion para mostrar los productos que se adregregaron al carrito
    const mostrarProductosCarrito = () => {
        return cart.map((item) => item);
    };

    //funcion para calcular el total del carrito
    const calcularTotal = () => {
        return cart.reduce(
            (total, item) => total + item.price * item.cantidad,
            0
        );
    };//fin calcularTotal


    return (
        <CarritoContext.Provider value={{ carrito, setCarrito, eliminarProducto, limpiarCarrito, actualizarCantidad, agregarAlCarrito, cart, setCart, mostrarProductosCarrito, calcularTotal }}>
            {children}
        </CarritoContext.Provider>
    );
};