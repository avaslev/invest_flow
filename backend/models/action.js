'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');


module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Action.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    date: DataTypes.DATEONLY,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    count: DataTypes.INTEGER,
    sum: DataTypes.DECIMAL,
    operation: DataTypes.STRING,
    note: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Action',
  });

  Action.beforeCreate(action => action.id = uuidv4());

  Action.associate = (db) => {
    db.Action.belongsTo(db.Tool, {
      foreignKey: 'from'
    });
  }

  Action.associate = (db) => {
    db.Action.belongsTo(db.Tool, {
      foreignKey: 'to'
    });
  }

  return Action;
};