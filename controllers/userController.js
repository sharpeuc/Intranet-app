const User = require('../models/User');
const Patrimonio = require('../models/Patrimonio');

// Función para obtener la lista de usuarios (solo accesible para administradores)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().lean(); // Obtener usuarios en forma de objeto plano para modificar directamente
        const usersWithPatrimonios = await Promise.all(users.map(async (user) => {
            const patrimonio = await Patrimonio.findOne({ clienteId: user._id }).lean();
            return { ...user, patrimonio: patrimonio || { valorPatrimonio: 'N/A', amortizacion: 'N/A' } };
        }));
        res.json(usersWithPatrimonios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Función para eliminar un usuario
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Buscar y eliminar el usuario
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Si el usuario es un cliente, eliminar su patrimonio asociado
        await Patrimonio.deleteOne({ clienteId: userId });
        res.json({ msg: 'Usuario y su patrimonio eliminados correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Función para actualizar un usuario
exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, role, patrimonio } = req.body;

        // Actualizar los datos del usuario
        const updatedUser = await User.findByIdAndUpdate(userId, { username, role }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Si el rol es cliente y se incluye patrimonio, actualizarlo
        if (role === 'client' && patrimonio && patrimonio.valorPatrimonio !== undefined && patrimonio.amortizacion !== undefined) {
            await Patrimonio.findOneAndUpdate(
                { clienteId: userId },
                { ...patrimonio },
                { upsert: true, new: true }
            );
        }

        res.json({ msg: 'Usuario actualizado correctamente', user: updatedUser });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};
