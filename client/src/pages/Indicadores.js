import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerIndicadores } from '../servicios/indicadoresService';
import './Indicadores.css';

const Indicadores = () => {
    const [indicadores, setIndicadores] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIndicadores = async () => {
            try {
                const data = await obtenerIndicadores(); // Usa el servicio para obtener los datos
                setIndicadores(data); // Guarda los datos de la API en el estado
            } catch (error) {
                console.error("Error al obtener indicadores:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchIndicadores();
    }, []);

    if (loading) return <p>Cargando indicadores...</p>;

    return (
        <div className="indicadores-container">
            <h1 className="indicadores-title">Indicadores</h1>
            <div className="indicadores-content">
                <div className="indicador-item">
                    <span>Valor UF</span>
                    <span>{indicadores?.uf?.valor || 'N/A'} CLP</span>
                </div>
                <div className="indicador-item">
                    <span>Valor Dólar</span>
                    <span>{indicadores?.dolar?.valor || 'N/A'} CLP</span>
                </div>
                <div className="indicador-item">
                    <span>IPC</span>
                    <span>{indicadores?.ipc?.valor || 'N/A'}%</span>
                </div>
                <div className="indicador-item">
                    <span>UTM</span>
                    <span>{indicadores?.utm?.valor || 'N/A'} CLP</span>
                </div>
                <div className="indicador-item">
                    <span>Tasa de Interés</span>
                    <span>{indicadores?.tasa_interes || 'N/A'}%</span>
                </div>
            </div>
            <button className="back-button" onClick={() => navigate('/dashboard')}>
                Volver al Menú
            </button>
        </div>
    );
};

export default Indicadores;
