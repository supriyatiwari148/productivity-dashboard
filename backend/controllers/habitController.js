const createCrudController = require('./crudFactory');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const Habit = require('../models/Habit');
const { toDateKey } = require('../utils/dates');

const crud = createCrudController(Habit, { fields: ['name', 'description'] });

// POST /api/habits/:id/toggle  body: { date?: "YYYY-MM-DD" } (defaults to today)
const toggleDate = asyncHandler(async (req, res) => {
  const habit = await crud.findOwned(req);
  const date = (req.body && req.body.date) || toDateKey();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new AppError('Invalid date format', 400);

  habit.completedDates = habit.completedDates.includes(date)
    ? habit.completedDates.filter((d) => d !== date)
    : [...habit.completedDates, date];
  await habit.save();
  res.json(habit);
});

module.exports = { ...crud, toggleDate };
