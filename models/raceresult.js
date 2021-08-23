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
    static associate({ Race, Pilot }) {
      // define association here
      this.belongsTo(Race, {foreignKey: 'raceId', as: 'race'})
      this.belongsTo(Pilot, {foreignKey: 'pilotId', as: 'pilot'})

    }
  };
  RaceResult.init({
    raceId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pilotId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0, max: 40 }
    },
    fastestLapPoint: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    fastestLapPoint: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }

  }, {
    sequelize,
    tableName: 'raceResults',
    modelName: 'RaceResult',
  });
  return RaceResult;
};