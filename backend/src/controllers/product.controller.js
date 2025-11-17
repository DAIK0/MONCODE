import Product from '../models/product.models.js';
import {v2 as cloudinary } from 'cloudinary';

//funcion para obtener todos los productos
export const getProducts = async (req, res) => {
    try {
        //find = select * from products where user = $id
        const product = await Product.find({user: req.user.id});
                                    //con este es para mostrar mas detalles  .populate('user');
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({message: ['Error al obtener los productos']})
    }
}; //fin de getProducts

//funcuin para crear un producto
export const createProduct = async (req, res)=>{
    try {
        if (!req.file) {
            return res.status(400).json({message: 'La imagen del producto es requerida'});
        }
        
        if (!req.urlImage) {
            return res.status(500).json({message: 'Error al procesar la imagen en Cloudinary'});
        }

        const {name, price, quantity, description, category} = req.body;
        
        const newProduct = new Product({
            name,
            price: Number(price),
            quantity: Number(quantity),
            description,
            category,
            image: req.urlImage,
            user: req.user.id
        }); //save = insert into product values (name, price, quantity);
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({message: ['Error al crear un producto: ' + error.message]})
    }
};//fin de createProduct

//funcion para obtener un producto por ID
export const getProductById = async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
                                    //.populate('user');
        if (!product) //no se encontro el producto en la bd
            res.status(404)
                .json({message:['Producto no encontrado']})
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({message:['error al obtener un producto por id']})
    }
};//fin de getProductById

//funcion para eliminar un producto un producto por ID
export const deleteProduct = async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if (!product) //no se encontro el producto en la bd
            res.status(404)
                .json({message:['Producto no encontrado']})

        //para elminiar la imagen en cloudinary, es necesario 
        //extraer unicamente el nombre de la imagen, sin url ni extension

        //obtener la url de la imagen de cloudinary
        //p.ej http://res.cloudinary.com/dt8r8indr/image/upload/v1761748801/z3d6mnnwkptxesp4fdks.jpg
        const imageUrl = product.image;

        //dividimos por diagonales / la url y nos quedamos con el ultimo parametro
        //que contiene el nombre de la imagen con la extension
        const urlArray = imageUrl.split('/');

        //image contendra el id de la imagen en cloudinary
        // image = z3d6mnnwkptxesp4fdks.jpg
        const image = urlArray[ urlArray.length - 1 ];

        //dividimos el nombre de la imagen para quitar la extension
        //imageName = z3d6mnnwkptxesp4fdks
        const imageName = image.split('.')[0];

        //eliminar la imagen de cloudinary
        const result = await cloudinary.uploader.destroy(imageName);
        if (result.result ==='ok'){
            //si se elimino la imagen, eliminamos el producto
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);

            if (!deletedProduct) //error al eliminar el producto
                return res.status(400)
                        .json({message:['Producto no encontrado para eliminar']});
            
            res.json(deletedProduct);
        } else {
            //error al eliminar la imagen, retornamos el error al usuario
            return res.status(500)
                       .json({message:['Error al eliminar la imagen del producto']})
        } //fin de else
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({message:['error al eliminar un producto por']})
    }
};//fin de deleteProduct

//funcion para actualizar un producto por ID sin actualizar la imagen
export const updateProductWithoutImage = async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if (!product) //no se encontro el producto en la bd
            res.status(404)
                .json({message:['Producto no encontrado']})

        //obtenemos los datos actualizar
        const dataProduct = ({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
            category: req.body.category,
            image: req.body.image,
            user: req.user.id
        })
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, dataProduct, {new:true});
        res.json(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({message:['error al obtener un producto por id']})
    }
};//fin de updateProductwithoutImage

//funcion para actualizar un producto y Actualizar la imagen
export const updateProductWithImage = async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if (!product) //no se encontro el producto en la bd
            res.status(404)
                .json({message:['Producto no encontrado']})

        if (!req.file)
                return res.status(500)
                          .json({message:['Error al actualizar el producto, imagen no encontrada']})

        //eliminamos la imagen anterior de cloudinary
        const imageUrl = product.image;
        const urlArray = imageUrl.split('/');
        const image = urlArray[ urlArray.length - 1 ];
        const imageName = image.split('.')[0];
        const result = await cloudinary.uploader.destroy(imageName);
        if (!result.result ==='ok'){
            return res.status(500)
                       .json({message:['Error al eliminar la imagen del producto']})
        } //fin de else
        
        //obtenemos los datos actualizar
        const dataProduct = ({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
            category: req.body.category,
            image: req.urlImage, //nueva url de la imagen actualizada
            user: req.user.id
        })
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, dataProduct, {new:true});
        res.json(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({message:['error al obtener un producto por id']})
    }
};//fin de updateProduct

//funcion para obtener todos los productos de todos los usuarios 
//para la compra de productos
export const getAllProducts = async (req, res)=>{
    try{
        const products = await Product.find( );
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500)
            .json({message:['Error al obtener todos los productos']})
    }
}; //fin de getAllproducts
