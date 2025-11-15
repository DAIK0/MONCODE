"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import NewsCard from "../NewsCard"

export default function NewsPage() {
  const newsItems = [
    {
      id: 1,
      image: "/placeholder.svg?key=3wl4t",
      title: "CES 2025: Nvidia presenta la revolucionaria serie GeForce RTX 5000",
    },
    {
      id: 2,
      image: "/placeholder.svg?key=48gn8",
      title: "Muchos núcleos y mucho MHz, pero el rendimiento de las CPU está estancado",
    },
    {
      id: 3,
      image: "/placeholder.svg?key=10ngk",
      title: "Nuevas tecnologías de memoria DDR5 rompen récords de velocidad",
    },
    {
      id: 4,
      image: "/placeholder.svg?key=eocb0",
      title: "Los SSD NVMe alcanzan velocidades de 14GB/s en pruebas",
    },
  ]

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2 uppercase">Noticias</h1>
      <p className="text-gray-600 mb-8">Mantente actualizado con las últimas novedades del mundo tech</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {newsItems.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-12">
        <button className="p-3 bg-gray-300 hover:bg-gray-400 rounded-full transition">
          <ArrowLeft size={24} />
        </button>
        <button className="p-3 bg-gray-300 hover:bg-gray-400 rounded-full transition">
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  )
}
