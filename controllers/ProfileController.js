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
}