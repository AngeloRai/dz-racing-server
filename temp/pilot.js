'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Pilot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Race }) {
      // define association here
      this.hasMany(Race, { foreignKey: 'pilotId', as: 'races'})
    }

    toJSON(){
      return { ...this.get(), id: undefined}
    }
 
  };

  Pilot.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {msg: 'Pilot must have a name'},
        notEmpty: {msg: 'Pilot must not be empty'}
      }
    },
    pilot_team: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Pilot must have a team'},
        notEmpty: {msg: 'Pilot team must not be empty'}
      }
    }
  }, {
    sequelize,
    tableName: 'pilots',
    modelName: 'Pilot',
  });
  return Pilot;
};