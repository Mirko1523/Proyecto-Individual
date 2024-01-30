// Importa el objeto DataTypes de Sequelize.
const { DataTypes } = require('sequelize');

// Exporta una función que toma un objeto sequelize como parámetro.
module.exports = (sequelize) => {

  // Define un modelo llamado "Videogame" en la base de datos.
  return sequelize.define('Videogame', {

    // Define un campo "id" que es de tipo UUID y actúa como clave primaria única.
    id: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true
    },

    // Define un campo "name" de tipo STRING que no puede ser nulo.
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Define un campo "description" de tipo STRING que no puede ser nulo.
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // Define un campo "plataform" de tipo ARRAY de STRING que no puede ser nulo.
    plataform: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },

    // Define un campo "image" de tipo STRING que no puede ser nulo.
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // Define un campo "lanzamiento" de tipo INTEGER que no puede ser nulo.
    lanzamiento: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    // Define un campo "rating" de tipo DECIMAL con validación de rango de 0 a 10.
    rating: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
      validate: {
        min: 0,
        max: 10
      }
    }
  },

  // Configuración adicional para el modelo - desactiva timestamps (createdAt, updatedAt).
  { timestamps: false }
  );
}
