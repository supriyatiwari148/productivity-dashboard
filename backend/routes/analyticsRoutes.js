const router = require('express').Router();
const { getUserAnalytics } = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getUserAnalytics);

module.exports = router;
