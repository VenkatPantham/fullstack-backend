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
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Review.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Review;
};
