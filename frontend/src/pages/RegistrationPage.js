import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/styles.css'

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('funcionario');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', {
                username,
                password,
                role,
            });
            toast.success('Usuário registrado com sucesso!');
            navigate('/login');
        } catch (error) {
            toast.error('Erro ao registrar. Tente novamente.');
            console.error('Erro ao registrar usuário:', error);
        }
    };

    return (
        <div className="page-container">
            <div className="background-filter"></div>
            <form className="form" onSubmit={handleSubmit}>
                <h2>Registro</h2>
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
                <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="funcionário">Funcionário</option>
                    <option value="gerente">Gerente</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="button">Registrar</button>
            </form>
        </div>
    );
};

export default RegistrationPage;