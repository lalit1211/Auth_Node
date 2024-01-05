const express = require('express')
const {signUp, signIn}= require('../controllser/user.Controller')

const router = express.Router()


router.post('/user/signUp', signUp)
router.post('/user/signIn', signIn)

module.exports = router