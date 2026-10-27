
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'GameSetting',
    {
      setting_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      music_volume: {
        type: DataTypes.INTEGER,
        defaultValue: 80
      },

      sfx_volume: {
        type: DataTypes.INTEGER,
        defaultValue: 100
      },

      is_muted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      host_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'user_id'
        }
      }
    },
    {
      tableName: 'game_settings',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
