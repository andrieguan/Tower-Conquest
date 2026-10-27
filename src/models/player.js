'use strict';

module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    player_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },

    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },

    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'players',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',

    indexes: [
      {
        unique: true,
        fields: ['game_id', 'user_id']
      }
    ]
  });

  return Player;
};