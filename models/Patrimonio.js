const mongoose = require('mongoose');

const PatrimonioSchema = new mongoose.Schema({
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    valorPatrimonio: { type: Number, required: true },
    amortizacion: { type: Number, required: true },
    fechaActualizacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patrimonio', PatrimonioSchema);
