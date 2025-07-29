const express = require('express');
const path = require('path');
const configRoutes = require('./routes');

const app = express();

// Serve static files from public directory
app.use(express.static('public'));

// Configure routes
configRoutes(app);

// Start server
app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});