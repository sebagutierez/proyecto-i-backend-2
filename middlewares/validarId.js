const { Libro } = require("../models/libroModel");

const validarId = async (req, res, next) => {
  const item = await Libro.findById(req.params.id);
  if (item !== null) {
    next();
  } else {
    res.status(500).json({ msg: "Id no encontrado..." });
  }
};
module.exports = { validarId };
