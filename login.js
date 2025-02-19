const connection = require("./conexion");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const login = async (req, res) => {
  const datos = req.query;
  try {
    const [results, fields] = await connection.query(
      "SELECT * FROM `usuarios` WHERE `usuario` = ? ",
      [datos.usuario]
    );
    console.log(bcrypt.hashSync(datos.password, saltRounds));
    if (
      results.length > 0 &&
      bcrypt.compareSync(datos.password, results[0].password)
    ) {
      req.session.usuario = datos.usuario;
      res.status(200).send("Login Correcto");
    } else {
      res.status(401).send("Usuario o Contraseña Incorrecto");
    }
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
    res.status(500).send("Error de Servidor");
  }
};

module.exports = login;
