
const { GameSetting } = require('../models');

// Get all settings
function findAll() {
  return GameSetting.findAll({
    order: [['setting_id', 'ASC']]
  });
}

// Get one setting by ID
function findById(settingId) {
  return GameSetting.findByPk(settingId);
}

// Create new settings
function create(data) {
  return GameSetting.create(data);
}

// Update an existing setting
async function update(setting, data) {
  return setting.update(data);
}

// Delete an existing setting
async function remove(setting) {
  return setting.destroy();
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};
