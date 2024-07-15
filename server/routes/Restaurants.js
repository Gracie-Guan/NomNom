const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/RestaurantController');

router.get("/", RestaurantController.getRestaurantList);


module.exports = router;