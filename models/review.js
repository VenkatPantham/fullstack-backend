"use strict";
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      review: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      userId: DataTypes.INTEGER,
      restaurantId: DataTypes.INTEGER
    },
    {}
  );
  Review.associate = function(models) {
    // associations can be defined here
    models.Review.belongsTo(models.Restaurant, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true
      }
    });
    models.Review.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true
      }
    });
  };
  return Review;
};
