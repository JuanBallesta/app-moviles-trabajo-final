const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Simulación de usuarios en una "base de datos"
const users = [
  {
    username: "juan",
    password: "$2b$10$JREc27BzgLkJUpfGSKPskOroLhzL1F1iSSb14u.8IzUf11YpA04iu",
  }, // Contraseña ya hasheada con bcrypt
];

// const getUsers = () => {
//   axios.get(`/users/username=${username}&password=${password}`)
//     .then((respuesta) => {
//       console.log(respuesta.data)
//       if (respuesta.status === 200) {
//         setData(respuesta.data.data.rows);
//         setCantidadItems(respuesta.data.data.count);
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     })
//     .finally(() => {
//       setLoading(false);
//     });
// };

// Verifica el usuario y la contraseña
async function verifyUser(username, password) {
  // getUsers();
  console.log("llega a verifyUser", username, password);
  const user = users.find((u) => u.username == username);
  console.log("user encontrado", user);
  if (!user?.username) return null;

  const validPassword = await bcrypt.compare(password, user.password);
  console.log("validPassword::", validPassword);
  return validPassword ? user : null;
}

// Genera un token de acceso
function generateAccessToken(data) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

// Genera un token de acceso
async function registerUser(username, password) {
  // Verifica si el usuario ya existe
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  // Encripta la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crea y guarda el nuevo usuario
  const newUser = { username, password: hashedPassword };
  users.push(newUser);

  console.log("newUser:", newUser);

  return { username: newUser.username };
}

module.exports = {
  verifyUser,
  generateAccessToken,
  registerUser,
};
