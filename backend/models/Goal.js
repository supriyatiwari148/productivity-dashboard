const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: [true, 'Goal title is required'], trim: true },
    description: { type: String, default: '', trim: true },
    category: { type: String, default: 'General', trim: true },
    startDate: { type: Date, default: Date.now },
    targetDate: { type: Date, default: null },
    progress: { type: Number, min: [0, 'Progress cannot be below 0'], max: [100, 'Progress cannot exceed 100'], default: 0 },
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Goal', goalSchema);
