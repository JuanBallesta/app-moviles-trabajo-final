const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Cambia esto al puerto y dominio de tu frontend
    credentials: true, // Permite el envío de cookies, si es necesario
  })
);

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

// Rutas de autenticación
const authRoutes = require("./router/auth.routes");
app.use("/auth", authRoutes);

//app.use('/auth-clientes', authRoutes);

// Rutas de administración
const adminRoutes = require("./router/admin/productos.routes");
app.use("/admin/productos", adminRoutes);

app.listen(port, () => {
  console.log("Servidor en funcionamiento en el puerto 3000");
});
