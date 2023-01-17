import jsdom from 'jsdom';

const { DOMParser } = new jsdom.JSDOM().window;

async function fetchPlays() {
	const result = await fetch(
		'https://boardgamegeek.com/xmlapi2/plays?username=timmahh&mindate=2023-01-01'
	);
	const xml = await result.text();
	const parser = new DOMParser();
	const doc = parser.parseFromString(xml, 'text/xml');
	const plays = doc.querySelectorAll('play');
	return Array.from(plays).map((play) =>
		play.querySelector('item').getAttribute('name')
	);
}

async function fetchCollection() {
	const result = await fetch(
		'https://boardgamegeek.com/xmlapi2/collection?username=timmahh&own=1&brief&subtype=boardgame&excludesubtype=boardgameexpansion'
	);
	if (result.status === 202) {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		return fetchCollection();
	}
	const xml = await result.text();
	const parser = new DOMParser();
	const doc = parser.parseFromString(xml, 'text/xml');
	const items = doc.querySelectorAll('item');
	return Array.from(items).map(
		(item) => item.querySelector('name').textContent
	);
}

export default async function handler(_request, response) {
	try {
		const games = await fetchPlays();
		const collection = await fetchCollection();

		const gamesPlayed = games.filter((game) =>
			collection.includes(game)
		).length;

		response
			.status(200)
			.json({ gamesPlayed, totalCollection: collection.length });
	} catch (error) {
		console.error(error);
		response.status(500).json({
			body: 'Could not fetch data from BGG.',
		});
	}
}
