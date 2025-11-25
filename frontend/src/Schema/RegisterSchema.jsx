import { email, z } from 'zod';

export const registerSchema = z.object({
    username: z.string('Nombre de usuario requerido')
        .min(5,
            { error: 'El nombre de ususario debe tener al menos 5 caracteres' }),
    email: z.email({
        error: (email) => email.input === undefined ? 'Email es requerido'
            : 'Formato de Email invalido'
    })
        .max(30, {
            error: 'El email debe tener menos de 30 caracteres'
        }),
    password: z.string('Contraseña requerida')
        .min(6, {
            error: 'El password debe tener al menos 6 caracteres'
        })
        .max(30, {
            error: 'El password debe tener menos de 30 caracteres'
        }),
    confirm: z.string('Confirmar password requerido')
        .min(6, {
            error: 'El password debe tener al menos 6 caracteres'
        })
        .max(30, {
            error: 'El password debe tener menos de 50 caracteres'
        })
})

    .refine((data) => data.password === data.confirm, {
        message: 'Las contraseñas no coinciden',
        path: ['confirm']
    });


