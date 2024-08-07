const express = require('express');
const router = express.Router();
const DishController = require('../controllers/DishController');

router.get("/", DishController.getDishList);
router.get("/:id", DishController.getDishById);
router.get("/menuId/:menu_id", DishController.getDishesByMenu);

module.exports = router;