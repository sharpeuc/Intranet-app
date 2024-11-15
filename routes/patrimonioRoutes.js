const express = require('express');
const router = express.Router();
const patrimonioController = require('../controllers/patrimonioController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas de patrimonio
router.get('/', authMiddleware, patrimonioController.obtenerPatrimonios); // Todos o solo el del cliente
router.post('/', authMiddleware, patrimonioController.crearPatrimonio); // Solo admin
router.put('/:id', authMiddleware, patrimonioController.actualizarPatrimonio); // Admin o cliente según propiedad
router.delete('/:id', authMiddleware, patrimonioController.eliminarPatrimonio); // Solo admin

module.exports = router;
