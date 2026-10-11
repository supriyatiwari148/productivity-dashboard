/*
 * Productivity Score (0-100)
 *   40% task completion   -> tasks completed vs. a daily target of 3
 *   25% habit completion  -> habits done / total habits
 *   20% Pomodoro sessions -> work sessions vs. a daily target of 4
 *   15% goal progress     -> average progress of all goals
 * Each part is capped at 100% before the weight is applied.
 */
const DAILY_TASK_TARGET = 3;
const DAILY_POMODORO_TARGET = 4;

const ratio = (value, target) => (target > 0 ? Math.min(value / target, 1) : 0);

const calculateScore = ({ tasksCompleted = 0, habitsDone = 0, habitsTotal = 0, sessions = 0, goalAverage = 0 }) => {
  const score =
    40 * ratio(tasksCompleted, DAILY_TASK_TARGET) +
    25 * ratio(habitsDone, habitsTotal) +
    20 * ratio(sessions, DAILY_POMODORO_TARGET) +
    15 * ratio(goalAverage, 100);
  return Math.round(score);
};

module.exports = { calculateScore };
