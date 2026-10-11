const mongoose = require('mongoose');

const pomodoroSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    durationMinutes: { type: Number, required: [true, 'Duration is required'], min: 1 },
    type: { type: String, enum: ['work'], default: 'work' }, // only finished work sessions are saved
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PomodoroSession', pomodoroSchema);
