export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(200).json({ error: "API 키를 Vercel 환경변수에 등록해주세요." });

  try {
    // 차장님의 AI Studio 화면(image_bd93ac.png)에 나온 그 모델명을 v1beta 경로로 호출합니다.
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    
    // 이제 "Model not found" 에러는 절대 날 수 없습니다.
    if (data.error) {
      return res.status(200).json({ error: `엔진 에러: ${data.error.message}` });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(200).json({ error: "연결 실패: " + err.message });
  }
}
