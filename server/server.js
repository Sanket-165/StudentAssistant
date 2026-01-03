const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ai', aiRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('AI Student Assistant API is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});