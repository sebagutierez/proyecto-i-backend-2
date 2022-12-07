const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const libroSchema = new Schema({
  titulo: {
    type: String,
    required: true,
    unique: true,
  },
  autor: {
    type: String,
    required: true,
    unique: false,
  },
  precio: {
    type: Number,
    required: true,
    unique: false,
  },
});
// PARA QUE GENERE EL MODELO
const Libro = mongoose.model("Libro", libroSchema);

module.exports = { Libro };
