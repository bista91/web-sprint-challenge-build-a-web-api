// api/actions/actions-middleware.js
const Project = require('../projects/projects-model'); // Import the Project model

// Middleware to validate action data
async function validateAction(req, res, next) {
  const { project_id, description, notes, completed } = req.body;

  // Check for missing required fields
  if (project_id === undefined || !description || !notes || completed === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if the provided project_id exists in the projects table
    const project = await Project.get(project_id);
    if (!project) {
      return res.status(404).json({ message: 'Project ID does not exist' });
    }

    // If validation passes, proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
}

module.exports = validateAction;