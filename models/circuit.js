'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Circuit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Race }) {
      // define association here
      this.hasMany(Race, {foreignKey: 'circuitId', as: 'races'})
    }
  };
  Circuit.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Circuit name already exists!'
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    }    
  }, {
    sequelize,
    tableName: 'circuits',
    modelName: 'Circuit',
  });
  return Circuit;
};