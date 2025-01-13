const express = require('express');
const router = express.Router();
const Projects = require('./projects-model.js'); // Assuming the model is defined in this file
const { validateProjectFields } = require('../projects/projects-middleware');

// [GET] /api/projects - Get all projects
// Your project routes here
router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
});

// [GET] /api/projects/:id - Get a project by id
router.get('/:id', async (req, res) => {
  try {
    const project = await Projects.get(req.params.id); // Fetch project by ID
    if (!project) {
      return res.status(404).json({ message: 'Project not found' }); // Project not found
    }
    res.status(200).json(project); // Return the project with its actions
  } catch (err) {
    res.status(500).json({ message: 'Error fetching project', error: err.message });
  }
});

// [POST] /api/projects - Create a new project
router.post('/', validateProjectFields, (req, res) => {
  const newProject = req.body;
  Projects.insert(newProject)
    .then(project => {
      res.status(201).json(project); // Return the newly created project
    })
    .catch(error => {
      res.status(500).json({ message: 'Failed to create project', error: error.message });
    });
});

// [PUT] /api/projects/:id - Update a project by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  console.log('Received PUT request for project ID:', id);
  console.log('Request body:', req.body);

  try {
    // Check if the project exists
    const existingProject = await Projects.get(id);
    if (!existingProject) {
      console.log(`Project with ID ${id} not found`);
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if required fields are provided
    if (!name || !description) {
      console.log('Missing required fields: name or description');
      return res.status(400).json({ message: 'Name and description are required' });
    }

    // Update the project if it exists
    const updatedProject = await Projects.update(id, { name, description });
    console.log('Updated project:', updatedProject);

    res.status(200).json(updatedProject);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ message: 'Error updating project' });
  }
});

// [DELETE] /api/projects/:id - Delete a project by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Projects.remove(id); // Delete the project
    if (deleted) {
      res.status(204).end(); // No content on successful delete
    } else {
      res.status(404).json({ message: 'Project not found' }); // Project not found
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project', error: err.message });
  }
});

// [GET] /api/projects/:id/actions - Get actions for a project by id
router.get('/:id/actions', async (req, res) => {
  const { id } = req.params;
  try {
    const projectActions = await Projects.getProjectActions(id); // Get actions for project
    if (projectActions.length > 0) {
      res.status(200).json(projectActions); // Return actions if available
    } else {
      res.status(404).json({ message: 'No actions found for this project' }); // If no actions
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching actions for project', error: err.message });
  }
});

module.exports = router;
