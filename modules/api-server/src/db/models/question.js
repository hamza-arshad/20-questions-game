const Sequelize = require('sequelize')
const {v4: uuid} = require('uuid');

class Question extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true,
          unique: true,
          allowNull: false,
        },
        text: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        answer: {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: true,
        },
      },
      {
        sequelize,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
        tableName: 'questions',
        hooks: {
          beforeCreate(model, options) {
            model.id = uuid();
          }
        }
      },
    )
  }

  static associate(models) {
    const { Game } = models;
    this.belongsTo(Game, {
      foreignKey: 'game_id',
    });
  }

  static async createQuestion (payload) {
    return this.create(payload);
  }

  static async updateQuestion (payload){
    return this.update(payload.id, payload);
  }

  static async getAllQuestionOfGame (id) {
    return this.findAll({
      where: {
        game_id: id
      }
    });
  }

  static async getQuestion (id) {
    return this.findByPk(id, {
      include: ['Game']
    });
  }

  static async getQuestionCountOfGame (id) {
    return this.count({
      where: {
        game_id: id
      }
    });
  }

}

module.exports = Question;