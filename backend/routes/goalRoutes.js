const router = require('express').Router();
const controller = require('../controllers/goalController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.route('/').get(controller.getAll).post(controller.create);
router.route('/:id').put(controller.update).delete(controller.remove);

module.exports = router;
