const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Obtener el token de los encabezados de la solicitud
    const token = req.header('Authorization')?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ msg: 'No se proporcionó un token, autorización denegada' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guardar la información del usuario en la solicitud
        next(); // Continuar con el siguiente middleware o controlador
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
};

module.exports = authMiddleware;
