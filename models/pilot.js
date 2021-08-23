'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pilot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     getFullname() {
      return [this.firstname, this.lastname].join(' ');
    }
    static associate({ Team, RaceResult }) {
      // define association here
      this.belongsTo(Team, {foreignKey: 'teamId', as: 'teams'});
      this.hasMany(RaceResult, {
        foreignKey: 'pilotId', 
        as: 'raceResults',
        onDelete: "RESTRICT",
      });
    }
  };
  Pilot.init({
    teamId:{ 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Pilot must have a first name" },
        notEmpty: { msg: "First Name must not be empty" },
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Pilot must have a last name" },
        notEmpty: { msg: "Last Name must not be empty" },
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notNull: { msg: "Pilot status must be defined" },
        notEmpty: { msg: "Pilot status must not be empty" },
      }
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      }
    }     
  }, {
    sequelize,
    tableName: 'pilots',
    modelName: 'Pilot',
  });
  return Pilot;
};