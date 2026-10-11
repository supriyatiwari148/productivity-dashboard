const mongoose = require('mongoose');
const { calculateStreaks } = require('../services/streakService');

const habitSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: [true, 'Habit name is required'], trim: true },
    description: { type: String, default: '', trim: true },
    // Every day the habit was completed, as "YYYY-MM-DD" strings
    completedDates: { type: [String], default: [] },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

habitSchema.virtual('currentStreak').get(function () {
  return calculateStreaks(this.completedDates).current;
});
habitSchema.virtual('longestStreak').get(function () {
  return calculateStreaks(this.completedDates).longest;
});

module.exports = mongoose.model('Habit', habitSchema);
