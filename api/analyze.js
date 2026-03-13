export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(200).json({ error: "Vercel 설정에서 API 키를 확인하세요!" });

  try {
    // [수정] 최신 Gemini 3 Flash 모델 전용 경로
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    if (data.error) return res.status(200).json({ error: `엔진 에러: ${data.error.message}` });
    res.status(200).json(data);
  } catch (err) {
    res.status(200).json({ error: "네트워크 연결 실패: " + err.message });
  }
}
