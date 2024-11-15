// backend/routes/indicadoresRoutes.js
const express = require('express');
const router = express.Router();
const indicadoresController = require('../controllers/indicadoresController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener indicadores financieros en tiempo real
router.get('/', authMiddleware, indicadoresController.obtenerIndicadores);

module.exports = router;
