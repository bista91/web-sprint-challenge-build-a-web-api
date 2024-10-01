const Projects = require('./projects-model');

// Middleware to validate project fields
function validateProject(req, res, next) {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: 'Name and description are required' });
  }
  next();
}

// Middleware to check if a project exists by ID
async function checkProjectId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      req.project = project; // Attach project to request object
      next();
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve project' });
  }
}

module.exports = {
  validateProject,
  checkProjectId,
};