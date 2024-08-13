const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');

router.get("/", ReviewController.getReviewList);
router.get("/:id", ReviewController.getReviewById);
router.get('/restaurantId/:restaurant_id', ReviewController.getReviewById);

// router.get("/:name", RestaurantController.getRestaurantByName);
// router.get('/restaurants', RestaurantController.getRestaurantByName);
module.exports = router;