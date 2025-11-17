import { Router } from 'express';
import { 
    createOrder, 
    getUserOrders, 
    getOrderById, 
    getAllOrders, 
    updateOrderStatus 
} from '../controllers/order.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = Router();

// User routes (require authentication)
router.post('/orders/crear-orden', authRequired, createOrder);
router.get('/orders', authRequired, getUserOrders);
router.get('/orders/:orderId', authRequired, getOrderById);

// Admin routes
router.get('/orders/admin/all', authRequired, isAdmin, getAllOrders);
router.put('/orders/:orderId/status', authRequired, isAdmin, updateOrderStatus);

export default router;
