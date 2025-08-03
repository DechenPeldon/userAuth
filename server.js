const express = require('express');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { createUserTable } = require('./models/userModel');
const { createTaskTable } = require('./models/taskModel');

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretkey',
  resave: false,
  saveUninitialized: true,
}));

//setting up view engine as ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//Route imports
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/', authRoutes);
app.use('/', taskRoutes);

//create your schema
createUserTable();
createTaskTable();

//starting the server
app.listen(PORT, () => {
  console.log(`Task Management System is running on http://localhost:${PORT}`);
});