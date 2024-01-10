const JWT = require("jsonwebtoken");
const _Error = require('./_Error')
const catchAsync = require('./catchAsync');


// ?        Generating Access -Token      
const signAccessToken = (userId)=>{
    const token = JWT.sign(
		{uID: userId},
		process.env.SECRETE_KEY,
		{expiresIn: "2h", issuer : "Lalit Kumar (JERRY)"},
	);
        return token
}


// ?         Generating Refresh -Token                  
const signRefreshToken = (userId)=>{
	return new Promise((resolve, reject)=>{
		JWT.sign(
			{ _id: userId }, 
			process.env.REFRESH_KEY,
			{
				expiresIn : "2y",
				issuer : "Lalit Kumar (JERRY)"
			},(err, token)=>{
				if(err)console.log(err)
				resolve(token)
			}
			);
	})
}


// ?            Verify Refresh -Token                        
const verifyRefreshToken = (refreshToken)=>{
	return new Promise((resolve, reject)=>{
		JWT.verify(refreshToken, process.env.REFRESH_KEY,(err, payload)=>{
			if(err) console.log(err)
			resolve(payload)
	})

	})
}

// ?               Verify Access - Token                
const verityAccessToken = catchAsync(
	async (req, res, next) => {
		const { authorization } = req.headers;
		const token = authorization.split(' ')[1]
		JWT.verify(token, process.env.SECRETE_KEY, (err, payload)=>{
			if (err){
				const message =
					err.name === "JsonWebTokenError"
						? "Unauthorized"
						: err.message;
				return next(new _Error(message, 401))
			}

			req.payload = payload
			next()
		})

	},
);


// ?       All JWT Helper modules are Exported                
module.exports = {
	signAccessToken,
	signRefreshToken,
	verifyRefreshToken,
	verityAccessToken,
};