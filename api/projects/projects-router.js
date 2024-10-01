const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();

// Middleware to validate project data
function validateProject(req, res, next) {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required." });
    }
    next();
}

// GET /api/projects
router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: "Failed to get projects." });
    }
});

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
    try {
        const project = await Projects.get(req.params.id);
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: "Project not found." });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to get project." });
    }
});

// POST /api/projects
router.post('/', validateProject, async (req, res) => {
    try {
        const project = await Projects.insert(req.body);
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ message: "Failed to create project." });
    }
});

// PUT /api/projects/:id
router.put('/:id', validateProject, async (req, res) => {
    try {
        const project = await Projects.update(req.params.id, req.body);
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: "Project not found." });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to update project." });
    }
});

// DELETE /api/projects/:id
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Projects.remove(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "Project not found." });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to delete project." });
    }
});

// GET /api/projects/:id/actions
router.get('/:id/actions', async (req, res) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id);
        res.json(actions);
    } catch (err) {
        res.status(500).json({ message: "Failed to get project actions." });
    }
});

module.exports = router;