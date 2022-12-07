const express = require("express");
const {
  obtenerUsuarios,
  registrarUsuario,
  login,
  logout,
} = require("../controllers/usuarioController");
const router = express.Router();

//! GET http://localhost:3000/usuarios/lista
router.get("/lista", obtenerUsuarios);

//! POST http://localhost:3000/usuarios/registrar
router.post("/registrar", registrarUsuario);

//! POST http://localhost:3000/usuarios/login
router.post("/login", login);

//! DELETE http://localhost:3000/usuarios/logout
router.delete("/logout", logout);

module.exports = router;
