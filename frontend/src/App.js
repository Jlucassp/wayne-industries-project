import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';  
import WelcomePage from './pages/WelcomePage';
import ToastProvider from './components/ToastProvider';
import PrivateRoute from './components/PrivateRoute';
import { jwtDecode } from 'jwt-decode';

const App = () => {
  return (
    <ToastProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ToastProvider>
  );
};

// Componente que cuida das rotas e da lógica de navegação
const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          // Token expirado, remove e redireciona para login
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          // Token válido, redirecionar para dashboard
          navigate('/dashboard');
        }
      } catch (error) {
        // Qualquer problema com o token (malformado), redirecionar para login
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  }, [navigate]);

  return (
    <Routes>
      {/* Redirecionar da rota raiz para a página de boas-vindas */}
      <Route path="/" element={<WelcomePage />} />
      {/* Rota para página de login */}
      <Route path="/login" element={<LoginPage />} />
      {/* Rota para página de registro */}
      <Route path="/register" element={<RegistrationPage />} />
      {/* Rota protegida para o dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;