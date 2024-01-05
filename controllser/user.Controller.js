const User = require('../database/schemas/user.Schema')
const catchAsync = require('../utility/catchAsync')
const _Error = require('../utility/_Error')


const signUp =catchAsync( async function (req, res, next) {
	const { name, email, password, confirmPassword } =
		req.body;

	if (!name || !email || !password || !confirmPassword) {
		return next(new _Error("Please provide complete details", 400))
	}
	if (password !== confirmPassword) {
		return next(new _Error("Password does not matched", 400))
	}
	if(User.findOne(email)){
		return next(new _Error("user already registered", 400))
	}
	

	const user = await User.create({
		name,
		email,
		password,
	});

		res.status(200).json({
			status: "success",
			user: user,
		});
})

const signIn = catchAsync(async function(req, res, next){
	const {email, password} = req.body;

	if(!email || !password){
		return next(
			new _Error("Please provide email and password"),
			400
		)
	}
	const user = await User.findOne({email})
	if(!user){
		return next(
			new _Error("Invalid email or password", 401)
		)
	}

	if(user.password !== password){
		return next(
			new _Error("Invalid email or password", 401)
		)
	}

	res.status(200).json({
		name : user.name,
		email : user.email,
		id : user._id
	})
})
module.exports ={
	signUp,
	signIn
}













// /////////////////////////////////////////////////////////////////
// const signUp = async function (req, res, next) {
// 	const { name, email, password, confirmPassword } =
// 		req.body;

// 	if (!name || !email || !password || !confirmPassword) {
// 		res.send("Please provide complete body");
// 	}

// 	if (password !== confirmPassword) {
// 		res.send(
// 			"Password and confirmPassword is not matched",
// 		);
// 	}

// 	const user = await User.create({
// 		name,
// 		email,
// 		password,
// 	});
// 	// console.log(req.body)
// 	res.status(200).json({
// 		status: "success",
// 		user: user,
// 	});
// 	// next(err)
// };