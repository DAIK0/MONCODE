import { createContext, useContext, useState } from "react";
import { createOrder } from "../api/carrito.js";

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    const [mensaje, setMensaje] = useState("");



    //funcion para eliminar un producto del carrito
    const eliminarProducto = (id) => {
        setCart((prevCarrito) =>
            prevCarrito.filter((item) => item.id !== id)
        );
    };

    //limpiar carrito
    const limpiarCarrito = () => {
        setCart([]);
    }

    const actualizarCantidad = (id, cantidad) => {
        setCart((prevCarrito) =>
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

    //funcion para confirmar la orden por el id
    const confirmarOrden = async () => {
        if (cart.length === 0)
            return;

        const orden = {
            items: cart.map((item) => ({
                productId: item._id,
                price: item.price,
                quantity: item.cantidad,
            })),
            total: calcularTotal(),
        };
        console.log("Orden confirmada:", orden);
        const response = await createOrder(orden);

        setMensaje("Orden confirmada exitosamente.");
        setCart([]);

    };


    //funcion para cancelar la orden por parte del usuario
    const cancelarOrden = () => {
        if (cart.length === 0)
            return;

        const orden = {
            products: cart.map((item) => ({
                productId: item._id,
                name: item.name,
                price: item.price,
                quantity: item.cantidad,
            })),
            total: calcularTotal(),
        };
        console.log("Orden cancelada:", orden);
        setMensaje("Orden cancelada.");

        setCart([]);
    }//fin cancelarOrden



    return (
        <CarritoContext.Provider value={{ eliminarProducto, limpiarCarrito, actualizarCantidad, agregarAlCarrito, cart, setCart, mostrarProductosCarrito, calcularTotal, confirmarOrden, cancelarOrden, mensaje, setMensaje }}>
            {children}
        </CarritoContext.Provider>
    );
};