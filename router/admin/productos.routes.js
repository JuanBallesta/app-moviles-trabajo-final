const express = require('express');
const { authenticateToken } = require('../../auth/auth.middleware');  // Importa el middleware de autenticación
const { getAll } = require('../../controllers/admin/productos.controller');  // Importa el controlador de productos

const router = express.Router();

router.get('/getAll', authenticateToken, getAll);
 

module.exports = router;
