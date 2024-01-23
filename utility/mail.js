const nodemailer = require('nodemailer')

const mail = async(option)=>{
	// Create a transporter object with your email configuration
var transport = nodemailer.createTransport({
	host: "sandbox.smtp.mailtrap.io",
    // service: 'gmail',   
	port: 2525,
	auth: {
		user: process.env.MAIL_USER,   //your email-address
		pass: process.env.MAIL_PASS,    //your email-password
	},
});

	// Email message options
	const mailOptions = {
		from: "Jerry_Node@gmail.com", // Sender's email address
		to: option.email, // Recipient's email address
		subject:"Hello From Jerry_Node OTP", // Email subject
		text: `otp is ${option.OTP}`, // Email body (text version)
	};

	// Send the email
	await transport.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error("Error sending email:", error);
		} else {
			console.log("Email sent:", info.response);
		}
	});
}

module.exports = mail