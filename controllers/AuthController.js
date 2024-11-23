// const User = require(
const bcrypt = require('bcryptjs');

const crypto = require('crypto')
const User = require('../models/User');
const path = require('path')
const jwt = require('jsonwebtoken');
const { getSalt, encryptPass, getToken } = require('../utils/AuthUtils');
const { getOtp, sendOTP, sendOTP2 } = require('../utils/OTPService');



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

            const salt = await getSalt();
            const hashpassword = await encryptPass(password, salt)
            const user = new User({salt, first_name, last_name, role, mobile_no, alt_mob_no, email, pincode, address, password: hashpassword })
            const buffer = crypto.randomBytes(32);
            const token = buffer.toString('hex');
            user.token = token;
            await sendOTP2(token, email, user.first_name);
            const newuser = await user.save();
            return res.status(200).json({ message: "Email sent successfully" })
        } catch (err) {
            console.log(err);
            
            return next(err)
        }
    }

    static async verify(req, res, next) {
        try {
            const { email, id } = req.user;
            const { otp } = req.body;
            const user = await User.findById(id);
            if (parseInt(otp) !== parseInt(user.otp)) {
                const error = new Error("Invalid OTP")
                error.status = 422;
                throw error;
            }

            if (new Date() > user.otp_expiry) {
                const error = new Error("OTP Expired")
                error.status = 422;
                throw error;
            }

            user.verified = true;
            await user.save();

            const payload = {
                id: user._id,
                email: user.email,
                role: user.role,
                verified: user.verified
            }
            const token = getToken(payload);
            return res.status(200).json({ message: "Verification SUccessful", token })
        }
        catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                $or: [
                    // { user_name: email },
                    { email: email }
                ]
            });


            if (!user) {
                const error = new Error("Invalid Username");
                error.status = 404;
                throw error;
            }
            if (!user.verified) {
                const error = new Error("You are not verified user");
                error.status = 422;
                throw error;
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                const error = new Error("Wrong Password");
                error.status = 422;
                throw error;
            }

            const payload = {
                id: user._id,
                email: user.email,
                role: user.role,
                verified: user.verified
            }
            const token = getToken(payload)
            return res.status(200).json({ message: "Sign In successful", token, email: user.email, role: user.role })
        }
        catch (err) {
            next(err)
        }
    }

    static async ResetPassword(req, res, next) {
        try {
            const { email } = req.body;
            const user = await User.findOne({
                $or: [
                    { user_name: email },
                    { email: email }
                ]
            });

            if (!user) {
                const error = new Error("Invalid Email");
                error.status = 404;
                throw error;
            }
            const { otp, otp_expiry } = getOtp()
            user.otp = otp;
            user.otp_expiry = otp_expiry;
            await sendOTP(user.otp, user.email);
            await user.save();

            const payload = {
                id: user._id,
                email: user.email,
                role: user.role,
                first_name: user.first_name
            };
            const token = getToken(payload)

            return res.status(200).json({ message: "OTP sent Successfully", token });

        } catch (error) {
            next(error)
        }
    }

    static async Savepassword(req, res, next) {
        try {
            const { password, cpassword, otp } = req.body;
            const { id } = req.user;
            const user = await User.findById(id);

            if (cpassword !== password) {
                const error = new Error("Password and Confirm Passwords are Different");
                error.status = 422;
                throw error;
            }
            if (parseInt(otp) !== parseInt(user.otp)) {
                const error = new Error("Invalid OTP");
                error.status = 422;
                throw error;
            }
            if (Date.now() > user.otp_expiry) {
                const error = new Error("OTP Expired");
                error.status = 410;
                throw error;
            }
            const hashedpass = await encryptPass(password, user.salt);
            user.password = hashedpass;
            await user.save()
            return res.status(201).json({ message: "Password Reset Successful" });
        }
        catch (err) {
            next(err)
        }
    }

    static async isValidUserName(req, res, next) {
        try {
            const { user_name } = req.body;
            const user = await User.findOne({ user_name });
            console.log(user);

            if (user) {
                const error = new Error("Username already taken")
                error.status = 422;
                throw error;
            }

            return res.status(200).json({ message: "Username Available" })

        } catch (error) {
            next(error)
        }
    }

    static async verifyemail(req, res, next) {

        const { token } = req.params;
        try {
            const { token } = req.params;

            const user = await User.findOne({token});
            if(!user){
                const error = new Error("Page not Found")
                error.status = 404;
                throw error;
            }

            user.verified = true;

            await user.save();

            console.log(path.join(__dirname, '..'));

            
            return res.sendFile(path.join(__dirname, '..','public/verification-success.html'));
        }
        catch (err) {
            console.log(err);
            
            next(err)
        }
        // const user = 



    }

}

module.exports = AuthController;