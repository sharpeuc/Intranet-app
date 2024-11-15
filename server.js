const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // Importa cors

// Configuraciones
dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' })); // Permite solicitudes desde localhost:3000
app.use(express.json());

// Importar y usar rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes')); // Cambiado a '/api/users' para evitar conflictos
app.use('/api/patrimonio', require('./routes/patrimonioRoutes'));
app.use('/api/indicadores', require('./routes/indicadoresRoutes'));
app.use('/api/creditos', require('./routes/creditoRoutes')); // Nueva ruta para créditos

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ msg: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
