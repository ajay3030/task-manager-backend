const Task = require('../models/Task');

// @desc    Get all tasks for authenticated user
// @route   GET /tasks
const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user._id })
      .sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json({
      tasks
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new task
// @route   POST /tasks
const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Validate input
    if (!title) {
      return res.status(400).json({
        error: 'Task title is required'
      });
    }

    // Create task
    const task = await Task.create({
      title,
      description: description || '',
      userId: req.user._id
    });

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task
// @route   PUT /tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    // Find task and ensure it belongs to the authenticated user
    const task = await Task.findOne({ _id: id, userId: req.user._id });
    
    if (!task) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    // Update task fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) {
      if (!['pending', 'completed'].includes(status)) {
        return res.status(400).json({
          error: 'Status must be either "pending" or "completed"'
        });
      }
      task.status = status;
    }

    // Save updated task
    await task.save();

    res.status(200).json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find and delete task (only if it belongs to the authenticated user)
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });
    
    if (!task) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    res.status(200).json({
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
