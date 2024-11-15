import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicioCliente.css';

const ServicioCliente = () => {
    const navigate = useNavigate();

    return (
        <div className="servicio-cliente-container">
            <h1 className="servicio-cliente-title">Servicio al Cliente</h1>
            <div className="servicio-cliente-content">
                <div className="servicio-item">
                    <h3>Plan de Pago</h3>
                    <p>Información sobre los planes de pago disponibles para el cliente, incluyendo métodos y opciones de financiamiento.</p>
                </div>
                <div className="servicio-item">
                    <h3>Avance de Proyectos</h3>
                    <p>Monitoreo en tiempo real del avance de los proyectos relacionados con la inversión del cliente.</p>
                </div>
                <div className="servicio-item">
                    <h3>Safebox</h3>
                    <p>Acceso a documentos importantes como planos, escritura, promesa, brochure, y acuerdos.</p>
                </div>
                <div className="servicio-item">
                    <h3>Escenario de Inversión</h3>
                    <p>Visualización del escenario actual y futuro de la inversión realizada, incluyendo previsiones.</p>
                </div>
                <div className="servicio-item">
                    <h3>Solicitudes</h3>
                    <p>Envío de consultas y solicitudes directamente a la bandeja de entrada del servicio al cliente para seguimiento.</p>
                </div>
            </div>
            <button className="back-button" onClick={() => navigate('/dashboard')}>
            Volver al Menú
            </button>
        </div>
    );
};

export default ServicioCliente;
