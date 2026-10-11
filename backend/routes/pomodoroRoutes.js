const router = require('express').Router();
const { getSessions, createSession } = require('../controllers/pomodoroController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.route('/').get(getSessions).post(createSession);

module.exports = router;
