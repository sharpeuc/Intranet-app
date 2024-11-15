const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Asegurarse de que estas funciones existan en `authController.js`
router.post('/register', authController.register);
router.post('/login', authController.login);

// Ruta protegida para usuarios autenticados
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ msg: `Acceso permitido para ${req.user.username}` });
});

// Ruta solo para administradores
router.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
    res.json({ msg: 'Bienvenido, administrador' });
});

module.exports = router;
