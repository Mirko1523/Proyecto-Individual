require('dotenv').config();
const { Genre, Videogame, conn } = require('./src/db');
const axios = require('axios');



//---------------------------------------------------------------------
//!funcion para agregar los genres a la base de datos
const fillGenres = async () => {
  try {
    await conn.sync({ force: true });

    const { data } = await axios.get(`https://api.rawg.io/api/genres?key=f37460907a6e4c21ab184f796c6bb3b7`);
    const { results } = data;

    const genresToCreate = results.map((genre) => ({
      id: genre.id,
      name: genre.name,
      juegos: genre.games.map((game) => ({ id: game.id, name: game.name })),
    }));

    const createdGenres = await Genre.bulkCreate(genresToCreate, {
      include: Videogame, // Incluir la asociación con Videogame
    });

    console.log('Géneros insertados en la base de datos.');

  } catch (error) {
    console.error('Error al insertar géneros en la base de datos:', error);
  } finally {
    await conn.close();
  }
};

fillGenres();
//---------------------------------------------------------------------------------------