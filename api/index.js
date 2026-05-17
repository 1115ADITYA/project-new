const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const demoRoutes = require('../backend/routes/demoRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vercel routes all /api to this file based on vercel.json rewrites
app.use('/api', demoRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Vercel Serverless API is running 24/7!' });
});

// For Vercel Serverless Functions, we export the app instead of using app.listen()
module.exports = app;
