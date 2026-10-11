// Dates are stored/compared as local "YYYY-MM-DD" keys for habits and charts.
const toDateKey = (date = new Date()) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

// Returns the last n date keys, oldest first, ending today
const lastNDays = (n) =>
  Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - 1 - i));
    return toDateKey(d);
  });

module.exports = { toDateKey, lastNDays };
