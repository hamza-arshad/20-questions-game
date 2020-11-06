const Sequelize = require('sequelize')
const { Op } = Sequelize;
const {v4: uuid} = require('uuid');

class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true,
          unique: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.DataTypes.CITEXT,
          unique: true,
          allowNull: false,
        }
      },
      {
        sequelize,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
        tableName: 'user',
        scopes: {
          withoutPassword: {
            attributes: {exclude: ['password']},
          }
        },
        hooks: {
          beforeCreate(model, options) {
            model.id = uuid();
          }
        }
      },
    )
  }

  static associate(models) {
    const { Role } = models;
    this.belongsTo(Role, {
      foreignKey: 'role_id'
    });
  }

  static createUser (payload) {
    return this.create(payload);
  }

  static async getAllExcept (id) {
    return this.findAll({
      where: {
        id: {[Op.ne]: id}
      },
      attributes: {exclude: ['password']}
    });
  }

  static async getUser(id) {
    const { db: {
      models: {
        Role
      }
    }} = global;
    return this.findOne({
      where: {
        id
      },
      include: [
        {
          model: Role,
          attributes: ['name']
        }
      ],
      attributes: {exclude: ['password']}
    });
  }

  static async checkUserAlreadyExist (where) {
    try {
      const existingUser = await this.findOne({
        where,
      });
      return !!existingUser;
    }catch (e) {
      return false;
    }
  }

  static async getUserByEmail (email) {
    const { db: {
      models: {
        Role
      }
    }} = global;
    return this.findOne({
      where:{
        email
      },
      include:[
        {
          model: Role,
          attributes: ['name']
        }
      ]
    });
  }
}

module.exports = User;

