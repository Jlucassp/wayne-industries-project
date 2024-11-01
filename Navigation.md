# Navegando pelo Frontend da Aplicação

Este guia ajudará você a navegar pelo frontend da aplicação de gerenciamento de recursos. Abaixo estão as principais funcionalidades da aplicação e como utilizá-las.

## Índice

1. [Página de Boas Vindas](#página-de-boas-vindas)
2. [Página de Registro](#página-de-registro)
3. [Página de Login](#página-de-login)
4. [Dashboard de Recursos](#dashboard-de-recursos)
5. [Gerenciamento de Recursos (CRUD)](#gerenciamento-de-recursos-crud)

---

## Página de Boas Vindas

### URL: `/`

A página de boas vindas compõe um background-image e duas opções de instância para os usuários (login e registro).
Clicar em "Login" permite o usuário logar na sua conta e acessar o dashboard de gerenciamento de recursos.
Clicar em "Registro" permite os novos usuários a se cadastrarem na aplicação.

## Página de Registro

### URL: `/register`

A página de registro permite que novos usuários se cadastrem na aplicação. Para acessar essa página:

1. Vá até o caminho `/register` ou clique no botão "Registro" disponível na página inicial (Boas Vindas).
2. Preencha os campos obrigatórios:
  - **Nome de Usuário**: Nome escolhido pelo usuário.
  - **Senha**: Escolha uma senha para acessar o dashboard.
  - **Função**: Escolha a função a ser representada dentro da Wayne Industries ["admin", "gerente", "funcionario"].
3. Clique no botão "Registrar" para criar uma nova conta.

Após o registro bem-sucedido, você será redirecionado para a página de login.

## Página de Login

### URL: `/login`

Depois de registrar-se, você pode fazer login na aplicação pela página de login:

1. Vá até o caminho `/login`.
2. Informe o seu nome de usuário e senha cadastrados.
3. Clique em "Entrar" para acessar o dashboard de recursos.

## Dashboard de Recursos

### URL: `/dashboard`

Após o login, você será levado ao **Dashboard de Recursos**. Nesta página, você pode visualizar, adicionar, editar ou remover recursos disponíveis na aplicação.

### Funcionalidades do Dashboard:

- **Visualizar Recursos**:
  - O dashboard exibe um gráfico com a quantidade de cada tipo de recurso registrado.
  - Abaixo dos gráficos, há uma tabela listando todos os recursos disponíveis.
 
- **Adicionar Recurso**:
  - Clique no botão "Adicionar Recurso" para abrir o formulário de criação de um novo recurso.
  - Preencha os campos obrigatórios: **Nome**, **Tipo**, **Quantidade** e **Descrição**.
  - O campo **Tipo** deve ser preenchido com: [dispositivo, equipamento ou veiculo].
  - Clique em "Adicionar Recurso" para salvar.
 
- **Visualizar Detalhes**:
  - Para visualizar mais detalhes sobre um recurso, clique em "Visualizar Detalhes" ao lado do recurso desejado.
  - Será exibida uma seção contendo as informações completas do recurso.
 
- **Editar Recurso**:
  - Clique no botão "Editar" ao lado do recurso que deseja modificar.
  - Um formulário será exibido onde você pode atualizar o **Nome**, **Tipo**, **Quantidade** e **Descrição** do recurso.
  - Clique em "Salvar Alterações" para aplicar as mudanças.
 
- **Remover Recurso**:
  - Para remover um recurso, clique no botão "Excluir" ao lado do recurso desejado.
  - Você será solicitado a confirmar a exclusão. Clique em "OK" para confirmar.
 
### Gráficos

Na página do dashboard, você também encontrará dois tipos de gráficos que ajudam a visualizar os recursos de forma rápida:

- **Gráfico de Barras**: Mostra a quantidade de cada tipo de recurso registrado.
- **Gráfico de Pizza**: Mostra a proporção dos diferentes tipos de recursos.

Esses gráficos são atualizados automaticamente quando você adiciona, edita ou remove recursos.

## Gerenciamento de Recursos (CRUD)

### Funcionalidades CRUD Explicadas

- **Create (Adicionar Recurso)**: Utilize o botão "Adicionar Recurso" no dashboard para inserir novos recursos no sistema. Preencha os detalhes do recurso e clique em "Adicionar".

- **Read (Visualizar Recursos)**: Todos os recursos são listados na tabela do dashboard. Você pode clicar em "Visualizar Detalhes" para ver mais informações sobre cada recurso.

- **Update (Editar Recurso)**: Para modificar um recurso existente, clique no botão "Editar" ao lado do recurso. Um formulário será exibido permitindo que você atualize as informações e salve as mudanças.

- **Delete (Remover Recurso)**: Clique no botão "Excluir" ao lado do recurso que deseja remover. Após confirmar a ação, o recurso será permanentemente excluído.

## Observações

- Certifique-se de que o backend esteja rodando antes de iniciar o frontend, pois todas as funcionalidades de registro, login e CRUD dependem das requisições feitas à API.
- Qualquer erro ou mensagem relevante será exibido através de notificações no topo da tela, graças à biblioteca `react-toastify`.

---

Espero que este guia torne mais fácil a navegação e utilização da aplicação. Caso tenha dúvidas ou problemas, sinta-se à vontade para entrar em contato.
