import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getProducts,
    createProduct,
    getProductById,
    deleteProduct,
    updateProductWithImage,
    updateProductWithoutImage,
    getAllProducts
} from '../controllers/product.controller.js'

const router = Router();

//importamos el validatorSchema
import { validateSchema } from  '../middlewares/validateSchema.js';

//importamos el esquema de validacion
import { productSchema, productUpdateSchema } from "../schemas/product.schemas.js"

//importamos el middleware para subir imagenes
import { uploadToCloudinary } from '../middlewares/uploadImage.js';

//importamos el middlweware para subir imagenes a cloudinary
import { isAdmin } from '../middlewares/isAdmin.js';

//ruta para obtener todos los productos
router.get('/products',authRequired, isAdmin, getProducts);

//ruta para crear un producto
router.post('/products', authRequired, isAdmin, uploadToCloudinary, validateSchema(productSchema), createProduct);

//ruta temporal
//router.post('/products', authRequired, uploadToCloudinary, (req, res)=>{res.status(200).json({message:"OK"});
                                                                        //});

//ruta para obtener un producto por id
router.get('/products/:id', authRequired, isAdmin, getProductById);

//ruta para eliminar un producto
router.delete('/products/:id', authRequired, isAdmin, deleteProduct);

//ruta para actualizar un producto sin actualizar la imagen
router.put('/products/:id', authRequired, isAdmin, validateSchema(productUpdateSchema), updateProductWithoutImage);

//ruta para actualizar un producto y actualizar la imagen
router.put('/products/updatewithimage/:id', authRequired, isAdmin, uploadToCloudinary, validateSchema(productSchema), updateProductWithImage);

//ruta para obtener todos los productos para la compra
router.get('/products/getallproducts',getAllProducts)

export default router;
