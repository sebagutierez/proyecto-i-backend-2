const axios = require("axios");

const consultaAxios = async (req, res) => {
  try {
    const respuesta = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/" + req.params.name,
      {
        headers: { "Accept-Encoding": "gzip,deflate.compress" },
      }
    );
    res.json({ data: respuesta.data, status: respuesta.status });
    console.log(respuesta.data);
  } catch (error) {
    res.json({ data: error.response.data, status: error.response.status });
  }
};
module.exports = { consultaAxios };
