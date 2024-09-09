const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Task = require('./models/Task.model');
const CompletedTask = require('./models/CompletedTask.model'); // Ensure this model exists
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // To handle Cross-Origin Resource Sharing

// Root route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401); // If no token, deny access

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // If token invalid, deny access
    req.user = user; // Attach user information to the request object
    next();
  });
};

// Registration Route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Task Route
app.post('/tasks', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = new Task({ title, description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Tasks Route
app.get('/tasks', authenticateToken, async (req, res) => {
    try {
      const allTasks = await Task.find(); // Use find() instead of findAll()
      res.json({ tasks: allTasks }); // Wrap the result in an object for consistency
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
// Delete Task Route
app.delete('/tasks/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Complete Task Route
app.post('/complete-task', authenticateToken, async (req, res) => {
  const { title, description, completionTime } = req.body;
  try {
    // Store completed task in a separate collection or handle accordingly
    const completedTask = new CompletedTask({ title, description, completionTime });
    await completedTask.save();
    res.status(201).json(completedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Completed Tasks Route
app.get('/completed-tasks', authenticateToken, async (req, res) => {
  try {
    const completedTasks = await CompletedTask.find();
    res.json({ tasks: completedTasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB and start the server
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
