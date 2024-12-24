const express = require('express');
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');
const router = express.Router();

// GET all actions
router.get('/', (req, res) => {
  Actions.get()
    .then(actions => res.json(actions))
    .catch(err => res.status(500).json({ message: 'Failed to get actions' }));
});

// GET action by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Actions.get(id)
    .then(action => {
      if (action) {
        res.json(action);
      } else {
        res.status(404).json({ message: 'Action not found' });
      }
    })
    .catch(err => res.status(500).json({ message: 'Failed to get action' }));
});

// POST a new action
router.post('/', (req, res) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  Projects.get(project_id)
    .then(project => {
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      Actions.insert({ project_id, description, notes })
        .then(action => res.status(201).json(action))
        .catch(err => res.status(500).json({ message: 'Failed to create action' }));
    })
    .catch(err => res.status(500).json({ message: 'Failed to validate project' }));
});

// PUT update action
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { description, notes } = req.body;

  if (!description || !notes) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  Actions.update(id, { description, notes })
    .then(updatedAction => {
      if (updatedAction) {
        res.json(updatedAction);
      } else {
        res.status(404).json({ message: 'Action not found' });
      }
    })
    .catch(err => res.status(500).json({ message: 'Failed to update action' }));
});

// DELETE action
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Actions.remove(id)
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Action not found' });
      }
    })
    .catch(err => res.status(500).json({ message: 'Failed to delete action' }));
});

module.exports = router;
