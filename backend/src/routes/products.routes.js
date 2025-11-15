import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
    getProducts,
    createProduct,
    getProduct,
    deleteProduct,
    updateProductWithoutImage,
    updateProductWithImage,
    getAllProducts
} from '../controllers/products.controller.js'

//Importamos el validationSchema
import { validateSchema } from '../middlewares/validateSchema.js';

//Importamos el esquema de validacion de productos
import { productSchema, productUpdateSchema } from '../schemas/product.schemas.js'

//Importamos el middleware para subir imagenes a cloudinary
import { uploadToCloudinary } from '../middlewares/uploadImage.js';

const router = Router();

//Ruta para obtener todos los productos
router.get('/products', authRequired, getProducts);

//Ruta para crear un producto
router.post('/products', authRequired, uploadToCloudinary, validateSchema(productSchema),createProduct);

//Ruta para obtener un producto por Id
router.get('/products/:id', authRequired, getProduct);

//Ruta para eliminar un producto
router.delete('/products/:id', authRequired, deleteProduct);

//Ruta para actualizar un producto sin actualizar la imagen
router.put('/:id', authRequired, validateSchema(productUpdateSchema), updateProductWithoutImage);

//Ruta para actualizar un producto y CAMBIAR la imagen
router.put('/updatewithimage/:id', authRequired, uploadToCloudinary, 
                                    validateSchema(productSchema), updateProductWithImage);

router.get('/products/getallproducts', getAllProducts);


export default router;
