const roleMiddleware = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next(); // Si el rol coincide, permitir acceso
        } else {
            res.status(403).json({ msg: 'Acceso denegado' });
        }
    };
};

module.exports = roleMiddleware;
