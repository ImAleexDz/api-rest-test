const express = require('express')
const router = express.Router();

const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosContoller')

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

    //Mostrar productos
    router.get('/productos', productosController.mostrarProductos);

    //Muestra un producto por ID
    router.get('/productos/:idProducto', productosController.mostrarProducto);

    //Actualizar producto
    router.put('/productos/:idProducto', 
        productosController.subirArchivo,
        productosController.actualizarProducto
    );

    //Eliminar producto
    router.delete('/productos/:idProducto', productosController.eliminarProducto);

    // Pedidos *****
    //Agrega nuevos pedidos
    router.post('/pedidos', pedidosController.nuevoPedido)

    //mostrar todos los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos)

    //mostrat un pedido por ID
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido)

    //Actualizar pedido
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido)

    //Eliminar pedido
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido)

    return router
}