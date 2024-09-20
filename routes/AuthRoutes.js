
const express = require('express');
const AuthController = require('../controllers/AuthController');
const { getPayload } = require('../utils/AuthUtils');


const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/reset_password', AuthController.ResetPassword);
router.post('/verify_username', AuthController.isValidUserName);



router.use((req, res, next) => {
    try {
        const token = req.get("Authorization")?.split(" ")[1];
        if (!token) {
            const error = new Error("Not authenticated")
            error.status = 403;
            throw error;
        }
        const payload = getPayload(token);
        req.user = payload;
        next();
    } catch (error) {
        next(error)
    }
})

router.post('/verify', AuthController.verify);
router.post('/save_password', AuthController.Savepassword);
// router.post('/verify', AuthController.verify);

module.exports = router;