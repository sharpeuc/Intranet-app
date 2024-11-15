import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import axios from 'axios';
import './GestionCreditoCreateForm.css';

const GestionCreditoCreateForm = () => {
    const [clientes, setClientes] = useState([]);
    const [clienteId, setClienteId] = useState('');
    const [renta, setRenta] = useState('');
    const [situacionLaboral, setSituacionLaboral] = useState('');
    const [creditoSolicitado, setCreditoSolicitado] = useState('');
    const [advertenciaEndeudamiento, setAdvertenciaEndeudamiento] = useState('');
    const [banco, setBanco] = useState('');
    const [tasaRefinanciamiento, setTasaRefinanciamiento] = useState('');
    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        // Obtener la lista de clientes y setearla en el estado
        const fetchClientes = async () => {
            try {
                const authData = JSON.parse(localStorage.getItem('auth'));
                const token = authData ? authData.token : null;

                if (!token) {
                    console.log("Token no encontrado en localStorage");
                    throw new Error("Token no disponible");
                }

                const response = await axios.get('http://localhost:5000/api/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Filtrar solo usuarios con rol "cliente"
                const clientesFiltrados = response.data.filter(cliente => cliente.role === 'client');
                setClientes(clientesFiltrados);
            } catch (error) {
                console.error('Error al obtener la lista de clientes:', error);
            }
        };

        fetchClientes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authData = JSON.parse(localStorage.getItem('auth'));
            const token = authData ? authData.token : null;

            if (!token) {
                console.log("Token no encontrado en localStorage");
                throw new Error("Token no disponible");
            }

            const requestBody = {
                clienteId,
                renta,
                situacionLaboral,
                creditoSolicitado,
                advertenciaEndeudamiento,
                banco,
                tasaRefinanciamiento,
            };

            await axios.post('http://localhost:5000/api/creditos', requestBody, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Gestión de crédito creada exitosamente");
        } catch (error) {
            console.error("Error al crear gestión de crédito:", error);
            alert("Hubo un problema al crear la gestión de crédito");
        }
    };

    return (
        <div className="credito-create-form">
            <h2>Crear Gestión de Crédito</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Cliente:</label>
                    <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
                        <option value="">Seleccione un cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente._id} value={cliente._id}>{cliente.username}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Renta:</label>
                    <input
                        type="number"
                        value={renta}
                        onChange={(e) => setRenta(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Situación Laboral:</label>
                    <select value={situacionLaboral} onChange={(e) => setSituacionLaboral(e.target.value)} required>
                        <option value="">Seleccione una situación laboral</option>
                        <option value="Empleado(a)">Empleado(a)</option>
                        <option value="Contrato Indefinido">Contrato Indefinido</option>
                        <option value="Contrato Temporal">Contrato Temporal</option>
                        <option value="Trabajador(a) Independiente">Trabajador(a) Independiente</option>
                        <option value="Autónomo(a) / Freelance">Autónomo(a) / Freelance</option>
                        <option value="Empresario(a)">Empresario(a)</option>
                        <option value="Desempleado(a)">Desempleado(a)</option>
                        <option value="Buscando empleo">Buscando empleo</option>
                        <option value="No buscando empleo">No buscando empleo</option>
                        <option value="Estudiante a tiempo completo">Estudiante a tiempo completo</option>
                        <option value="Estudiante a tiempo parcial">Estudiante a tiempo parcial</option>
                        <option value="Jubilado(a)">Jubilado(a)</option>
                        <option value="Ama de casa / Cuidado del hogar">Ama de casa / Cuidado del hogar</option>
                        <option value="Otra situación">Otra situación</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Crédito Solicitado:</label>
                    <input
                        type="number"
                        value={creditoSolicitado}
                        onChange={(e) => setCreditoSolicitado(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Advertencia de Endeudamiento:</label>
                    <input
                        type="text"
                        value={advertenciaEndeudamiento}
                        onChange={(e) => setAdvertenciaEndeudamiento(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Banco:</label>
                    <select value={banco} onChange={(e) => setBanco(e.target.value)} required>
                        <option value="">Seleccione un banco</option>
                        <option value="Bci">Bci</option>
                        <option value="Banco de Chile">Banco de Chile</option>
                        <option value="Banco Estado">Banco Estado</option>
                        <option value="Banco Santander">Banco Santander</option>
                        <option value="Banco Falabella">Banco Falabella</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Tasa de Refinanciamiento:</label>
                    <select value={tasaRefinanciamiento} onChange={(e) => setTasaRefinanciamiento(e.target.value)} required>
                        <option value="">Seleccione una tasa</option>
                        <option value="5">5%</option>
                        <option value="10">10%</option>
                        <option value="15">15%</option>
                        <option value="20">20%</option>
                    </select>
                </div>
                <button type="submit">Crear Gestión de Crédito</button>
            </form>
            <button className="back-button" onClick={() => navigate('/dashboard')}>Volver al Dashboard</button> {/* Botón para regresar al Dashboard */}
        </div>
    );
};

export default GestionCreditoCreateForm;
