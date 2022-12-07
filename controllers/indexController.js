//! GET http://localhost:3000/nuevasesion
const crearSesion = async (req, res) => {
  let usuario = {
    name: "admin",
    pass: "1234",
  };
  res.cookie("personaEnSesion", usuario.name, { maxAge: 60000 });

  req.session.user = usuario;

  res.json(req.session.user);
};

//! GET http://localhost:3000/vercookie
const verCookie = (req, res) => {
  res.json({ valor: req.cookies.personaEnSesion });
};

//! GET http://localhost:3000/eliminarcookie
const eliminarCookie = (req, res) => {
  res.clearCookie("personaEnSesion");
  res.json({ msg: "La cookie fue eliminada" });
};

module.exports = { crearSesion, verCookie, eliminarCookie };
