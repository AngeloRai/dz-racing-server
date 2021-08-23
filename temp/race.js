'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Race extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Circuit }) {
      this.hasOne(Circuit, { foreignKey: 'circuitId', as: 'circuit' })
    }
  };
  Race.init({
    circuitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {msg: 'Date must be in the this format: yyyy-mm-dd'}
      }
    }
  }, {
    sequelize,
    tableName: 'races',
    modelName: 'Race',
  });
  return Race;
};