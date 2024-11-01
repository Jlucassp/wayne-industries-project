import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/styles.css'

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          username,
          password,
        });
        const token = response.data.token;
        localStorage.setItem('token', token);
        console.log('Login bem-sucedido!');
        // Redireciona o usuário para o dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    };
  
    return (
      <div className="page-container">
        <div className="background-filter"></div>
        <form className="form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            className="input"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="input"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="button">Login</button>
        </form>
      </div>
    );
};
  
export default LoginPage;