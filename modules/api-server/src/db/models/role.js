const Sequelize = require('sequelize')
const {v4: uuid} = require('uuid');

class Role extends Sequelize.Model {
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
        }
      },
      {
        sequelize,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
        tableName: 'role',
        hooks: {
          beforeCreate(model, options) {
            model.id = uuid();
          }
        }
      },
    )
  }

  static async getByName (name) {
    return this.findOne({
      where:{
        name
      }
    });
  }
}

module.exports = Role;