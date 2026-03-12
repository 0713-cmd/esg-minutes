export default async function handler(req, res) {
  // 화면 직접 입력 키 또는 버셀 환경변수 사용
  const apiKey = req.headers['x-api-key'] || process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API 키를 입력해주세요." });

  try {
    const model = "gemini-3-flash-preview";
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    if (data.error) return res.status(data.error.code || 500).json({ error: data.error.message });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "서버 엔진 연결 오류" });
  }
}
