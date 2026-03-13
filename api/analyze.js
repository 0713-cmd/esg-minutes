export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(200).json({ error: "API 키 설정 확인 필요" });

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...req.body,
        generationConfig: {
          temperature: 1.0, // 차장님의 AI 스튜디오 설정과 동일하게 변경
          topP: 0.95,
          maxOutputTokens: 8192
        }
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(200).json({ error: "연결 실패: " + err.message });
  }
}
