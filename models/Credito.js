const mongoose = require('mongoose');

const CreditoSchema = new mongoose.Schema({
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    renta: { type: Number, required: true },
    situacionLaboral: { type: String, required: true },
    creditoSolicitado: { type: Number, required: true },
    advertenciaEndeudamiento: { type: String },
    banco: { type: String },
    tasaRefinanciamiento: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Credito', CreditoSchema);
