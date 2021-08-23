'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RaceResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Race, Pilot}) {
      // define association here
      // this.hasOne(Race, { foreignKey: 'raceId', as: 'race' })
      // this.hasMany(Pilot, { foreignKey: 'pilotId', as: 'pilot' })

    }
  };
  RaceResult.init({
    raceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pilotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    position: { 
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'raceResults',
    modelName: 'RaceResult',
  });
  return RaceResult;
};