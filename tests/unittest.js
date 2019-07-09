"use strict";

var expect = require("expect.js");

describe("creation", function() {
  before(function() {
    return require("../models").sequelize.sync();
  });

  beforeEach(function() {
    this.User = require("../models").User;
    this.Restaurant = require("../models").Restaurant;
    this.Review = require("../models").Review;
  });

  //user registration
  it("creation of user is done", function(done) {
    this.User.create({
      username: "Anandh",
      useremail: `anandh@gmail.com`,
      image: "image.jpg",
      password: "anand"
    }).then(function(user) {
      var u = user.dataValues;
      expect(u.username).to.equal("Anandh");
      expect(u.useremail).to.equal("anandh@gmail.com");
      expect(u.image).to.equal("image.jpg");
      expect(u.password).to.equal("anand");
      done();
    });
  });

  //restaurant creation
  it("creation of restaurant is done", function(done) {
    this.Restaurant.create({
      name: "Burger King",
      city: "Hyderabad",
      image: "burgerking.jpg",
      type: "Burgers",
      minCost: 200,
      minTime: 30,
      phoneNo: 1234567890,
      openStatus: false
    }).then(function(restaurant) {
      var u = restaurant.dataValues;
      expect(u.name).to.equal("Burger King");
      expect(u.city).to.equal("Hyderabad");
      expect(u.image).to.equal("burgerking.jpg");
      expect(u.type).to.equal("Burgers");
      expect(u.minCost).to.equal(200);
      expect(u.minTime).to.equal(30);
      expect(u.phoneNo).to.equal(1234567890);
      expect(u.openStatus).to.equal(false);
      done();
    });
  });
  //restaurant details using id
  it("getting restaurant details using id is done", function(done) {
    this.Restaurant.findByPk(1).then(function(restaurant) {
      var u = restaurant.dataValues;
      expect(u.name).to.equal("Burger King");
      expect(u.image).to.equal("burgerking.jpg");
      expect(u.city).to.equal("Hyderabad");
      expect(u.type).to.equal("Burgers");
      expect(u.minCost).to.equal(200);
      expect(u.minTime).to.equal(30);
      expect(u.phoneNo).to.equal(1234567890);
      expect(u.openStatus).to.equal(false);
      done();
    });
  });

  //all restaurant details
  it("getting all restaurant details is done", function(done) {
    this.Restaurant.findAll().then(function(r) {
      done();
    });
  });

  //   user login
  it("user login success", function(done) {
    this.User.findAll({
      where: { useremail: "anandh@gmail.com" }
    }).then(function(user) {
      if (user[0].dataValues.password === "anand") {
        var u = user[0].dataValues;
        expect(u.useremail).to.equal("anandh@gmail.com");
        expect(u.username).to.equal("Anandh");
        expect(u.image).to.equal("image.jpg");
        expect(u.password).to.equal("anand");
        done();
      } else {
        console.log("Invalid password");
        done();
      }
    });
  });

  //user details using id
  it("getting user details using id success", function(done) {
    this.User.findByPk(1).then(function(user) {
      var u = user.dataValues;
      expect(u.useremail).to.equal("anandh@gmail.com");
      expect(u.username).to.equal("Anandh");
      expect(u.image).to.equal("image.jpg");
      expect(u.password).to.equal("anand");
      done();
    });
  });

  //adding review
  it("creation of review is done", function(done) {
    this.Review.create({
      review:
        " After he is done collecting the dishes from the table, he just wipes down the table with a dry cloth and not something wet, like something hygenic liquid or such stuff.",
      rating: "4",
      RestaurantId: 1,
      UserId: 1
    }).then(function(review) {
      var u = review.dataValues;
      expect(u.review).to.equal(
        " After he is done collecting the dishes from the table, he just wipes down the table with a dry cloth and not something wet, like something hygenic liquid or such stuff."
      );
      expect(u.rating).to.equal("4");
      done();
    });
  });

  //getting restaurant reviews
  it("getting reviews of a partiular restaurant is done", function(done) {
    this.Review.findAll({
      where: { restaurantId: 1 }
    }).then(function(reviews) {
      done();
    });
  });
});
