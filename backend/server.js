const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Import routes
const apiRoutes = require('./routes/api');

// Import config
const config = require('./config/config');

// Create Express app
const app = express();

// Enable CORS
app.use(cors());

// Enable JSON body parsing
app.use(bodyParser.json());

// Enable form data body parsing
app.use(bodyParser.urlencoded({ extended: true }));

// Setup logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Use API routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const port = config.port || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});