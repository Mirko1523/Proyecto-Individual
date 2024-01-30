// // Importa el objeto 'Router' desde el módulo 'express'
// const { Router } = require('express');

// // Importa los manejadores de las rutas desde '../handlers/getVideogamesHandlers'
// const {
//   getAllVideogames,
//   getVideogamesById,
//   getVideogamesByName,
//   createVideogame,
// } = require('../handlers/getVideogamesHandlers');

// // Crea un enrutador utilizando el objeto 'Router' de Express
// const videogamesRouter = Router();

// // Configurar las rutas del enrutador

// // Ruta GET para obtener todos los videojuegos
// videogamesRouter.get('/', getAllVideogames);

// // Ruta GET para obtener un videojuego por su ID
// videogamesRouter.get('/:id', getVideogamesById);

// // Ruta GET para obtener videojuegos por su nombre
// videogamesRouter.get('/:name', getVideogamesByName);

// // Ruta POST para crear un nuevo videojuego
// videogamesRouter.post('/', createVideogame);


// Importa los módulos necesarios

// Importa el objeto 'Router' desde el módulo 'express'
const { Router } = require('express');

// Importa los manejadores de las rutas desde '../handlers/getVideogamesHandlers'
const {
  getAllVideogames,
  getVideogamesById,
  getVideogamesByName,
  createVideogame,
} = require('../handlers/getVideogamesHandlers');

// Crea un enrutador utilizando el objeto 'Router' de Express
const videogamesRouter = Router();

// Configurar las rutas del enrutador

// Ruta GET para obtener todos los videojuegos
videogamesRouter.get('/', getAllVideogames);

// Ruta GET para obtener un videojuego por su ID
videogamesRouter.get('/:id', getVideogamesById);

// Ruta GET para obtener videojuegos por su nombre
videogamesRouter.get('/:name', getVideogamesByName);


// Ruta POST para crear un nuevo videojuego
videogamesRouter.post('/', createVideogame);

// Exporta el enrutador 'videogamesRouter' para ser utilizado en otros archivos
module.exports = videogamesRouter;

