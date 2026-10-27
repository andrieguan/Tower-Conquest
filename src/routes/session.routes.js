
const { Router } = require('express');

const controller = require('../controllers/session.controller');
const requireUser = require('../middlewares/require-user');
const validate = require('../middlewares/validate');

const {
  validateSessionCode,
  validateCreateSession,
  validateUpdateSession
} = require('../validators/session.validator');

const router = Router();

// POST /sessions - Create a session (host only)
router.post(
  '/',
  requireUser('host'),
  validateCreateSession,
  validate,
  controller.create
);

// GET /sessions/:code - Get one session
router.get(
  '/:code',
  requireUser(),
  validateSessionCode,
  validate,
  controller.getOne
);

// PATCH /sessions/:code - Update session status
router.patch(
  '/:code',
  requireUser('host'),
  validateSessionCode,
  validateUpdateSession,
  validate,
  controller.update
);

// POST /sessions/:code/players - Join or rejoin
router.post(
  '/:code/players',
  requireUser(),
  validateSessionCode,
  validate,
  controller.joinPlayer
);

module.exports = router;
