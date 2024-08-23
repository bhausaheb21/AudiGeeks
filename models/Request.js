const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    request_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    actioned_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    actioned_date: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema)