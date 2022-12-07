const express = require("express");
const {
  obtenerlibros,
  obtenerLibroxId,
  cargarLibro,
  editarLibro,
  eliminarLibro,
} = require("../controllers/librocontroller");
// const { consultaAxios } = require("../controllers/axiosController");

const router = express.Router();

const { validarId } = require("../middlewares/validarId");
const { check } = require("express-validator");

//! 1) GET http://localhost:3000/libros
router.get("/", obtenerlibros);

//! 2) GET X ID http://localhost:3000/libros/id/
router.get("/id/:id([0-9a-fA-F]{24})", validarId, obtenerLibroxId);

//! 3) POST http://localhost:3000/libros/cargar
router.post(
  "/cargar",
  [
    check("titulo")
      .not()
      .isEmpty()
      .withMessage("El campo título no puede estar vacío"),
    check("autor")
      .not()
      .isEmpty()
      .withMessage("El campo autor no puede estar vacío"),
    check("precio")
      .isNumeric()
      .isLength({ min: 1, max: 6 })
      .withMessage(
        "El campo precio no puede estar vacío ni tener más de 6 dígitos"
      ),
  ],
  cargarLibro
);

//! 4) PUT http://localhost:3000/libros/cargar/id
router.put(
  "/editar/:id([0-9a-fA-F]{24})",
  validarId,
  [
    check("titulo")
      .not()
      .isEmpty()
      .withMessage("El campo título no puede estar vacío"),
    check("autor")
      .not()
      .isEmpty()
      .withMessage("El campo autor no puede estar vacío"),
    check("precio")
      .isLength({ min: 1 })
      .isLength({ max: 6 })
      .withMessage(
        "El campo precio no puede estar vacío ni tener más de 6 dígitos"
      )
      .isNumeric()
      .withMessage("El campo precio debe ser de tipo numérico"),
  ],
  editarLibro
);

//! 5) DELETE http://localhost:3000/productos/eliminar/id
router.delete("/eliminar/:id([0-9a-fA-F]{24})", validarId, eliminarLibro);

//! 6) AXIOS
// router.get("/poke", consultaAxios);

module.exports = router;
