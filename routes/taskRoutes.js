const express = require('express');
const router = express.Router();
const {
  createNewTask,
  getUserTasks,
  getTask,
  updateExistingTask,
  deleteExistingTask,
  getTasksByStatusHandler,
  getTasksByPriorityHandler,
  renderDashboard
} = require('../controllers/taskController');

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};

// Dashboard route
router.get('/dashboard', requireAuth, renderDashboard);

// API routes for tasks
router.post('/api/tasks', requireAuth, createNewTask);
router.get('/api/tasks', requireAuth, getUserTasks);
router.get('/api/tasks/:id', requireAuth, getTask);
router.put('/api/tasks/:id', requireAuth, updateExistingTask);
router.delete('/api/tasks/:id', requireAuth, deleteExistingTask);

// Filter routes
router.get('/api/tasks/status/:status', requireAuth, getTasksByStatusHandler);
router.get('/api/tasks/priority/:priority', requireAuth, getTasksByPriorityHandler);

module.exports = router; 