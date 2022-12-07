const { User } = require("../models/usuarioModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

//! GET http://localhost:3000/usuarios/lista
const obtenerUsuarios = async (req, res) => {
  const usuarios = await User.find();
  res.status(200).json({ usuarios });
};

//! POST http://localhost:3000/usuarios/registrar
const registrarUsuario = async (req, res) => {
  try {
    const err = validationResult(req);
    if (err.isEmpty()) {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(req.body.pass, salt);
      const user = {
        name: req.body.name,
        pass: hash,
      };
      const nuevoUsuario = new User(user);
      await nuevoUsuario.save();
      res.status(201).json({ nuevoUsuario });
    } else {
      res.status(501).json(err);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//! POST http://localhost:3000/usuarios/login
const login = async (req, res) => {
  try {
    const usuario = await User.findOne({ name: req.body.name });
    if (usuario === null) {
      res.status(404).json({ msg: "El User no existe" });
    } else {
      bcrypt.compare(req.body.pass, usuario.pass).then((validPass) => {
        if (validPass) {
          const user = {
            _id: usuario._id,
            name: usuario.name,
          };
          req.session.user = user;
          if (req.body.remember) {
            res.cookie("sesionUsuario", req.session.user, {
              maxAge: 60000 * 60 * 24 * 30,
            });
          }
          res.status(200).json({ msg: "Usuario logueado", usuario: user });
        } else {
          res.status(401).json({ msg: "Contraseña incorrecta" });
        }
      });
    }
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};

//! DELETE http://localhost:3000/usuarios/logout
const logout = async (req, res) => {
  res.clearCookie("sesionUsuario");
  req.session.destroy();
  res.status(200).json({ msg: "Usuario fuera de sesión" });
};

module.exports = { obtenerUsuarios, registrarUsuario, login, logout };
