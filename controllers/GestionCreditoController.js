const Credito = require('../models/Credito');
const User = require('../models/User');

// Obtener datos de gestión de crédito
exports.obtenerCreditos = async (req, res) => {
    try {
        const query = req.user.role === 'admin' ? {} : { clienteId: req.user.userId };
        const creditos = await Credito.find(query).populate('clienteId', 'username');

        // En lugar de devolver un error si no se encuentran datos, devolvemos un arreglo vacío
        res.json({ creditos });
    } catch (error) {
        console.error('Error al obtener gestión de crédito:', error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Crear una nueva gestión de crédito (solo administradores)
exports.crearCredito = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'No autorizado para crear gestiones de crédito' });
        }

        const { clienteId, renta, situacionLaboral, creditoSolicitado, advertenciaEndeudamiento, banco, tasaRefinanciamiento } = req.body;

        // Validación de campos requeridos
        if (!clienteId || !renta || !situacionLaboral || !creditoSolicitado) {
            return res.status(400).json({ msg: 'Todos los campos obligatorios deben ser completados' });
        }

        const nuevoCredito = new Credito({
            clienteId,
            renta,
            situacionLaboral,
            creditoSolicitado,
            advertenciaEndeudamiento,
            banco,
            tasaRefinanciamiento,
        });

        const creditoGuardado = await nuevoCredito.save();
        res.status(201).json({ msg: 'Gestión de crédito creada con éxito', credito: creditoGuardado });
    } catch (error) {
        console.error('Error al crear la gestión de crédito:', error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Eliminar una gestión de crédito (solo administradores)
exports.eliminarCredito = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'No autorizado para eliminar gestiones de crédito' });
        }

        const { id } = req.params;
        const creditoEliminado = await Credito.findByIdAndDelete(id);

        if (!creditoEliminado) {
            return res.status(404).json({ msg: 'Gestión de crédito no encontrada' });
        }

        res.json({ msg: 'Gestión de crédito eliminada con éxito', credito: creditoEliminado });
    } catch (error) {
        console.error('Error al eliminar la gestión de crédito:', error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};
