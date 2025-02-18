const express = require("express");
const app = express();
const port = 3000;
// Get the client
const mysql = require("mysql2/promise");
const session = require("express-session");
const cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5174",
  })
);
app.use(
  session({
    secret: "secret",
  })
);

// Create the connection to database
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "notariabd",
});

app.get("/", (req, res) => {
  res.send("Hello Krlitos");
});

app.get("/login", async (req, res) => {
  const datos = req.query;
  try {
    const [results, fields] = await connection.query(
      "SELECT * FROM `usuarios` WHERE `usuario` = ? AND `password` = ?",
      [datos.usuario, datos.password]
    );
    if (results.length > 0) {
      req.session.usuario = datos.usuario;
      res.status(200).send("Login Correcto");
    } else {
      res.status(401).send("Usuario o Contraseña Incorrecto");
    }
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }
});
app.get("/validar", (req, res) => {
  if (req.session.usuario) {
    res.status(200).send("Usuario Logeado");
  } else {
    res.status(401).send("Usuario No Logeado");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
