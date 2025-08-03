const pgpInit = require('pg-promise')
require('dotenv').config();

const pgp = pgpInit();

const db = pgp({
    host: process.env.DB_HOST || 'localhost',
    port: 5432, //default postgresSQL port
    database: process.env.DB_NAME || 'taskflow',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'password',
    ssl: false // Disable SSL for local development
})

module.exports = db;
