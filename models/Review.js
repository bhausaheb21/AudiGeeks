const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    gear_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AudioGear'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema)