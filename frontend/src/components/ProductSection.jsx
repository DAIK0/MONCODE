import ProductCard from "./ProductCard"

export default function ProductSection() {
  const products = [
    {
      id: 1,
      image: "https://via.placeholder.com/400x300?text=Intel+Core+i5",
      price: "$10,659",
      description: "NUEVO I5 14400K 6.2 HZ",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/400x300?text=Kingston+RAM",
      price: "$1,250",
      description: "Memoria Ram Kingston Fury Beast 16Gb (2 X 8Gb) Ddr4 3200Mhz Dimm Cl16 Non-Ecc Rgb Xmp",
    },
  ]

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 uppercase tracking-wide">Novedades</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
