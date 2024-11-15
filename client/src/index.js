import React from 'react';
import ReactDOM from 'react-dom/client'; //importar desde 'react-dom/client'
import App from './App';
import { AuthProvider } from './context/AuthContext'; //importar correctamente

const root = ReactDOM.createRoot(document.getElementById('root')); // Usar createRoot
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);
