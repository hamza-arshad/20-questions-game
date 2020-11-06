'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('questions', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
        allowNull:false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE
      },
      text: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      answer: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
      },
      game_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'game',
          },
          key: 'id'
        },
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('questions');
  }
};
