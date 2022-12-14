import React from 'react';

export default function Contact() {
	const [formSubmitted, setFormSubmitted] = React.useState(false);

	const onSubmit = async (event) => {
		event.preventDefault();
		const { name, email, subject, message } = event.target;
		await fetch('/api/contact', {
			method: 'POST',
			body: JSON.stringify({
				name: name.value,
				email: email.value,
				subject: subject.value,
				message: message.value,
			}),
		});
		setFormSubmitted(true);
	};

	if (formSubmitted)
		return (
			<p className="text-primary text-sans font-bold tracking-wide text-2xl px-10 text-center">
				Thank you for getting in contact, I will get back to you at the earliest
				possible convenience.
			</p>
		);

	return (
		<form
			className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-4 gap-4 justify-start"
			name="contact"
			onSubmit={onSubmit}
		>
			<label className="sr-only" htmlFor="name">
				Name
			</label>
			<input
				aria-label="name"
				id="name"
				type="text"
				name="name"
				required
				placeholder="Your Name"
				className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			/>
			<label className="sr-only" htmlFor="email">
				Email Address
			</label>
			<input
				aria-label="email"
				id="email"
				type="text"
				name="email"
				placeholder="Your Email Address (optional)"
				className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			/>
			<label className="sr-only" htmlFor="subject">
				Subject
			</label>
			<input
				aria-label="subject"
				id="subject"
				type="text"
				name="messageSubject"
				placeholder="Your Subject (optional)"
				className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			/>
			<label className="sr-only" htmlFor="message">
				Message
			</label>
			<textarea
				aria-label="message"
				id="message"
				required
				name="message"
				className="row-span-3 md:col-start-2 md:row-start-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				placeholder="Your Message"
			/>
			<div className="flex items-baseline">
				<button
					type="submit"
					className="bg-primary text-white font-bold px-4 py-2 mr-4 rounded hover:bg-opacity-75"
				>
					Send Message
				</button>
			</div>
		</form>
	);
}
