const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function testConnection() {
    try {
        console.log('Testing connection to PostgreSQL...');
        const client = await pool.connect();
        console.log('✅ Connection successful!');

        console.log('Testing if demo_requests table exists...');
        const result = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'demo_requests'
            );
        `);
        
        if (result.rows[0].exists) {
            console.log('✅ Table demo_requests exists!');
        } else {
            console.log('❌ Table demo_requests DOES NOT exist! Creating it now...');
            await client.query(`
                CREATE TABLE demo_requests (
                    id SERIAL PRIMARY KEY,
                    full_name VARCHAR(255) NOT NULL,
                    company_name VARCHAR(255),
                    business_type VARCHAR(255),
                    email VARCHAR(255) NOT NULL,
                    phone VARCHAR(50),
                    service VARCHAR(255),
                    message TEXT,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                );
            `);
            console.log('✅ Table demo_requests created automatically!');
        }

        console.log('Inserting a test record...');
        const insertRes = await client.query(`
            INSERT INTO demo_requests (full_name, company_name, business_type, email, phone, service, message)
            VALUES ('AI Tester', 'Test Corp', 'ecommerce', 'tester@example.com', '1234567890', 'chatbot', 'This is an automated test.')
            RETURNING *;
        `);
        console.log('✅ Test record inserted successfully:', insertRes.rows[0]);
        
        client.release();
        process.exit(0);
    } catch (err) {
        console.error('❌ Connection or Query Error:', err.message);
        // Specifically check if database doesn't exist
        if (err.message.includes('database "demo_db" does not exist')) {
            console.error('\\n\\n--- DATABASE DOES NOT EXIST ---');
            console.error('You need to create the database "demo_db" in pgAdmin 4 first.');
            console.error('Run: CREATE DATABASE demo_db;');
        }
        process.exit(1);
    }
}

testConnection();
