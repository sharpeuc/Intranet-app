import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';
import logo from '../assets/logo.png'; // Importar el logo
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importar los estilos del carrusel
import { Carousel } from 'react-responsive-carousel';

// Importar las imágenes del carrusel
import florida from '../assets/florida.jpg';
import ovalle from '../assets/ovalle.jpg';
import independencia from '../assets/independencia.jpg';

const Dashboard = () => {
    const { auth, logout } = useContext(AuthContext); // Añadimos logout al contexto
    const navigate = useNavigate();

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-sidebar">
                <img src={logo} alt="Logo de la Empresa" className="dashboard-logo" /> {/* Agregar el logo en el sidebar */}
                <h2>Intranet</h2>
                <nav>
                    <ul>
                        <li>
                            <Link to="/dashboard">Inicio</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/servicio-cliente">Servicio al Cliente</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/patrimonio">Patrimonio</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/indicadores">Indicadores</Link>
                        </li>

                        {/* Mostrar la opción de "Bancos (Gestión de Crédito)" y "Crear Gestión de Crédito" solo si el rol es admin */}
                        {auth && auth.role === 'admin' && (
                            <>
                                <li>
                                    <Link to="/dashboard/bancos">Bancos (Gestión de Crédito)</Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/crear-credito">Crear Gestión de Crédito</Link>
                                </li>
                                <li>
                                    <Link to="/user-management" className="admin-link">
                                        Administrar Usuarios
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/user-list" className="admin-link">
                                        Lista de Usuarios
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>

                {/* Botón de Cerrar Sesión */}
                <button className="logout-button" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>
            <div className="dashboard-content">
                <img src={logo} alt="Logo de la Empresa" className="dashboard-content-logo" /> {/* Agregar el logo en el contenido principal */}
                <h1>Bienvenido a Activomás Inversiones</h1>
                <h2 className="section-title">Nuestros Proyectos</h2> {/* Texto atractivo para "Nuestros Proyectos" */}
                <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={2000} className="dashboard-carousel">
                    <div>
                        <img src={florida} alt="Florida" className="carousel-image" />
                        <div className="carousel-caption">
                            <h3>SANTIAGO CENTRO</h3>
                            <p>Metro Santa Lucía</p>
                            <p><strong>Desde UF 2.300</strong></p>
                            <p>Cuotas de: <strong>$175.000 mensuales</strong></p>
                        </div>
                    </div>
                    <div>
                        <img src={ovalle} alt="Ovalle" className="carousel-image" />
                        <div className="carousel-caption">
                            <h3>SAN MIGUEL</h3>
                            <p>Metro Departamental</p>
                            <p><strong>Desde UF 2.700</strong></p>
                            <p>Cuotas de: <strong>$200.000 mensuales</strong></p>
                        </div>
                    </div>
                    <div>
                        <img src={independencia} alt="Independencia" className="carousel-image" />
                        <div className="carousel-caption">
                            <h3>PROVIDENCIA</h3>
                            <p>Metro Tobalaba</p>
                            <p><strong>Desde UF 6.000</strong></p>
                            <p>Cuotas de: <strong>$700.000 mensuales</strong></p>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default Dashboard;
