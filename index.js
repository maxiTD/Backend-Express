const express = require('express');
const { dbConnection } = require('./db/config');
const cors = require('cors');
require('dotenv').config();

//CORS config
//Lista de dominios permitidos
const whitelist = ['http://localhost:3000'];
//Comprobar si el dominio de la peticion es permitido
const corsOptions = {
    origin: function (origin, callback) {
        /*
         * si el domino es "undefined" (porque se carga la página en el mismo origen al que está realizando
         * llamadas a la API, al usar Postman por ejemplo) o si el dominio esta en la lista de permitidos, permitir.
         * Caso contrario, rechazar la petición.
         */
        if (origin === undefined || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
}

//Crear el servidor de Express
const app = express();

//DB
dbConnection();

//CORS
app.use(cors(corsOptions));

//Lectura y parseo del body
app.use(express.json());

//Directorio público
app.use(express.static('public'));

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/data', require('./routes/data'));

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})