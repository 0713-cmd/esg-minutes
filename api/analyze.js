export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API 키 설정 확인 필요" });

  try {
    // 가장 최신형인 v1beta 모델 주소를 사용하여 'not found' 문제를 원천 차단합니다.
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    if (data.error) return res.status(data.error.code || 500).json({ error: data.error.message });
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "서버 내부 오류 발생" });
  }
}
