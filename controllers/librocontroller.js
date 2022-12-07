const { validationResult } = require("express-validator");
const { Libro } = require("../models/libroModel");

//! 1) GET http://localhost:3000/libros
const obtenerlibros = async (req, res) => {
  const libros = await Libro.find();
  res.json({ libros });
};

//! 2) GET X ID http://localhost:3000/libros/id/
const obtenerLibroxId = async (req, res) => {
  const libro = await Libro.findById(req.params.id);
  res.status(200).json(libro);
};

//! 3) POST http://localhost:3000/libros/cargar
const cargarLibro = async (req, res) => {
  try {
    const error = validationResult(req);
    if (error.isEmpty()) {
      const libro = new Libro(req.body);
      await libro.save();
      res.status(201).json({ msg: "El libro ha sido guardado exitosamente" });
      libro: libro;
    } else {
      res.status(501).json({ msg: error });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//! 4) PUT http://localhost:3000/libros/cargar/id
const editarLibro = async (req, res) => {
  try {
    const error = validationResult(req);
    if (error.isEmpty()) {
      await Libro.findByIdAndUpdate(req.params.id, req.body);
      res.status(201).json({ msg: `Ítem actualizado` });
    } else {
      res.status(501).json({ msg: error });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//! 5) DELETE http://localhost:3000/productos/eliminar/id
const eliminarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByIdAndDelete(req.params.id);
    res.json({ msg: "Ítem eliminado", libro });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  obtenerlibros,
  cargarLibro,
  obtenerLibroxId,
  editarLibro,
  eliminarLibro,
};
