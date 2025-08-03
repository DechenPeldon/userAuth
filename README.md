# TaskFlow - Modern Task Management System

A beautiful and intuitive task management system built with Node.js, Express, and EJS. Features a modern UI design with drag-and-drop functionality, real-time updates, and responsive design.

## 🚀 Features

- **Modern UI Design**: Beautiful gradient backgrounds and clean card-based layout
- **Kanban Board**: Visual task management with drag-and-drop functionality
- **Task Categories**: Organize tasks by status (Pending, In Progress, Completed)
- **Priority Levels**: High, Medium, and Low priority with color coding
- **Due Date Tracking**: Set and track task deadlines
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Updates**: Instant task updates without page refresh

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with pg-promise
- **Template Engine**: EJS
- **Authentication**: bcrypt, express-session
- **Styling**: CSS3 with modern gradients and animations
- **Icons**: Font Awesome

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task_management_system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DATABASE_URL=postgresql://username:password@localhost:5432/taskflow
   SESSION_SECRET=your-secret-key-here
   ```

4. **Set up the database**
   - Create a PostgreSQL database named `taskflow`
   - The application will automatically create the required tables on startup

5. **Start the application**
   ```bash
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
task_management_system/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── taskController.js     # Task management logic
│   └── userController.js     # User management logic
├── models/
│   ├── taskModel.js          # Task database operations
│   └── userModel.js          # User database operations
├── routes/
│   ├── authRoutes.js         # Authentication routes
│   ├── taskRoutes.js         # Task management routes
│   └── userRoute.js          # User routes
├── views/
│   ├── dashboard.ejs         # Main dashboard view
│   └── pages/
│       ├── landing.ejs       # Landing page
│       ├── login.ejs         # Login page
│       └── signup.ejs        # Registration page
├── public/
│   ├── css/
│   ├── js/
│   └── img/
├── server.js                 # Main application file
└── package.json
```

## 🎨 UI Design

The application features a modern design inspired by contemporary task management tools:

- **Color Scheme**: Purple-blue gradients (#667eea to #764ba2)
- **Accent Colors**: Teal (#20bf6b) for success states and buttons
- **Typography**: Segoe UI for clean, readable text
- **Layout**: Card-based design with subtle shadows and rounded corners
- **Animations**: Smooth hover effects and transitions

## 🔐 Authentication

The system includes a complete authentication system:

- User registration with email and password
- Secure login with session management
- Password hashing with bcrypt
- Protected routes for authenticated users

## 📊 Task Management

### Task Properties
- **Title**: Required task name
- **Description**: Optional detailed description
- **Status**: Pending, In Progress, or Completed
- **Priority**: High, Medium, or Low
- **Due Date**: Optional deadline
- **Created/Updated**: Automatic timestamps

### Features
- Create, edit, and delete tasks
- Filter tasks by status and priority
- Drag-and-drop between status columns
- Real-time task count statistics
- Responsive design for all devices

## 🚀 Getting Started

1. **Register a new account** at `/signup`
2. **Login** with your credentials at `/login`
3. **Access your dashboard** to start managing tasks
4. **Create your first task** using the "Add New Task" button
5. **Organize tasks** by dragging them between columns

## 🔧 API Endpoints

### Authentication
- `POST /signup` - User registration
- `POST /login` - User login
- `GET /logout` - User logout

### Tasks
- `GET /dashboard` - Main dashboard
- `POST /api/tasks` - Create new task
- `GET /api/tasks` - Get all user tasks
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/status/:status` - Filter by status
- `GET /api/tasks/priority/:priority` - Filter by priority

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Font Awesome for icons
- Modern CSS techniques for beautiful UI
- Express.js community for excellent documentation