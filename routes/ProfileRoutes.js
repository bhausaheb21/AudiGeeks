const express = require('express');
const { isAuth } = require('../middlewares/isAuth');
const ProfileController = require('../controllers/ProfileController');

const router = express.Router()

router.use(isAuth)
router.get('/myprofile', ProfileController.getMyProfile)
router.post('/editprofile', ProfileController.editProfile)


module.exports = router;