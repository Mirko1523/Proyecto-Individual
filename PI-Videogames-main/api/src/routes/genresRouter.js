// Importa el módulo 'express', que es el framework web para Node.js
const express = require('express');

// Importa el manejador de la ruta para obtener géneros desde '../handlers/getGenresHandlers'
const getGenresHandler = require('../handlers/getGenresHandlers');

// Crea un enrutador de Express, que se utilizará para manejar las rutas relacionadas con los géneros
const genresRouter = express.Router();

// Define una ruta GET '/genres' en el enrutador genresRouter y asigna el manejador getGenresHandler a esa ruta
genresRouter.get('/genres', getGenresHandler);

// Exporta el enrutador genresRouter para que pueda ser utilizado en otros archivos
module.exports = genresRouter;
