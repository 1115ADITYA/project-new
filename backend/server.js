// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Import routes
const demoRoutes = require('./routes/demoRoutes');

// Middleware setup
// Enable CORS for all routes (allows frontend to communicate with backend)
app.use(cors());

// Parse incoming JSON requests (allows reading req.body)
app.use(express.json());

// Parse incoming URL-encoded data (optional, but good for form submissions)
app.use(express.urlencoded({ extended: true }));

// Register routes
// All routes in demoRoutes will be prefixed with /api
app.use('/api', demoRoutes);

// Basic health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Server is running' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
