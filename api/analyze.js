export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(200).json({ error: "환경변수 설정이 필요합니다." });

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...req.body,
        generationConfig: {
          temperature: 1.0, 
          topP: 0.95,
          maxOutputTokens: 8192
        }
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(200).json({ error: "연결 오류가 발생했습니다." });
  }
}
