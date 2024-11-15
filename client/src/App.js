import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import UserList from './pages/UserList';
import PatrimonioView from './pages/PatrimonioView';
import ServicioCliente from './pages/ServicioCliente';
import Indicadores from './pages/Indicadores';
import GestionCreditoView from './pages/GestionCreditoView';
import GestionCreditoCreateForm from './pages/GestionCreditoCreateForm'; // Importar la vista del formulario de creación de crédito
import ProtectedRoute from './ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/servicio-cliente"
                    element={
                        <ProtectedRoute>
                            <ServicioCliente />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/patrimonio"
                    element={
                        <ProtectedRoute>
                            <PatrimonioView />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/indicadores"
                    element={
                        <ProtectedRoute>
                            <Indicadores />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/bancos"
                    element={
                        <ProtectedRoute>
                            <GestionCreditoView />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/crear-credito"
                    element={
                        <ProtectedRoute adminOnly>
                            <GestionCreditoCreateForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user-management"
                    element={
                        <ProtectedRoute adminOnly>
                            <UserManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user-list"
                    element={
                        <ProtectedRoute adminOnly>
                            <UserList />
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
