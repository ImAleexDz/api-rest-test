const Productos = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs')

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
        if(req.file.filename) {
            producto.imagen = req.file.filename
        }
        await producto.save()
        res.json({mensaje: 'Producto agregado'})
    } catch (error) {
        console.log(error)
        next()
    }
}

//Muestra los productos
exports.mostrarProductos = async(req, res, next) => {
    try {
        const productos = await Productos.find({})
        res.json(productos)
    } catch(error) {
        console.log(error)
        next()
    }
}

//Muestra un producto por ID
exports.mostrarProducto = async(req, res, next) => {
    const producto = await Productos.findById(req.params.idProducto);

    if(!producto) {
        res.json({mensaje: 'Producto no existe'})
        return next()
    }

    //mostrar producto
    res.json(producto)
}

//Actualizar producto por ID
exports.actualizarProducto = async(req, res, next) => {
    try {
        //construir un nuevo porducto
        let nuevoProducto = req.body

        //verificar si hay imagen nueva
        if(req.file) {
            nuevoProducto.imagen = req.file.filename
        } else {
            let productoAnterior = await Productos.findById(req.params.idProducto)
            nuevoProducto.imagen = productoAnterior.imagen
        }

        let producto = await Productos.findOneAndUpdate({_id: req.params.idProducto}, 
            nuevoProducto, {
                new: true
            })
            res.json(producto)
    } catch(error) {
        console.log(error)
        next()
    }
}

//Eliminar un prodcto por su ID
exports.eliminarProducto = async(req, res, next) => {
    try {
        const producto = await Productos.findOneAndDelete({ _id: req.params.idProducto })
        if(producto.imagen) {
            const imagenAnteriorPath = __dirname + `../../uploads/${producto.imagen}`
            //Elimina el archivo con filesystem
            fs.unlink(imagenAnteriorPath, (error) => {
                if(error) {
                    console.log(error)
                }

                return;
            })
        }
        res.json({producto, mensaje: 'Producto eliminado'})
    } catch (error) {
        res.json({mensaje: 'No existe el producto'})
        console.log(error)
        next()
    }
}
