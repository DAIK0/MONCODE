"use client"

import { useEffect, useState } from "react"

import axiosInstance from "../api/axiosInstance"
import { ProductInventoryCard } from "./ProductInventoryCard"

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

export function ProductsInventoryGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [modalType, setModalType] = useState<"add" | "edit" | "delete" | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<any>({})
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState("")

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get("/products")
      setProducts(response.data)
      setError(null)
    } catch (err) {
      setError("Error al cargar los productos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const openModal = (type: "add" | "edit" | "delete", product: Product | null = null) => {
    setModalType(type)
    setSelectedProduct(product)
    setFormData(type === "edit" && product ? product : {})


  }

  const closeModal = () => {
    setModalType(null)
    setSelectedProduct(null)
    setFormData({})
    setDeleteConfirm("")
    setImageFile(null)
  }

  const handleAddProduct = async () => {
    const data = new FormData()
    Object.keys(formData).forEach((k) => data.append(k, formData[k]))
    if (imageFile) data.append("image", imageFile)
    await axiosInstance.post("/products", data)
    fetchProducts()
    closeModal()
  }

  const handleUpdateWithoutImage = async () => {
    await axiosInstance.put(`products/updatewithoutimage/${selectedProduct?._id}`, formData)
    fetchProducts()
    closeModal()
  }

  const handleUpdateWithImage = async () => {
    const data = new FormData()
    Object.keys(formData).forEach((k) => data.append(k, formData[k]))
    if (imageFile) data.append("image", imageFile)

    await axiosInstance.put(`products/updatewithimage/${selectedProduct?._id}`, data)
    fetchProducts()
    closeModal()
  }

  const handleDeleteProduct = async () => {
    if (deleteConfirm !== "DELETE") return
    await axiosInstance.delete(`/products/${selectedProduct?._id}`)
    fetchProducts()
    closeModal()
  }

  if (loading) return <p className="text-black">Cargando...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-3xl font-bold text-black">Inventario</h1>
        <button
          onClick={() => openModal("add")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
        >
          + Agregar Producto
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductInventoryCard
            key={p._id}
            product={p}
            onEdit={() => openModal("edit", p)}
            onDelete={() => openModal("delete", p)}
          />
        ))}
      </div>

      {/* MODAL ADD/EDIT */}
      {(modalType === "add" || modalType === "edit") && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-lg animate-fadeIn text-black">
            <h2 className="text-2xl font-bold text-black mb-4">
              {modalType === "add" ? "Agregar Producto" : "Editar Producto"}
            </h2>

            <input
              className="input text-black bg-gray-50 border border-gray-300"
              placeholder="Nombre"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <input
              className="input text-black bg-gray-50 border border-gray-300"
              type="number"
              placeholder="Precio"
              value={formData.price || ""}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />

            <input
              className="input text-black bg-gray-50 border border-gray-300"
              type="number"
              placeholder="Cantidad"
              value={formData.quantity || ""}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />

            <textarea
              className="input text-black bg-gray-50 border border-gray-300"
              placeholder="Descripción"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <input
              className="input text-black bg-gray-50 border border-gray-300"
              placeholder="Categoría"
              value={formData.category || ""}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />

            <input
              type="file"
              className="mt-3 text-black"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />

            <div className="flex justify-end gap-3 mt-5">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-black">
                Cancelar
              </button>

              {modalType === "add" ? (
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  Guardar
                </button>
              ) : (
                <>
                  <button
                    onClick={handleUpdateWithoutImage}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Actualizar (sin imagen)
                  </button>

                  <button
                    onClick={handleUpdateWithImage}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                  >
                    Actualizar (con imagen)
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DELETE */}
      {modalType === "delete" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md text-black">
            <h2 className="text-xl font-bold text-red-600">Eliminar Producto</h2>
            <p className="mt-2 text-black">
              Escribe <strong>DELETE</strong> para confirmar.
            </p>

            <input
              className="input mt-3 text-black bg-gray-50 border border-gray-300"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-5">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-black">
                Cancelar
              </button>

              <button
                onClick={handleDeleteProduct}
                disabled={deleteConfirm !== "DELETE"}
                className={`px-4 py-2 rounded-lg text-white ${deleteConfirm === "DELETE" ? "bg-red-600 hover:bg-red-700" : "bg-red-300 cursor-not-allowed"
                  }`}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}