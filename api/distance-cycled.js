const clientId = process.env.STRAVA_CLIENT_ID;
const clientSecret = process.env.STRAVA_CLIENT_SECRET;
const authorizationCode = process.env.STRAVA_AUTHORIZATION_CODE;

const fetchToken = async () => {
	const result = await fetch('https://www.strava.com/oauth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			client_id: clientId,
			client_secret: clientSecret,
			code: authorizationCode,
			grant_type: 'authorization_code',
		}),
	});
	const json = await result.json();
	return json.access_token;
};

const fetchStats = async (token) => {
	const result = await fetch(
		'https://www.strava.com/api/v3/athletes/64997285/stats',
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	const json = await result.json();
	return json.ytd_ride_totals.distance;
};

export default async function handler(_request, response) {
	try {
		const token = await fetchToken();
		const distanceCycled = await fetchStats(token);

		response.status(200).json({
			body: { distanceCycled },
		});
	} catch (error) {
		console.error(error);
		response.status(500).json({
			body: 'Could not fetch from Strava.',
		});
	}
}
