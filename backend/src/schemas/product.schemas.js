import { z } from 'zod';

export const productSchema = z.object({
    name: z.string('Nombre del producto requerido'),
    price: z.string()
            .transform ( (val)=>parseFloat(val))
            .pipe(
                z.number('Precio del producto requerido')
                    .positive('Precio debe ser mayor a 0')
                    .refine( (val)=>!isNaN(val), {error: 'El precio debe ser un numero valido'})
            ),
    quantity:z.string()
            .transform ( (val)=>parseInt(val))
            .pipe(
                z.number()
                    .int({error: 'Cantidad del producto requerida'})
                    .min(0, {error: 'La cantidad debe ser mayor o igual a 0'})
                    .refine( (val)=>!isNaN(val), {error: 'La cantidad debe ser un numero valido'})
            ),
    description: z.string('Descripción del producto requerida')
                    .min(5, {error: 'La descripción debe tener al menos 5 caracteres'}),
    category: z.string('Categoría del producto requerida')
                    .min(3, {error: 'La categoría debe tener al menos 3 caracteres'}),
}); //fin de productSchema

export const productUpdateSchema = z.object({
    name: z.string('Nombre del producto requerido'),
    price: z.number('Precio del producto requerido')
            .positive('El precio debe ser mayor a 0')
            .refine( (val)=>!isNaN(val), {error: 'El precio debe ser un numero valido'}),
    quantity: z.number()
                .int({error:'Cantidad del producto requerida'})
                .min(0, {error: 'La cantidad debe ser mayor o igual a 0'})
                .refine( (val)=>!isNaN(val), {error: 'La cantidad debe ser un numero valido'}),
    description: z.string('Descripción del producto requerida')
                    .min(5, {error: 'La descripción debe tener al menos 5 caracteres'}),
    category: z.string('Categoría del producto requerida')
                    .min(3, {error: 'La categoría debe tener al menos 3 caracteres'}),
    image: z.string('Url de la imagen requerida')
}); //fin de productUpdateSchema
