// Importa el objeto DataTypes de Sequelize para definir tipos de datos en la base de datos
const { DataTypes } = require("sequelize");

// Exporta una función que define el modelo "Genres" en la base de datos
module.exports = sequelize => {
  // Define el modelo "Genres"
  return sequelize.define(
    "Genre",
    {
      // Campo "id" con tipo INTEGER, autoincremental y clave primaria
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      // Campo "name" con tipo STRING, único y no nulo
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    },
    // Configuración adicional: no agregar campos de marca de tiempo (createdAt, updatedAt)
    { timestamps: false }
  );
};
