
const crypto = require('node:crypto');
const { UniqueConstraintError } = require('sequelize');
const repository = require('../repositories/session.repository');

// Create an error with an HTTP status and code
function serviceError(status, code, message) {
  const error = new Error(message);
  error.status = status;
  error.statusCode = status;
  error.code = code;
  return error;
}

// Generate a random six-digit session code
function generateSessionCode() {
  return String(crypto.randomInt(100000, 1000000));
}

// Create a new game session
async function createSession(data, user) {
  // Retry if a randomly generated code already exists
  for (let attempt = 0; attempt < 10; attempt++) {
    const code = generateSessionCode();

    try {
      return await repository.create({
        session_code: code,
        game_name: data.game_name,
        host_id: user.user_id,
        status: 'waiting'
      });
    } catch (error) {
      if (!(error instanceof UniqueConstraintError)) {
        throw error;
      }

      // Only retry session-code collisions
      const fields = error.fields || {};
      const isCodeCollision =
        Object.prototype.hasOwnProperty.call(fields, 'session_code') ||
        error.errors?.some(
          (item) => item.path === 'session_code'
        );

      if (!isCodeCollision) throw error;
    }
  }

  throw serviceError(
    503,
    'SESSION_CODE_UNAVAILABLE',
    'Unable to generate a unique session code. Please try again.'
  );
}

// Find a session or return 404
async function getSession(code) {
  const session = await repository.findByCode(code);

  if (!session) {
    throw serviceError(
      404,
      'SESSION_NOT_FOUND',
      'The requested game session does not exist.'
    );
  }

  return session;
}

// Update session status (owner only)
async function updateSession(code, data, user) {
  const session = await getSession(code);

  if (session.host_id !== user.user_id) {
    throw serviceError(
      403,
      'NOT_SESSION_OWNER',
      'You cannot update a session owned by another host.'
    );
  }

  const changes = {
    status: data.status
  };

  if (data.status === 'playing' && !session.started_at) {
    changes.started_at = new Date();
  }

  if (data.status === 'finished' && !session.ended_at) {
    changes.ended_at = new Date();
  }

  return repository.update(session, changes);
}

// Join or rejoin a game session
async function joinSession(code, user) {
  const session = await getSession(code);

  if (session.status !== 'waiting') {
    throw serviceError(
      409,
      'SESSION_NOT_JOINABLE',
      'Players can only join sessions that are waiting.'
    );
  }

  const existing = await repository.findPlayer(
    session.game_id,
    user.user_id
  );

  if (existing) {
    return { player: existing, created: false };
  }

  try {
    const player = await repository.createPlayer({
      game_id: session.game_id,
      user_id: user.user_id,
      nickname: user.full_name || user.school_id,
      score: 0,
      completed: false
    });

    return { player, created: true };
  } catch (error) {
    // Handle two simultaneous requests joining the same session
    if (error instanceof UniqueConstraintError) {
      const player = await repository.findPlayer(
        session.game_id,
        user.user_id
      );

      if (player) {
        return { player, created: false };
      }
    }

    throw error;
  }
}

module.exports = {
  createSession,
  getSession,
  updateSession,
  joinSession
};
