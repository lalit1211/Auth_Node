const JWT = require("jsonwebtoken");
const _Error = require('./_Error')
const catchAsync = require('./catchAsync')

signAccessToken = (userId)=>{
    const token = JWT.sign(
		{
			audience: userId,
		},
		process.env.SECRETE_KEY,
		{
			expiresIn: "2h",
		},
	);
        return token
}



module.exports = {
    signAccessToken
}