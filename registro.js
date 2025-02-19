const connection = require("./conexion");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const registro = async (req, res) => {
  if (!req.session.usuario) {
    res.status(401).send("No autorizado");
    return;
  }
  const datos = req.query;
  try {
    const hash = bcrypt.hashSync(datos.password, saltRounds);
    const [results, fields] = await connection.query(
      "INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES (NULL, ?, ?);",
      [datos.usuario, hash]
    );
    if (results.affectedRows > 0) {
      req.session.usuario = datos.usuario;
      res.status(200).send("Registro Correcto");
    } else {
      res.status(401).send("Usuario no Registrado");
    }
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
    res.status(500).send("Error de Servidor");
  }
};

module.exports = registro;
