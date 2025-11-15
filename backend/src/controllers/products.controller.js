import Product from '../models/product.models.js';
import { v2 as cloudinary } from 'cloudinary';

// Función para obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id }).populate('user');
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error al obtener los productos'] });
  }
};

// Función para crear un producto
export const createProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const newProduct = new Product({
      name,
      price,
      quantity,
      image: req.urlImage,
      user: req.user.id
    });
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error al crear un producto'] });
  }
};

// Función para obtener un producto por ID
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: ['Producto no encontrado'] });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error al obtener un producto'] });
  }
};

// Función para eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ message: ['Producto no encontrado'] });

    const imageUrl = product.image;
    const urlArray = imageUrl.split('/');
    const image = urlArray[urlArray.length - 1];
    const imageName = image.split('.')[0];

    const result = await cloudinary.uploader.destroy(imageName);
    if (result.result === 'ok') {
      return res.json(product);
    } else {
      return res.status(500).json({ message: ['Error al eliminar la imagen del producto'] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error al eliminar un producto'] });
  }
};

// Función para actualizar un producto sin imagen
export const updateProductWithoutImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: ['Producto no encontrado'] });

    const dataProduct = ({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      image: req.body.image,
      user: req.user.id
    });
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, dataProduct);
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error al actualizar un producto'] });
  }
};

// Función para actualizar un producto con imagen
export const updateProductWithImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: ['Producto no encontrado'] });

    if (!req.file)
      return res.status(500).json({ message: ['Error al actualizar un producto, no se encontró la imagen'] });

    const imageUrl = product.image;
    const urlArray = imageUrl.split('/');
    const image = urlArray[urlArray.length - 1];
    const imageName = image.split('.')[0];

    const result = await cloudinary.uploader.destroy(imageName);
    if (result.result !== 'ok')
      return res.status(500).json({ message: ['Error al eliminar la imagen del producto'] });

    const dataProduct = {
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      image: req.imageUrl,
      user: req.user.id
    };
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, dataProduct);
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error al actualizar un producto'] });
  }
};//fin de updateProductWithImage

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error al obtener los productos'] });
  }
};//fin de getAllProducts
