const Clientes = require('../models/Clientes')

//agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body)

    try {
        //almacenar el registro
        await cliente.save()
        res.json({mensaje: 'Se agregó un nuevo cliente'})
    } catch (error) {
        //si hay error, console.log y next(para que no se detenga y pase al siguiente middleware)
        console.log(error)
        next()
    }
}

//Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({})
        res.json(clientes)
    } catch(error) {
        console.log(error)
        next()
    }
}

//Muestra un cliente por su ID
exports.mostrarCliente = async (req, res, next) => {
    const cliente = await Clientes.findById(req.params.idCliente);

    if(!cliente) {
        res.json({mensaje: 'Cliente no existe'})
        return next()
    }

    //mostrar cliente
    res.json(cliente)
}

//Actualiza un cliente por su ID
exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findByIdAndUpdate({ _id: req.params.idCliente },
            req.body, {
                //Trae la nueva actualización
                new: true
            })
            res.json(cliente)
    } catch(error) {
        console.log(error)
        next()
    }
}

//Elimina cliente por su id
exports.eliminarCliente = async (req, res, next) => {
    try {
        await Clientes.findOneAndDelete({_id: req.params.idCliente})
        res.json({mensaje: 'Cliente eliminado'})
    } catch (error) {
        console.log(error)
        next()
    }
}