'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tool extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tool.init({
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        len: [1,16]
      }
    },
    externalId: DataTypes.STRING,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullName: DataTypes.STRING,
    isUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isArhive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['bound', 'cash']]
      }
    }
  }, {
    sequelize,
    modelName: 'Tool',
  });
  return Tool;
};