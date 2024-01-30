// Importación de módulos y paquetes necesarios
const axios = require('axios');  // Para realizar solicitudes HTTP
const { Genre } = require('../db');  // Importar el modelo Genre desde la base de datos
require('dotenv').config();  // Cargar variables de entorno desde un archivo .env


// Extracción de variables de entorno necesarias
const {DB_APIKEY} = process.env;

// Manejo de la solicitud para obtener géneros
const getGenresHandler = async (req, res) => {
  try {


    // Si no hay géneros en la base de datos, obtener géneros de la API externa
    if (true) {
      // Realizar una solicitud GET a la API externa para obtener datos de géneros
      const response = await axios.get(`https://api.rawg.io/api/genres?key=6b708e85163f4d7faa6ddccd3381916b`);
    }

    // Obtener todos los géneros de la base de datos
    const allGenres = await Genre.findAll();

    // Enviar la lista de géneros como respuesta JSON
    res.json(allGenres);
  } catch (error) {
    // Manejar errores y enviar una respuesta de error en caso de fallo
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });

  }

};

// Exportar la función para usar en otras partes de la aplicación
module.exports = getGenresHandler;
