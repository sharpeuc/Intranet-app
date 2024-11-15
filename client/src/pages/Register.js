import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('client'); // Cliente por defecto
    const [valorPatrimonio, setValorPatrimonio] = useState('');
    const [amortizacion, setAmortizacion] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const requestBody = {
                username,
                email,
                password,
                role,
            };

            // Incluir patrimonio solo si el rol es cliente
            if (role === 'client') {
                requestBody.valorPatrimonio = valorPatrimonio;
                requestBody.amortizacion = amortizacion;
            }

            await axios.post('http://localhost:5000/api/auth/register', requestBody);
            alert('Usuario registrado exitosamente');
            navigate('/dashboard'); // Redirigir al dashboard después del registro
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            alert('Hubo un problema al registrar el usuario.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Registro de Usuario</h2>
                <form onSubmit={handleRegister}>
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
                    <button type="submit">Registrar</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
