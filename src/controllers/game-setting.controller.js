
const { matchedData } = require('express-validator');
const service = require('../services/game-setting.service');

// GET /game-settings
async function list(req, res) {
  const settings = await service.listSettings();

  return res.status(200).json({
    data: settings
  });
}

// GET /game-settings/:id
async function getOne(req, res) {
  const setting = await service.getSetting(req.params.id);

  return res.status(200).json({
    data: setting
  });
}

// POST /game-settings
async function create(req, res) {
  const data = matchedData(req, { locations: ['body'] });

  const setting = await service.createSetting(
    data,
    req.user
  );

  return res.status(201).json({
    data: setting
  });
}

// PATCH /game-settings/:id
async function update(req, res) {
  const data = matchedData(req, { locations: ['body'] });

  const setting = await service.updateSetting(
    req.params.id,
    data,
    req.user
  );

  return res.status(200).json({
    data: setting
  });
}

// DELETE /game-settings/:id
async function remove(req, res) {
  await service.deleteSetting(
    req.params.id,
    req.user
  );

  return res.status(204).send();
}

module.exports = {
  list,
  getOne,
  create,
  update,
  remove
};
