const Productos = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    },
}

//Pasar la configuración y el campo (igual que el de la base de datos)
const upload = multer(configuracionMulter).single('imagen')

//Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({mensaje: error})
        }
        return next();
    })
}

exports.nuevoProducto = async(req, res, next) => {
    const producto = new Productos(req.body)

    try {
        if(req.file) {
            producto.imagen = req.file
        }
        await producto.save()
        res.json({mensaje: 'Producto agregado'})
    } catch (error) {
        console.log(error)
        next()
    }
}