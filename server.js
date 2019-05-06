const express = require('express');
const helmet = require('helmet');

const projectsRouter = require('./router/projectsRouter.js');
const actionsRouter = require('./router/actionsRouter.js');
const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

module.exports = server;
