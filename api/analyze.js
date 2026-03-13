export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(200).json({ error: "API 키를 확인하세요." });

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...req.body,
        generationConfig: {
          temperature: 1.0, // 차장님의 AI 스튜디오 설정값
          responseMimeType: "application/json" // [핵심] 헛소리 방지용 JSON 강제 모드
        }
      })
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(200).json({ error: "연결 실패: " + err.message });
  }
}
