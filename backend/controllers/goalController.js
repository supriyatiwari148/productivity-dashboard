const createCrudController = require('./crudFactory');
const Goal = require('../models/Goal');

module.exports = createCrudController(Goal, {
  fields: ['title', 'description', 'category', 'startDate', 'targetDate', 'progress', 'status'],
  // Keep status consistent with progress
  prepare: (goal) => {
    if (goal.progress >= 100) goal.status = 'Completed';
    else if (goal.progress > 0 && goal.status === 'Not Started') goal.status = 'In Progress';
    else if (goal.progress === 0 && goal.status === 'Completed') goal.status = 'Not Started';
  },
});
