const { Client } = require('pg');
require('dotenv').config();

async function setupDatabase() {
    // First, connect to PostgreSQL without specifying a database
    const client = new Client({
        host: process.env.DB_HOST || 'localhost',
        port: 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'password',
        ssl: false
    });

    try {
        console.log('Connecting to PostgreSQL...');
        await client.connect();
        console.log('Connected to PostgreSQL successfully!');

        // Create database if it doesn't exist
        console.log('Creating database...');
        await client.query(`CREATE DATABASE IF NOT EXISTS taskflow`);
        console.log('Database created successfully!');

        // Close the connection
        await client.end();

        // Now connect to the specific database
        const dbClient = new Client({
            host: process.env.DB_HOST || 'localhost',
            port: 5432,
            database: process.env.DB_NAME || 'taskflow',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASS || 'password',
            ssl: false
        });

        await dbClient.connect();
        console.log('Connected to taskflow database!');

        // Create users table
        console.log('Creating users table...');
        await dbClient.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(10) DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Users table created successfully!');

        // Create tasks table
        console.log('Creating tasks table...');
        await dbClient.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                status VARCHAR(50) DEFAULT 'pending',
                priority VARCHAR(20) DEFAULT 'medium',
                due_date DATE,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Tasks table created successfully!');

        await dbClient.end();
        console.log('Database setup completed successfully!');
        console.log('You can now start the application with: npm start');

    } catch (error) {
        console.error('Error setting up database:', error);
        console.log('\nTroubleshooting tips:');
        console.log('1. Make sure PostgreSQL is installed and running');
        console.log('2. Check your database credentials in .env file');
        console.log('3. Make sure the postgres user has permission to create databases');
    }
}

setupDatabase(); 