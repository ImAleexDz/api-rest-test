const express = require('express')
const router = express.Router();

const clienteController = require('../controllers/clienteController')

const productosController = require('../controllers/productosController')

module.exports = function() {

    //Agrega nuevos clientes vía POST
    router.post('/clientes', clienteController.nuevoCliente)

    //Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes)

    //Muestra un cliente en específico (ID)
    router.get('/clientes/:idCliente', clienteController.mostrarCliente)

    //Actualizar cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente)

    //Eliminar cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente)

    //*** PRODUCTOS **** */
    //nuevos productos
    router.post('/productos', 
        productosController.subirArchivo,
        productosController.nuevoProducto
    );

    return router
}