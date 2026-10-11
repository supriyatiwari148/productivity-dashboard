const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: [true, 'Task title is required'], trim: true },
    description: { type: String, default: '', trim: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    dueDate: { type: Date, default: null },
    category: { type: String, default: 'General', trim: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true } // createdAt = "created date"
);

module.exports = mongoose.model('Task', taskSchema);
