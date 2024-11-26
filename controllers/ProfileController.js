const { default: mongoose } = require("mongoose");
const User = require("../models/User");

class ProfileController {
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
            return res.status(201).json({ message: "Updated Successfully", profile: updatedprofile })

        } catch (err) {
            next(err)
        }
    }

    static async getAllUsers(req, res, next) {
        try {
            const user = req.user;
            if (!user) {
                const error = new Error("Not authenticated")
                error.status = 403;
                throw error;
            }

            const users = await User.find();
            // users[0].
            return res.status(200).json({ message: "All users fetched successfully", users });
        }
        catch (err) {
            next(err)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const {id} = req.user;

            console.log("request to delete");


            const { _id } = req.body;
            console.log(_id);
            

            
            if (new mongoose.Types.ObjectId(id) === new mongoose.Types.ObjectId(_id)) {
                const error = new Error("Invalid Operation")
                error.status = 403;
                throw error;
            }

            const user = await User.findById(_id)

            if(!user){
                const error = new Error("User Not Found")
                error.status = 404;
                throw error;
            }

            if (id) {
                const error = new Error("Not authenticated")
                error.status = 403;
                throw error;
            }

            const result = await User.findByIdAndDelete(_id);

            console.log("Deleted");
            
            // u

            if (!result) {
                const error = new Error("Invalid User")
                error.status = 404;
                throw error;
            }
            return res.status(200).json({ message: "User deleted successfully" });
        }
        catch (err) {
            next(err)
        }
    }


}

module.exports = ProfileController;