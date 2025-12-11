export default function Ticket({ ticket }) {
  return (
    <div className="mt-10 bg-white shadow-xl rounded-2xl p-6 w-full max-w-md mx-auto border border-gray-300">
      <h2 className="text-xl font-bold text-center mb-4">🎟 Ticket de compra</h2>

      <p>
        <strong>ID Orden:</strong> {ticket._id}
      </p>
      <p>
        <strong>Usuario:</strong> {ticket.userId}
      </p>
      <p>
        <strong>Estado:</strong> {ticket.status}
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2">Productos:</h3>

      {ticket.items.map((item) => (
        <div key={item._id} className="border p-3 rounded-lg mb-2 bg-gray-100">
          <p>
            <strong>Producto:</strong> {item.name ?? item.productId}
          </p>
          <p>
            <strong>Cantidad:</strong> {item.quantity}
          </p>
          <p>
            <strong>Precio:</strong> ${item.price}
          </p>
          <p>
            <strong>Subtotal:</strong> ${item.price * item.quantity}
          </p>
        </div>
      ))}

      <h3 className="text-xl font-bold text-right mt-4">
        Total: ${ticket.total}
      </h3>
    </div>
  );
}
