'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    useremail: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    reviews: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};