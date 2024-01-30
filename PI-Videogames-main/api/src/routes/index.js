// Importa el objeto 'Router' desde el módulo 'express'
const { Router } = require('express');

// Importa los enrutadores de las rutas para 'videogames' y 'genres'
const videoGamesRouter = require('./videogamesRouter');
const genresRouter = require('./genresRouter');

// Crea un enrutador principal utilizando el objeto 'Router' de Express
const router = Router();

// Configurar los enrutadores principales

// Usa el enrutador 'videoGamesRouter' cuando la ruta inicie con '/videogames'
router.use('/videogames', videoGamesRouter);

// Usa el enrutador 'genresRouter' cuando la ruta inicie con '/genres'
router.use('/', genresRouter);

// Exporta el enrutador principal 'router' para ser utilizado en otros archivos
module.exports = router;


