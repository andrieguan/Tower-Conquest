
const { Router } = require('express');

const controller = require('../controllers/game-setting.controller');
const requireUser = require('../middlewares/require-user');

const {
  validateSettingId,
  validateCreateSetting,
  validateUpdateSetting
} = require('../validators/game-setting.validator');

const validate = require('../middlewares/validate');

const router = Router();

// GET all game settings
router.get(
  '/',
  requireUser('host'),
  controller.list
);

// GET one game setting
router.get(
  '/:id',
  requireUser('host'),
  validateSettingId,
  validate,
  controller.getOne
);

// CREATE game settings
router.post(
  '/',
  requireUser('host'),
  validateCreateSetting,
  validate,
  controller.create
);

// UPDATE game settings
router.patch(
  '/:id',
  requireUser('host'),
  validateSettingId,
  validateUpdateSetting,
  validate,
  controller.update
);

// DELETE game settings
router.delete(
  '/:id',
  requireUser('host'),
  validateSettingId,
  validate,
  controller.remove
);

module.exports = router;
