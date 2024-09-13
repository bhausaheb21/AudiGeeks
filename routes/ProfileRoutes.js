const express = require('express');
const Profile = require('../controllers/ProfileController');
const { isAuth } = require('../middlewares/isAuth');

const router = express.Router()

router.use(isAuth)
router.get('/myprofile', Profile.getMyProfile)
router.post('/editprofile', Profile.editProfile)
module.exports = router;