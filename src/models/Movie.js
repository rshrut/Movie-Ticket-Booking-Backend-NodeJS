import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Movie = sequelize.define(
  "Movie",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING
    },
    duration: {
      type: DataTypes.INTEGER // minutes
    },
    rating: {
      type: DataTypes.FLOAT
    },
    posterUrl: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING
    }
  },
  { 
    tableName: "movies",
    indexes: [
        {
            unique: false,
            fields: ['city']
        }
    ] 
  },
);

export default Movie;
