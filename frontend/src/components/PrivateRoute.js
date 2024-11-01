import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // Verifique se há um token no localStorage para identificar o usuário autenticado
    const isAuthenticated = localStorage.getItem('token') !== null;

    // Se não houver um token, redirecione para a página de login
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Se estiver autenticado, renderize o conteúdo solicitado
    return children;
};

export default PrivateRoute;