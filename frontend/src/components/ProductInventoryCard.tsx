

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
    onEdit: () => void
    onDelete: () => void
}

export function ProductInventoryCard({ product, onEdit, onDelete }: ProductInventoryCardProps) {
    return (
        <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition">
            <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg"
            />

            <h3 className="text-xl font-bold mt-3 text-black">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>

            <p className="mt-2 font-semibold text-black">Precio: ${product.price}</p>
            <p className="font-semibold text-black">Existencias: {product.quantity}</p>




            <p className="font-semibold text-black">
                Categoría: {product.category}
            </p>



            <div className="flex justify-between mt-4">
                <button onClick={onEdit} className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Editar
                </button>


                <button onClick={onDelete} className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Eliminar
                </button>

            </div>
        </div>
    )
}