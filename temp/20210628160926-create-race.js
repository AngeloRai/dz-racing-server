"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("races", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      race_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      track_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      race_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      pilot_position: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pilotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("races");
  },
};