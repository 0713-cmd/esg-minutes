export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API 키 설정 확인 필요" });

  try {
    // 차장님의 AI 스튜디오에 떠 있는 바로 그 이름 'gemini-3-flash'로 조준합니다.
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    
    // 쿼터 에러나 모델 미비 시 상세 내용을 알려줍니다.
    if (data.error) {
      return res.status(data.error.code || 500).json({ error: data.error.message });
    }
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "서버 엔진 연결 오류" });
  }
}
