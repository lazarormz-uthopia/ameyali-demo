export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 
  if (req.method === 'OPTIONS') return res.status(200).end();
 
  const apiKey = process.env.DID_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'DID_API_KEY not configured' });
 
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${apiKey}`
  };
 
  // POST = create a new talk
  if (req.method === 'POST') {
    const { text, lang } = req.body;
    if (!text) return res.status(400).json({ error: 'Text required' });
 
    // Select voice based on language
    const voiceId = lang === 'en'
      ? 'en-US-JennyNeural'
      : 'es-MX-DaliaNeural';
 
    try {
      const createRes = await fetch('https://api.d-id.com/talks', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          source_url: 'https://ameyali-demo.vercel.app/ameyali.png',
          script: {
            type: 'text',
            input: text,
            provider: {
              type: 'microsoft',
              voice_id: voiceId
            }
          },
          config: {
            stitch: true,
            result_format: 'mp4'
          }
        })
      });
 
      if (!createRes.ok) {
        const err = await createRes.text();
        console.error('D-ID create error:', createRes.status, err);
        return res.status(createRes.status).json({ error: 'D-ID error', detail: err });
      }
 
      const data = await createRes.json();
      return res.status(200).json({ id: data.id, status: data.status });
 
    } catch (err) {
      console.error('D-ID error:', err);
      return res.status(500).json({ error: err.message });
    }
  }
 
  // GET = poll for talk status
  if (req.method === 'GET') {
    const talkId = req.query.id;
    if (!talkId) return res.status(400).json({ error: 'Talk ID required' });
 
    try {
      const pollRes = await fetch(`https://api.d-id.com/talks/${talkId}`, {
        method: 'GET',
        headers
      });
 
      if (!pollRes.ok) {
        const err = await pollRes.text();
        return res.status(pollRes.status).json({ error: err });
      }
 
      const data = await pollRes.json();
      return res.status(200).json({
        status: data.status,
        result_url: data.result_url || null
      });
 
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
 
  return res.status(405).json({ error: 'Method not allowed' });
}
