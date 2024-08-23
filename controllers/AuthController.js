// const User = require(
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken')



class AuthController {

    static async register(req, res, next) {
        try {
            const { first_name, last_name, role, mobile_no, alt_mob_no, email, pincode, address, password, c_password } = req.body;

            const existing_user = await User.findOne({
                $or: {
                    email: email,
                    mobile_no: mobile_no
                }
            })

            if (existing_user) {
                const error = new Error("User with email address or mobile no already exists ...")
                error.status = 422;
                throw error;
            }

            if (c_password !== password) {
                const error = new Error("Both Passwords are different")
                error.status = 422;
                throw error;
            }
            console.log(req.body);
            
            const salt = await bcrypt.genSalt(12)
            const hashpassword =await bcrypt.hash(password, salt)
            const user = new User({ salt, first_name, last_name, role, mobile_no, alt_mob_no, email, pincode, address, password: hashpassword })
            const newuser = await user.save();
            return res.status(200).json({message : "Registration Successful ...!", _id : newuser._id}) 
        } catch (err) {
            return next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email: email });

            if (!user) {
                const error = new Error("Invalid Username");
                error.status = 404;
                throw error;
            }

            const match = bcrypt.compare(password, user.password);

            if (!match) {
                const error = new Error("Wrong Password");
                error.status = 422;
                throw error;
            }
            const token = jwt.sign({
                email: user.email,
                role: user.role,
                first_name: user.first_name
            }, process.env.SECRET_KEY)
            return res.status(200).json({ message: "Sign In successful", token, email: user.email })
        }
        catch (err) {
            next(err)
        }



    }

}

module.exports = AuthController;