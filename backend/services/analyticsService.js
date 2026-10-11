const Task = require('../models/Task');
const Habit = require('../models/Habit');
const Goal = require('../models/Goal');
const PomodoroSession = require('../models/PomodoroSession');
const { calculateScore } = require('./scoreService');
const { toDateKey, lastNDays } = require('../utils/dates');

// Builds all dashboard/analytics numbers for one user from real DB records
const getAnalytics = async (userId) => {
  const [tasks, habits, goals, sessions] = await Promise.all([
    Task.find({ userId }),
    Habit.find({ userId }),
    Goal.find({ userId }),
    PomodoroSession.find({ userId }),
  ]);

  const todayKey = toDateKey();
  const now = new Date();
  const goalAverage = goals.length ? goals.reduce((sum, g) => sum + g.progress, 0) / goals.length : 0;

  // One stats object per day for the last 30 days
  const days = lastNDays(30).map((date) => {
    const tasksCompleted = tasks.filter((t) => t.completedAt && toDateKey(t.completedAt) === date).length;
    const habitsDone = habits.filter((h) => h.completedDates.includes(date)).length;
    const daySessions = sessions.filter((s) => toDateKey(s.completedAt) === date);
    const pomodoroMinutes = daySessions.reduce((sum, s) => sum + s.durationMinutes, 0);
    return {
      date,
      tasksCompleted,
      habitRate: habits.length ? Math.round((habitsDone / habits.length) * 100) : 0,
      pomodoroSessions: daySessions.length,
      pomodoroMinutes,
      score: calculateScore({ tasksCompleted, habitsDone, habitsTotal: habits.length, sessions: daySessions.length, goalAverage }),
    };
  });

  const today = days[days.length - 1];

  return {
    stats: {
      tasksCompleted: tasks.filter((t) => t.status === 'Completed').length,
      tasksPending: tasks.filter((t) => t.status !== 'Completed').length,
      tasksOverdue: tasks.filter((t) => t.status !== 'Completed' && t.dueDate && t.dueDate < now).length,
      tasksCompletedToday: today.tasksCompleted,
      habitCompletionRate: today.habitRate,
      habitsDoneToday: habits.filter((h) => h.completedDates.includes(todayKey)).length,
      habitsTotal: habits.length,
      currentStreak: Math.max(0, ...habits.map((h) => h.currentStreak)),
      longestStreak: Math.max(0, ...habits.map((h) => h.longestStreak)),
      pomodoroSessions: sessions.length,
      pomodoroSessionsToday: today.pomodoroSessions,
      pomodoroMinutesToday: today.pomodoroMinutes,
      goalProgress: Math.round(goalAverage),
      productivityScore: today.score,
    },
    weekly: days.slice(-7),
    monthly: days,
  };
};

module.exports = { getAnalytics };
