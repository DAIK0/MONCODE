"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"

interface CartItem {
  id: number
  product: string
  description: string
  price: number
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      product: "Intel Core i9",
      description: "Procesador de última generación",
      price: 10659,
      quantity: 1,
    },
    {
      id: 2,
      product: "Kingston Fury Beast 16GB",
      description: "Memoria RAM DDR4 3200MHz",
      price: 1250,
      quantity: 2,
    },
  ])

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 uppercase">Tu carrito</h1>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 border-b border-gray-300">
              <th className="px-6 py-4 text-left text-sm font-semibold">Producto</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Descripción</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Precio</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Cantidad</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-red-600">Eliminar Producto</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">{item.product}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.description}</td>
                <td className="px-6 py-4 text-sm font-semibold">${item.price}</td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                    className="w-16 px-3 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-end">
        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="text-xl font-bold mb-4">Total: ${total.toLocaleString()}</div>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  )
}
