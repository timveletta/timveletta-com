import mail from '@sendgrid/mail';
mail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
	to: 'timothy.veletta@gmail.com', // Change to your recipient
	from: 'contact@em3617.timveletta.com', // Change to your verified sender
	subject: 'TimVeletta.com Contact Form Submission',
};

function formatMessage(name, subject, email, message) {
	return `
	<h1>TimVeletta.com Contact Form Submission</h1>
	<p><strong>Name:</strong> ${name}</p>
	<p><strong>Subject:</strong> ${subject || 'None'}</p>
	<p><strong>Email:</strong> ${email || 'None'}</p>
	<p><strong>Message:</strong> ${message}</p>
  `;
}

export default async function handler(request, response) {
	try {
		const result = await mail.send({
			...msg,
			html: formatMessage(
				request.body.name,
				request.body.subject,
				request.body.email,
				request.body.message
			),
		});
		response.status(result[0].statusCode).json({
			body: 'Message sent successfully!',
		});
	} catch (error) {
		response.status(500).json({
			body: 'Message failed to send.',
		});
	}
}
