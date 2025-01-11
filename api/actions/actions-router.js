const express = require('express');
const router = express.Router();
const { validateActionFields } = require('../actions/actions-middleware'); // Ensure correct path

const Actions = require('./actions-model'); // Assuming you have an Actions model

// [GET] /api/actions - Get all actions
router.get('/', async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions); // Return an array of actions
  } catch (err) {
    res.status(500).json({ message: 'Error fetching actions' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const action = await Actions.get(req.params.id); // Fetch using model
    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }
    res.status(200).json(action);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching action', error: err.message });
  }
});



// [POST] /api/actions - Create a new action
router.post('/', validateActionFields, async (req, res) => {
  const newAction = req.body;

  try {
    const createdAction = await Actions.insert(newAction);
    res.status(201).json(createdAction);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to create action',
      error: err.message,
    });
  }
});

router.put('/:id', async (req, res, next) => {
  try {
      const existingAction = await Actions.get(req.params.id); // Check if action exists
      if (!existingAction) {
          return res.status(404).json({ message: 'Action not found' });
      }
      next();
  } catch (err) {
      next(err);
  }
}, validateActionFields, async (req, res) => {
  try {
      const updatedAction = await Actions.update(req.params.id, req.body);
      res.status(200).json(updatedAction);
  } catch (err) {
      res.status(500).json({ message: 'Error updating action' });
  }
});




// [DELETE] /api/actions/:id - Delete an action by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Actions.remove(id);
    if (deleted) {
      res.status(204).end(); // No content on successful delete
    } else {
      res.status(404).json({ message: 'Action not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting action' });
  }
});

module.exports = router;
