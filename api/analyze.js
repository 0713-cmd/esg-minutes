export default async function handler(req, res) {
  // 1. 화면에서 직접 입력한 키가 있으면 그것을 먼저 쓰고, 없으면 Vercel 환경변수를 씁니다.
  const apiKey = req.headers['x-api-key'] || process.env.GEMINI_API_KEY;
  
  if (!apiKey) return res.status(500).json({ error: "API 키가 없습니다. 화면 좌측 하단에 키를 입력해주세요." });

  try {
    // [중요] image_8095bb.png 기준 정확한 모델명은 gemini-3-flash-preview 입니다.
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
