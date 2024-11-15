import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GestionCreditoView.css';

const GestionCreditoView = () => {
    const [creditos, setCreditos] = useState([]);
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
                console.log("Realizando solicitud GET a /api/creditos");

                const response = await axios.get('http://localhost:5000/api/creditos', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log("Respuesta recibida del servidor:", response.data);
                setCreditos(response.data.creditos);

            } catch (error) {
                console.error("Error obteniendo la gestion de credito:", error);
                alert("Hubo un problema al obtener los datos de gestion de credito");
            }
        };

        fetchData();
    }, []);

    const handleDeleteCredito = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro que deseas eliminar esta gestión de crédito?");
        if (!confirmDelete) {
            return;
        }

        try {
            const authData = JSON.parse(localStorage.getItem('auth'));
            const token = authData ? authData.token : null;

            if (!token) {
                console.log("Token no encontrado en localStorage");
                throw new Error("Token no disponible");
            }

            await axios.delete(`http://localhost:5000/api/creditos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Gestión de crédito eliminada correctamente");
            // Actualizar la lista de créditos sin recargar la página
            setCreditos(creditos.filter(credito => credito._id !== id));
        } catch (error) {
            console.error("Error al eliminar gestión de crédito:", error);
            alert("Hubo un problema al eliminar la gestión de crédito");
        }
    };

    return (
        <div className="credito-container">
            <h2 className="credito-title">Gestión de Crédito</h2>
            {creditos.length === 0 ? (
                <p>No hay datos de gestión de crédito disponibles.</p>
            ) : (
                creditos.map((credito, index) => (
                    <div key={index} className="credito-details">
                        <p className="credito-name"><strong>Nombre:</strong> {credito.clienteId?.username || 'N/A'}</p>
                        <p className="credito-renta"><strong>Renta:</strong> ${credito.renta?.toLocaleString() || 'N/A'}</p>
                        <p className="credito-situacion"><strong>Situación Laboral:</strong> {credito.situacionLaboral || 'N/A'}</p>
                        <p className="credito-solicitado"><strong>Crédito Solicitado:</strong> ${credito.creditoSolicitado?.toLocaleString() || 'N/A'}</p>
                        <p className="credito-advertencia"><strong>Advertencia de Endeudamiento:</strong> {credito.advertenciaEndeudamiento || 'N/A'}</p>
                        <p className="credito-tasa"><strong>Tasa de Refinanciamiento:</strong> {credito.tasaRefinanciamiento}%</p>
                        {userRole === 'admin' && (
                            <button className="delete-button" onClick={() => handleDeleteCredito(credito._id)}>Eliminar Gestión de Crédito</button>
                        )}
                    </div>
                ))
            )}
            <button className="back-button" onClick={() => navigate('/dashboard')}>
                Volver al Dashboard
            </button>
        </div>
    );
};

export default GestionCreditoView;
