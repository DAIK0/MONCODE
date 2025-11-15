import NewsCard from "./NewsCard"

export default function NewsSection() {
  const news = [
    {
      id: 1,
      image: "https://via.placeholder.com/600x400?text=Nvidia+RTX+5000",
      title: "CES 2025: Nvidia presenta la revolucionaria serie GeForce RTX 5000",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/600x400?text=AMD+Ryzen",
      title: "Muchos núcleos y mucho MHz, pero el rendimiento de las CPU está estancado",
    },
  ]

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 uppercase tracking-wide">Noticias</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </section>
  )
}
