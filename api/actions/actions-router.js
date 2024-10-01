const express = require('express');
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model'); // To check project existence
const router = express.Router();

// Middleware to validate action data
function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        return res.status(400).json({ message: "Project ID, description, and notes are required." });
    }
    next();
}

// GET /api/actions
router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get();
        res.json(actions);
    } catch (err) {
        res.status(500).json({ message: "Failed to get actions." });
    }
});

// GET /api/actions/:id
router.get('/:id', async (req, res) => {
    try {
        const action = await Actions.get(req.params.id);
        if (action) {
            res.json(action);
        } else {
            res.status(404).json({ message: "Action not found." });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to get action." });
    }
});

// POST /api/actions
router.post('/', validateAction, async (req, res) => {
    try {
        const projectExists = await Projects.get(req.body.project_id);
        if (!projectExists) {
            return res.status(404).json({ message: "Project not found." });
        }
        const action = await Actions.insert(req.body);
        res.status(201).json(action);
    } catch (err) {
        res.status(500).json({ message: "Failed to create action." });
    }
});

// PUT /api/actions/:id
router.put('/:id', validateAction, async (req, res) => {
    try {
        const action = await Actions.update(req.params.id, req.body);
        if (action) {
            res.json(action);
        } else {
            res.status(404).json({ message: "Action not found." });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to update action." });
    }
});

// DELETE /api/actions/:id
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Actions.remove(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "Action not found." });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to delete action." });
    }
});

module.exports = router;