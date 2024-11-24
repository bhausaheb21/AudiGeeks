const express = require('express');

const { isAuthAdmin } = require('../middlewares/isAuth');

// const AuthController = require('../controllers/AuthController');
const ProfileController = require('../controllers/ProfileController');

const adminRouter = express.Router();

adminRouter.use(isAuthAdmin);


adminRouter.get('/all_users',ProfileController.getAllUsers )
adminRouter.delete('/deleteuser',ProfileController.deleteUser )


module.exports = adminRouter;