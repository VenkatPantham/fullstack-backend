var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/users/:user_id", function(req, res) {
  models.User.findByPk(req.params.user_id).then(function(user) {
    if (user) res.json(user);
    else res.status(404).json("No user found with that ID");
  });
});

router.post("/user", function(req, res) {
  models.User.create({
    username: req.body.username,
    useremail: req.body.useremail,
    password: req.body.password
  }).then(function(user) {
    if (user) res.status(201).send();
    else res.status(404).redirect("/signup");
    // })
    // .catch(err => {
    //   console.log(err);
  });
});

router.patch("/users/:user_id", function(req, res) {
  models.User.update(
    { useremail: req.body.email },
    { where: { id: req.params.user_id } }
  ).then(function(user) {
    if (user[0]) res.json("Updated");
    else res.json("Not Updated");
  });
});

router.post("/users/login", function(req, res) {
  models.User.findAll({
    where: { useremail: req.body.useremail }
  }).then(function(user) {
    if (user[0]) {
      if (user[0].dataValues.password == req.body.password) {
	//const expiresIn = 20;
        //const accessToken = jwt.sign({ useremail: user[0].dataValues.useremail }, SECRET_KEY, {
        // expiresIn: expiresIn
        res.status(201).send();
          //user: user,
          //access_token: accessToken,
          //expires_in: expiresIn
    	};
    };
  })
	  .catch(err=>{
		  res.status(404).send();
	  })
  });

router.get("/restaurants", function(req, res) {
  models.Restaurant.findAll().then(function(restaurants) {
    if (restaurants.length > 0) res.json(restaurants);
    else res.status(404).json("No restaurants found");
  });
});

router.get("/restaurants/:restaurant_id", function(req, res) {
  models.Restaurant.findByPk(req.params.restaurant_id).then(function(
    restaurant
  ) {
    models.Restaurant.increment("views", {
      where: { id: restaurant.id }
    });
    res.json(restaurant);
  });
});

router.post("/restaurant", function(req, res) {
  models.Restaurant.create({
    name: req.body.name,
    image: req.body.image,
    type: req.body.type,
    city: req.body.city,
    phoneNo: req.body.phoneNo,
    minCost: req.body.minCost,
    minTime: req.body.minTime,
    openStatus: req.body.openStatus
  }).then(function(restaurant) {
    res.status(201).send();
  });
});

router.patch("/restaurants/:restaurant_id", function(req, res) {
  models.Restaurant.update(
    {
      name: req.body.name
    },
    { where: { id: req.params.restaurant_id } }
  ).then(function(restaurant) {
    if (restaurant[0]) res.json("Restaurant successfully updated");
    else res.status(404).json("No restaurant found with that ID");
  });
});

router.get("/restaurants/:restaurant_id/reviews", function(req, res) {
  models.Review.findAll({
    where: {
      restaurantId: req.params.restaurant_id
    }
  }).then(function(review) {
    res.status(200).json(review);
  });
});

router.post("/restaurants/:restaurant_id/review", function(req, res) {
  models.Review.create({
    review: req.body.review,
    rating: req.body.rating ? req.body.rating : 0,
    userId: 1,
    restaurantId: req.params.restaurant_id
  }).then(function(review) {
    models.Restaurant.findByPk(review.restaurantId).then(restaurant => {
      models.Restaurant.update(
        {
          reviews: restaurant.reviews + 1,
          rating:
            (parseInt(restaurant.rating) +
              parseInt(req.body.rating ? req.body.rating : 0)) /
            2
        },
        {
          where: {
            id: review.restaurantId
          }
        }
      );
    }),
      models.User.findByPk(1).then(user => {
        models.User.update(
          {
            reviews: user.reviews + 1
          },
          {
            where: {
              id: 1
            }
          }
        );
      });
    res.status(201).send();
  });
});

module.exports = router;
