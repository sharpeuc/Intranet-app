const User = require('../models/User');
const Patrimonio = require('../models/Patrimonio');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuario
const register = async (req, res) => {
    const { username, email, password, role, valorPatrimonio, amortizacion } = req.body;

    // Validaciones iniciales
    if (!username || !email || !password || !role) {
        return res.status(400).json({ msg: 'Faltan campos obligatorios' });
    }

    try {
        // Verificar si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        let userRole = 'client'; // Por defecto, asignar rol de cliente

        // Si el rol es 'admin', verificar autorización del token
        if (role === 'admin') {
            const token = req.header('Authorization')?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ msg: 'No se proporcionó un token, autorización denegada' });
            }

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded.role !== 'admin') {
                    return res.status(403).json({ msg: 'Solo los administradores pueden registrar a otros administradores' });
                }
                userRole = 'admin';
            } catch (error) {
                console.error('Error al verificar token:', error);
                return res.status(401).json({ msg: 'Token no válido' });
            }
        }

        // Crear y guardar el nuevo usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            username,
            email,
            password: hashedPassword,
            role: userRole,
        });

        const savedUser = await user.save();
        console.log('Usuario creado:', savedUser);

        // Si el usuario es cliente, crear el patrimonio asociado
        if (userRole === 'client') {
            if (valorPatrimonio === undefined || amortizacion === undefined) {
                return res.status(400).json({ msg: 'Faltan datos de patrimonio para el cliente' });
            }

            // Validación y conversión de los valores de patrimonio y amortización
            const patrimonioValue = parseFloat(valorPatrimonio);
            const amortizacionValue = parseFloat(amortizacion);

            if (isNaN(patrimonioValue) || isNaN(amortizacionValue)) {
                return res.status(400).json({ msg: 'Los valores de patrimonio y amortización deben ser numéricos' });
            }

            const nuevoPatrimonio = new Patrimonio({
                clienteId: savedUser._id,
                valorPatrimonio: patrimonioValue,
                amortizacion: amortizacionValue,
            });

            await nuevoPatrimonio.save();
            console.log('Patrimonio creado para el cliente:', savedUser._id);
        }

        res.status(201).json({
            msg: 'Usuario registrado correctamente',
            user: savedUser,
        });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Inicio de sesión
const login = async (req, res) => {
    const { email, password } = req.body;

    // Validaciones iniciales
    if (!email || !password) {
        return res.status(400).json({ msg: 'Faltan campos obligatorios' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, role: user.role });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Exportar funciones
module.exports = {
    register,
    login,
};
