export default async function handler(req, res) {
  // Permitir llamadas desde el navegador (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const response = await fetch(
      'https://api.football-data.org/v4/competitions/WC/matches?status=FINISHED',
      {
        headers: {
          'X-Auth-Token': 'f17620b907c044f3bf64ce176708ca3d'
        }
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: `API error: ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
