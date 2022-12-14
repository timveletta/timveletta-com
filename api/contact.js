const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
	to: 'timothy.veletta@gmail.com', // Change to your recipient
	from: 'test@example.com', // Change to your verified sender
	subject: 'TimVeletta.com Contact Form Submission',
};

export default async function handler(request, response) {
	const { name, email, subject, message } = request.body;

	try {
		const result = await mail.send({
			...msg,
			text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
		});
		console.log(result);
		response.status(result[0].statusCode).json({
			body: 'Message sent successfully!',
		});
	} catch (error) {
		console.log(error);
		response.status(500).json({
			body: 'Message failed to send.',
		});
	}
}
