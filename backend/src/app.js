import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//importamos las rutas para usuario
import authRoutes from './routes/user.routes.js';
//importamos las rutas para productos
import productRoutes from './routes/products.routes.js'
import orderRoutes from './routes/order.routes.js';
import { verify } from 'jsonwebtoken';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,

}))
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser()); //cookies en formato json
app.use(express.urlencoded({ extended: false }));

//indicamos que el servidor utilice el objeto authRoutes
//http://localhost:3000/api/login    o /api/register
app.use('/api/', authRoutes)
app.use('/api/', productRoutes);
app.use('/api/', orderRoutes);
app.get('/', (req, res) => {
    res.json({
        message: 'Bienbendo a la api del meñotote',
        version: '1.0.0',
        rutasDisponibles: [
            { endpoint: '/api/register', metodo: 'POST', descripcion: 'Registrar un nuevo usuario' },
            { endpoint: '/api/login', metodo: 'POST', descripcion: 'Iniciar sesión de usuario' },
            { endpoint: '/', metodo: 'GET', descripcion: 'Ruta inicial de la aplicacion' }

        ]
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', message: 'El servidor está funcionando correctamente.' });
});

//Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});
export default app;
