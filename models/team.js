'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Pilot }) {
      // define association here
      this.hasMany(Pilot, {
        foreignKey: 'teamId', 
        as: 'pilots',
        
      })
    }
  };
  Team.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Team name already exists!'
    },
      validate: {
        notNull: { msg: "Team must have a name" },
        notEmpty: { msg: "Team must not be empty" },
      },
    },
  }, {
    sequelize,
    tableName: 'teams',
    modelName: 'Team',
  });
  return Team;
};