const User = require('../database/schemas/user.Schema')

const removeOtp = async(
	userId,
) => {
	setTimeout(async () => {
		try {
			await User.findByIdAndUpdate(
				userId,
				(OTP = 0),
				{ new: true },
			);
		} catch (error) {
			console.error(
				"Error removing confirm password:",
				error,
			);
		}
	}, 3000); 
};


module.exports = {removeOtp}