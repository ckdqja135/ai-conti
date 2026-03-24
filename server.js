import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API 키: .env 파일 또는 프론트에서 전달
function getClient(apiKey) {
  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key || key === 'your-api-key-here') {
    throw new Error('API 키가 설정되지 않았습니다.');
  }
  return new GoogleGenAI({ apiKey: key });
}

// JSON 복구 함수: 잘린 응답을 마지막 완전한 객체까지 잘라서 복구
function repairJson(str) {
  // 마지막으로 완전히 닫힌 } 위치를 찾아서 그 뒤의 불완전한 부분을 버림
  // "scripture_connection": "..." } <-- 이런 완전한 객체의 마지막 }
  let depth = 0;
  let lastValidEnd = -1;

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === '"') {
      // 문자열 건너뛰기
      i++;
      while (i < str.length && str[i] !== '"') {
        if (str[i] === '\\') i++; // 이스케이프 건너뛰기
        i++;
      }
    } else if (ch === '{' || ch === '[') {
      depth++;
    } else if (ch === '}' || ch === ']') {
      depth--;
      if (depth >= 0) lastValidEnd = i;
    }
  }

  // 마지막 완전한 위치까지 자르기
  if (lastValidEnd > 0 && depth !== 0) {
    str = str.substring(0, lastValidEnd + 1);
  }

  // trailing comma 제거
  str = str.replace(/,\s*([}\]])/g, '$1');

  // 남은 미닫힘 괄호 추가
  const opens = (str.match(/\[/g) || []).length - (str.match(/\]/g) || []).length;
  const braces = (str.match(/\{/g) || []).length - (str.match(/\}/g) || []).length;
  str += ']'.repeat(Math.max(0, opens));
  str += '}'.repeat(Math.max(0, braces));

  return str;
}

const SYSTEM_PROMPT = `당신은 한국 교회 찬양팀의 전문 콘티(예배 셋리스트) 디렉터입니다.
20년 이상의 예배 인도 경험을 가지고 있으며, 한국 교회에서 사용되는 찬양곡에 대해 깊은 지식을 보유하고 있습니다.

당신의 역할:
1. 주어진 성경 말씀, 예배 주제, 분위기에 맞는 찬양 콘티를 구성합니다.
2. 곡 간의 자연스러운 전환(키, BPM, 에너지 흐름)을 고려합니다.
3. 예배의 전체적인 에너지 커브를 설계합니다 (보통: 시작은 밝고 에너지 있게 → 중반 경배의 절정 → 후반 묵상/헌신으로 내려옴).
4. 각 곡을 선택한 이유를 말씀과 연결하여 설명합니다.

곡 추천 시 다음을 포함해야 합니다:
- 한국 교회에서 실제로 많이 부르는 곡 (마커스워십, 어노인팅, 예수전도단, 디사이플스, 찬송가 등)
- 곡의 정확한 키와 BPM 정보
- 곡의 분위기/에너지 레벨

반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트 없이 JSON만 출력하세요:
{
  "songs": [
    {
      "title": "곡 제목",
      "artist": "아티스트/출처",
      "key": "G",
      "bpm": 120,
      "mood": "경배|찬양|감사|고백|묵상|헌신|기쁨|위로 중 하나만",
      "energy": 7,
      "reason": "선택 이유 1~2문장",
      "scripture_connection": "관련 성경 구절",
      "duration_min": 4,
      "ment": "이 곡을 부르기 전 인도자 멘트 예시 (1~2문장, 기도/말씀 인용/분위기 전환 등). 최소 절반 이상의 곡에 반드시 포함"
    }
  ],
  "transitions": [
    {
      "from_index": 0,
      "to_index": 1,
      "note": "전환 팁 1문장"
    }
  ],
  "overall_flow": "전체 예배 흐름에 대한 간략한 설명",
  "mood_flow": ["기쁨", "찬양", "경배", "묵상", "헌신"],
  "leader_notes": ["인도자를 위한 유의사항 1", "유의사항 2"]
}`;

