const DishModel = require('../models/DishModel');

class DishController {

    static async getDishList(req, res) {
        try{
            const dishList = await DishModel.getDishList();
            res.status(200).json(dishList);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };

    static async getDishById(req, res) {
        const dishId = req.params.id;
        try {
            const dish = await DishModel.getDishById(dishId);
            if (dish) {
                res.json(dish);
            } else {
                res.status(404).json({ message: 'Dish not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getDishesByMenu(req, res) {
        const menuId = req.params.menu_id;
        try {
            const dishes = await DishModel.getDishesByMenu(menuId);
            if (dishes) {
                res.json(dishes);
            } else {
                res.status(404).json({ message: 'Dish not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = DishController;