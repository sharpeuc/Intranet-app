import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children, adminOnly }) => {
    const { auth } = useContext(AuthContext);

    // Si no está autenticado, redirige a la página de login
    if (!auth) {
        return <Navigate to="/login" />;
    }

    // Si la ruta es solo para administradores y el usuario no es admin, redirige al dashboard
    if (adminOnly && auth.role !== 'admin') {
        return <Navigate to="/dashboard" />;
    }

    // Si el usuario cumple con los requisitos, muestra el contenido protegido
    return children;
};

export default ProtectedRoute;
