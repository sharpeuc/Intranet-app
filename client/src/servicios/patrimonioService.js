// client/src/servicios/patrimonioService.js
import axios from 'axios';

// Obtener todos los patrimonios (admin) o el del cliente (usuario regular)
export const obtenerPatrimonios = async () => {
    try {
        const authData = JSON.parse(localStorage.getItem('auth'));
        const token = authData ? authData.token : null;

        if (!token) {
            console.log("Token no encontrado en localStorage");
            throw new Error("Token no disponible");
        }

        console.log("Token obtenido:", token);
        console.log("Realizando solicitud GET a /api/patrimonio");

        const response = await axios.get('http://localhost:5000/api/patrimonio', {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Respuesta recibida del servidor:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error obteniendo el patrimonio:", error);
        throw error;
    }
};

// Crear un nuevo patrimonio (solo admin)
export const crearPatrimonio = async (datosPatrimonio) => {
    try {
        const authData = JSON.parse(localStorage.getItem('auth'));
        const token = authData ? authData.token : null;

        if (!token) {
            console.log("Token no encontrado en localStorage");
            throw new Error("Token no disponible");
        }

        const response = await axios.post('http://localhost:5000/api/patrimonio', datosPatrimonio, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Patrimonio creado con éxito:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error creando el patrimonio:", error);
        throw error;
    }
};

// Actualizar un patrimonio existente (admin o cliente según permisos)
export const actualizarPatrimonio = async (id, datosPatrimonio) => {
    try {
        const authData = JSON.parse(localStorage.getItem('auth'));
        const token = authData ? authData.token : null;

        if (!token) {
            console.log("Token no encontrado en localStorage");
            throw new Error("Token no disponible");
        }

        const response = await axios.put(`http://localhost:5000/api/patrimonio/${id}`, datosPatrimonio, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Patrimonio actualizado con éxito:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error actualizando el patrimonio:", error);
        throw error;
    }
};

// Eliminar un patrimonio (solo admin)
export const eliminarPatrimonio = async (id) => {
    try {
        const authData = JSON.parse(localStorage.getItem('auth'));
        const token = authData ? authData.token : null;

        if (!token) {
            console.log("Token no encontrado en localStorage");
            throw new Error("Token no disponible");
        }

        const response = await axios.delete(`http://localhost:5000/api/patrimonio/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Patrimonio eliminado con éxito:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error eliminando el patrimonio:", error);
        throw error;
    }
};
