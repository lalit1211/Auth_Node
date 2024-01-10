const express = require('express')
const {verityAccessToken} = require("../utility/jwt_helper");
const {
	signUp,
	signIn,
	refreshToken,
	test,
} = require("../controllser/user.Controller");

const router = express.Router();

router.post("/user/signUp", signUp);
router.post("/user/signIn", signIn);
router.post("/user/refresh-token", refreshToken);
router.post("/", verityAccessToken, test);

module.exports = router