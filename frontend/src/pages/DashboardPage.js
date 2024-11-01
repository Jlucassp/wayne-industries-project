import React, { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import ResourceTable from '../components/ResourceTable';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';
import logoutIcon from '../assets/quit.png';

// Registrar os componentes necessários do Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

const DashboardPage = () => {
    useAuth(); // Garante que o usuário esteja autenticado antes de renderizar o Dashboard

    const navigate = useNavigate();
    const [resourcesData, setResourcesData] = useState([]);
    const [selectedResource, setSelectedResource] = useState(null);
    const [editingResource, setEditingResource] = useState(null);
    const [newResource, setNewResource] = useState({ name: '', type: '', quantity: '', description: '' });
    const [showAddResourceForm, setShowAddResourceForm] = useState(false);
    const resourceDetailsRef = useRef(null);
    const editingResourceRef = useRef(null);
    const [prevScrollPosition, setPrevScrollPosition] = useState(0);
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    console.error('Token JWT não encontrado no localStorage');
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/resources', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setResourcesData(response.data);
            } catch (error) {
                console.error('Erro ao obter dados dos recursos:', error);
                toast.error('Erro ao obter dados dos recursos.');
            }
        };

        fetchResources();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleViewDetails = (resource) => {
        setPrevScrollPosition(window.scrollY);
        setSelectedResource(resource);
        setActiveSection('details');

        setTimeout(() => {
            if (resourceDetailsRef.current) {
                resourceDetailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    const handleCloseDetails = () => {
        window.scrollTo({ top: prevScrollPosition, behavior: 'smooth' });
        setSelectedResource(null);
        setActiveSection(null);
    };

    const handleEditResource = (resource) => {
        setPrevScrollPosition(window.scrollY);
        setEditingResource(resource);
        setActiveSection('edit');
    };

    setTimeout(() => {
        if (editingResourceRef.current) {
            editingResourceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);

    const handleCloseEdit = () => {
        window.scrollTo({ top: prevScrollPosition, behavior: 'smooth' });
        setEditingResource(null);
        setActiveSection(null);
    };

    const handleDeleteResource = async (resource) => {
        if (window.confirm(`Tem certeza que deseja remover o recurso "${resource.name}"?`)) {
            try {
                const token = localStorage.getItem('token');
                console.log('Deleting resource with id:', resource._id);
                await axios.delete(`http://localhost:5000/api/resources/${resource._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setResourcesData((prevData) => prevData.filter((r) => r._id !== resource._id));
                toast.success('Recurso removido com sucesso!');
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    toast.warn('Acesso negado: você não tem permissão para remover este recurso.');
                } else {
                    console.error('Erro ao remover o recurso:', error);
                    toast.error('Erro ao remover o recurso.');
                }
            }
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingResource((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editingResource._id) return;
        try {
            const token = localStorage.getItem('token');
            console.log('Updating resource with id:', editingResource._id);
            await axios.put(`http://localhost:5000/api/resources/${editingResource._id}`, editingResource, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEditingResource(null);
            setResourcesData((prevData) =>
              prevData.map((resource) =>
                resource._id === editingResource._id ? editingResource : resource
              )
            );
            toast.success('Recurso atualizado com sucesso!');
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.warn('Acesso negado: você não tem permissão para editar este recurso.');
            } else {
                console.error('Erro ao atualizar o recurso:', error);
                toast.error('Erro ao atualizar o recurso.');
            }
        }
    };

    // Função para lidar com a mudança de dados no formulário de novo recurso
    const handleNewResourceChange = (e) => {
        const { name, value } = e.target;
        setNewResource((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Função para adicionar um novo recurso
    const handleAddResource = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/resources', newResource, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Resposta da API ao adicionar recurso:', response.data); // Adicione esta linha
    
            // Obtenha o recurso criado a partir da resposta
            const addedResource = response.data.resource;
    
            // Atualiza a lista de recursos
            setResourcesData((prevData) => {
                const existingResource = prevData.find(r =>
                    r.name === addedResource.name &&
                    r.type === addedResource.type &&
                    r.description === addedResource.description
                );

                if (existingResource) {
                    // Se o recurso já existe, atualiza a quantidade
                    return prevData.map(r =>
                        r._id === existingResource._id
                            ? { ...r, quantity: r.quantity + addedResource.quantity }
                            : r
                    );
                } else {
                    // Se não existe, adiciona o novo recurso
                    return [...prevData, addedResource];
                }
            });
    
            setNewResource({ name: '', type: '', quantity: '', description: '' }); // Limpa o formulário
            toast.success('Recurso adicionado com sucesso!');
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.warn('Acesso negado: você não tem permissão para adicionar um recurso.');
            } else {
                console.error('Erro ao adicionar o recurso:', error);
                toast.error('Erro ao adicionar o recurso.');
            }
        }
    };

    const resourceTypes = resourcesData.reduce((acc, resource) => {
        acc[resource.type] = (acc[resource.type] || 0) + 1;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(resourceTypes),
        datasets: [
            {
                label: 'Quantidade de Recursos',
                data: Object.values(resourceTypes),
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(153, 102, 255, 0.6)'],
            },
        ],
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2 className="dashboard-title">Gestão de Recursos Wayne</h2>
                <img
                    src={logoutIcon}
                    alt="Logout"
                    className="logout-icon"
                    onClick={handleLogout}
                />
            </div>

            <div className="dashboard-content">
                {resourcesData.length > 0 ? (
                    <div className="chart-container">
                        <div className="bar-chart">
                            <Bar data={chartData} />
                        </div>
                        <div className="pie-chart">
                            <Pie data={chartData} />
                        </div>
                    </div>
                ) : (
                    <div className="empty-chart-container">
                        <p className="empty-chart">Nenhum recurso disponível para exibição.<br/><br/>
                            Adicione um item ao inventário clicando no botão abaixo.</p>
                    </div>
                )}

                {/* Botão para adicionar recurso */}
                <div className="add-resource-container">
                    {!showAddResourceForm && (
                        <button 
                            className="add-resource-button" 
                            onClick={() => setShowAddResourceForm(true)}
                        >
                            Adicionar Recurso
                        </button>
                    )}

                    {/* Formulário para adicionar um novo recurso */}
                    {showAddResourceForm && (
                        <form onSubmit={handleAddResource} className="add-resource-form">
                            <h3>ADICIONAR NOVO RECURSO</h3>
                            <div className="inputs-box">
                                <label>Nome:</label>
                                <input type="text" name="name" value={newResource.name} onChange={handleNewResourceChange} required />
                            </div>
                            <div className="inputs-box">
                                <label>Tipo:</label>
                                <input type="text" name="type" value={newResource.type} onChange={handleNewResourceChange} required />
                            </div>
                            <div className="inputs-box">
                                <label>Quantidade:</label>
                                <input type="number" name="quantity" value={newResource.quantity} onChange={handleNewResourceChange} required />
                            </div>
                            <div className="inputs-box">
                                <label>Descrição:</label>
                                <input type="text" name="description" value={newResource.description} onChange={handleNewResourceChange} required />
                            </div>
                            <div className="add-buttons">
                                <button type="submit" className="submit-button">Adicionar Recurso</button>
                                <button type="button" className="cancel-button" onClick={() => setShowAddResourceForm(false)}>Cancelar</button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Gráficos e tabelas */}
                <ResourceTable resources={resourcesData} onViewDetails={handleViewDetails} onEdit={handleEditResource} onDelete={handleDeleteResource} />

                {activeSection === 'details' && selectedResource && (
                    <div ref={resourceDetailsRef} className="resource-details">
                        <h3>Detalhes do Recurso</h3>
                        <p><strong>Nome:</strong> {selectedResource.name}</p>
                        <p><strong>Tipo:</strong> {selectedResource.type}</p>
                        <p><strong>Quantidade:</strong> {selectedResource.quantity}</p>
                        <p><strong>Descrição:</strong> {selectedResource.description}</p>
                        <button onClick={handleCloseDetails}>Fechar Detalhes</button>
                    </div>
                )}

                {activeSection === 'edit' && editingResource && (
                    <div ref={editingResourceRef} className="edit-resource">
                        <h3>Editar Recurso</h3>
                        <form onSubmit={handleEditSubmit}>
                            <div className="editBoxes">
                                <label>Nome:</label>
                                <input type="text" name="name" value={editingResource.name} onChange={handleEditChange} />
                            </div>
                            <div className="editBoxes">
                                <label>Tipo:</label>
                                <input type="text" name="type" value={editingResource.type} onChange={handleEditChange} />
                            </div>
                            <div className="editBoxes">
                                <label>Quantidade:</label>
                                <input type="number" name="quantity" value={editingResource.quantity} onChange={handleEditChange} />
                            </div>
                            <div className="editBoxes">
                                <label>Descrição:</label>
                                <input type="text" name="description" value={editingResource.description} onChange={handleEditChange} />
                            </div>
                            <button type="submit" className="edit-submit-button">Salvar Alterações</button>
                            <button type="button" className="cancel-button" onClick={handleCloseEdit}>Cancelar</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
