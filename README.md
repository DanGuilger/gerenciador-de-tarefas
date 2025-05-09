# Gerenciador de Tarefas

Um sistema web de **gerenciamento de tarefas** desenvolvido em Node.js utilizando a arquitetura MVC (Model-View-Controller) e integrado a um banco de dados PostgreSQL. Este projeto permite cadastrar usuários, organizar projetos e tarefas, fornecendo uma interface web simples com templates EJS e uma API RESTful para as operações principais. O foco é oferecer uma estrutura de código limpa e modular, com separação de responsabilidades em camadas (dados, lógica de negócio e apresentação).

## Descrição do Sistema

Este gerenciador de tarefas implementa as funcionalidades de cadastro e gerenciamento de usuários, projetos e tarefas. Cada usuário pode se registrar e então criar projetos, nos quais pode adicionar múltiplas tarefas. As tarefas incluem informações como descrição, data de vencimento, horário, prioridade e status de conclusão, permitindo o acompanhamento e organização eficiente do trabalho.

## Estrutura de Pastas e Arquivos

```plaintext
.
├── assets/
│   └── diagrama-relacional.png
├── documentos/
│   └── WAD.md
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── userController.js
│   ├── models/
│   │   └── userModels.js
│   ├── routes/
│   │   ├── frontRoutes.js
│   │   ├── index.js
│   │   └── userRoutes.js
│   ├── scripts/
│   │   ├── init.sql
│   │   └── runSQLScript.js
│   ├── services/
│   │   └── userService.js
│   ├── tests/
│   │   ├── userController.test.js
│   │   ├── userModel.test.js
│   │   ├── userRoutes.test.js
│   │   └── userService.test.js
│   └── views/
│       ├── components/
│       │   └── header.ejs
│       ├── css/
│       │   └── style.css
│       ├── layout/
│       │   └── main.ejs
│       └── pages/
├── .env
├── jest.config.js
├── package-lock.json
├── package.json
├── rest.http
├── runMigration.js
├── server.js
└── README.md
```

## Como Executar o Projeto Localmente

1. Clone o repositório:

```bash
git clone https://github.com/danielguilger/gerenciador-de-tarefas.git
```

2. Acesse a pasta e instale as dependências:

```bash
cd gerenciador-de-tarefas
npm install
```

3. Configure o arquivo `.env` com as variáveis de conexão:

````env
DB_USER="seu_usuario"
DB_HOST="seu_host"
DB_DATABASE="seu_banco"
DB_PASSWORD="sua_senha"
DB_PORT="sua_porta"
DB_SSL="true"
PORT=3000
````

4. Rode o script de criação do banco:

```bash
node src/scripts/runSQLScript.js
```

5. Inicie o servidor:

```bash
npm start
```

6. Acesse em: `http://localhost:3000`

## Modelo Físico do Banco de Dados (SQL)

O modelo físico do banco encontra-se no arquivo [`src/scripts/init.sql`](./src/scripts/init.sql). Ele contém as instruções SQL para criação das tabelas `users`, `projects`, `tasks` e `comments`, com relacionamentos e constraints necessárias.

## Diagrama Relacional

Imagem do diagrama relacional disponível em:

```
assets/diagrama-relacional.png
```

## Tecnologias Utilizadas

* Node.js
* Express.js
* PostgreSQL
* EJS
* Jest
* dotenv

## Testes

Para rodar os testes:

```bash
npm test
```

## Licença

Este projeto está licenciado sob a licença MIT.

## Autor

Daniel Guilger
