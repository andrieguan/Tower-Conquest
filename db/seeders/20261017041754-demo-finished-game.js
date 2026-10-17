
'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    let [games] = await queryInterface.sequelize.query(
      "SELECT game_id FROM game_sessions WHERE session_code = '123456'"
    );

    if (games.length === 0) {
      await queryInterface.bulkInsert('game_sessions', [{
        session_code: '123456',
        game_name: 'Demo Tower Conquest',
        status: 'CLOSED',
        started_at: new Date(now.getTime() - 10 * 60 * 1000),
        ended_at: now,
        created_at: now,
        updated_at: now
      }], {});

      [games] = await queryInterface.sequelize.query(
        "SELECT game_id FROM game_sessions WHERE session_code = '123456'"
      );
    }

    const [users] = await queryInterface.sequelize.query(
      `SELECT user_id, username FROM users
       WHERE username IN ('demo_player_1', 'demo_player_2', 'demo_player_3')`
    );

    if (games.length !== 1 || users.length !== 3) {
      throw new Error('Expected one demo game and three demo users.');
    }

    const scores = {
      demo_player_1: 100,
      demo_player_2: 80,
      demo_player_3: 60
    };

    for (const user of users) {
      const [existing] = await queryInterface.sequelize.query(
        `SELECT player_id FROM players
         WHERE game_id = :gameId AND user_id = :userId`,
        {
          replacements: {
            gameId: games[0].game_id,
            userId: user.user_id
          }
        }
      );

      if (existing.length === 0) {
        await queryInterface.bulkInsert('players', [{
          game_id: games[0].game_id,
          user_id: user.user_id,
          nickname: user.username,
          score: scores[user.username],
          completed: true,
          created_at: now,
          updated_at: now
        }], {});
      }
    }
  },

  async down(queryInterface) {
    const [games] = await queryInterface.sequelize.query(
      "SELECT game_id FROM game_sessions WHERE session_code = '123456'"
    );

    if (games.length > 0) {
      await queryInterface.bulkDelete('players', {
        game_id: games.map((game) => game.game_id)
      }, {});
    }

    await queryInterface.bulkDelete('game_sessions', {
      session_code: '123456'
    }, {});
  }
};
