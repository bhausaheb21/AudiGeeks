const mongoose = require('mongoose');

const QueueElement = new mongoose.Schema({
    tour_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour Master'
    },
    req_assigned_seq: {
        type: Number
    },
    status: {
        type: String,
        enum: ['Pending'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Queue', QueueElement)