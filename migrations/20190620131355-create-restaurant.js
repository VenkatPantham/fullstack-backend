"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Restaurants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      minCost: {
        type: Sequelize.INTEGER
      },
      minTime: {
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      reviews: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      phoneNo: {
        type: Sequelize.INTEGER
      },
      openStatus: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Restaurants");
  }
};
