'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // Ensure the first two accounts are hosts.
    await queryInterface.bulkUpdate(
      'users',
      { role: 'host', updated_at: now },
      { school_id: ['SCH001', 'SCH002'] }
    );

    // Ensure the third account is a player.
    await queryInterface.bulkUpdate(
      'users',
      { role: 'player', updated_at: now },
      { school_id: 'SCH003' }
    );

    // Add a second player only if the account does not exist.
    const [existing] = await queryInterface.sequelize.query(
      'SELECT user_id FROM users WHERE school_id = :schoolId',
      { replacements: { schoolId: 'SCH004' } }
    );

    if (existing.length === 0) {
      await queryInterface.bulkInsert('users', [{
        username: 'demo_player_4',
        school_id: 'SCH004',
        full_name: 'Demo Player Four',
        email: 'demo4@example.com',
        role: 'player',
        created_at: now,
        updated_at: now
      }], {});
    }
  },

  async down(queryInterface) {
    // Remove only the account introduced by this seeder.
    await queryInterface.bulkDelete(
      'users',
      { school_id: 'SCH004' },
      {}
    );

    // Do not reverse the existing users' roles because
    // they may have been changed independently.
  }
};