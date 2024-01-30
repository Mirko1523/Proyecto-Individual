const axios = require('axios');
require('dotenv').config();
const { DB_APIKEY } = process.env;
const { Videogame } = require('../db');

// Obtener todos los videojuegos
const getAllVideogames = async (req, res) => {
  try {
    const { data } = await axios.get(`https://api.rawg.io/api/games?key=${DB_APIKEY}`);
    const { results } = data;

    const gamesApi = results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms,
        genres: game.genres,
      };
    });

    const response = gamesApi;
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Obtener videojuegos por ID o nombre
const getVideogamesById = async (req, res) => {
  try {
  
    const { id } = req.params;

    if (!isNaN(id)) {
      const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${DB_APIKEY}`);
      const videogame = response.data;
      res.json(videogame);
    } else {
      const videogame = await Videogame.findOne({ where: { id } });

      if (!videogame) {
        return res.status(404).json({ error: 'Videojuego no encontrado en la base de datos.' });
      }

      res.json(videogame);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener videojuegos por nombre desde la API externa y la base de datos local
const getVideogamesByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'Se requiere un parámetro "name" en la consulta.' });
    }

    const lowerCaseName = name.toLowerCase();

    const apiResponse = await axios.get(`https://api.rawg.io/api/games?search=${lowerCaseName}&key=${DB_APIKEY}`);
    const apiVideogames = apiResponse.data.results.slice(0, 15);

    const dbVideogames = await Videogame.findAll({
      where: {
        name: {
          $iLike: `%${lowerCaseName}%`,
        },
      },
      limit: 15,
    });

    const mergedVideogames = [...apiVideogames, ...dbVideogames];

    if (mergedVideogames.length === 0) {
      return res.status(404).json({ error: 'No se encontraron videojuegos con el nombre proporcionado.' });
    }

    res.json(mergedVideogames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo videojuego en la base de datos local
const createVideogame = async (req, res) => {
  try {
    const { name, description, releaseDate, rating, genres } = req.body;

    if (!name || !description || !releaseDate || !rating || !genres || genres.length === 0) {
      return res.status(400).json({ error: 'Todos los campos son requeridos, incluyendo al menos un género.' });
    }

    const newVideogame = await Videogame.create({
      name,
      description,
      releaseDate,
      rating,
    });

    const genresToAdd = await Videogame.findAll({
      where: {
        name: {
          $in: genres,
        },
      },
    });

    await newVideogame.addGenres(genresToAdd);

    res.status(201).json(newVideogame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getAllVideogames,
  getVideogamesById,
  getVideogamesByName,
  createVideogame,
};
