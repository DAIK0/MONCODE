import type { Product } from "../types/product"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            {/* Botones de acción */}
            <div className="flex gap-2 p-3 bg-muted">
                <Button variant="outline" size="sm" className="flex-1 bg-yellow-400 text-black hover:bg-yellow-500">
                    Actualizar info
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-yellow-500 text-black hover:bg-yellow-600">
                    Actualizar imagen
                </Button>
                <Button variant="destructive" size="sm" className="flex-1">
                    Eliminar
                </Button>
            </div>

            {/* Imagen del producto */}
            <div className="w-full h-48 bg-muted flex items-center justify-center relative overflow-hidden">
                {product.image ? (
                    <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-muted-foreground font-semibold">IMAGEN</span>
                )}
            </div>

            {/* Contenido */}
            <div className="p-4">
                {/* Nombre y precio */}
                <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-bold text-foreground text-lg truncate flex-1">{product.name}</h3>
                    <span className="font-bold text-foreground whitespace-nowrap">${product.price}</span>
                </div>

                {/* Descripción */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

                {/* Footer con cantidad y categoría */}
                <div className="flex gap-2 pt-4 border-t border-border">
                    <div className="flex-1 bg-muted rounded px-3 py-2 text-xs text-center">
                        <p className="text-muted-foreground">Cantidad: {product.quantity}</p>
                    </div>
                    <div className="flex-1 bg-muted rounded px-3 py-2 text-xs text-center">
                        <p className="text-muted-foreground">Categoría: {product.category}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
