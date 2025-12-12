export default function Ticket({ ticket, onClose }) {

  if (!ticket) return null;

  const formatPrice = (price) => `$${Number(price).toFixed(2)}`;

  const formatDate = (date) => {
    if (!date) return "Ahora";
    return new Date(date).toLocaleString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusText = (status) => {
    const texts = {
      pending: "Pendiente",
      confirmed: "Confirmada",
      shipped: "Enviada",
      delivered: "Entregada",
      cancelled: "Cancelada",
    };
    return texts[status] || status;
  };

  return (
    <div className="mt-10 bg-white shadow-2xl rounded-2xl p-6 w-full max-w-xl mx-auto border border-gray-200 relative">

      {/* Botón de cerrar */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
        >
          ✕
        </button>
      )}

      {/* Encabezado bonito */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🧾</div>
        <h2 className="text-3xl font-bold text-gray-800">Ticket de Compra</h2>
        <p className="text-gray-500 text-sm mt-1">Gracias por tu compra</p>
      </div>

      {/* Caja de información */}
      <div className="mb-5 p-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl border border-gray-200 shadow-sm">
        <p className="mb-1 text-sm text-gray-600">
          <strong className="text-gray-700">ID Orden:</strong>{" "}
          <span className="font-mono text-xs">{ticket._id}</span>
        </p>

        {ticket.userId && (
          <p className="mb-1 text-sm text-gray-600">
            <strong className="text-gray-700">Usuario:</strong>{" "}
            {ticket.userId}
          </p>
        )}

        <p className="mb-1 text-sm text-gray-600">
          <strong className="text-gray-700">Estado:</strong>
          <span
            className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold 
            ${ticket.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : ticket.status === "confirmed"
                  ? "bg-blue-100 text-blue-700"
                  : ticket.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
              }`}
          >
            {getStatusText(ticket.status)}
          </span>
        </p>

        <p className="text-sm text-gray-600">
          <strong className="text-gray-700">Fecha:</strong>{" "}
          {formatDate(ticket.createdAt)}
        </p>
      </div>

      {/* Productos */}
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Artículos:</h3>

      {ticket.items?.length > 0 ? (
        ticket.items.map((item, index) => (
          <div
            key={item._id || index}
            className="border border-gray-200 bg-white shadow-sm rounded-xl p-4 mb-4"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold text-gray-800">
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs mr-2">
                    #{index + 1}
                  </span>
                  {item.name || item.productId}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  <strong>Cantidad:</strong>{" "}
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md ml-2 text-sm">
                    {item.quantity}
                  </span>
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  <strong>Precio unitario:</strong> {formatPrice(item.price)}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500">Subtotal</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400 py-3">
          No hay productos en esta orden
        </p>
      )}

      {/* Total */}
      <div className="mt-6 bg-green-50 border border-green-200 p-5 rounded-xl shadow-inner">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-700">Total:</h3>
          <h3 className="text-3xl font-extrabold text-green-700">
            {formatPrice(ticket.total)}
          </h3>
        </div>
      </div>

      {/* Botón OK */}
      {onClose && (
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-lg shadow-md transition-all"
          >
            ✔ OK
          </button>
        </div>
      )}
    </div>
  );
}
