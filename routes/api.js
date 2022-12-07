const express = require("express");
const { consultaAxios } = require("../controllers/axiosController");
const router = express.Router();

router.get("/poke/:name", consultaAxios);

module.exports = router;
