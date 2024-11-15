const Patrimonio = require('../models/Patrimonio');
const User = require('../models/User');

// Obtener patrimonios
exports.obtenerPatrimonios = async (req, res) => {
    try {
        const query = req.user.role === 'admin' ? {} : { clienteId: req.user.userId };
        const patrimonios = await Patrimonio.find(query).populate('clienteId', 'username');

        if (!patrimonios || patrimonios.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron patrimonios' });
        }

        res.json({ patrimonios });
    } catch (error) {
        console.error('Error al obtener patrimonios:', error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Crear patrimonio
exports.crearPatrimonio = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'No autorizado para crear patrimonios' });
        }

        const { clienteId, valorPatrimonio, amortizacion } = req.body;

        if (!clienteId || !valorPatrimonio || !amortizacion) {
            return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
        }

        const nuevoPatrimonio = new Patrimonio({ clienteId, valorPatrimonio, amortizacion });
        const patrimonioGuardado = await nuevoPatrimonio.save();

        res.status(201).json({ msg: 'Patrimonio creado con éxito', patrimonio: patrimonioGuardado });
    } catch (error) {
        console.error('Error al crear patrimonio:', error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Actualizar patrimonio
exports.actualizarPatrimonio = async (req, res) => {
    try {
        const { valorPatrimonio, amortizacion } = req.body;
        if (!valorPatrimonio || !amortizacion) {
            return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
        }

        const query = req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, clienteId: req.user.userId };
        const patrimonioActualizado = await Patrimonio.findOneAndUpdate(query, { valorPatrimonio, amortizacion }, { new: true });

        if (!patrimonioActualizado) {
            return res.status(404).json({ msg: 'Patrimonio no encontrado o no autorizado' });
        }

        res.json({ msg: 'Patrimonio actualizado', patrimonio: patrimonioActualizado });
    } catch (error) {
        console.error('Error al actualizar patrimonio:', error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Eliminar patrimonio
exports.eliminarPatrimonio = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'No autorizado para eliminar patrimonios' });
        }

        const patrimonioEliminado = await Patrimonio.findByIdAndDelete(req.params.id);
        if (!patrimonioEliminado) {
            return res.status(404).json({ msg: 'Patrimonio no encontrado' });
        }

        // En lugar de recargar la página o causar una desconexión, se responde con un mensaje exitoso
        res.json({ msg: 'Patrimonio eliminado con éxito', patrimonio: patrimonioEliminado });
    } catch (error) {
        console.error('Error al eliminar patrimonio:', error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};
