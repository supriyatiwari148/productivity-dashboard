// Streak helpers for habits. Input: array of "YYYY-MM-DD" strings.
const { toDateKey } = require('../utils/dates');

const DAY_MS = 24 * 60 * 60 * 1000;
// Convert "YYYY-MM-DD" to a whole day number so consecutive days differ by exactly 1
const dayNumber = (key) => {
  const [y, m, d] = key.split('-').map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / DAY_MS);
};

const calculateStreaks = (dates = []) => {
  const days = [...new Set(dates)].map(dayNumber).sort((a, b) => a - b);
  if (days.length === 0) return { current: 0, longest: 0 };

  // Longest run of consecutive days
  let longest = 1;
  let run = 1;
  for (let i = 1; i < days.length; i++) {
    run = days[i] === days[i - 1] + 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
  }

  // Current streak counts back from today (or yesterday if today isn't done yet)
  const today = dayNumber(toDateKey());
  const last = days[days.length - 1];
  let current = 0;
  if (last === today || last === today - 1) {
    current = 1;
    for (let i = days.length - 1; i > 0 && days[i] === days[i - 1] + 1; i--) current++;
  }
  return { current, longest };
};

module.exports = { calculateStreaks };
