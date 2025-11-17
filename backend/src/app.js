import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//importamos las rutas para usuario
import authRoutes from './routes/user.routes.js';
//importamos las rutas para productos
import productRoutes from './routes/product.routes.js'
import orderRoutes from './routes/order.routes.js';

const app = express();
app.use(cors({
    credentials: true
}))
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser()); //cookies en formato json
app.use(express.urlencoded({extended: false}));

//indicamos que el servidor utilice el objeto authRoutes
//http://localhost:3000/api/login    o /api/register
app.use('/api/', authRoutes)
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

export default app;
