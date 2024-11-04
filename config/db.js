// config/db.js
require('dotenv').config();  // Load environment variables
const { Pool } = require('pg');

// Create a new PostgreSQL client using connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Connect to PostgreSQL
pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database.');
});

pool.on('error', (err) => {
  console.error('Error connecting to the PostgreSQL database:', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params), // Allows reusable queries
};
