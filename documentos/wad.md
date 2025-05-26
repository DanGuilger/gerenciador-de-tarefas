# Web Application Document (WAD)

## Introdução

Este documento descreve a estrutura e os principais componentes do projeto **Gerenciador de Tarefas**, desenvolvido como parte da entrega de um sistema web completo utilizando o padrão arquitetural MVC. O projeto permite o gerenciamento de tarefas por usuários, incluindo criação de projetos, cadastro de tarefas e visualização por meio de uma interface web.

A aplicação foi desenvolvida utilizando **Node.js**, **Express.js**, **EJS** e **PostgreSQL**, com testes automatizados escritos em **Jest**. Toda a estrutura foi planejada para garantir manutenibilidade, organização e escalabilidade.

## Arquitetura e Estrutura do Projeto

O sistema implementa o padrão MVC (Model-View-Controller) com uma arquitetura de API REST que permite operações completas de CRUD para todas as entidades do domínio. A estrutura do projeto foi organizada em diretórios específicos para facilitar manutenção e escalabilidade.

O roteamento principal é gerenciado através do arquivo `routes/index.js`, que centraliza todas as rotas da aplicação e serve arquivos estáticos da pasta `public`. As rotas da API seguem o padrão RESTful com prefixo `/api` e são organizadas por recursos: `/api/users`, `/api/projects`, `/api/tasks` e `/api/comments`.

Cada conjunto de rotas é implementado em arquivos separados (`usersRoutes.js`, `projectsRoutes.js`, `tasksRoutes.js`, `commentsRoutes.js`) que definem endpoints específicos para operações CRUD. Os controllers correspondentes processam a lógica de negócio e interagem com a camada de dados PostgreSQL.

## Interface do Usuário

Foi implementada uma interface web completa em Single Page Application (SPA) através do arquivo `index.ejs`. A interface oferece navegação por abas para gerenciar usuários, projetos, tarefas e comentários de forma integrada e intuitiva.

A aplicação frontend consome a API REST através de requisições assíncronas, permitindo operações em tempo real sem necessidade de recarregamento de página. O design utiliza CSS moderno com gradientes, efeitos hover e layout responsivo que se adapta a diferentes tamanhos de tela.

O sistema de navegação permite alternar entre diferentes seções (usuários, projetos, tarefas, comentários) com carregamento dinâmico de dados. Cada seção oferece formulários para criação de novos registros e listagem dos registros existentes com opções de exclusão e, no caso de tarefas, alteração de status.

## Funcionalidades Implementadas

O módulo de usuários permite cadastro com nome completo, email único e senha, além de listagem e exclusão de registros. A validação garante que todos os campos obrigatórios sejam preenchidos antes do envio.

Para projetos, o sistema oferece criação com nome, descrição, status e associação a um usuário criador. Os projetos podem ter status de pendente, ativo ou concluído, facilitando o acompanhamento do progresso.

O gerenciamento de tarefas inclui criação com nome, descrição, prioridade (baixa, normal, alta), associação a projeto e usuário responsável, além de campos opcionais para prazo e horário. As tarefas possuem funcionalidade específica para alteração de status entre pendente e concluído através de endpoints dedicados.

O sistema de comentários permite adicionar feedback e discussões às tarefas, com registro automático da data de criação e associação ao autor do comentário.

## API REST

A API implementa endpoints padronizados para cada recurso seguindo convenções REST. Todos os endpoints aceitam e retornam dados em formato JSON, facilitando integração com diferentes tipos de cliente.

Para usuários, foram implementados endpoints para listar todos os usuários (GET /api/users), criar novo usuário (POST /api/users), obter detalhes específicos (GET /api/users/:id), atualizar dados (PUT /api/users/:id) e remover usuário (DELETE /api/users/:id).

Os projetos seguem estrutura similar com endpoints para operações CRUD básicas, além de um endpoint específico para buscar projetos por criador (GET /api/projects/creator/:creatorId), permitindo filtragem eficiente.

As tarefas possuem endpoints CRUD completos e funcionalidades adicionais como marcação de status (PUT /api/tasks/:id/complete e PUT /api/tasks/:id/incomplete), busca por usuário responsável (GET /api/tasks/user/:userId) e busca por projeto (GET /api/tasks/project/:projectId).

Os comentários implementam operações CRUD básicas e endpoint para buscar comentários de uma tarefa específica (GET /api/comments/task/:taskId), facilitando a exibição contextual de discussões.

## Documentação da API

Foi criada documentação completa da API em formato HTML (`docs.html`) que detalha todos os endpoints disponíveis, métodos HTTP aceitos, estrutura de dados esperada e exemplos práticos de uso com curl. A documentação inclui exemplos de requisições e respostas para facilitar o desenvolvimento e integração.

## Diagrama do Banco de Dados

O diagrama relacional do banco de dados utilizado neste projeto está representado abaixo:

![Diagrama Relacional](../assets/diagrama-relacional.png)

* **users**: usuários cadastrados no sistema
* **projects**: projetos criados pelos usuários
* **tasks**: tarefas vinculadas aos projetos
* **comments**: comentários realizados pelos usuários em tarefas

As entidades estão relacionadas da seguinte forma:

* Um usuário pode criar vários projetos
* Um projeto pode conter várias tarefas
* Cada tarefa pode ter um usuário responsável
* Tarefas podem conter múltiplos comentários feitos por usuários

O modelo físico das tabelas foi implementado no script `src/scripts/init.sql`, contendo as instruções SQL para criação e vinculação das entidades.

## Configuração e Inicialização

O sistema utiliza configuração baseada em variáveis de ambiente através de arquivo `.env` para dados de conexão com PostgreSQL. O script `runSQLScript.js` automatiza a execução do schema inicial do banco de dados, criando todas as tabelas necessárias com suas respectivas relações e constraints.

A aplicação está preparada para deploy em ambiente de produção com configuração SSL para conexão segura com o banco de dados PostgreSQL.

## Autor

Daniel Guilger