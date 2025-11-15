export default function ProductCard({ product }) {
  return (
    <div className="bg-[#b3b3b3] rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition cursor-pointer">
      <div className="aspect-video bg-gray-300 relative overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.description}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="text-lg font-bold mb-2">{product.price}</div>
        <p className="text-sm text-gray-700">{product.description}</p>
      </div>
    </div>
  )
}
