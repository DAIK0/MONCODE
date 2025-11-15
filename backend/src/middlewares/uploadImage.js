import multer from 'multer';
import cloudinary from 'cloudinary';

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5MB 
    }
}).single('image'); //fin de upload

export const uploadToCloudinary = async (req, res, next)=>{
    try{
        const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'

        ];
        upload(req, res, async (err)=>{
            if (err){
                if (err.code == 'LIMIT_FILE_SIZE'){
                    return res.status(400)
                              .json({message: ['Tamaño del archivo excedido']})
                }
                else
                    return res.status(400)
                                .json({message: ['Error al cargar la imagen']})
            }//fin de if(err)

            if (!req.file)
                    return res.status(400)
                                .json({message: ['No se encontro la imagen']})

            if (!allowedMimes.includes(req.file.mimetype))
                            return res.status(400)
                                .json({message: ['Formato de imagen no permitida']})

            //obtenemos los datos de la imagen del producto almacenada en memoria 
            const image = req.file;

            //convertimos el objetivo de la imagen a un objeto base 64 para
            //poderlo almacenar como imagen en cloudinary
            const base64Image = Buffer.from(image.buffer).toString('base64');
            const dataUri = "data:" + image.mimetype + ";base64," + base64Image;

            //subir la imagen a cloudinary 
            const uploadResponse = await cloudinary.v2.uploader.upload(dataUri);
            //guardamos la url que retorna cloudinary en el objeti request
            req.urlImage = uploadResponse.url;

            console.log(req.file); //se guarda la imagen cargando en memoria en req.file
            next();
        });//fin de upload
    } catch (error) {
        return res.status(400)
                  .json({message: [error.message]})
    }
}; //fin de uploadToCloudinary
