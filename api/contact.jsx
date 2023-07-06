import { Resend } from 'resend';
import * as React from 'react';

const EmailTemplate = ({ firstName }) => (
	<div>
		<h1>Welcome, {firstName}!</h1>
	</div>
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request, response) {
	const { name, subject, email, message } = JSON.parse(request.body);
	try {
		const data = await resend.emails.send({
			from: 'contact@timveletta.com',
			to: 'timothy.veletta@gmail.com',
			subject: 'TimVeletta.com Contact Form Submission',
			react: EmailTemplate({ firstName: name }),
		});
		response.status(200).json(data);
	} catch (error) {
		response.status(500).json({
			body: 'Message failed to send.',
		});
	}
}
