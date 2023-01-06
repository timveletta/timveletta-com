async function fetchPlays() {
	const result = await fetch(
		'https://boardgamegeek.com/xmlapi2/plays?username=timmahh&mindate=2023-01-01'
	);
	const xml = await result.text();
	const parser = new DOMParser();
	const doc = parser.parseFromString(xml, 'text/xml');
	const plays = doc.querySelectorAll('play');
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
	return items.length;
}

export default async function handler(_request, response) {
	try {
		const gamesPlayed = await fetchPlays();
		const totalCollection = await fetchCollection();

		response.status(200).json({
			body: { gamesPlayed, totalCollection },
		});
	} catch (error) {
		console.error(error);
		response.status(500).json({
			body: 'Could not fetch data from BGG.',
		});
	}
}
