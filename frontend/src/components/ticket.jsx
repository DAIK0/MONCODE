import ticket from '../components/ticket.jsx';
import { useCarrito } from '../context/carritoContext.jsx';


function Ticket() {
    const { ticket } = useCarrito();

    if (!ticket) {
        return null; // Si no hay ticket, no renderizar nada
    }
    return (
        <div className="mt-10 bg-white w-80 mx-auto p-6 border border-gray-300 rounded-xl shadow">
            <h2 className="text-center font-bold text-xl mb-4">TICKET DE COMPRA</h2>

            {ticket.items.map((item, index) => (
                <div key={index} className="text-sm mb-3">
                    <p><span className="font-semibold">ID Producto:</span> {item.productId}</p>
                    <p><span className="font-semibold">Cantidad:</span> {item.quantity}</p>
                    <p><span className="font-semibold">Precio:</span> ${item.price}</p>
                    <hr className="my-2" />
                </div>
            ))}

            <h3 className="text-lg font-bold text-center mt-4">
                Total: ${ticket.total}
            </h3>

            <p className="text-center text-xs mt-4 text-gray-500">
                Gracias por su compra
            </p>
        </div>
    );
}

export default Ticket