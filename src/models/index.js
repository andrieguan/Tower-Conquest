
const { Sequelize, DataTypes } = require('sequelize');
const env = require('../config/env');
const dbConfig = require('../config/database')[env.nodeEnv];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

// Load models
const User = require('./user')(sequelize, DataTypes);
const GameSetting = require('./game-setting')(sequelize, DataTypes);
const GameSession = require('./game-session')(sequelize, DataTypes);
const Player = require('./player')(sequelize, DataTypes);

// User and GameSetting relationships
User.hasMany(GameSetting, {
  foreignKey: 'host_id',
  as: 'gameSettings'
});

GameSetting.belongsTo(User, {
  foreignKey: 'host_id',
  as: 'host'
});

 // User and GameSession relationships
User.hasMany(GameSession, {
  foreignKey: 'host_id',
  as: 'hostedSessions'
});

GameSession.belongsTo(User, {
  foreignKey: 'host_id',
  as: 'host'
});

// GameSession and Player relationships
GameSession.hasMany(Player, {
  foreignKey: 'game_id',
  as: 'players'
});

Player.belongsTo(GameSession, {
  foreignKey: 'game_id',
  as: 'gameSession'
});

// User and Player relationships
User.hasMany(Player, {
  foreignKey: 'user_id',
  as: 'playerSeats'
});

Player.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

// Export models
module.exports = {
  sequelize,
  Sequelize,
  DataTypes,
  User,
  GameSetting,
  GameSession,
  Player
};
