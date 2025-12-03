"use client"

interface Product {
    _id: string
    name: string
    price: number
    quantity: number
    description: string
    category: string
    image: string
    user: string
}

interface ProductInventoryCardProps {
    product: Product
}

export function ProductInventoryCard({ product }: ProductInventoryCardProps) {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <div className="flex gap-2 p-3 bg-gray-100">
                <button className="flex-1 px-3 py-2 bg-yellow-300 text-black text-sm font-bold rounded hover:bg-yellow-400 transition">
                    Actualizar info
                </button>
                <button className="flex-1 px-3 py-2 bg-yellow-400 text-black text-sm font-bold rounded hover:bg-yellow-500 transition">
                    Actualizar imagen
                </button>
                <button className="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-bold rounded hover:bg-red-700 transition">
                    Eliminar producto
                </button>
            </div>

            <div className="w-full h-56 bg-gray-300 flex items-center justify-center">
                {product.image ? (
                    <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-gray-600 font-bold text-lg">IMAGEN</span>
                )}
            </div>

            {/* Product content */}
            <div className="p-4 bg-gray-200">
                <div className="flex justify-between items-start gap-2 mb-3">
                    <h3 className="font-bold text-gray-800 text-base flex-1 break-words">Nombre {product.name}</h3>
                    <span className="font-bold text-gray-800 whitespace-nowrap">${product.price}</span>
                </div>

                {/* Description */}
                <div className="mb-3">
                    <p className="text-sm text-gray-700 line-clamp-2">Description:</p>
                    <p className="text-xs text-gray-600">{product.description}</p>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-300">
                    <div className="flex-1 bg-gray-300 rounded px-2 py-2 text-xs text-center">
                        <p className="text-gray-700 font-semibold">Cantidad: {product.quantity}</p>
                    </div>
                    <div className="flex-1 bg-gray-300 rounded px-2 py-2 text-xs text-center">
                        <p className="text-gray-700 font-semibold">Categoría: {product.category}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
