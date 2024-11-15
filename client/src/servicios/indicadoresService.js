// client/src/servicios/indicadoresService.js
import axios from 'axios';

export const obtenerIndicadores = async () => {
    try {
        const token = JSON.parse(localStorage.getItem('auth')).token;
        console.log("Enviando token para obtener indicadores:", token); // Verificar token en consola

        const response = await axios.get('http://localhost:5000/api/indicadores', {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Datos de indicadores obtenidos:", response.data); // Verificar datos en consola
        return response.data;
    } catch (error) {
        console.error("Error obteniendo los indicadores:", error);
        throw error;
    }
};
