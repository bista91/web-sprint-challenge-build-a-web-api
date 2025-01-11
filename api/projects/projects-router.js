const express = require('express');
const router = express.Router();
const Projects = require('./projects-model.js'); // Assuming the model is defined in this file
const { validateProjectFields } = require('../projects/projects-middleware');

router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get();

    if (Array.isArray(projects) && projects.length >= 0) {
      res.status(200).json(projects);
    } else {
      res.status(500).json({ message: 'Unexpected response format from database' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
});


// [GET] /api/projects/:id - Get a project by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.getById(id);
    if (project) {
      res.status(200).json(project); // Return the project if found
    } else {
      res.status(404).json({ message: 'Project not found' }); // If not found
    }
  } catch (err) {
    console.error('Error in GET /api/projects/:id', err);
    res.status(500).json({ message: 'Error fetching project' });
  }
});

// POST /api/projects
router.post('/', validateProjectFields, (req, res) => {
  const newProject = req.body;
  Projects.insert(newProject)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Failed to create project' });
    });
});


// [PUT] /api/projects/:id - Update a project by id
router.put('/:id', validateProjectFields, async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedProject = await Projects.update(id, { name, description });
    if (updatedProject) {
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating project' });
  }
});
// [DELETE] /api/projects/:id - Delete a project by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Projects.remove(id);
    if (deleted) {
      res.status(204).end(); // No content on successful delete
    } else {
      res.status(404).json({ message: 'Project not found' }); // If project not found
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project' });
  }
});

// [GET] /api/projects/:id/actions - Get actions for a project by id
router.get('/:id/actions', async (req, res) => {
  const { id } = req.params;
  try {
    const projectActions = await Projects.getActions(id);
    if (projectActions.length > 0) {
      res.status(200).json(projectActions); // Return actions if available
    } else {
      res.status(404).json({ message: 'No actions found for this project' }); // If no actions
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching actions for project' });
  }
});

module.exports = router;
