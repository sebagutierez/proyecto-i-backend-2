const axios = require("axios");

const consultaAxios = async (req, res) => {
  try {
    const respuesta = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/" + req.params.name
    );
    res.json({ data: respuesta.data, status: respuesta.status });
  } catch (error) {
    res.json({ data: error.response.data, status: error.response.status });
  }
};
module.exports = { consultaAxios };
