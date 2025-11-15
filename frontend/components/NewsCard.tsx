interface News {
  id: number
  image: string
  title: string
}

export default function NewsCard({ news }: { news: News }) {
  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer h-64">
      <img
        src={news.image || "/placeholder.svg"}
        alt={news.title}
        className="w-full h-full object-cover group-hover:scale-110 transition"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
        <h3 className="text-white text-center font-semibold px-6">{news.title}</h3>
      </div>
    </div>
  )
}
