const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    brandname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brandmanager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Brand', BrandSchema)