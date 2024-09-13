const User = require("../models/User");

class Profile {
    static async getMyProfile(req, res, next) {
        try {
            const { id } = req.user;
            const profile = await User.findById(id);
            return res.json({ message: "Profile Fetched Successfully", profile })
        } catch (err) {
            next(err)
        }
    }

    static async editProfile(req, res, next) {
        try {
            const { id } = req.user;
            const { first_name, last_name, pincode, address } = req.body;
            const profile = await User.findById(id);
            profile.first_name = first_name;
            profile.last_name = last_name;
            profile.pincode = pincode;
            profile.address = address;

            const updatedprofile = await profile.save();
            return res.status(201).json({message : "Updated Successfully", profile : updatedprofile})

        } catch (err) {
            next(err)
        }
    }

    static async updateProfile() {

    }
}

module.exports = Profile;