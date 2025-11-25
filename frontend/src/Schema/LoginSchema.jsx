import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string('Email requerido')
        .min(5,
            { error: 'El email debe tener al menos 5 caracteres' }),
    password: z.string('Contraseña requerida')
        .min(6, {
            error: 'La contraseña debe tener al menos 6 caracteres'
        })
        .max(30, {
            error: 'La contraseña debe tener menos de 30 caracteres'
        })
})