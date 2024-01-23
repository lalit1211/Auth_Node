const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name can not be blank"],
			minlength: [
				3,
				"Name should be at least 3 characters",
			],
			maxlength: [
				50,
				"Name should not be exceed more than 50 characters",
			],
		},
		email: {
			type: String,
			lowercase: true,
			required: [
				true,
				"E-mail is mandatory to provide",
			],
			unique: [true, "E-mail is already registered"],
		},
		password: {
			type: String,
			required: [true, "A user must have a password"],
			minlength: [
				4,
				"Password should have at least 4 characters",
			],
			maxlength: [
				50,
				"Password should not exceed more than 50 characters",
			],
			select: false,
		},
		confirmPassword: {
			type: String,
			minlength: [
				4,
				"Password should have at least 4 characters",
			],
			maxlength: [
				50,
				"Password should not exceed more than 50 characters",
			],
		},
		OTP: {
			type: Number,
			// default: 0,
		},
	},
	{ timestamps: true },
);


userSchema.pre('save', async function(next){
	if(this.isModified('password')){
		const hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
	}
})

userSchema.methods.generateOTP = async function () {
	this.OTP = Math.floor(Math.random() * 1000000);
	// this.OTPExpiry = new Date(Date.now() + 1000000);

	await this.save({ validateBeforeSave: false });
};

const User = mongoose.model("users", userSchema)

module.exports = User