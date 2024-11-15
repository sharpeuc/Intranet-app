const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Controlador de usuarios
const authMiddleware = require('../middleware/authMiddleware'); // Middleware de autenticación para verificar permisos
const roleMiddleware = require('../middleware/roleMiddleware'); // Middleware para roles

// Ruta para obtener la lista de usuarios (solo accesible para administradores)
router.get('/', authMiddleware, roleMiddleware('admin'), userController.getUsers);

// Ruta para eliminar un usuario por ID (solo accesible para administradores)
router.delete('/:userId', authMiddleware, roleMiddleware('admin'), userController.deleteUser);

// Ruta para actualizar un usuario por ID (solo accesible para administradores)
router.put('/:userId', authMiddleware, roleMiddleware('admin'), userController.updateUser);

module.exports = router;
