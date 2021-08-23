'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Circuit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Race }) {
      // define association here
      this.belongsTo(Race, { foreignKey: 'circuitId', as: 'race' })
    }
  };
  Circuit.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {msg: 'Circuit must have a name'},
        notEmpty: {msg: 'Circuit must not be empty'}
      }
    },
    track: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Track must have a name'},
        notEmpty: {msg: 'Track must not be empty'}
      }
    }    
  }, {
    sequelize,
    tableName: 'circuits',
    modelName: 'Circuit',
  });
  return Circuit;
};