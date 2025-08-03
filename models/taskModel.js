const db = require('../config/db');

const createTaskTable = async () => {
  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        priority VARCHAR(20) DEFAULT 'medium',
        due_date DATE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Task table created successfully');
  } catch (error) {
    console.error('Error creating task table:', error);
  }
};

const createTask = async (taskData) => {
  try {
    const { title, description, status, priority, due_date, user_id } = taskData;
    const result = await db.one(`
      INSERT INTO tasks (title, description, status, priority, due_date, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [title, description, status, priority, due_date, user_id]);
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllTasks = async (userId) => {
  try {
    const tasks = await db.any(`
      SELECT * FROM tasks 
      WHERE user_id = $1 
      ORDER BY created_at DESC
    `, [userId]);
    return tasks;
  } catch (error) {
    throw error;
  }
};

const getTaskById = async (taskId, userId) => {
  try {
    const task = await db.oneOrNone(`
      SELECT * FROM tasks 
      WHERE id = $1 AND user_id = $2
    `, [taskId, userId]);
    return task;
  } catch (error) {
    throw error;
  }
};

const updateTask = async (taskId, taskData, userId) => {
  try {
    const { title, description, status, priority, due_date } = taskData;
    const result = await db.one(`
      UPDATE tasks 
      SET title = $1, description = $2, status = $3, priority = $4, due_date = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6 AND user_id = $7
      RETURNING *
    `, [title, description, status, priority, due_date, taskId, userId]);
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (taskId, userId) => {
  try {
    const result = await db.result(`
      DELETE FROM tasks 
      WHERE id = $1 AND user_id = $2
    `, [taskId, userId]);
    return result.rowCount > 0;
  } catch (error) {
    throw error;
  }
};

const getTasksByStatus = async (userId, status) => {
  try {
    const tasks = await db.any(`
      SELECT * FROM tasks 
      WHERE user_id = $1 AND status = $2
      ORDER BY created_at DESC
    `, [userId, status]);
    return tasks;
  } catch (error) {
    throw error;
  }
};

const getTasksByPriority = async (userId, priority) => {
  try {
    const tasks = await db.any(`
      SELECT * FROM tasks 
      WHERE user_id = $1 AND priority = $2
      ORDER BY created_at DESC
    `, [userId, priority]);
    return tasks;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTaskTable,
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByStatus,
  getTasksByPriority
}; 