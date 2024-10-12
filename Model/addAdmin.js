const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
});

const Admin = mongoose.model('Admin', adminSchema);  // Correct model name to Admin

module.exports = Admin;
