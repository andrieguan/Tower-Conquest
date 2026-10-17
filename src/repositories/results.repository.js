
'use strict';

const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

async function findFinishedGamePlayers(since) {
  const sql = `
    SELECT
      s.session_code AS session_code,
      s.started_at,
      s.ended_at,
      u.school_id,
      p.nickname,
      p.score,
      p.completed
    FROM game_sessions s
    JOIN players p ON p.game_id = s.game_id
    JOIN users u ON u.user_id = p.user_id
    WHERE s.status = 'CLOSED'
      AND (
        CAST(:since AS timestamptz) IS NULL
        OR s.ended_at > :since
      )
    ORDER BY s.ended_at, p.score DESC
  `;

  return sequelize.query(sql, {
    type: QueryTypes.SELECT,
    replacements: {
      since: since ? since.toISOString() : null
    }
  });
}

module.exports = { findFinishedGamePlayers };
