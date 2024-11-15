// backend/controllers/indicadoresController.js
const axios = require('axios');

exports.obtenerIndicadores = async (req, res) => {
    try {
        // Usando la API de Mindicador para obtener indicadores financieros de Chile
        const response = await axios.get('https://mindicador.cl/api'); // URL de la API de Mindicador
        
        const data = response.data; // Ajuste según el formato de respuesta de Mindicador
        console.log("Datos de indicadores obtenidos de la API:", data);

        res.json(data); // Envía los datos al frontend
    } catch (error) {
        console.error("Error al obtener datos de la API de indicadores:", error);
        res.status(500).json({ msg: 'Error al obtener datos de indicadores' });
    }
};
