const express = require("express");

const router = express.Router();

const { getAllTasks} = require('../controllers/tasksController');

router.get('/', getAllTasks);

module.exports = router;