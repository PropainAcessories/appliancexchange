const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        default: null
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    review: {
        type: String,
        required: true,
        trim: true
    },
    isRecommended: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
