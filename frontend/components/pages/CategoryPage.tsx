"use client"

import { useState } from "react"

export default function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState("PC de escritorio")

  const categories = [
    {
      name: "PC de escritorio",
      subcategories: [
        "Tarjeta madre",
        "Disipadores",
        "Procesadores",
        "Almacenamiento",
        "Memoria RAM",
        "Gabinetes",
        "Fuentes de poder",
      ],
    },
    {
      name: "Portátiles",
      subcategories: ["Gaming Laptops", "UltraBook", "Workstations", "2 en 1"],
    },
    {
      name: "Periféricos",
      subcategories: ["Teclados", "Ratones", "Headsets", "Monitores"],
    },
    {
      name: "Almacenamiento",
      subcategories: ["SSD NVMe", "HDD", "Unidades Externas", "NAS"],
    },
  ]

  const selectedCategoryObj = categories.find((c) => c.name === selectedCategory)

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 uppercase">Categorías</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Category list */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`w-full text-left px-6 py-4 border-b transition ${
                  selectedCategory === category.name
                    ? "bg-blue-600 text-white font-semibold"
                    : "hover:bg-gray-50 text-gray-800"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right column - Subcategories and Description */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 mb-8">
            {selectedCategoryObj?.subcategories.map((sub) => (
              <div key={sub} className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition cursor-pointer">
                <p className="font-semibold text-gray-800">{sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-200 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Descripción</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Los disipadores en una computadora permiten la refrigeración de los componentes
            </p>

            <h4 className="text-lg font-semibold mb-3 text-blue-600 cursor-pointer hover:text-blue-800">Links</h4>

            <div className="bg-black rounded-lg w-full h-96" />
          </div>
        </div>
      </div>
    </div>
  )
}
