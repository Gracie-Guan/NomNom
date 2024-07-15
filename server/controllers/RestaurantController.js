const RestaurantModel = require('../models/RestaurantModel');

class RestaurantController {

    static async getRestaurantList(req, res) {
        try{
            const restaurantList = await RestaurantModel.getRestaurantList();
            res.status(200).json(restaurantList);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };
}

module.exports = RestaurantController;