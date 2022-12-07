const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const axios = require("axios");

const dotenv = require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/usuarios");
const librosRouter = require("./routes/libros");

const app = express();

const { connect } = require("./db/db");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// http://localhost:3000/
app.use("/", indexRouter);

// http://localhost:3000/usuarios
app.use("/usuarios", usersRouter);

// http://localhost:3000/libros
app.use("/libros", librosRouter);

connect();

module.exports = app;
