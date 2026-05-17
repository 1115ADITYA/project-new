# Demo Request - Database Setup Guide

This guide explains how to set up the PostgreSQL database specifically for handling the **Demo Request** form submissions on your website.

## Prerequisites
1. You must have **PostgreSQL** installed on your computer.
2. You need a database management tool like **pgAdmin**, **DBeaver**, or you can use the command line (`psql`).

---

## Step 1: Create the Database

First, you need to create a database to store the demo requests. 
Open your PostgreSQL tool and run the following SQL command:

```sql
CREATE DATABASE demo_db;
```

---

## Step 2: Create the `demo_requests` Table

Once your `demo_db` database is created, make sure you are connected to it. Then, run the following SQL query to create the table that will store all the form fields from the Demo Request section:

```sql
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
```

*(Note: You can also find this exact query in the `database.sql` file located in this folder).*

---

## Step 3: Configure Environment Variables

For the backend server to connect to this new database, you need to provide your PostgreSQL credentials.

1. In the `backend` folder, duplicate the `.env.example` file.
2. Rename the duplicated file to exactly `.env`.
3. Open `.env` and fill in your actual database details:

```env
PORT=5000

# Replace these with your actual PostgreSQL credentials
DB_USER=postgres
DB_HOST=localhost
DB_NAME=demo_db
DB_PASSWORD=your_super_secret_password
DB_PORT=5432
```
*Make sure `DB_PASSWORD` matches the password you set when installing PostgreSQL.*

---

## Step 4: Start the Server

With the database created and the `.env` file configured, you are ready to receive demo requests! 

Open your terminal in the `backend` folder and run:
```bash
npm run dev
```

If everything is set up correctly, you will see:
```
Successfully connected to the PostgreSQL database.
Server is running on http://localhost:5000
```
