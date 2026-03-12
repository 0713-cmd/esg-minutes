// [api/analyze.js 수정본]
export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API 키 설정 확인 필요" });

  try {
    // v1beta 대신 더 안정적인 v1 버전을 사용하고, 모델명을 확실하게 지정합니다.
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();

    // 구글에서 에러를 보냈을 경우 그 내용을 그대로 화면에 전달합니다.
    if (data.error) {
      return res.status(data.error.code || 500).json({ error: data.error.message });
    }
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "서버 내부 오류 발생" });
  }
}
