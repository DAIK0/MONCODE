import { createContext, useContext, useState } from "react";
import { createOrder, eliminarOrden, eliminarProductoDeOrden } from "../api/carrito.js";

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [tiketCompra, setTiketCompra] = useState(null);




    //funcion para eliminar un producto del carrito
    const eliminarProducto = (idItem) => {
        setCart((prevCarrito) =>
            prevCarrito.filter((product) => product._id !== idItem)
        );

    };

    //limpiar carrito
    const limpiarCarrito = () => {
        setCart([]);
    }
    {/*    
    const incProduct = (idItem) => {
        setCart((prevCarrito) =>
            prevCarrito.map((cartItem) =>
                cartItem._id === idItem ? { ...cartItem, cantidad: cartItem.cantidad + 1 } : cartItem
            )
        );
    };//fin incProduct
   
    const decProduct = (idItem) => {
        setCart((prevCarrito) =>
            prevCarrito.map((cartItem) =>
                cartItem._id === idItem && cartItem.cantidad > 1 ? { ...cartItem, cantidad: cartItem.cantidad - 1 } : cartItem
            )
        );
    };//fin decProduct

    const actualizarCantidad = (idItem, nuevaCantidad) => {
        setCart((prevCarrito) =>
            prevCarrito.map((product) =>
                product._id === idItem
                    ? { ...product, cantidad: nuevaCantidad }
                    : product
            )
        );
    };
*/}
    const actualizarCantidad = (id, cantidad) => {
        const productoExistente = cart.find((item) => item.id === id);

        if (!productoExistente) {
            return;
        }

        if (productoExistente.toSell >= productoExistente.quantity) {
            toast.warn("ha alcanzado el maximo de de" + productoExistente.quantity + "productos en stock ");
            return;
        }
        productoExistente.toSell = cantidad;
        toast.success("se ha modificado la cantidad");

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


        setTiketCompra(response.data);


        setMensaje("Orden confirmada exitosamente.");
        setCart([]);

    };


    //funcion para cancelar la orden por parte del usuario
    const cancelarOrden = async () => {
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
        const response = await eliminarOrden(orden);
        setMensaje("Orden cancelada.");

        setCart([]);
    }//fin cancelarOrden

    // funcion para generar un tiket de la compra 



    {/*decProduct, incProduct,*/ }
    return (
        <CarritoContext.Provider value={{ eliminarProducto, limpiarCarrito, actualizarCantidad, agregarAlCarrito, cart, setCart, mostrarProductosCarrito, calcularTotal, confirmarOrden, cancelarOrden, mensaje, setMensaje, tiketCompra, setTiketCompra }}>
            {children}
        </CarritoContext.Provider>
    );
};