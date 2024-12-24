// api/projects/projects-router.js
const express = require('express');
const projectsModel = require('../projects/projects-model'); // Assuming you have this model
const router = express.Router();

// [GET] /api/projects - returns an array of projects
router.get('/', (req, res) => {
  projectsModel.get() // Assuming get() fetches all projects
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve projects', error: err });
    });
});

// [GET] /api/projects/:id - returns a specific project by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  projectsModel.get(id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: `Project with ID ${id} not found` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to retrieve project', error: err });
    });
});

// [POST] /api/projects - creates a new project
router.post('/', (req, res) => {
  const project = req.body;
  if (!project.name || !project.description) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  projectsModel.insert(project)
    .then(newProject => {
      res.status(201).json(newProject);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create project', error: err });
    });
});

// Export the router so it can be used in server.js
module.exports = router;
