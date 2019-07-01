'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    city: DataTypes.STRING,
    type: DataTypes.STRING,
    minCost: DataTypes.INTEGER,
    minTime: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    views: DataTypes.INTEGER,
    reviews: DataTypes.INTEGER,
    phoneNo: DataTypes.INTEGER,
    openStatus: DataTypes.BOOLEAN
  }, {});
  Restaurant.associate = function(models) {
    // associations can be defined here
    models.Restaurant.hasMany(models.Review);
  };
  return Restaurant;
};