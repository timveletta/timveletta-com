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
	for (const play of plays) {
		console.log('Play', play.querySelector('item').getAttribute('name'));
	}
	return plays.length;
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
	for (const item of items) {
		console.log('Item', item.querySelector('name').textContent);
	}
	return items.length;
}

export default async function handler(_request, response) {
	try {
		const gamesPlayed = await fetchPlays();
		const totalCollection = await fetchCollection();

		response.status(200).json({ gamesPlayed, totalCollection });
	} catch (error) {
		console.error(error);
		response.status(500).json({
			body: 'Could not fetch data from BGG.',
		});
	}
}
