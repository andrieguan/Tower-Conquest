
const { matchedData } = require('express-validator');
const service = require('../services/session.service');

// POST /sessions
async function create(req, res) {
  const data = matchedData(req, { locations: ['body'] });

  const session = await service.createSession(
    data,
    req.user
  );

  return res.status(201).json({
    data: session
  });
}

// GET /sessions/:code
async function getOne(req, res) {
  const session = await service.getSession(
    req.params.code
  );

  return res.status(200).json({
    data: session
  });
}

// PATCH /sessions/:code
async function update(req, res) {
  const data = matchedData(req, { locations: ['body'] });

  const session = await service.updateSession(
    req.params.code,
    data,
    req.user
  );

  return res.status(200).json({
    data: session
  });
}

// POST /sessions/:code/players
async function joinPlayer(req, res) {
  const result = await service.joinSession(
    req.params.code,
    req.user
  );

  return res.status(result.created ? 201 : 200).json({
    data: result.player
  });
}

module.exports = {
  create,
  getOne,
  update,
  joinPlayer
};
