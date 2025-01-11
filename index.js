const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const actionsRouter = require('./api/actions/actions-router');  // Correct path to actions-router
const projectsRouter = require('./api/projects/projects-router');  // Correct path to projects-router
const { validateActionFields } = require('./api/actions/actions-middleware');  // Correct path to actions-middleware
const { validateProjectFields } = require('./api/projects/projects-middleware');  // Correct path to projects-middleware

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/actions', actionsRouter);
app.use('/api/projects', projectsRouter);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err); // Log error
  res.status(500).json({ message: 'Something went wrong!' });
});

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 9000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
