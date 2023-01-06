import { get } from '@vercel/edge-config';

const clientId = process.env.STRAVA_CLIENT_ID;
const clientSecret = process.env.STRAVA_CLIENT_SECRET;

const fetchToken = async () => {
	const result = await fetch('https://www.strava.com/oauth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			client_id: clientId,
			client_secret: clientSecret,
			refresh_token: get('refresh_token'),
			grant_type: 'refresh_token',
		}),
	});
	const json = await result.json();
	console.log('token', json);
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
	console.log('stats', json);
	return json.ytd_ride_totals.distance;
};

export default async function handler(_request, response) {
	try {
		const token = await fetchToken();
		const distanceCycled = await fetchStats(token);

		response.status(200).json({ distanceCycled });
	} catch (error) {
		console.error(error);
		response.status(500).json({
			body: 'Could not fetch from Strava.',
		});
	}
}
