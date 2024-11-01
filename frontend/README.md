# Projeto Final - Documentação Completa

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
|   └── Procfile            # Configuração para o Heroku
|
└── frontend/               # Código fonte do frontend
    ├── src/                # Código fonte do React
    ├── public/             # Arquivos públicos
    ├── build/              # Versão construída da aplicação
    ├── package.json        # Dependências do frontend
    └── .env                # Variáveis de ambiente para o frontend
```

## Requisitos

Para rodar a aplicação, você precisará dos seguintes softwares instalados:

- Node.js (versão 14 ou superior)
- MongoDB (local ou uma instância do MongoDB Atlas)
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
     MONGO_URI=<SUA_URL_DO_MONGODB>
     PORT=5000
     JWT_SECRET=<SUA_SECRET_KEY>
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

   - Crie um arquivo `.env` na pasta do frontend e adicione as variáveis de ambiente:

     ```env
     REACT_APP_API_URL=http://localhost:5000
     ```

## Executando a Aplicação

1. **Inicie o Backend**

   - Navegue até a pasta do backend e execute o seguinte comando:

     ```bash
     npm start
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

## Deploy

Este projeto está configurado para deploy no Heroku (backend) e Netlify (frontend), mas você pode adaptar para outros provedores conforme sua necessidade.

### Deploy no Heroku (Backend)

1. **Faça login no Heroku**
   ```bash
   heroku login
   ```

2. **Crie um novo app no Heroku**
   ```bash
   heroku create nome-do-seu-app
   ```

3. **Faça push do código para o Heroku**
   ```bash
   git push heroku master
   ```

4. **Configure as variáveis de ambiente no Heroku**
   ```bash
   heroku config:set MONGO_URI=<SUA_URL_DO_MONGODB>
   heroku config:set JWT_SECRET=<SUA_SECRET_KEY>
   ```

### Deploy no Netlify (Frontend)

1. **Construa a aplicação React**
   ```bash
   npm run build
   ```

2. **Arraste e solte a pasta `build/` para o painel do Netlify**

## Contato

Caso tenha alguma dúvida ou problema, sinta-se à vontade para entrar em contato.

