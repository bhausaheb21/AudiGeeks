const express = require('express')

const router = express.Router()

router.use(isAuth)
module.exports = router;