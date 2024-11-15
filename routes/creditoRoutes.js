const express = require('express');
const router = express.Router();
const gestionCreditoController = require('../controllers/GestionCreditoController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware'); // Middleware para verificar el rol

// Obtener datos de gestión de crédito
router.get('/', authMiddleware, gestionCreditoController.obtenerCreditos); // Asegúrate de usar '/' para que la ruta principal sea '/api/creditos'

// Crear una nueva gestión de crédito (solo accesible para administradores)
router.post('/', authMiddleware, roleMiddleware('admin'), gestionCreditoController.crearCredito);

// Eliminar una gestión de crédito (solo accesible para administradores)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), gestionCreditoController.eliminarCredito);

module.exports = router;
