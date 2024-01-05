const mongoose = require('mongoose')


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
		},
		confirmPassword: {
			type: String,
			// required : [true]
		},
	},
	{ timestamps: true },
);

const User = mongoose.model("users", userSchema)

module.exports = User