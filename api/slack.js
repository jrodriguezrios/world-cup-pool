export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const WEBHOOK = 'https://hooks.slack.com/services/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';

  try {
    const response = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const text = await response.text();
    res.status(200).json({ ok: true, slack: text });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
