// Importa los módulos necesarios de Node.js/Express
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Importa el archivo de rutas principal
const router = require('./routes/index.js');

// Importa el archivo que se encarga de la conexión a la base de datos
require('./db.js');

// Crea una instancia de Express y asigna el nombre 'API' a tu servidor
const server = express();
server.name = 'API';

// Configura middlewares para procesar solicitudes

// Middleware para analizar datos de solicitud codificados en URL y JSON
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));

// Middleware para analizar cookies en las solicitudes
server.use(cookieParser());

// Middleware para registrar detalles de las solicitudes en la consola (solo en entorno de desarrollo)
server.use(morgan('dev'));

// Configura los encabezados para permitir solicitudes desde cualquier acceso/URL('*')
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Actualiza para que coincida con el dominio desde el que se realizará la solicitud
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();

});

// Asocia las rutas definidas en el archivo 'routes/index.js'
server.use('/', router);

// Middleware para manejar errores

// Middleware para manejar errores: captura cualquier error que ocurra en las rutas
server.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;

  // Imprime el error en la consola para propósitos de depuración
  console.error(err);

  // Envia una respuesta de error con el estado y el mensaje correspondientes
  res.status(status).send(message);
});

// Exporta la instancia de Express para ser utilizada en otros archivos (por ejemplo, app.js)
module.exports = server;





