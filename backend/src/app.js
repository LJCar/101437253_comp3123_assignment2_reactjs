const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoute');
require('dotenv').config();

const app = express();

(async () => {
    try {
        await connectDB();
    } catch (err) {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    }
})();

app.use(express.json());

// Route Middleware
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));