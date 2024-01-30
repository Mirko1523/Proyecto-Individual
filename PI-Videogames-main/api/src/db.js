// Importa módulos y configuraciones necesarias
require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

// Extrae variables de entorno para la conexión a la base de datos
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

// Crea una instancia de Sequelize para la conexión a PostgreSQL
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/videogames`,
  {
    logging: false,
    native: false,
  }
);

// Carga dinámica de modelos desde el directorio 'models'
const modelDefiners = fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== path.basename(__filename) && file.slice(-3) === ".js"
  )
  .map((file) => require(path.join(__dirname, "/models", file)));

// Define cada modelo utilizando Sequelize
modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Convierte nombres de modelos a mayúscula inicial y desestructura para fácil acceso
const { Genre, Videogame } = sequelize.models;

// Asociación muchos a muchos entre Videogame y Genres a través de 'VideoGameGenres'
Videogame.belongsToMany(Genre,{through:"VideogameGenres"});
Genre.belongsToMany(Videogame,{through:"VideogameGenres"});
// Exporta modelos y la instancia de conexión sequelize para su uso en otros archivos
module.exports = {
  ...sequelize.models,
  conn: sequelize,
  Genre, 
  Videogame
};
