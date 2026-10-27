
const { body, param } = require('express-validator');

// Validate the six-digit session code in the URL
const validateSessionCode = [
  param('code')
    .matches(/^[0-9]{6}$/)
    .withMessage('Session code must contain exactly six digits.')
];

// Validate creation of a new session
const validateCreateSession = [
  body('game_name')
    .exists({ values: 'null' })
    .withMessage('Game name is required.')
    .bail()
    .isString()
    .withMessage('Game name must be text.')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Game name cannot be empty.')
    .bail()
    .isLength({ max: 255 })
    .withMessage('Game name must not exceed 255 characters.')
];

// Validate session status updates
const validateUpdateSession = [
  body('status')
    .exists({ values: 'null' })
    .withMessage('Session status is required.')
    .bail()
    .isIn(['waiting', 'playing', 'finished'])
    .withMessage(
      'Session status must be waiting, playing, or finished.'
    )
];

module.exports = {
  validateSessionCode,
  validateCreateSession,
  validateUpdateSession
};
