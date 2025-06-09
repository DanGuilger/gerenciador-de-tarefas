const { Pool } = require('pg');
require('dotenv').config();

class Database {
    constructor() {
        this.pool = new Pool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
            ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false
        });

        this.pool.on('error', (err) => {
            console.error('Erro inesperado no pool do banco:', err);
        });
    }

    async query(text, params) {
        try {
            const result = await this.pool.query(text, params);
            return result;
        } catch (error) {
            console.error('Erro na query:', error);
            throw error;
        }
    }

    async testConnection() {
        try {
            const result = await this.query('SELECT NOW()');
            console.log('Conexão com Supabase estabelecida:', result.rows[0]);
            return true;
        } catch (error) {
            console.error('Erro ao conectar com Supabase:', error);
            return false;
        }
    }
}

module.exports = new Database();