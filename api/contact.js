import mail from '@sendgrid/mail';
mail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
	to: 'timothy.veletta@gmail.com', // Change to your recipient
	from: 'test@example.com', // Change to your verified sender
	subject: 'TimVeletta.com Contact Form Submission',
};

export default async function handler(request, response) {
	console.log('Request', request);
	try {
		const result = await mail.send({
			...msg,
			text: `Name: ${request.body.name}\nEmail: ${request.body.email}\nSubject: ${request.body.subject}\nMessage: ${request.body.message}`,
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
