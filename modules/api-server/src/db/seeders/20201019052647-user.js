'use strict';
const { v4: uuid } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [
      {
        id: uuid(),
        name: 'Player 1',
        email: 'player1@gmail.com',
        password: '$2b$04$94R6NBHyN6PcbLjidimNieV6FrWwd0rwv1Wy9E.3Dbg9u/yT0aLvC',
        role_id: '6bd5b30b-f65d-4ac1-a11a-e4564e1a7cb8',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuid(),
        name: 'Player 2',
        email: 'player2@gmail.com',
        password: '$2b$04$94R6NBHyN6PcbLjidimNieV6FrWwd0rwv1Wy9E.3Dbg9u/yT0aLvC',
        role_id: '6bd5b30b-f65d-4ac1-a11a-e4564e1a7cb8',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
