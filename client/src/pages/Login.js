import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';
import logo from '../assets/logo.png'; // Importa la imagen del logo

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            const { token, role } = response.data;

            // Verificar si el token y el rol están presentes
            console.log("Token recibido:", token);
            console.log("Rol recibido:", role);

            if (token && role) {
                login(token, role);
                navigate('/dashboard');
            } else {
                console.error("Token o rol faltante en la respuesta");
                alert("Hubo un problema al iniciar sesión");
            }
        } catch (error) {
            console.error("Error de autenticación", error);
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src={logo} alt="Logo" className="login-logo" /> {/* Añadir logo aquí */}
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Ingresar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
