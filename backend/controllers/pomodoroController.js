const asyncHandler = require('../utils/asyncHandler');
const PomodoroSession = require('../models/PomodoroSession');

// GET /api/pomodoro -> all sessions, newest first
const getSessions = asyncHandler(async (req, res) => {
  res.json(await PomodoroSession.find({ userId: req.user._id }).sort({ completedAt: -1 }));
});

// POST /api/pomodoro  body: { durationMinutes } -> saves one finished work session
const createSession = asyncHandler(async (req, res) => {
  const session = await PomodoroSession.create({
    userId: req.user._id,
    durationMinutes: req.body.durationMinutes,
    completedAt: new Date(),
  });
  res.status(201).json(session);
});

module.exports = { getSessions, createSession };
