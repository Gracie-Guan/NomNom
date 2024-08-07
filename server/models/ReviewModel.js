const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant_id: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    text: { type: String, required: true },
    review_date: { type: Date, default: Date.now },
    features: [String],
    photos: [String],
    helpful: [ObjectId]
});

const Review = mongoose.model('Review', reviewSchema);

class ReviewModel {
    static async getReviewsByRestaurantId(restaurantId){
        
    }



}

