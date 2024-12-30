const express = require('express');
const { createTask, getAllTasks, completeTask, deleteTask, updateTask } = require('../controllers/Tasks.controllers');
const verifyToken = require('../utils/verifyToken');

const taskRouter = express.Router();

taskRouter
    .post('/', verifyToken, createTask)
    .get('/', verifyToken, getAllTasks)
    .put('/:id', verifyToken, updateTask)
    .patch('/:id', verifyToken, completeTask)
    .delete('/:id', verifyToken, deleteTask)

module.exports = taskRouter;