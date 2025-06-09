-- USERS
CREATE TABLE if NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nome_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(100) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- PROJECTS
CREATE TABLE if NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    status VARCHAR(50) DEFAULT 'pendente',
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    criador_id INT REFERENCES users(id) ON DELETE SET NULL
);

-- TASKS
CREATE TABLE if NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    status VARCHAR(50) DEFAULT 'pendente',
    prioridade VARCHAR(50) DEFAULT 'normal',
    prazo DATE,
    horario TIME,
    projeto_id INT REFERENCES projects(id) ON DELETE CASCADE,
    responsavel_id INT REFERENCES users(id) ON DELETE SET NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- COMMENTS
CREATE TABLE if NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    conteudo TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tarefa_id INT REFERENCES tasks(id) ON DELETE CASCADE,
    autor_id INT REFERENCES users(id) ON DELETE SET NULL
);
