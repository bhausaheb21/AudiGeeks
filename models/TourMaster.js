const mongoose = require('mongoose');

const TourMasterSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: String
    },
    end_date: {
        type: Date,
        required: true
    },
    time_allocated: {
        type: Number,
        required: true
    },
    associated_gears: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AudioGear'
        }
    ],
    initiating_tour_manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    backup_tour_manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    concluding_tour_manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });

module.exports = mongoose.model('Tour Master', TourMasterSchema)