const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const port = 3000;

app.use(express.json());

const db = require("./models/index.model");

db.sequelize
  .sync()
  // .sync({ alter: true })
  .then(() => {
    console.log("Base de datos conectada");
  })
  .catch((error) => {
    console.log("Error al conectar a la base de datos: ", error);
  });

require("./router/index.routes")(app);

app.listen(port, () => {
  console.log("SERVER iniciado");
});
