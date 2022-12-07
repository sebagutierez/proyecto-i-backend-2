const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
    unique: false,
  },
});
// PARA QUE GENERE EL MODELO
const User = mongoose.model("User", userSchema);

module.exports = { User };
