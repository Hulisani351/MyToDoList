// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true
   },
  completed: 
  { type: Boolean, 
    default: false 
  },
  completionTime: { 
    type: Date }
});

module.exports = mongoose.model('Task', taskSchema);
