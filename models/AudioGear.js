const mongoose = require('mongoose')

const AudioGearModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desription: {
        type: String,
        required: true
    },
    specification: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending'],
    },
    brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gear_Type'
    },
    images : [
        {
            type : String
        }
    ]
})

module.exports = mongoose.model("AudioGear", AudioGearModel)