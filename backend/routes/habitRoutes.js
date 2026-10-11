const router = require('express').Router();
const controller = require('../controllers/habitController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.route('/').get(controller.getAll).post(controller.create);
router.route('/:id').put(controller.update).delete(controller.remove);
router.post('/:id/toggle', controller.toggleDate);

module.exports = router;
