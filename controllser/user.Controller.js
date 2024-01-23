const User = require('../database/schemas/user.Schema')
const catchAsync = require('../utility/catchAsync')
const _Error = require('../utility/_Error')
const bcrypt = require('bcrypt')
const {removeOtp} = require('../utility/otp_remover')
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../utility/jwt_helper')


// ?               User Register Module                                     
const signUp =catchAsync( async function (req, res, next) {
	const { name, email, password, confirmPassword } =
		req.body;

	if (!name || !email || !password || !confirmPassword) {
		return next(new _Error("Please provide complete details", 400))
	}
	if (password !== confirmPassword) {
		return next(new _Error("Password does not matched", 400))
	}
	if(await User.findOne({email})){
		return next(new _Error("user already registered", 400))
	}
	
	const user = await User.create({
		name,
		email,
		password,
	});

	const accessToken =  signAccessToken(user._id)
	const refreshToken = await signRefreshToken(user._id)

		res.status(200).json({
			user:{
				id: user._id,
				name: user.name,
				email: user.email,
			},
			token: accessToken,
			rfToken : refreshToken
		});
})




// ?                  User SignIn Module                                                     
const signIn = catchAsync(async function(req, res, next){
	const {email, password} = req.body;

	if(!email || !password){
		return next(
			new _Error("Please provide email and password", 422)
		)
	}
	const user = await User.findOne({email}).select('+password')
	if(!user){
		return next(
			new _Error("Invalid email or password", 401)
		)
	}

	const isMatched = await bcrypt.compare(password, user.password)
	if(!isMatched){
		return next(new _Error("Invalid email/password", 422))
	}

	const accessToken = signAccessToken(user._id);
	const refreshToken = await signRefreshToken(user._id)

	res.status(200).json({
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
		},
		token: accessToken,
		rfToken : refreshToken
	});
})


// ?             User Forget-password module            

const forgotPassword = catchAsync(async (req, res, next)=>{
	const {email} = req.body

	if(!email)return next(new _Error("Please enter your email!", 422))
	const user = await User.findOne({email})
	if(!user)return next(
		new _Error(
			`user with email: ${email} does not exist`,
			404,
		),
	);

	//. It will generate OTP and remove it from database after 60-sec
	await user.generateOTP()
	setTimeout(async()=>{
		await User.findByIdAndUpdate(user._id, {OTP: ''}, {new: true} )
	}, 60000)

	res.status(200).json({
		status : "success",
		user: user
	})
})


// ?         Reset-Password module                    
const resetPassword = catchAsync(async (req, res, next)=>{
	const {email, OTP, password, confirmPassword} = req.body

	if(!email || !OTP || !password || !confirmPassword)return next(new _Error("Incomplete details", 422))
	if(password !== confirmPassword)return next(new _Error('password does not match', 400))
	const hashedPassword = await bcrypt.hash(password, 10)
	const user = await User.findOne({email})
	if(!user || OTP!==user.OTP)return next(new _Error("Invalid email/password", 422))

	const usr = await User.findByIdAndUpdate(user._id, {password: hashedPassword}, {new:true})
		const accessToken = signAccessToken(user._id);
		const refreshToken = await signRefreshToken(user._id);

	res.status(200).json({
		status: "User update successfully",
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
		},
		token: accessToken,
		rfToken: refreshToken,
	});

})











// ?   Generating new AccessToken and RefreshToken also verify to AccessToken              
const refreshToken = catchAsync (async (req, res, next)=>{
	const {refreshToken} = req.body
	if(!refreshToken) return next( new _Error("Bad Request", 422))

	const vrfToken = await verifyRefreshToken(refreshToken)
	const accessToken = signAccessToken(vrfToken.uID);
	const newRefreshToken = await signRefreshToken(vrfToken.uID);

	res.status(200).json({
		accessToken : accessToken,
		refreshToken : newRefreshToken
	})

})

// ?     Test module for checking AccessToken                            
const test = catchAsync(async(req, res, next)=>{
	console.log(req.payload)

	res.send("wow")
})




// ?    All user related modules Exported                                
module.exports ={
	signUp,
	signIn,
	resetPassword,
	forgotPassword,
	refreshToken,
	test
}