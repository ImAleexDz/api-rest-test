const express = require('express')
//Importamos nuestras ruta
const routes = require('./routes')
//importar mongoose
const mongoose = require('mongoose')
//importar body parser
const bodyParser = require('body-parser')

//conect mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
    useNewUrlParser: true
});

//Crear el servidor
const app = express();

//habilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//Rutas de la app
app.use('/', routes());


//Puerto
app.listen(5000)