import { parse } from 'node-html-parser';

export default async function handler(_request, response) {
	try {
		const result = await fetch(
			'https://www.goodreads.com/user_challenges/41139180'
		);
		const html = await result.text();
		const root = parse(html);

		const progressText = root.querySelector('.progressText').text;

		response.status(200).json({
			body: { numBooksRead: progressText.match(/\d+/)[0] },
		});
	} catch (error) {
		response.status(500).json({
			body: 'Could not fetch number of books read.',
		});
	}
}
