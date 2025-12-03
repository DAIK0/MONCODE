"use client"

import { useEffect, useState } from "react"
import { ProductInventoryCard } from "./ProductInventoryCard"
import axiosInstance from "../api/axiosInstance"

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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get("/products")
                setProducts(response.data)
                setError(null)
            } catch (err) {
                console.error("Error fetching products:", err)
                setError("Error al cargar los productos")
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <p className="text-gray-600">Cargando productos...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <p className="text-red-600">{error}</p>
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <p className="text-gray-600">No hay productos disponibles</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductInventoryCard key={product._id} product={product} />
            ))}
        </div>
    )
}
