const express = require('express');
const server = express();
require('dotenv').config();
const mongoose = require('mongoose');
const LoginSignup = require('./Routes/LoginSignup');
const admin = require('./Routes/admin');
const authMiddleware = require('./Middleware/auth');
const path = require('path');
const cors = require('cors');

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Database Connected');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

main();

// Middleware
server.use(cors({ origin: '*' }));
server.use(express.json());

// Serve static files from the public directory
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));

// API routes
server.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Authenticated route
server.get('/api/dashboard', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Welcome to the Admin panel' });
});

// Import routes
server.use('/api', LoginSignup);
server.use('/api', admin);

// Serve frontend build (for example, React build)
server.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// server.listen(process.env.PORT_NUMBER, () => {
//   console.log('Server Started');
// });
// Export server for Vercel
module.exports = server;
