const mongoose = require('mongoose');

const GrievanceSchema = new mongoose.Schema({
    grievance: {
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

module.exports = mongoose.model('Grievance', GrievanceSchema)