// Importing necessary modules
const express = require('express');
const helmet = require('helmet');
const actionsRouter = require('./api/actions/actions-router');
const projectsRouter = require('./api/projects/projects-router');

// Initialize the Express application
const server = express();

// Middleware
server.use(helmet());  // Basic security middleware
server.use(express.json());  // Middleware to parse JSON request bodies

// Logger middleware to log HTTP requests
function logger(req, res, next) {
  console.log(`${req.method} to ${req.url}`);
  next(); // Pass control to the next middleware or route handler
}
server.use(logger);

// Define the API routes
server.use('/api/actions', actionsRouter);  // Routes for actions
server.use('/api/projects', projectsRouter);  // Routes for projects

// Test route for the root URL
server.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Get the port number from process.env.PORT, falling back to 9000 if undefined
const PORT = process.env.PORT || 9000; 

// Start the server on the defined port
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});