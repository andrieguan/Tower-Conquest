'use strict';

module.exports = (sequelize, DataTypes) => {
  const GameSession = sequelize.define('GameSession', {
    game_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    session_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    game_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'waiting'
    },

    started_at: {
      type: DataTypes.DATE,
      allowNull: true
    },

    ended_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'game_sessions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return GameSession;
};