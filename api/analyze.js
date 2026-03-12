export default async function handler(req, res) {
  const apiKey = req.headers['x-api-key'] || process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API 키를 입력해주세요." });

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "서버 연결 오류" });
  }
}
