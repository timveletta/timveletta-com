import { getAll } from '@vercel/edge-config';

const clientId = process.env.STRAVA_CLIENT_ID;
const clientSecret = process.env.STRAVA_CLIENT_SECRET;

const updateEdgeConfig = async ({
	refresh_token,
	access_token,
	expires_at,
}) => {
	const result = await fetch(
		'https://api.vercel.com/v1/edge-config/ecfg_tdmm4r32c9lqprlyps5pcve9wo9m/items',
		{
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
			},
			body: JSON.stringify({
				items: [
					{
						operation: 'update',
						key: 'access_token',
						value: access_token,
					},
					{
						operation: 'update',
						key: 'refresh_token',
						value: refresh_token,
					},
					{
						operation: 'update',
						key: 'expires_at',
						value: expires_at.toString(),
					},
				],
			}),
		}
	);
	const json = await result.json();
	console.log('updated edge config', json);
};

const fetchToken = async () => {
	const { refresh_token, access_token, expires_at } = await getAll([
		'refresh_token',
		'access_token',
		'expires_at',
	]);

	if (expires_at < Date.now() / 1000) {
		return access_token;
	}

	const result = await fetch('https://www.strava.com/oauth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			client_id: clientId,
			client_secret: clientSecret,
			refresh_token,
			grant_type: 'refresh_token',
		}),
	});
	const json = await result.json();
	console.log('token', json);
	await updateEdgeConfig(json);
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
