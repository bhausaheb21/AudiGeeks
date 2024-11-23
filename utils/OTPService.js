require('dotenv').config({ path: '../' })

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

exports.getOtp = () => {
    const otp = Math.round(Math.random() * 900000 + 100000);
    let currentTime = new Date();
    let otp_expiry = new Date(currentTime.getTime() + 30 * 60000);
    return { otp, otp_expiry }
}

exports.sendOTP = async (otp, email) => {
    try {
        const mailConfigurations = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Email Verification',
            html: `OTP for Verification ${otp}`
        };
        await transporter.sendMail(mailConfigurations, function (error, info) {
            if (error) throw Error(error);
            console.log('Email Sent Successfully');
        });
    } catch (error) {
        console.log(error);
    }
}

exports.sendOTP2 = async (token, email, name) => {
    try {
        const html = createVerification(name, token);
        const mailConfigurations = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Email Verification',
            html: html
        };
        await transporter.sendMail(mailConfigurations, function (error, info) {
            if (error) throw Error(error);
            console.log('Email Sent Successfully');
        });
    } catch (error) {
        console.log(error);
    }
}


function createVerification(name, token) {
    return `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
        }
        .header {
            text-align: center;
            background-color: #007bff;
            color: white;
            padding: 10px 0;
            border-radius: 8px 8px 0 0;
        }
        .content {
            margin: 20px;
            text-align: center;
        }
        .content p {
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Verification</h1>
        </div>
        <div class="content">
            <p>Welcome ${name},</p>
            <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
            <a href="http://localhost:2103/auth/verifyemail/${token}" class="button">Verify Email</a>
            <p>If you did not sign up for this account, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`
}
