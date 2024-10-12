const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensures unique email addresses
  },
  contact: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
});


const User = mongoose.model('adminUser', userSchema);

module.exports = User;
