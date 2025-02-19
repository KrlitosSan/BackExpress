const express = require("express");
const app = express();
const port = 3000;
// Get the client
const mysql = require("mysql2/promise");
const session = require("express-session");
const cors = require("cors");
const bcrypt = require("bcrypt");
const login = require("./login");
const validar = require("./validar");
const registro = require("./registro");
const { obtenerUsuarios, eliminarUsuario } = require("./usuarios");
const saltRounds = 10;
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(
  session({
    secret: "secret",
  })
);



app.get("/", (req, res) => {
  res.send("Hello Krlitos");
});

app.get("/login", login);

app.get("/validar", validar);

app.get("/registro", registro);

app.get("/usuarios", obtenerUsuarios);

app.delete("/usuarios", eliminarUsuario);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
