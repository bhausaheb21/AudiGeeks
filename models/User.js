const mongoose = require('mongoose')


const userModel = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Audiophile', 'Tour Manager', 'Brand Manager', 'Admin'],
        default: 'Audiophile'
    },
    mobile_no: {
        type: String,
        required: true
    },
    alt_mob_no: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    pincode: {
        type: Number
    },
    address: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    HeadFi: String,
    FaceBook: String,
    Youtube: String,
    Blog: String,
    password: {
        type: String,
        required: true
    },
    salt: String,
    otp: Number,
    otp_expiry: Date,
}, {
    timestamps: true,
    toJSON: {
        transform: (obj, ret) => {
            delete ret._id;
            delete ret.createdAt
            delete ret.updatedAt
            delete ret.salt
            delete ret.otp
            delete ret.password
            delete ret.otp_expiry
            delete ret.resettoken
            delete ret.token_expiry
        }
    }
})


module.exports = mongoose.model('User', userModel)