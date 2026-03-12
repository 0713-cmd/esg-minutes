export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API 키 설정 확인 필요" });

  try {
    // 2026년 기준 가장 안정적인 'gemini-2.0-flash' 모델로 교체하여 'not found' 에러를 해결합니다.
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    if (data.error) return res.status(data.error.code || 500).json({ error: data.error.message });
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "서버 내부 연결 오류" });
  }
}
