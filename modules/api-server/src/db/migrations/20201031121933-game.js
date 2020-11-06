'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('game', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE
      },
      word: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      host_player: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "user",
          },
          key: "id"
        },
        allowNull: false
      },
      opponent_player:{
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "user",
          },
          key: "id"
        },
        allowNull: false
      },
      winner: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "user",
          },
          key: "id"
        },
        allowNull: true
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('game');
  }
};
