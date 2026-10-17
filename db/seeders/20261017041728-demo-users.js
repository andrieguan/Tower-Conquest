
'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const demoUsers = [
      {
        username: 'demo_player_1',
        school_id: 'SCH001',
        full_name: 'Demo Player One',
        email: 'demo1@example.com',
        role: 'player',
        created_at: now,
        updated_at: now
      },
      {
        username: 'demo_player_2',
        school_id: 'SCH002',
        full_name: 'Demo Player Two',
        email: 'demo2@example.com',
        role: 'player',
        created_at: now,
        updated_at: now
      },
      {
        username: 'demo_player_3',
        school_id: 'SCH003',
        full_name: 'Demo Player Three',
        email: 'demo3@example.com',
        role: 'player',
        created_at: now,
        updated_at: now
      }
    ];

    // Insert demo users only if they don't already exist.
    for (const user of demoUsers) {
      const [existing] = await queryInterface.sequelize.query(
        'SELECT user_id FROM users WHERE username = :username',
        { replacements: { username: user.username } }
      );

      if (existing.length === 0) {
        await queryInterface.bulkInsert('users', [user], {});
      }
    }

    // Ensure game_settings has at least one row.
    const [settings] = await queryInterface.sequelize.query(
      'SELECT setting_id FROM game_settings LIMIT 1'
    );

    if (settings.length === 0) {
      await queryInterface.bulkInsert('game_settings', [{
        music_volume: 80,
        sfx_volume: 100,
        is_muted: false,
        created_at: new Date(),
        updated_at: new Date()
      }], {});
    }

    // Ensure leaderboard has at least one row.
    const [leaderboardRows] = await queryInterface.sequelize.query(
      'SELECT leaderboard_id FROM leaderboard LIMIT 1'
    );

    if (leaderboardRows.length === 0) {
      await queryInterface.bulkInsert('leaderboard', [{
        player_name: 'Demo Player One',
        score: 100,
        level_reached: 3,
        created_at: new Date(),
        updated_at: new Date()
      }], {});
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', {
      username: [
        'demo_player_1',
        'demo_player_2',
        'demo_player_3'
      ]
    }, {});
  }
};
