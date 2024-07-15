const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    address_obj: {
        street1: String,
        city: String,
        state: String,
        country: String,
        postalcode: String,
        address_string: String
    },
    latitude: String,
    longitude: String,
    phone: String,
    website: String,
    rating: String,
    review_rating_count: {
        "1": String,
        "2": String,
        "3": String,
        "4": String,
        "5": String
    },
    price_level: String,
    features: [String],
    cuisine: [{
        name: String,
        localized_name: String
    }],
    image: String
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

class RestaurantModel {

    static async getRestaurantList(){
        return Restaurant.find({}, '_id name price_level cuisine features image')
    }

}

module.exports = RestaurantModel;