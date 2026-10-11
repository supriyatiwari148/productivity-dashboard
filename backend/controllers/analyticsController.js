const asyncHandler = require('../utils/asyncHandler');
const { getAnalytics } = require('../services/analyticsService');

const getUserAnalytics = asyncHandler(async (req, res) => {
  res.json(await getAnalytics(req.user._id));
});

module.exports = { getUserAnalytics };
