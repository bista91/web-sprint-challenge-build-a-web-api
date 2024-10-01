const express = require('express');
const helmet = require('helmet');
const actionsRouter = require('./api/actions/actions-router');
const projectsRouter = require('./api/projects/projects-router');

const server = express();
const PORT = process.env.PORT || 9000; // Default to 9000

// Logger middleware
function logger(req, res, next) {
    console.log(`${req.method} to ${req.url}`);
    next();
}

server.use(helmet());
server.use(express.json());

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});