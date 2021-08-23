"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Race extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Circuit, RaceResult }) {
      // define association here
      this.belongsTo(Circuit, { foreignKey: "circuitId", as: "circuit" });
      this.hasMany(RaceResult, {
        foreignKey: "raceId",
        as: "raceResults",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Race.init(
    {
      circuitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: { msg: "Date must be in 'YYYY/MM/DD' format." },
        },
      },
    },
    {
      sequelize,
      tableName: "races",
      modelName: "Race",
    }
  );
  return Race;
};
