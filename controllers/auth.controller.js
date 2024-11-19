const jwt = require("jsonwebtoken");

const {
  verifyUser,
  generateAccessToken,
  registerUser,
} = require("./auth.service");
const refreshTokens = [];

// Controlador para login
async function login(req, res) {
  const { username, password } = req.body;

  // Verifica si el usuario es válido
  console.log("llega a login", username, password);
  const user = await verifyUser(username, password);
  console.log("user::", user);
  if (!user)
    return res
      .status(403)
      .json({ message: "Usuario o contraseña incorrectos" });

  // Genera los tokens de acceso y refresh
  const accessToken = generateAccessToken({ username: user.username  });
 

  res.json({ accessToken });
}

// Controlador para refrescar el token
function refreshToken(req, res) {
  const { token } = req.body;

  if (!token)
    return res.status(401).json({ message: "Token requerido" });
 
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });

    const accessToken = generateAccessToken({ username: user.username });

    console.log("llega a refresh", accessToken);
    res.json({ accessToken });
  });
}

async function register(req, res) {
  const { username, password } = req.body;

  try {
    const newUser = await registerUser(username, password);
    res
      .status(201)
      .json({ message: "Usuario registrado exitosamente", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { login, refreshToken, register };
