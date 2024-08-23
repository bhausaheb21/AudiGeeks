const mongoose = require('mongoose');

const Gear_TypeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Gear_Type', Gear_TypeSchema)