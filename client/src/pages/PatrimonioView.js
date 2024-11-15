import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PatrimonioView.css';

const PatrimonioView = () => {
    const [patrimonios, setPatrimonios] = useState([]);
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authData = JSON.parse(localStorage.getItem('auth'));
                const token = authData ? authData.token : null;
                setUserRole(authData.role);

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
                setPatrimonios(response.data.patrimonios);

            } catch (error) {
                console.error("Error obteniendo el patrimonio:", error);
                alert("Hubo un problema al obtener los datos de patrimonio");
            }
        };

        fetchData();
    }, []);

    const handleDeletePatrimonio = async (id) => {
        try {
            const authData = JSON.parse(localStorage.getItem('auth'));
            const token = authData ? authData.token : null;

            if (!token) {
                console.log("Token no encontrado en localStorage");
                throw new Error("Token no disponible");
            }

            await axios.delete(`http://localhost:5000/api/patrimonio/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Patrimonio eliminado correctamente");
            setPatrimonios(patrimonios.filter(patrimonio => patrimonio._id !== id)); // Actualiza el estado local para eliminar el patrimonio
            navigate('/dashboard'); // Navegar al dashboard después de eliminar
        } catch (error) {
            console.error("Error al eliminar patrimonio:", error);
            alert("Hubo un problema al eliminar el patrimonio");
        }
    };

    return (
        <div className="patrimonio-container">
            <h2 className="patrimonio-title">Patrimonio y Amortización</h2>
            {patrimonios.length === 0 ? (
                <p>No hay datos de patrimonio disponibles.</p>
            ) : (
                patrimonios.map((patrimonio, index) => (
                    <div key={index} className="patrimonio-details">
                        <p className="patrimonio-name"><strong>Nombre:</strong> {patrimonio.clienteId?.username || 'N/A'}</p>
                        <p className="patrimonio-value"><strong>Valor del Patrimonio:</strong> ${patrimonio.valorPatrimonio.toLocaleString()}</p>
                        <p className="patrimonio-amortizacion"><strong>Amortización por Arriendos:</strong> ${patrimonio.amortizacion.toLocaleString()}</p>
                        {userRole === 'admin' && (
                            <button className="delete-button" onClick={() => handleDeletePatrimonio(patrimonio._id)}>Eliminar Patrimonio</button>
                        )}
                    </div>
                ))
            )}
            <button className="back-button" onClick={() => navigate('/dashboard')}>
            Volver al Menú
            </button>
        </div>
    );
};

export default PatrimonioView;
