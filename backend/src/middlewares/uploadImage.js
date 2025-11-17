import multer from 'multer';
import cloudinary from 'cloudinary';

// Configuración de Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Configuración de multer (almacenamiento en memoria)
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
}).single('image');

export const uploadToCloudinary = async (req, res, next) => {
    try {
        const allowedMimes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp'
        ];

        upload(req, res, async (err) => {

            // Error de tamaño o multer
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ message: ['Tamaño del archivo excedido'] });
                }
                return res.status(400).json({ message: ['Error al cargar la imagen'] });
            }

            // No se envió archivo
            if (!req.file) {
                return res.status(400).json({ message: ['No se encontró la imagen'] });
            }

            // Formato no permitido
            if (!allowedMimes.includes(req.file.mimetype)) {
                return res.status(400).json({ message: ['Formato de imagen no permitido'] });
            }

            // Convertir a Base64
            const base64Image = Buffer.from(req.file.buffer).toString('base64');
            const dataUri = `data:${req.file.mimetype};base64,${base64Image}`;

            // Subir a Cloudinary
            const uploadResponse = await cloudinary.v2.uploader.upload(dataUri);

            // Guardar la URL para el siguiente middleware
            req.urlImage = uploadResponse.url;

            console.log("Imagen cargada:", req.file.originalname);
            next();
        });

    } catch (error) {
        return res.status(400).json({ message: [error.message] });
    }
};
