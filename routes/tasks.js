const express = require('express');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// @route   GET /tasks
router.get('/', getTasks);

// @route   POST /tasks
router.post('/', createTask);

// @route   PUT /tasks/:id
router.put('/:id', updateTask);

// @route   DELETE /tasks/:id
router.delete('/:id', deleteTask);

module.exports = router;
