import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedUsername, setEditedUsername] = useState('');
    const [editedRole, setEditedRole] = useState('client');
    const [editedPatrimonio, setEditedPatrimonio] = useState({ valorPatrimonio: '', amortizacion: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).token : null;
            const response = await axios.get('http://localhost:5000/api/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Usuarios recibidos:", response.data); // Debug para verificar los datos
            setUsers(response.data);
        } catch (error) {
            console.error("Error al cargar usuarios", error);
            alert("Hubo un problema al cargar la lista de usuarios.");
        }
    };

    const handleDeleteUser = async (userId) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).token : null;
            await axios.delete(`http://localhost:5000/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Usuario eliminado correctamente");
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error("Error al eliminar usuario", error);
            alert("Hubo un problema al eliminar el usuario.");
        }
    };

    const handleEditUser = (user) => {
        setEditingUserId(user._id);
        setEditedUsername(user.username);
        setEditedRole(user.role);
        setEditedPatrimonio(user.patrimonio || { valorPatrimonio: '', amortizacion: '' });
    };

    const handleSaveEdit = async () => {
        try {
            const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).token : null;

            const updatedUser = {
                username: editedUsername,
                role: editedRole,
                patrimonio: editedRole === 'client' ? editedPatrimonio : null,
            };

            console.log("Usuario actualizado:", updatedUser); // Debug para verificar el cuerpo de la solicitud

            await axios.put(`http://localhost:5000/api/users/${editingUserId}`, updatedUser, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Usuario actualizado correctamente");
            setUsers(users.map(user =>
                user._id === editingUserId
                    ? {
                          ...user,
                          username: editedUsername,
                          role: editedRole,
                          patrimonio: editedRole === 'client' ? editedPatrimonio : user.patrimonio,
                      }
                    : user
            ));
            setEditingUserId(null);
        } catch (error) {
            console.error("Error al actualizar usuario", error);
            alert("Hubo un problema al actualizar el usuario.");
        }
    };

    return (
        <div className="user-list">
            <button onClick={() => navigate('/dashboard')} className="back-button">
            Volver al Menú
            </button>
            
            <h2>Lista de Usuarios</h2>
            
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Nombre de Usuario</th>
                        <th>Rol</th>
                        <th>Valor Patrimonio</th>
                        <th>Amortización</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                {editingUserId === user._id ? (
                                    <input
                                        type="text"
                                        value={editedUsername}
                                        onChange={(e) => setEditedUsername(e.target.value)}
                                    />
                                ) : (
                                    user.username
                                )}
                            </td>
                            <td>
                                {editingUserId === user._id ? (
                                    <select
                                        value={editedRole}
                                        onChange={(e) => setEditedRole(e.target.value)}
                                    >
                                        <option value="client">Cliente</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                ) : (
                                    user.role
                                )}
                            </td>
                            <td>
                                {editingUserId === user._id && editedRole === 'client' ? (
                                    <input
                                        type="number"
                                        value={editedPatrimonio.valorPatrimonio}
                                        onChange={(e) =>
                                            setEditedPatrimonio((prev) => ({
                                                ...prev,
                                                valorPatrimonio: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    user.patrimonio?.valorPatrimonio || 'N/A'
                                )}
                            </td>
                            <td>
                                {editingUserId === user._id && editedRole === 'client' ? (
                                    <input
                                        type="number"
                                        value={editedPatrimonio.amortizacion}
                                        onChange={(e) =>
                                            setEditedPatrimonio((prev) => ({
                                                ...prev,
                                                amortizacion: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    user.patrimonio?.amortizacion || 'N/A'
                                )}
                            </td>
                            <td>
                                {editingUserId === user._id ? (
                                    <button className="save-button" onClick={handleSaveEdit}>Guardar</button>
                                ) : (
                                    <button className="edit-button" onClick={() => handleEditUser(user)}>Editar</button>
                                )}
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteUser(user._id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
