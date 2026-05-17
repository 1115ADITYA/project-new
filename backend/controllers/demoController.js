const pool = require('../config/db');

// Controller function to handle submitting a demo request
const submitDemo = async (req, res) => {
    try {
        // Extract data from the request body
        const { fullName, companyName, businessType, email, phone, service, message } = req.body;

        // Basic validation
        if (!fullName || !email) {
            return res.status(400).json({ 
                success: false, 
                message: 'Full Name and Email are required fields.' 
            });
        }

        // SQL query to insert data into the demo_requests table
        const insertQuery = `
            INSERT INTO demo_requests (full_name, company_name, business_type, email, phone, service, message)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;

        // Values to be inserted (matches the $1, $2, etc. placeholders)
        const values = [fullName, companyName, businessType, email, phone, service, message];

        // Execute the query
        const result = await pool.query(insertQuery, values);

        // Return a success response with the newly created record
        res.status(201).json({
            success: true,
            message: 'Demo request submitted successfully!',
            data: result.rows[0]
        });

    } catch (error) {
        // Log the error for debugging
        console.error('Error in submitDemo:', error);

        // Return an error response
        res.status(500).json({
            success: false,
            message: 'An internal server error occurred while submitting the request.',
            error: error.message
        });
    }
};

module.exports = {
    submitDemo
};
