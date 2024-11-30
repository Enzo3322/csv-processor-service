const { Pool } = require("pg");

async function connectPostgres() {
  try {
    const pool = new Pool({
      host: "postgres",
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      port: 5432,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      retry: {
        retries: 3,
        factor: 2,
      },
    });

    // Teste de conexão
    await pool.query("SELECT NOW()");
    return pool;
  } catch (error) {
    console.error("Erro de conexão Postgres:", error);
    throw error;
  }
}

module.exports = { connectPostgres };
