'use strict';

/** @type {import('sequelize-cli-v6').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('game_settings', [
      {
        music_volume: 80,
        sfx_volume: 100,
        is_muted: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('game_settings', null, {});
  }
};
