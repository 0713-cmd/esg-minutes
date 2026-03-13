export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(200).json({ error: "API 키가 Vercel에 설정되지 않았습니다." });

  try {
    // 가장 안정적인 v1 경로를 사용합니다.
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    
    // 에러 메시지가 오면 상세히 반환하여 차장님이 확인하실 수 있게 합니다.
    if (data.error) {
      return res.status(200).json({ error: `구글 엔진 에러: ${data.error.message}` });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(200).json({ error: "연결 실패: " + err.message });
  }
}
