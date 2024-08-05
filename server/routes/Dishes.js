const express = require('express');
const router = express.Router();
const DishController = require('../controllers/DishController');
// const { addDishes } = require('../controllers/DishController');

router.get("/", DishController.getDishList);
router.post("/add-menu", DishController.addDishes);
router.get("/:id", DishController.getDishById);
router.get("/menuId/:menu_id", DishController.getDishesByMenu);

module.exports = router;