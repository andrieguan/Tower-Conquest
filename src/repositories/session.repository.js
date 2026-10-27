
const { GameSession, Player } = require('../models');

// Find a session using its six-digit code
async function findByCode(code) {
  return GameSession.findOne({
    where: { session_code: code }
  });
}

// Create a new session
async function create(data) {
  return GameSession.create(data);
}

// Update an existing session
async function update(session, data) {
  return session.update(data);
}

// Find an existing player seat
async function findPlayer(gameId, userId) {
  return Player.findOne({
    where: {
      game_id: gameId,
      user_id: userId
    }
  });
}

// Create a player seat
async function createPlayer(data) {
  return Player.create(data);
}

module.exports = {
  findByCode,
  create,
  update,
  findPlayer,
  createPlayer
};
