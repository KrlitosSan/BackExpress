const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
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

//root:GHCOjPMIMZZUSOwlaYoknhXHSWsKGOYm@hopper.proxy.rlwy.net:56788/railway

mysql: app.use(
  cors({
    credentials: true,
    origin: process.env.URLFRONT || "http://localhost:5173",
  })
);
app.use(
  session({
    secret: process.env.SECRETSESSION || "secret",
    proxy: process.env.NODE_ENV === "production",
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    },
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
