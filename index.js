// index.js

// Importing necessary modules
const express = require('express');
const helmet = require('helmet');
const projectsRouter = require('./api/projects/projects-router');
const actionsRouter = require('./api/actions/actions-router');



// Initialize the Express application
const server = express();

// Use Helmet for basic security
server.use(helmet());

// Middleware to parse JSON request bodies
server.use(express.json());

// Use the routers for projects and actions
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

// Get the port number from process.env.PORT, fallback to 9000 if undefined
const PORT = process.env.PORT || 9000;  // This ensures it uses process.env.PORT or 9000 if undefined

// Start the server on the defined port
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
