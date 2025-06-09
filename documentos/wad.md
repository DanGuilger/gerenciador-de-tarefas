# WAD - Web Application Document
## Gerenciador de Tarefas

---

### 1. Visão Geral da Aplicação

O **Gerenciador de Tarefas** é um sistema web completo desenvolvido para gerenciamento de projetos e tarefas com funcionalidades de colaboração. A aplicação permite que usuários criem, organizem e acompanhem o progresso de projetos e suas respectivas tarefas, facilitando o trabalho em equipe através de sistema de comentários e atribuição de responsáveis.

**Objetivo Principal:** Centralizar o gerenciamento de projetos pessoais e corporativos, oferecendo controle sobre status, prioridades, prazos e colaboração entre usuários.

### 2. Funcionalidades Principais

#### 2.1 Autenticação e Usuários
- Sistema de login/cadastro com validação
- Autenticação baseada em sessões
- Controle de acesso a páginas protegidas
- Criptografia de senhas com bcrypt

#### 2.2 Gerenciamento de Projetos
- Criação, visualização, edição e exclusão de projetos
- Controle de status (pendente, em progresso, concluído)
- Associação de projetos aos criadores
- Interface para listagem e detalhamento

#### 2.3 Gerenciamento de Tarefas
- CRUD completo de tarefas vinculadas a projetos
- Sistema de prioridades (baixa, normal, alta)
- Definição de prazos e horários
- Atribuição de responsáveis
- Controle de status individual

#### 2.4 Sistema de Comentários
- Comentários em tarefas para colaboração
- Identificação do autor e timestamp
- Funcionalidade de exclusão

#### 2.5 Dashboard
- Visão geral dos projetos do usuário
- Estatísticas e resumos visuais
- Acesso rápido às principais funcionalidades

### 3. Interface da Aplicação

#### 3.1 Página de Login
![Login](assets/login.png)
*Tela de autenticação com campos para email e senha*

#### 3.2 Landing Page
![Landing](assets/landing.png)
*Página inicial apresentando a aplicação e suas funcionalidades*

#### 3.3 Dashboard Principal
![Dashboard](assets/dashboard.png)
*Painel principal com visão geral dos projetos e estatísticas do usuário*

### 4. Arquitetura Técnica

#### 4.1 Padrão MVC
A aplicação segue rigorosamente o padrão Model-View-Controller:
- **Models:** Representam a estrutura de dados e regras de negócio
- **Views:** Templates EJS para renderização das páginas
- **Controllers:** Processam requisições e coordenam Model e View

#### 4.2 Estrutura de Camadas
```
┌─────────────────┐
│     Views       │ ← Templates EJS
│    (EJS)        │
├─────────────────┤
│   Controllers   │ ← Lógica de controle
├─────────────────┤
│    Services     │ ← Regras de negócio
├─────────────────┤
│  Repositories   │ ← Acesso a dados
├─────────────────┤
│    Database     │ ← PostgreSQL
│  (PostgreSQL)   │
└─────────────────┘
```

#### 4.3 Stack Tecnológica
- **Backend:** Node.js + Express.js
- **Banco de Dados:** PostgreSQL
- **Template Engine:** EJS
- **Autenticação:** express-session + bcrypt
- **Validação:** Joi
- **Outros:** method-override, dotenv, pg

### 5. Modelo de Dados

#### 5.1 Diagrama Relacional
![Diagrama Relacional](assets/diagrama-relacional.png)
*Estrutura do banco de dados com relacionamentos entre entidades*

#### 5.2 Entidades Principais
- **Users:** Armazena dados dos usuários do sistema
- **Projects:** Projetos criados pelos usuários
- **Tasks:** Tarefas vinculadas aos projetos
- **Comments:** Comentários nas tarefas para colaboração

### 6. API e Rotas

#### 6.1 Endpoints de Autenticação
- `GET /login` - Formulário de login
- `POST /login` - Processar autenticação
- `GET /cadastro` - Formulário de registro
- `POST /cadastro` - Criar nova conta
- `GET /logout` - Encerrar sessão

#### 6.2 Endpoints de Projetos
- `GET /projects` - Listar projetos
- `GET /projects/new` - Formulário de criação
- `POST /projects` - Criar projeto
- `GET /projects/:id` - Detalhes do projeto
- `PUT /projects/:id` - Atualizar projeto
- `DELETE /projects/:id` - Excluir projeto

#### 6.3 Endpoints de Tarefas
- `GET /projects/:id/tasks` - Tarefas do projeto
- `GET /tasks/new` - Formulário de criação
- `POST /tasks` - Criar tarefa
- `GET /tasks/:id` - Detalhes da tarefa
- `PUT /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Excluir tarefa

#### 6.4 Endpoints de Comentários
- `GET /tasks/:id/comments` - Comentários da tarefa
- `POST /tasks/:id/comments` - Criar comentário
- `DELETE /comments/:id` - Excluir comentário

### 7. Segurança e Validação

#### 7.1 Medidas de Segurança
- Senhas criptografadas com bcrypt
- Middleware de autenticação em rotas protegidas
- Validação de dados com Joi
- Sanitização de entradas do usuário

#### 7.2 Validações Implementadas
- Formato de email válido
- Senhas com critérios mínimos
- Campos obrigatórios em formulários
- Validação de tipos de dados

### 8. Instalação e Execução

#### 8.1 Pré-requisitos
- Node.js (versão 14+)
- PostgreSQL
- npm ou yarn

#### 8.2 Configuração Rápida
```bash
# 1. Clonar repositório
git clone <repositório>
cd gerenciador-de-tarefas

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.exemple .env

# 4. Configurar banco de dados
createdb gerenciador_tarefas
psql -d gerenciador_tarefas -f scripts/init.sql

# 5. Executar aplicação
npm start
```

### 9. Testes e Qualidade

#### 9.1 Arquivo de Testes REST
O projeto inclui um arquivo `rest.http` completo com:
- Testes de todas as funcionalidades
- Cenários de validação
- Testes de segurança
- Fluxos completos de uso

#### 9.2 Estrutura de Testes
- Testes de autenticação
- Validação de endpoints
- Cenários de erro
- Testes de integração

### 10. Conclusão

O **Gerenciador de Tarefas** representa uma solução completa para gerenciamento de projetos, implementando as melhores práticas de desenvolvimento web com Node.js. A arquitetura MVC bem estruturada, combinada com um banco de dados relacional robusto, oferece uma base sólida para futuras expansões e melhorias.

A aplicação demonstra competência técnica em desenvolvimento full-stack, desde a modelagem de dados até a implementação de interfaces responsivas, passando por aspectos cruciais como segurança e validação de dados.

---

**Projeto Acadêmico** | **Autor:** Daniel Polakiewicz Guilger  
**Tecnologias:** Node.js, Express, PostgreSQL, EJS  
**Padrão Arquitetural:** MVC