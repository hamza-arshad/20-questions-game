const Sequelize = require('sequelize');
const Role = require('./role');
const User = require('./user');
const Game = require('./game');
const Question = require('./question');


module.exports = () => {
  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: { decimalNumbers: true }
  });
  const models = {
    sequelize,
    Role: Role.init(sequelize, Sequelize.DataTypes),
    User: User.init(sequelize, Sequelize.DataTypes),
    Game: Game.init(sequelize, Sequelize.DataTypes),
    Question: Question.init(sequelize, Sequelize.DataTypes),
  };

  Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));

  return models;
};
