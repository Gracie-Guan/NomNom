const ReviewModel = require('../models/ReviewModel');

class ReviewController {

    static async getReviewList(req, res) {
        try{
            const reviewList = await ReviewModel.getReviewList();
            res.status(200).json(reviewList);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };

    static async getReviewById(req, res) {
        const reviewId = req.params.restaurant_id;
        console.log("ReviewController - reviewId: ", reviewId);
        try {
            const review = await ReviewModel.getReviewById(reviewId);
            if (review) {
                res.json(review);
            } else {
                res.status(404).json({ message: 'Review not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


}

module.exports = ReviewController;