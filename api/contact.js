import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
	const { name, subject, email, message } = JSON.parse(request.body);
	try {
		const data = await resend.emails.send({
			from: 'contact@timveletta.com',
			to: 'timothy.veletta@gmail.com',
			subject: 'TimVeletta.com Contact Form Submission',
			html: formatMessage(name, subject, email, message),
		});
		response.status(200).json(data);
	} catch (error) {
		response.status(500).json({
			body: 'Message failed to send.',
		});
	}
}
