
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'players',
      {
        player_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        game_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'game_sessions',
            key: 'game_id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'user_id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        nickname: {
          type: Sequelize.STRING,
          allowNull: false
        },
        score: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        completed: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      },
      {
        uniqueKeys: {
          players_game_user_unique: {
            fields: ['game_id', 'user_id']
          }
        }
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('players');
  }
};
