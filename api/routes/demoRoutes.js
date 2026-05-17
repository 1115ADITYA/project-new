const express = require('express');
const router = express.Router();

// Import the controller
const { submitDemo } = require('../controllers/demoController');

// Define the POST route for submitting a demo request
// The full URL will be POST /api/submit-demo because it's prefixed in server.js
router.post('/submit-demo', submitDemo);

module.exports = router;
