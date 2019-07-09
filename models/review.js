"use strict";
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      review: DataTypes.STRING,
      rating: DataTypes.FLOAT
    },
    {}
  );
  Review.associate = function(models) {
    // associations can be defined here
    models.Review.belongsTo(models.Restaurant, {
      as: "restaurant",
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Review.belongsTo(models.User, {
      as: "user",
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Review;
};
