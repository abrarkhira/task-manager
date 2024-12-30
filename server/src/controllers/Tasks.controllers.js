const TaskData = require("../models/Tasks.model");

const createTask = async (req, res, next) => {
    try {
        const { title, description, status, dueDate } = req.body;
        const userId = req.user;
        const task = new TaskData({
            userId,
            title,
            description,
            status,
            dueDate,
        });

        await task.save();
        console.log(task)
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const getAllTasks = async (req, res, next) => {
    try {
        const userId = req.user;
        const tasks = await TaskData.find({ userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const completeTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const task = await TaskData.findByIdAndUpdate(taskId, { status: 'Completed' }, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const updateTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const updatedTask = await TaskData.findByIdAndUpdate(taskId, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const task = await TaskData.findByIdAndDelete(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = {
    createTask,
    getAllTasks,
    completeTask,
    deleteTask,
    updateTask
}