# Projeto Final - Documentação Completa

(PARA ENTENDER A NAVEGAR NA APLICAÇÃO, CHECAR O Navigation.md)

Este projeto é uma aplicação web para gerenciamento de recursos, desenvolvida com React no frontend e Node.js com Express no backend.

## Estrutura do Projeto

```text
Projeto Final/
|
├── backend/                # Código fonte do backend
|   ├── models/             # Modelos do MongoDB
|   ├── routes/             # Rotas da API
|   ├── middleware/         # Middleware para autenticação
|   ├── .env                # Variáveis de ambiente para o backend
|   ├── app.js              # Arquivo principal do backend
|   ├── package.json        # Dependências do backend
|
└── frontend/               # Código fonte do frontend
    ├── src/                # Código fonte do React
    ├── public/             # Arquivos públicos
    ├── package.json        # Dependências do frontend
```

## Pré-Requisitos

Para rodar a aplicação, você precisará dos seguintes softwares instalados:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [MongoDB](https://www.mongodb.com/) (ou usar o [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Git

## Instruções de Configuração

1. **Clone o repositório**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd Projeto\ Final
   ```

2. **Configuração do Backend**

   - Navegue até a pasta do backend:

     ```bash
     cd backend
     ```

   - Instale as dependências do backend:

     ```bash
     npm install
     ```

   - Crie um arquivo `.env` na pasta do backend e adicione as variáveis de ambiente:

     ```env
     MONGO_URI=mongodb+srv://jlucassp:wRJtm2Jl0pf5E1EY@wayneindustries.ltmyu2r.mongodb.net/
     PORT=5000
     JWT_SECRET=1c046a35cdfb797c4fb02a09de28f1686d0c1ea681347c4ea512787b8967bccd
     ```

3. **Configuração do Frontend**

   - Navegue até a pasta do frontend:

     ```bash
     cd ../frontend
     ```

   - Instale as dependências do frontend:

     ```bash
     npm install
     ```

## Executando a Aplicação

1. **Inicie o Backend**

   - Navegue até a pasta do backend e execute o seguinte comando:

     ```bash
     node app.js
     ```

   Isso iniciará o servidor backend na porta especificada no arquivo `.env` (geralmente `http://localhost:5000`).

2. **Inicie o Frontend**

   - Em uma nova janela do terminal, navegue até a pasta do frontend e execute o seguinte comando:

     ```bash
     npm start
     ```

   Isso iniciará o servidor do frontend (React) na porta `3000` (geralmente `http://localhost:3000`).

## Observações

- Certifique-se de que o backend esteja rodando antes de iniciar o frontend, pois o frontend faz requisições à API do backend.
- Altere as variáveis de ambiente conforme necessário, especialmente se você estiver usando um banco de dados remoto.

## Dependências

- **Backend**:
  - Express
  - Mongoose
  - dotenv
  - jsonwebtoken

- **Frontend**:
  - React
  - axios
  - react-router-dom
  - react-toastify
