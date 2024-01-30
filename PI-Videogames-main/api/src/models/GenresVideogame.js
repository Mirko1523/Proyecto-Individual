const { DataTypes } = require("sequelize")
module.exports = sequelize => {
  sequelize.define(
    "VideoGameGenres",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    },
    { timestamps: false }
  )
}
