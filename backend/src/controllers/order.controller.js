import Order from '../models/order.models.js';
import Product from '../models/product.models.js';

export const createOrder = async (req, res) => {
    try {
        const { items, total } = req.body;
        const userId = req.user.id;

        // Validate items
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Se requiere un arreglo de items y no puede estar vacío' });
        }

        if (!total || total <= 0) {
            return res.status(400).json({ message: 'Se requiere una cantidad total válida' });
        }

        // Verify all products exist and have sufficient stock
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Producto ${item.productId} no encontrado` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Cantidad de producto insuficiente ${product.name}` });
            }
        }

        // Create the order
        const newOrder = new Order({
            userId,
            items,
            total,
            status: 'pending'
        });

        await newOrder.save();

        // Update product stock
        for (const item of items) {
            await Product.findByIdAndUpdate(
                item.productId,
                { $inc: { stock: -item.quantity } },
                { new: true }
            );
        }

        res.status(201).json({ 
            message: 'Orden creada exitosamente',
            order: newOrder 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ userId })
            .populate('items.productId')
            .sort({ createdAt: -1 });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;

        const order = await Order.findById(orderId)
            .populate('items.productId');

        if (!order) {
            return res.status(404).json({ message: 'Orden no autorizada' });
        }

        // Verify the order belongs to the user
        if (order.userId.toString() !== userId) {
            return res.status(403).json({ message: 'No autorizado para ver esta orden' });
        }

        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId')
            .populate('items.productId')
            .sort({ createdAt: -1 });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Estado invalido' });
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status, updatedAt: Date.now() },
            { new: true }
        ).populate('items.productId');

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.status(200).json({ 
            message: 'Estado de orden Actualizado correctamente',
            order 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
