// Optional demo data. Run from /backend:  npm run seed
// Demo login -> email: demo@example.com   password: demo1234
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Task');
const Habit = require('./models/Habit');
const Goal = require('./models/Goal');
const Note = require('./models/Note');
const PomodoroSession = require('./models/PomodoroSession');
const { toDateKey } = require('./utils/dates');

const daysAgo = (n, hour = 12) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hour, 0, 0, 0);
  return d;
};

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Remove any previous demo user together with all of their data
  const oldUser = await User.findOne({ email: 'demo@example.com' });
  if (oldUser) {
    await Promise.all([Task, Habit, Goal, Note, PomodoroSession].map((Model) => Model.deleteMany({ userId: oldUser._id })));
    await oldUser.deleteOne();
  }
  const user = await User.create({ name: 'Demo Student', email: 'demo@example.com', password: 'demo1234' });
  const userId = user._id;

  const tasks = [
    { title: 'Finish DSA assignment', category: 'College', priority: 'High', status: 'Pending', dueDate: daysAgo(-2) },
    { title: 'Prepare resume', category: 'Placement', priority: 'High', status: 'In Progress', dueDate: daysAgo(-4) },
    { title: 'Submit lab record', category: 'College', priority: 'Medium', status: 'Pending', dueDate: daysAgo(1) },
    { title: 'Solve 5 LeetCode problems', category: 'Coding', priority: 'Medium', status: 'Completed', dueDate: daysAgo(0), completedAt: daysAgo(0, 9) },
    { title: 'Read OS notes', category: 'College', priority: 'Low', status: 'Completed', completedAt: daysAgo(0, 10) },
    { title: 'Update GitHub README', category: 'Coding', priority: 'Low', status: 'Completed', completedAt: daysAgo(1) },
    { title: 'Mock interview practice', category: 'Placement', priority: 'High', status: 'Completed', completedAt: daysAgo(2) },
    { title: 'Java OOP revision', category: 'Coding', priority: 'Medium', status: 'Completed', completedAt: daysAgo(3) },
    { title: 'Buy notebooks', category: 'Personal', priority: 'Low', status: 'Completed', completedAt: daysAgo(3, 15) },
    { title: 'Complete DBMS quiz', category: 'College', priority: 'Medium', status: 'Completed', completedAt: daysAgo(5) },
  ];
  await Task.insertMany(tasks.map((t) => ({ ...t, userId })));

  const habitDays = (skip) => Array.from({ length: 14 }, (_, i) => i).filter((i) => !skip.includes(i)).map((i) => toDateKey(daysAgo(i)));
  await Habit.insertMany([
    { name: 'Study Java', description: '1 hour daily', completedDates: habitDays([]) },
    { name: 'Exercise', description: '30 minutes', completedDates: habitDays([0, 4, 9]) },
    { name: 'Read', description: '20 pages', completedDates: habitDays([1, 2, 6, 8, 11]) },
    { name: 'Practice coding', description: 'One problem a day', completedDates: habitDays([3, 10]) },
    { name: 'Drink water', description: '8 glasses', completedDates: habitDays([0]) },
  ].map((h) => ({ ...h, userId })));

  await Goal.insertMany([
    { title: 'Learn Java', description: 'Core Java and OOP', category: 'Skills', progress: 65, status: 'In Progress', startDate: daysAgo(30), targetDate: daysAgo(-30) },
    { title: 'Build 3 portfolio projects', category: 'Placement', progress: 40, status: 'In Progress', startDate: daysAgo(20), targetDate: daysAgo(-60) },
    { title: 'Crack a campus placement', category: 'Placement', progress: 0, status: 'Not Started', targetDate: daysAgo(-120) },
    { title: 'Finish Python course', category: 'Skills', progress: 100, status: 'Completed', startDate: daysAgo(60), targetDate: daysAgo(5) },
  ].map((g) => ({ ...g, userId })));

  await Note.insertMany([
    { title: 'Interview tips', content: 'Explain your projects clearly.\nKnow your tech stack.', tags: ['placement', 'important'], pinned: true },
    { title: 'DBMS: normalization', content: '1NF, 2NF, 3NF, BCNF basics.', tags: ['college', 'dbms'] },
    { title: 'Project ideas', content: 'Chat app, expense tracker, library system.', tags: ['ideas'] },
  ].map((n) => ({ ...n, userId })));

  const sessions = [];
  [4, 3, 2, 1, 1, 0].forEach((ago, i) => {
    sessions.push({ userId, durationMinutes: 25, completedAt: daysAgo(ago, 9 + i) });
  });
  [5, 5, 4, 2, 0, 0].forEach((ago, i) => sessions.push({ userId, durationMinutes: 25, completedAt: daysAgo(ago, 14 + (i % 4)) }));
  await PomodoroSession.insertMany(sessions);

  console.log('Seed complete. Login: demo@example.com / demo1234');
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
