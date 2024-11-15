const mongoose = require('mongoose');

// Definir el esquema de usuario
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'client'],
        default: 'client', // El valor predeterminado será 'client' (cliente)
    },
}, {
    timestamps: true,
    versionKey: false // Esto elimina el campo __v
});

module.exports = mongoose.model('User', UserSchema);
