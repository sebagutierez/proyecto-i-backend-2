const express = require("express");
const {
  crearSesion,
  verCookie,
  eliminarCookie,
} = require("../controllers/indexController");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//! GET http://localhost:3000/nuevasesion
router.get("/nuevasesion", crearSesion);
//! GET http://localhost:3000/vercookie
router.get("/vercookie", verCookie);
//! GET http://localhost:3000/eliminarcookie
router.get("/eliminarcookie", eliminarCookie);

module.exports = router;
