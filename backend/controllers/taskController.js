const createCrudController = require('./crudFactory');
const Task = require('../models/Task');

module.exports = createCrudController(Task, {
  fields: ['title', 'description', 'priority', 'dueDate', 'category', 'status'],
  sort: { dueDate: 1, createdAt: -1 },
  // Keep completedAt in sync with status
  prepare: (task) => {
    if (task.status === 'Completed' && !task.completedAt) task.completedAt = new Date();
    if (task.status !== 'Completed') task.completedAt = null;
  },
});
