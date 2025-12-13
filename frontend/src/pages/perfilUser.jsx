import { useCarrito } from "../context/carritoContext";
import Ticket from "../components/ticket.jsx";

export default function PerfilUser() {
    const { tiketCompra } = useCarrito();

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Perfil del Usuario</h1>

            {tiketCompra ? (
                <Ticket ticket={tiketCompra} />
            ) : (
                <p className="text-gray-500">
                    No tienes compras recientes.
                </p>
            )}
        </div>
    );
}
