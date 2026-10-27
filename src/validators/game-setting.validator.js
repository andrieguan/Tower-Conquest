
const { body, param } = require('express-validator');

// Validate the setting ID in the URL
const validateSettingId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Setting ID must be a positive integer.')
    .toInt()
];

// Validate creation of game settings
const validateCreateSetting = [
  body('music_volume')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Music volume must be between 0 and 100.')
    .toInt(),

  body('sfx_volume')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Sound effects volume must be between 0 and 100.')
    .toInt(),

  body('is_muted')
    .optional()
    .isBoolean({ strict: true })
    .withMessage('is_muted must be true or false.')
    .toBoolean(),

  body('host_id')
    .not()
    .exists()
    .withMessage('host_id is assigned automatically by the server.')
];

// Validate updates to game settings
const validateUpdateSetting = [
  ...validateCreateSetting,

  body().custom((value) => {
    const allowedFields = [
      'music_volume',
      'sfx_volume',
      'is_muted'
    ];

    const hasUpdateField = allowedFields.some(
      (field) =>
        Object.prototype.hasOwnProperty.call(
          value || {},
          field
        )
    );

    if (!hasUpdateField) {
      throw new Error(
        'At least one setting field must be provided.'
      );
    }

    return true;
  })
];

module.exports = {
  validateSettingId,
  validateCreateSetting,
  validateUpdateSetting
};