app.post('/api/generate-conti', async (req, res) => {
  try {
    const {
      scripture,
      verseContent,
      theme,
      selectedMoods,
      preferredKey,
      totalTime,
      songCount: requestedSongCount,
      apiKey,
    } = req.body;

    const ai = getClient(apiKey);

    // 곡 수: 사용자가 지정하면 그대로, 아니면 시간 기반 자동 계산
    const songCount = (requestedSongCount && requestedSongCount > 0)
      ? requestedSongCount
      : Math.max(3, Math.min(8, Math.round((totalTime || 20) / 4)));

    let userPrompt = `다음 조건에 맞는 찬양 콘티를 ${songCount}곡으로 구성해주세요.\n\n`;

    if (scripture) {
      userPrompt += `📖 말씀 본문: ${scripture}\n`;
    }
    if (verseContent) {
      userPrompt += `📝 말씀 내용:\n${verseContent}\n\n`;
    }
    if (theme) {
      userPrompt += `🎯 예배 주제: ${theme}\n`;
    }
    if (selectedMoods && selectedMoods.length > 0) {
      userPrompt += `🌈 원하는 분위기 흐름: ${selectedMoods.join(' → ')}\n`;
    }
    if (preferredKey) {
      userPrompt += `🎹 선호 키: ${preferredKey}\n`;
    }
    userPrompt += `⏱️ 전체 시간: 약 ${totalTime || 20}분\n`;
    userPrompt += `🎵 총 곡 수: ${songCount}곡\n\n`;

    userPrompt += `요구사항:
- 한국 교회에서 실제로 자주 부르는 곡들로 구성해주세요
- 각 곡의 키(key), BPM, 에너지 레벨(1~10)을 정확히 제공해주세요
- 곡 간 키 전환이 자연스러운지 확인해주세요
- 말씀 본문의 메시지와 각 곡이 어떻게 연결되는지 설명해주세요
- 에너지 흐름이 예배의 자연스러운 곡선을 따르도록 해주세요
- 각 곡의 예상 소요 시간(duration_min)을 분 단위로 제공해주세요
- 곡 사이에 인도자가 할 수 있는 멘트나 기도 문구(ment)를 반드시 절반 이상의 곡에 포함해주세요. 예: "우리의 목자 되신 주님을 찬양합니다", "잠시 눈을 감고 주님의 임재 앞에 나아갑시다" 등
- 예배 인도자를 위한 전체적인 유의사항(leader_notes)을 2~3개 제공해주세요
- JSON 형식으로만 응답해주세요`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 8192,
      },
    });

    // Gemini 응답에서 JSON 추출
    let responseText = response.text;
    console.log('Gemini 원본 응답 길이:', responseText.length);

    // ```json ... ``` 블록 추출 또는 순수 JSON 추출
    let jsonStr = responseText.trim();
    const codeBlockMatch = jsonStr.match(/```json\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      jsonStr = codeBlockMatch[1].trim();
    } else {
      // { 로 시작하는 JSON 부분만 추출
      const jsonStart = jsonStr.indexOf('{');
      if (jsonStart !== -1) {
        jsonStr = jsonStr.substring(jsonStart);
      }
    }

    let contiData;
    try {
      contiData = JSON.parse(jsonStr);
    } catch (parseErr) {
      console.error('1차 파싱 실패:', parseErr.message);
      // JSON 복구 시도
      jsonStr = repairJson(jsonStr);
      try {
        contiData = JSON.parse(jsonStr);
        console.log('JSON 복구 성공');
      } catch (finalErr) {
        console.error('최종 파싱 실패:', finalErr.message);
        console.error('응답 앞부분:', responseText.substring(0, 300));
        throw new Error('AI 응답을 파싱할 수 없습니다. 다시 시도해주세요.');
      }
    }

    res.json({ success: true, data: contiData });

  } catch (error) {
    console.error('Error:', error.message);

    // 429 Rate Limit 에러 처리
    let userMessage = error.message || 'AI 콘티 생성 중 오류가 발생했습니다.';
    let retrySeconds = null;

    try {
      const parsed = JSON.parse(error.message);
      if (parsed?.error?.code === 429) {
        const retryInfo = parsed.error.details?.find(d => d['@type']?.includes('RetryInfo'));
        retrySeconds = retryInfo?.retryDelay ? Math.ceil(parseFloat(retryInfo.retryDelay)) : 30;
        userMessage = 'API 요청 한도에 도달했습니다.';
      }
    } catch {
      if (error.message?.includes('429') || error.message?.includes('RESOURCE_EXHAUSTED')) {
        const retryMatch = error.message.match(/retry\s*(?:in|Delay['":\s]*)\s*([\d.]+)/i);
        retrySeconds = retryMatch ? Math.ceil(parseFloat(retryMatch[1])) : 30;
        userMessage = 'API 요청 한도에 도달했습니다.';
      }
    }

    res.status(500).json({
      success: false,
      error: userMessage,
      retrySeconds,
    });
  }
});

// 건강 체크
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🎵 찬양 콘티 API 서버 실행 중: http://localhost:${PORT}`);
});
