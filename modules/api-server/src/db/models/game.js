const Sequelize = require('sequelize');
const { Op } = Sequelize;
const { v4: uuid } = require('uuid');

class Game extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true,
          unique: true,
          allowNull: false,
        },
        word: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
        tableName: 'game',
        hooks: {
          beforeCreate(model, options) {
            model.id = uuid();
          }
        }
      },
    )
  }

  static associate(models) {
    const { User, Question } = models;
    this.belongsTo(User.scope('withoutPassword'), {
      foreignKey: 'host_player',
      as: 'HostPlayer',
    });

    this.belongsTo(User.scope('withoutPassword'), {
      foreignKey: 'opponent_player',
      as: 'OpponentPlayer',
    });

    this.belongsTo(User.scope('withoutPassword'), {
      foreignKey: 'winner',
      as: 'Winner',
    });

    this.hasMany(Question, {
      foreignKey: 'game_id',
    });
  }

  static async createGame (payload) {
    return this.create(payload);
  }

  static async updateGame (payload) {
    return this.update(payload.id, payload);
  }

  static async getGame(id) {
    const { db: {
      models: {
        Question
      }
    }} = global;
    return this.findOne({
      where: {
        id
      },
      include: ['HostPlayer', 'OpponentPlayer', {
        model: Question,
      }],
      order: [[Question, 'created_at', 'desc']],
    });
  }

  static async getAllGamesOfUser (id) {
    return this.findAll({
      where: {
        [Op.or]: [{
          host_player: id,
        }, {
          opponent_player: id,
        }]
      },
      order: [['created_at', 'desc']],
      include: ['HostPlayer', 'OpponentPlayer'],
      attributes: { exclude: ['word'] }
    });
  }
};

module.exports = Game;