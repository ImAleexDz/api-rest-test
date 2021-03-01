const Pedidos = require('../models/Pedidos')

exports.nuevoPedido = async(req, res, next) => {
    const pedido = new Pedidos(req.body)

    try {
        await pedido.save();
        res.json({mensaje: 'Se agregó nuevo pedido'})
    } catch(error) {
        console.log(error)
        next()
    }
}

exports.mostrarPedidos = async(req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            //path a encontrar la información del pedido
            path: 'pedido.producto',
            model: 'Productos'
        })

        res.json(pedidos)
    } catch (error) {
        console.log(error)
        next()
    }
}

//Mostrar un pedido por ID
exports.mostrarPedido = async(req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        //path a encontrar la información del pedido
        path: 'pedido.producto',
        model: 'Productos'
    })

    if(!pedido) {
        res.json({mensaje: 'El pedido no existe'})
        return next()
    }

    //mostrar el pedido
    res.json(pedido)
}

//Actualizar pedido por ID
exports.actualizarPedido = async(req, res, next) => {
    try {
        let pedido = await Pedidos.findOneAndUpdate({_id: req.params.idPedido}, req.body, {
            new: true
        })
        .populate('cliente')
        .populate({
            //path a encontrar la información del pedido
            path: 'pedido.producto',
            model: 'Productos'
        })

        res.json(pedido)
    } catch (error) {
        console.log(error)
        next()
    }
}

//Eliminar pedido por ID
exports.eliminarPedido = async(req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({_id: req.params.idPedido})
        res.json({mensaje: 'Pedido eliminado'})
    } catch (error) {
        console.log(error)
        next()
    }
}