const express = require("express");

const router = express.Router();

const { getAllTasks, createTask, updateTasks, deleteTasks } = require('../controllers/tasksController');

router.get('/', getAllTasks);

router.post('/', createTask);

router.patch('/:id', updateTasks);

router.delete('/:id', deleteTasks);

module.exports = router;