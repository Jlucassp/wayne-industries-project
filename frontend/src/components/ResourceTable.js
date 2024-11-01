import React from 'react';
import '../css/Dashboard.css';

const ResourceTable = ({ resources, onViewDetails, onEdit, onDelete }) => {
  console.log('Resource IDs:', resources.map(resource => resource._id));

  return (
    <div className="resource-table-container">
      <h3>Lista de Recursos</h3>
      <table className="resource-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
            {resources.map((resource, index) => (
                <tr key={resource._id || index}>
                    <td>{resource.name}</td>
                    <td>{resource.type}</td>
                    <td>{resource.quantity}</td>
                    <td>
                        <button className="action-button" onClick={() => onViewDetails(resource)}>Visualizar Detalhes</button>
                        <button className="action-button edit-button" onClick={() => onEdit(resource)}>Editar</button>
                        <button className="action-button delete-button" onClick={() => onDelete(resource)}>Remover</button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTable;