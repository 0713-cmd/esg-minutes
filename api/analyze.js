export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(200).json({ error: "Vercel 설정에서 GEMINI_API_KEY를 확인하세요!" });

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    if (data.error) return res.status(200).json({ error: data.error.message });
    res.status(200).json(data);
  } catch (err) {
    res.status(200).json({ error: "서버 연결 중 예외 발생: " + err.message });
  }
}
