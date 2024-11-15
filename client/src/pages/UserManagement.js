import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserManagement.css';

const UserManagement = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('client'); // Predeterminado a 'client'
    const [valorPatrimonio, setValorPatrimonio] = useState(''); // Para almacenar el valor del patrimonio
    const [amortizacion, setAmortizacion] = useState(''); // Para almacenar la amortización
    const navigate = useNavigate();

    // Función para manejar la creación de nuevos usuarios
    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).token : null;

            // Log para comprobar el token
            console.log("Token encontrado:", token);

            if (!token) {
                alert("No se proporcionó un token. Inicie sesión nuevamente.");
                return;
            }

            // Construir el cuerpo de la solicitud
            const requestBody = {
                username,
                email,
                password,
                role,
            };

            // Log para comprobar los valores iniciales del formulario
            console.log("Datos del formulario:", { username, email, password, role });

            // Si el rol es "client", agregar datos de patrimonio
            if (role === 'client') {
                requestBody.valorPatrimonio = valorPatrimonio || 0;
                requestBody.amortizacion = amortizacion || 0;

                // Log para comprobar los valores de patrimonio si el usuario es cliente
                console.log("Valores de patrimonio añadidos:", { valorPatrimonio, amortizacion });
            }

            // Log para comprobar el cuerpo de la solicitud antes de enviarlo
            console.log("Cuerpo de la solicitud:", requestBody);

            // Enviar la solicitud de registro
            const response = await axios.post(
                'http://localhost:5000/api/auth/register',
                requestBody,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Log para comprobar la respuesta del servidor
            console.log("Respuesta del servidor:", response.data);

            alert('Usuario creado correctamente');
            setUsername('');
            setEmail('');
            setPassword('');
            setRole('client');
            setValorPatrimonio('');
            setAmortizacion('');
            navigate('/dashboard');
        } catch (error) {
            console.error("Error al crear usuario", error);
            alert("Hubo un problema al crear el usuario. Asegúrate de tener permisos de administrador.");
        }
    };

    return (
        <div className="user-management">
            <button onClick={() => navigate('/dashboard')} className="back-button">
            Volver al Menú
            </button>

            <h2>Registrar Nuevo Usuario</h2>
            <form onSubmit={handleCreateUser}>
                <input
                    type="text"
                    placeholder="Nombre de Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="client">Cliente</option>
                    <option value="admin">Administrador</option>
                </select>

                {/* Mostrar campos de patrimonio solo si el rol es "Cliente" */}
                {role === 'client' && (
                    <>
                        <input
                            type="number"
                            placeholder="Valor del Patrimonio"
                            value={valorPatrimonio}
                            onChange={(e) => setValorPatrimonio(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Amortización por Arriendos"
                            value={amortizacion}
                            onChange={(e) => setAmortizacion(e.target.value)}
                            required
                        />
                    </>
                )}

                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    );
};

export default UserManagement;
