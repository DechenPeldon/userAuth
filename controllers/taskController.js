const { 
  createTask, 
  getAllTasks, 
  getTaskById, 
  updateTask, 
  deleteTask,
  getTasksByStatus,
  getTasksByPriority
} = require('../models/taskModel');

// Create a new task
const createNewTask = async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;
    const user_id = req.session.userId;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const taskData = {
      title,
      description: description || '',
      status: status || 'pending',
      priority: priority || 'medium',
      due_date: due_date || null,
      user_id
    };

    const newTask = await createTask(taskData);
    res.status(201).json({ success: true, task: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Get all tasks for a user
const getUserTasks = async (req, res) => {
  try {
    const user_id = req.session.userId;
    const tasks = await getAllTasks(user_id);
    res.json({ success: true, tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Get a specific task
const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.session.userId;
    
    const task = await getTaskById(id, user_id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ success: true, task });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

// Update a task
const updateExistingTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, due_date } = req.body;
    const user_id = req.session.userId;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const taskData = {
      title,
      description: description || '',
      status: status || 'pending',
      priority: priority || 'medium',
      due_date: due_date || null
    };

    const updatedTask = await updateTask(id, taskData, user_id);
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ success: true, task: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a task
const deleteExistingTask = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.session.userId;

    const deleted = await deleteTask(id, user_id);
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

// Get tasks by status
const getTasksByStatusHandler = async (req, res) => {
  try {
    const { status } = req.params;
    const user_id = req.session.userId;
    
    const tasks = await getTasksByStatus(user_id, status);
    res.json({ success: true, tasks });
  } catch (error) {
    console.error('Error fetching tasks by status:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Get tasks by priority
const getTasksByPriorityHandler = async (req, res) => {
  try {
    const { priority } = req.params;
    const user_id = req.session.userId;
    
    const tasks = await getTasksByPriority(user_id, priority);
    res.json({ success: true, tasks });
  } catch (error) {
    console.error('Error fetching tasks by priority:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Render dashboard with tasks
const renderDashboard = async (req, res) => {
  try {
    const user_id = req.session.userId;
    const tasks = await getAllTasks(user_id);
    
    // Group tasks by status
    const pendingTasks = tasks.filter(task => task.status === 'pending');
    const inProgressTasks = tasks.filter(task => task.status === 'in_progress');
    const completedTasks = tasks.filter(task => task.status === 'completed');
    
    res.render('dashboard', {
      user: req.session.user,
      tasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
      message: req.query.message
    });
  } catch (error) {
    console.error('Error rendering dashboard:', error);
    res.status(500).render('error', { error: 'Failed to load dashboard' });
  }
};

module.exports = {
  createNewTask,
  getUserTasks,
  getTask,
  updateExistingTask,
  deleteExistingTask,
  getTasksByStatusHandler,
  getTasksByPriorityHandler,
  renderDashboard
}; 