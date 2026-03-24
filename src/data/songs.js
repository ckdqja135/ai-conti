/**
 * 찬양 데이터베이스
 *
 * mood: 곡의 주요 분위기
 * energy: 1~10 에너지 레벨 (1: 매우 잔잔, 10: 매우 역동)
 * tempo: slow | medium | fast
 * themes: 곡과 관련된 성경적 테마/키워드
 * scripture: 관련 성경 구절
 * season: 교회력 시즌 (일반, 대림절, 성탄절, 사순절, 부활절, 성령강림절)
 */
export const SONGS = [
  // ──────────────── 경배 (Worship) ────────────────
  { id: 1, title: "주 하나님 지으신 모든 세계", artist: "찬송가 79장", key: "G", bpm: 100, mood: "경배", energy: 7, tempo: "medium", themes: ["창조", "자연", "위대", "영광"], scripture: ["시편 19:1", "로마서 1:20"], season: "일반" },
  { id: 2, title: "거룩 거룩 거룩", artist: "찬송가 8장", key: "D", bpm: 90, mood: "경배", energy: 6, tempo: "medium", themes: ["거룩", "삼위일체", "영광", "보좌"], scripture: ["이사야 6:3", "요한계시록 4:8"], season: "일반" },
  { id: 3, title: "높이 계신 주님", artist: "마커스워십", key: "B", bpm: 78, mood: "경배", energy: 5, tempo: "medium", themes: ["높임", "영광", "보좌", "존귀"], scripture: ["시편 113:4"], season: "일반" },
  { id: 4, title: "위대하신 주", artist: "어노인팅", key: "G", bpm: 82, mood: "경배", energy: 6, tempo: "medium", themes: ["위대", "영광", "창조", "전능"], scripture: ["시편 145:3"], season: "일반" },
  { id: 5, title: "예수 우리 왕이여", artist: "어노인팅", key: "D", bpm: 130, mood: "경배", energy: 9, tempo: "fast", themes: ["왕", "승리", "선포", "통치"], scripture: ["빌립보서 2:10-11"], season: "일반" },
  { id: 6, title: "주의 이름 높이며", artist: "예수전도단", key: "A", bpm: 140, mood: "경배", energy: 9, tempo: "fast", themes: ["찬양", "높임", "이름", "선포"], scripture: ["시편 148:13"], season: "일반" },
  { id: 7, title: "왕이신 나의 하나님", artist: "예수전도단", key: "E", bpm: 120, mood: "경배", energy: 8, tempo: "fast", themes: ["왕", "경배", "통치", "주권"], scripture: ["시편 47:7"], season: "일반" },
  { id: 8, title: "주 만이 내 반석", artist: "디사이플스", key: "D", bpm: 110, mood: "경배", energy: 7, tempo: "medium", themes: ["반석", "의지", "견고", "피난처"], scripture: ["시편 18:2", "시편 62:6"], season: "일반" },
  { id: 9, title: "주님께 드립니다", artist: "마커스워십", key: "G", bpm: 68, mood: "경배", energy: 4, tempo: "slow", themes: ["헌신", "예배", "드림", "봉헌"], scripture: ["로마서 12:1"], season: "일반" },
  { id: 10, title: "이 땅에 오셔서", artist: "마커스워십", key: "E", bpm: 72, mood: "경배", energy: 4, tempo: "slow", themes: ["성육신", "사랑", "은혜", "십자가"], scripture: ["요한복음 1:14", "빌립보서 2:7"], season: "성탄절" },
  { id: 11, title: "주님이 다스리네", artist: "예수전도단", key: "A", bpm: 126, mood: "경배", energy: 8, tempo: "fast", themes: ["통치", "다스림", "왕", "주권"], scripture: ["시편 93:1"], season: "일반" },
  { id: 12, title: "영광 홀로 하나님께", artist: "마커스워십", key: "D", bpm: 74, mood: "경배", energy: 5, tempo: "slow", themes: ["영광", "경배", "찬양"], scripture: ["로마서 11:36"], season: "일반" },
  { id: 13, title: "주의 영광 나타나셨네", artist: "어노인팅", key: "G", bpm: 116, mood: "경배", energy: 8, tempo: "fast", themes: ["영광", "나타남", "임재"], scripture: ["이사야 60:1"], season: "일반" },
  { id: 14, title: "찬양하라 내 영혼아", artist: "마커스워십", key: "E", bpm: 124, mood: "경배", energy: 8, tempo: "fast", themes: ["찬양", "영혼", "찬송"], scripture: ["시편 103:1"], season: "일반" },

  // ──────────────── 찬양 (Praise) ────────────────
  { id: 15, title: "감사해", artist: "마커스워십", key: "G", bpm: 132, mood: "찬양", energy: 8, tempo: "fast", themes: ["감사", "기쁨", "찬양"], scripture: ["데살로니가전서 5:18"], season: "일반" },
  { id: 16, title: "주의 사랑이 나를", artist: "디사이플스", key: "A", bpm: 126, mood: "찬양", energy: 8, tempo: "fast", themes: ["사랑", "구원", "변화"], scripture: ["로마서 8:38-39"], season: "일반" },
  { id: 17, title: "좋으신 하나님", artist: "마커스워십", key: "D", bpm: 120, mood: "찬양", energy: 7, tempo: "fast", themes: ["선하심", "감사", "인자", "좋으심"], scripture: ["시편 107:1", "시편 136:1"], season: "일반" },
  { id: 18, title: "주는 좋은 것으로", artist: "마커스워십", key: "E", bpm: 118, mood: "찬양", energy: 7, tempo: "medium", themes: ["채움", "감사", "만족", "풍성"], scripture: ["시편 103:5", "시편 107:9"], season: "일반" },
  { id: 19, title: "주님은 우리의 참된 평화", artist: "예수전도단", key: "D", bpm: 110, mood: "찬양", energy: 6, tempo: "medium", themes: ["평화", "안식", "화평", "화목"], scripture: ["에베소서 2:14", "요한복음 14:27"], season: "일반" },
  { id: 20, title: "날 구원하신 주", artist: "어노인팅", key: "G", bpm: 128, mood: "찬양", energy: 8, tempo: "fast", themes: ["구원", "감사", "은혜", "승리"], scripture: ["에베소서 2:8"], season: "일반" },
  { id: 21, title: "살아 계신 주", artist: "예수전도단", key: "E", bpm: 136, mood: "찬양", energy: 9, tempo: "fast", themes: ["부활", "살아계심", "생명"], scripture: ["요한계시록 1:18"], season: "부활절" },
  { id: 22, title: "내가 매일 기쁘게", artist: "찬송가 455장", key: "F", bpm: 100, mood: "찬양", energy: 6, tempo: "medium", themes: ["기쁨", "일상", "동행"], scripture: ["빌립보서 4:4"], season: "일반" },
  { id: 23, title: "하나님의 세계", artist: "찬송가 40장", key: "Bb", bpm: 94, mood: "찬양", energy: 5, tempo: "medium", themes: ["창조", "자연", "아름다움"], scripture: ["시편 19:1"], season: "일반" },
  { id: 24, title: "예수가 우리를 부르는 소리", artist: "찬송가 528장", key: "Ab", bpm: 92, mood: "찬양", energy: 5, tempo: "medium", themes: ["부르심", "응답", "따름"], scripture: ["마태복음 4:19"], season: "일반" },
  { id: 25, title: "주 하나님 독생자 예수", artist: "마커스워십", key: "F", bpm: 76, mood: "찬양", energy: 4, tempo: "slow", themes: ["십자가", "사랑", "독생자", "구속"], scripture: ["요한복음 3:16"], season: "사순절" },
  { id: 26, title: "주 찬양하리라", artist: "디사이플스", key: "G", bpm: 134, mood: "찬양", energy: 9, tempo: "fast", themes: ["찬양", "감사", "기쁨"], scripture: ["시편 150"], season: "일반" },
  { id: 27, title: "승리하신 주", artist: "예수전도단", key: "A", bpm: 138, mood: "찬양", energy: 9, tempo: "fast", themes: ["승리", "부활", "이김", "권세"], scripture: ["고린도전서 15:57"], season: "부활절" },
  { id: 28, title: "온 땅이여 주를 찬양해", artist: "마커스워십", key: "D", bpm: 128, mood: "찬양", energy: 8, tempo: "fast", themes: ["찬양", "온 땅", "기쁨", "선포"], scripture: ["시편 100"], season: "일반" },

  // ──────────────── 감사 (Thanksgiving) ────────────────
  { id: 29, title: "내 평생에 가는 길", artist: "찬송가 413장", key: "G", bpm: 84, mood: "감사", energy: 4, tempo: "slow", themes: ["인도", "신뢰", "동행", "섭리"], scripture: ["잠언 3:5-6", "시편 23"], season: "일반" },
  { id: 30, title: "주님의 크신 은혜", artist: "디사이플스", key: "G", bpm: 80, mood: "감사", energy: 4, tempo: "slow", themes: ["은혜", "감사", "사랑"], scripture: ["에베소서 2:8-9"], season: "일반" },
  { id: 31, title: "감사함으로", artist: "마커스워십", key: "D", bpm: 88, mood: "감사", energy: 5, tempo: "medium", themes: ["감사", "찬양", "기쁨"], scripture: ["시편 100:4"], season: "일반" },
  { id: 32, title: "은혜 아니면", artist: "예수전도단", key: "A", bpm: 78, mood: "감사", energy: 4, tempo: "slow", themes: ["은혜", "구원", "고백"], scripture: ["고린도전서 15:10"], season: "일반" },
  { id: 33, title: "주 은혜라", artist: "어노인팅", key: "G", bpm: 72, mood: "감사", energy: 3, tempo: "slow", themes: ["은혜", "감사", "고백"], scripture: ["고린도후서 12:9"], season: "일반" },
  { id: 34, title: "나 같은 죄인 살리신", artist: "찬송가 405장", key: "G", bpm: 82, mood: "감사", energy: 4, tempo: "slow", themes: ["은혜", "구원", "놀라운", "고백"], scripture: ["에베소서 2:8"], season: "일반" },
  { id: 35, title: "큰 영광 중에 계신 주", artist: "마커스워십", key: "E", bpm: 70, mood: "감사", energy: 3, tempo: "slow", themes: ["영광", "은혜", "거룩"], scripture: ["시편 113:4-6"], season: "일반" },
  { id: 36, title: "감사와 찬양 드려요", artist: "예수전도단", key: "D", bpm: 96, mood: "감사", energy: 5, tempo: "medium", themes: ["감사", "찬양", "기쁨"], scripture: ["골로새서 3:17"], season: "일반" },
  { id: 37, title: "주 예수 넓은 은혜", artist: "찬송가 310장", key: "F", bpm: 86, mood: "감사", energy: 4, tempo: "slow", themes: ["은혜", "넓음", "사랑"], scripture: ["에베소서 3:18-19"], season: "일반" },

  // ──────────────── 고백 (Confession) ────────────────
  { id: 38, title: "주님 앞에 나아옵니다", artist: "마커스워십", key: "D", bpm: 68, mood: "고백", energy: 3, tempo: "slow", themes: ["고백", "회개", "나아감", "겸손"], scripture: ["시편 51:17", "히브리서 4:16"], season: "사순절" },
  { id: 39, title: "내 맘의 주여", artist: "마커스워십", key: "C", bpm: 66, mood: "고백", energy: 2, tempo: "slow", themes: ["고백", "헌신", "주권", "항복"], scripture: ["갈라디아서 2:20"], season: "일반" },
  { id: 40, title: "나의 모습 나의 소유", artist: "찬송가 449장", key: "D", bpm: 74, mood: "고백", energy: 3, tempo: "slow", themes: ["헌신", "봉헌", "드림", "전부"], scripture: ["로마서 12:1"], season: "일반" },
  { id: 41, title: "사슴이 시냇물을 찾아", artist: "마커스워십", key: "G", bpm: 64, mood: "고백", energy: 2, tempo: "slow", themes: ["갈망", "목마름", "하나님을 찾음"], scripture: ["시편 42:1"], season: "일반" },
  { id: 42, title: "주만이 내 소망", artist: "어노인팅", key: "E", bpm: 70, mood: "고백", energy: 3, tempo: "slow", themes: ["소망", "의지", "신뢰", "유일"], scripture: ["시편 62:5"], season: "일반" },
  { id: 43, title: "하나님은 너를 지키시는 자", artist: "예수전도단", key: "G", bpm: 76, mood: "고백", energy: 3, tempo: "slow", themes: ["지킴", "신뢰", "보호", "인도"], scripture: ["시편 121"], season: "일반" },
  { id: 44, title: "주 나를 이끄소서", artist: "마커스워십", key: "D", bpm: 66, mood: "고백", energy: 2, tempo: "slow", themes: ["인도", "순종", "따름"], scripture: ["시편 25:5"], season: "일반" },
  { id: 45, title: "있는 모습 그대로", artist: "어노인팅", key: "F", bpm: 72, mood: "고백", energy: 3, tempo: "slow", themes: ["고백", "있는 그대로", "수용", "은혜"], scripture: ["로마서 5:8"], season: "일반" },

  // ──────────────── 묵상 (Meditation) ────────────────
  { id: 46, title: "주 품에 품으소서", artist: "마커스워십", key: "D", bpm: 62, mood: "묵상", energy: 2, tempo: "slow", themes: ["안식", "평안", "품", "쉼"], scripture: ["마태복음 11:28"], season: "일반" },
  { id: 47, title: "고요한 바다로", artist: "마커스워십", key: "G", bpm: 58, mood: "묵상", energy: 1, tempo: "slow", themes: ["평화", "안식", "고요", "쉼"], scripture: ["시편 23:2"], season: "일반" },
  { id: 48, title: "내 주를 가까이 하게 함은", artist: "찬송가 364장", key: "F", bpm: 72, mood: "묵상", energy: 3, tempo: "slow", themes: ["가까이", "기도", "교제", "친밀"], scripture: ["야고보서 4:8"], season: "일반" },
  { id: 49, title: "주의 음성을 내가 들으니", artist: "찬송가 540장", key: "Ab", bpm: 70, mood: "묵상", energy: 3, tempo: "slow", themes: ["음성", "순종", "따름", "부르심"], scripture: ["요한복음 10:27"], season: "일반" },
  { id: 50, title: "나 주님의 기쁨 되기 원하네", artist: "마커스워십", key: "G", bpm: 64, mood: "묵상", energy: 2, tempo: "slow", themes: ["기쁨", "헌신", "열매"], scripture: ["요한복음 15:11"], season: "일반" },
  { id: 51, title: "여호와는 나의 목자시니", artist: "어노인팅", key: "D", bpm: 66, mood: "묵상", energy: 2, tempo: "slow", themes: ["목자", "인도", "돌봄", "안식"], scripture: ["시편 23"], season: "일반" },
  { id: 52, title: "주 예수보다 더 귀한 것은 없네", artist: "마커스워십", key: "C", bpm: 60, mood: "묵상", energy: 2, tempo: "slow", themes: ["사랑", "고백", "귀함", "유일"], scripture: ["빌립보서 3:8"], season: "일반" },
  { id: 53, title: "오직 주만이", artist: "예수전도단", key: "E", bpm: 64, mood: "묵상", energy: 2, tempo: "slow", themes: ["유일", "고백", "의지"], scripture: ["시편 73:25-26"], season: "일반" },
  { id: 54, title: "너는 내 안에 나는 네 안에", artist: "마커스워십", key: "G", bpm: 62, mood: "묵상", energy: 2, tempo: "slow", themes: ["연합", "포도나무", "거함"], scripture: ["요한복음 15:4-5"], season: "일반" },
  { id: 55, title: "주 나의 하나님", artist: "어노인팅", key: "D", bpm: 68, mood: "묵상", energy: 3, tempo: "slow", themes: ["경외", "고백", "인격적 관계"], scripture: ["시편 63:1"], season: "일반" },

  // ──────────────── 헌신 (Dedication) ────────────────
  { id: 56, title: "나의 가는 길 주님 함께 하소서", artist: "예수전도단", key: "D", bpm: 72, mood: "헌신", energy: 3, tempo: "slow", themes: ["동행", "인도", "순종", "길"], scripture: ["시편 25:4-5"], season: "일반" },
  { id: 57, title: "주님의 뜻을 이루소서", artist: "마커스워십", key: "G", bpm: 68, mood: "헌신", energy: 3, tempo: "slow", themes: ["순종", "헌신", "뜻", "항복"], scripture: ["마태복음 6:10"], season: "일반" },
  { id: 58, title: "내 삶을 드리니", artist: "어노인팅", key: "A", bpm: 74, mood: "헌신", energy: 4, tempo: "slow", themes: ["헌신", "봉헌", "드림", "섬김"], scripture: ["로마서 12:1"], season: "일반" },
  { id: 59, title: "주여 나를 사용하소서", artist: "디사이플스", key: "E", bpm: 76, mood: "헌신", energy: 4, tempo: "slow", themes: ["사명", "봉사", "도구", "쓰임"], scripture: ["이사야 6:8"], season: "일반" },
  { id: 60, title: "주 뜻대로 행하소서", artist: "찬송가 501장", key: "F", bpm: 80, mood: "헌신", energy: 4, tempo: "medium", themes: ["순종", "뜻", "맡김"], scripture: ["마태복음 26:39"], season: "사순절" },
  { id: 61, title: "소명", artist: "마커스워십", key: "D", bpm: 70, mood: "헌신", energy: 3, tempo: "slow", themes: ["소명", "부르심", "사명"], scripture: ["에베소서 4:1"], season: "일반" },
  { id: 62, title: "여기에 나 있나이다", artist: "예수전도단", key: "G", bpm: 78, mood: "헌신", energy: 4, tempo: "slow", themes: ["응답", "부르심", "순종"], scripture: ["이사야 6:8"], season: "일반" },
  { id: 63, title: "주님 마음 알기 원합니다", artist: "마커스워십", key: "E", bpm: 66, mood: "헌신", energy: 3, tempo: "slow", themes: ["마음", "친밀", "순종", "알기"], scripture: ["빌립보서 3:10"], season: "일반" },

  // ──────────────── 기쁨 (Joy) ────────────────
  { id: 64, title: "기뻐하며 경배하세", artist: "찬송가 21장", key: "G", bpm: 128, mood: "기쁨", energy: 8, tempo: "fast", themes: ["기쁨", "경배", "찬양"], scripture: ["시편 100:2"], season: "일반" },
  { id: 65, title: "주 안에서 기뻐하라", artist: "예수전도단", key: "D", bpm: 140, mood: "기쁨", energy: 9, tempo: "fast", themes: ["기쁨", "환호", "즐거움"], scripture: ["빌립보서 4:4"], season: "일반" },
  { id: 66, title: "환호하라 온 땅이여", artist: "마커스워십", key: "A", bpm: 136, mood: "기쁨", energy: 9, tempo: "fast", themes: ["환호", "기쁨", "선포", "온 땅"], scripture: ["시편 66:1", "시편 100:1"], season: "일반" },
  { id: 67, title: "오 행복한 날", artist: "어노인팅", key: "G", bpm: 144, mood: "기쁨", energy: 10, tempo: "fast", themes: ["행복", "기쁨", "구원", "해방"], scripture: ["시편 118:24"], season: "일반" },
  { id: 68, title: "즐겁게 안식할 날", artist: "찬송가 50장", key: "D", bpm: 100, mood: "기쁨", energy: 6, tempo: "medium", themes: ["안식", "기쁨", "주일"], scripture: ["출애굽기 20:8"], season: "일반" },
  { id: 69, title: "전능하신 주", artist: "디사이플스", key: "E", bpm: 132, mood: "기쁨", energy: 9, tempo: "fast", themes: ["전능", "기쁨", "선포", "능력"], scripture: ["시편 93"], season: "일반" },
  { id: 70, title: "주를 찬양 주를 찬양", artist: "예수전도단", key: "A", bpm: 142, mood: "기쁨", energy: 10, tempo: "fast", themes: ["찬양", "기쁨", "축제"], scripture: ["시편 150"], season: "일반" },

  // ──────────────── 위로 (Comfort) ────────────────
  { id: 71, title: "어디에도", artist: "마커스워십", key: "G", bpm: 66, mood: "위로", energy: 2, tempo: "slow", themes: ["동행", "위로", "함께", "편재"], scripture: ["시편 139:7-10"], season: "일반" },
  { id: 72, title: "너 예수께 조용히 나가", artist: "찬송가 337장", key: "Eb", bpm: 72, mood: "위로", energy: 3, tempo: "slow", themes: ["기도", "위로", "나아감"], scripture: ["히브리서 4:16"], season: "일반" },
  { id: 73, title: "주 날 위해 십자가의", artist: "마커스워십", key: "D", bpm: 64, mood: "위로", energy: 2, tempo: "slow", themes: ["십자가", "사랑", "대속", "은혜"], scripture: ["이사야 53:5"], season: "사순절" },
  { id: 74, title: "나 무엇과도 바꿀 수 없는", artist: "마커스워십", key: "E", bpm: 62, mood: "위로", energy: 2, tempo: "slow", themes: ["사랑", "가치", "정체성", "귀함"], scripture: ["이사야 43:4"], season: "일반" },
  { id: 75, title: "선한 목자 되신 우리 주", artist: "어노인팅", key: "D", bpm: 70, mood: "위로", energy: 3, tempo: "slow", themes: ["목자", "돌봄", "인도", "보호"], scripture: ["시편 23", "요한복음 10:11"], season: "일반" },
  { id: 76, title: "주의 크신 영광을", artist: "예수전도단", key: "G", bpm: 68, mood: "위로", energy: 3, tempo: "slow", themes: ["영광", "평안", "임재"], scripture: ["고린도후서 3:18"], season: "일반" },
  { id: 77, title: "주님 의지합니다", artist: "마커스워십", key: "C", bpm: 64, mood: "위로", energy: 2, tempo: "slow", themes: ["의지", "신뢰", "맡김", "위로"], scripture: ["잠언 3:5-6"], season: "일반" },
  { id: 78, title: "두려워 말라", artist: "어노인팅", key: "E", bpm: 72, mood: "위로", energy: 3, tempo: "slow", themes: ["두려움", "담대", "함께", "위로"], scripture: ["이사야 41:10"], season: "일반" },
  { id: 79, title: "내가 너를 사랑하고", artist: "마커스워십", key: "G", bpm: 60, mood: "위로", energy: 1, tempo: "slow", themes: ["사랑", "선택", "귀함", "위로"], scripture: ["이사야 43:1-4"], season: "일반" },

  // ──────────────── 성탄 / 대림절 (Christmas / Advent) ────────────────
  { id: 80, title: "기쁘다 구주 오셨네", artist: "찬송가 115장", key: "D", bpm: 120, mood: "기쁨", energy: 8, tempo: "fast", themes: ["성탄", "기쁨", "구주", "오심"], scripture: ["누가복음 2:10-11"], season: "성탄절" },
  { id: 81, title: "고요한 밤 거룩한 밤", artist: "찬송가 109장", key: "C", bpm: 60, mood: "묵상", energy: 2, tempo: "slow", themes: ["성탄", "거룩", "고요", "탄생"], scripture: ["누가복음 2:7"], season: "성탄절" },
  { id: 82, title: "오 거룩한 밤", artist: "찬송가 110장", key: "C", bpm: 72, mood: "경배", energy: 5, tempo: "slow", themes: ["성탄", "거룩", "경배", "탄생"], scripture: ["누가복음 2:11"], season: "성탄절" },
  { id: 83, title: "저 들 밖에 한밤중에", artist: "찬송가 118장", key: "G", bpm: 90, mood: "찬양", energy: 5, tempo: "medium", themes: ["성탄", "목자", "천사", "소식"], scripture: ["누가복음 2:8-14"], season: "성탄절" },

  // ──────────────── 부활절 (Easter) ────────────────
  { id: 84, title: "주 예수 다시 사셨네", artist: "찬송가 161장", key: "G", bpm: 130, mood: "기쁨", energy: 9, tempo: "fast", themes: ["부활", "승리", "살아계심"], scripture: ["마태복음 28:6"], season: "부활절" },
  { id: 85, title: "예수 부활했으니", artist: "찬송가 164장", key: "D", bpm: 126, mood: "찬양", energy: 8, tempo: "fast", themes: ["부활", "기쁨", "승리", "찬양"], scripture: ["고린도전서 15:20"], season: "부활절" },

  // ──────────────── 사순절 / 수난 (Lent / Passion) ────────────────
  { id: 86, title: "십자가의 길", artist: "마커스워십", key: "D", bpm: 62, mood: "고백", energy: 2, tempo: "slow", themes: ["십자가", "고난", "사랑", "대속"], scripture: ["이사야 53", "마태복음 27"], season: "사순절" },
  { id: 87, title: "주의 보혈로", artist: "찬송가 190장", key: "G", bpm: 76, mood: "감사", energy: 4, tempo: "slow", themes: ["보혈", "정결", "용서", "씻김"], scripture: ["요한일서 1:7"], season: "사순절" },
  { id: 88, title: "십자가를 질 수 있나", artist: "찬송가 365장", key: "F", bpm: 80, mood: "헌신", energy: 4, tempo: "slow", themes: ["십자가", "따름", "제자", "헌신"], scripture: ["마태복음 16:24"], season: "사순절" },

  // ──────────────── 성령 (Holy Spirit) ────────────────
  { id: 89, title: "성령이여 오소서", artist: "마커스워십", key: "D", bpm: 70, mood: "묵상", energy: 3, tempo: "slow", themes: ["성령", "임재", "기도", "오심"], scripture: ["사도행전 1:8", "요한복음 14:26"], season: "성령강림절" },
  { id: 90, title: "성령의 바람", artist: "예수전도단", key: "E", bpm: 118, mood: "경배", energy: 7, tempo: "medium", themes: ["성령", "바람", "능력", "충만"], scripture: ["사도행전 2:2-4"], season: "성령강림절" },

  // ──────────────── 추가곡 ────────────────
  { id: 91, title: "시편 139편", artist: "제이어스", key: "G", bpm: 72, mood: "묵상", energy: 3, tempo: "slow", themes: ["편재", "전지", "지음받음", "동행", "은밀한 곳"], scripture: ["시편 139:1-18"], season: "일반" },
];

// 성경 주제 → 분위기 매핑 (세밀한 매칭을 위한 확장 맵)
export const SCRIPTURE_THEME_MAP = {
  // 시편
  "시편 23": { moods: ["묵상", "위로", "감사"], themes: ["목자", "인도", "돌봄", "안식", "평안"] },
  "시편 42": { moods: ["고백", "묵상"], themes: ["갈망", "목마름", "하나님을 찾음"] },
  "시편 51": { moods: ["고백"], themes: ["회개", "정결", "용서", "겸손"] },
  "시편 91": { moods: ["위로", "묵상"], themes: ["보호", "피난처", "지킴", "안전"] },
  "시편 100": { moods: ["찬양", "기쁨", "감사"], themes: ["기쁨", "감사", "찬양", "온 땅"] },
  "시편 103": { moods: ["감사", "찬양"], themes: ["은혜", "용서", "치유", "찬양"] },
  "시편 121": { moods: ["위로", "고백"], themes: ["지킴", "보호", "도움"] },
  "시편 139": { moods: ["묵상", "위로"], themes: ["편재", "전지", "지음받음"] },
  "시편 150": { moods: ["찬양", "기쁨"], themes: ["찬양", "악기", "축제"] },

  // 복음서
  "요한복음 3:16": { moods: ["감사", "경배"], themes: ["사랑", "독생자", "구원", "영생"] },
  "요한복음 10": { moods: ["위로", "묵상"], themes: ["목자", "양", "인도", "보호"] },
  "요한복음 14": { moods: ["위로", "묵상"], themes: ["평안", "아버지 집", "길", "진리", "생명", "성령"] },
  "요한복음 15": { moods: ["묵상", "헌신"], themes: ["포도나무", "열매", "거함", "사랑"] },
  "마태복음 5": { moods: ["묵상", "헌신"], themes: ["팔복", "빛", "소금", "산상수훈"] },
  "마태복음 11:28": { moods: ["위로", "묵상"], themes: ["쉼", "안식", "짐", "평안"] },
  "마태복음 28": { moods: ["경배", "기쁨", "헌신"], themes: ["부활", "사명", "가르침", "세례"] },

  // 바울 서신
  "로마서 8": { moods: ["감사", "찬양", "위로"], themes: ["사랑", "승리", "성령", "정죄 없음"] },
  "로마서 12": { moods: ["헌신"], themes: ["산 제사", "봉헌", "변화", "섬김"] },
  "고린도전서 13": { moods: ["묵상", "헌신"], themes: ["사랑", "참음", "온유"] },
  "고린도전서 15": { moods: ["찬양", "기쁨"], themes: ["부활", "승리", "소망"] },
  "에베소서 2": { moods: ["감사"], themes: ["은혜", "구원", "화평", "화목"] },
  "빌립보서 2": { moods: ["경배", "고백"], themes: ["겸손", "낮아지심", "높임", "모든 이름 위의 이름"] },
  "빌립보서 4": { moods: ["기쁨", "찬양", "위로"], themes: ["기쁨", "감사", "평안", "채움"] },

  // 구약
  "이사야 6": { moods: ["경배", "헌신"], themes: ["거룩", "부르심", "보냄", "보좌"] },
  "이사야 40": { moods: ["위로", "경배"], themes: ["위로", "새 힘", "기다림", "독수리"] },
  "이사야 41:10": { moods: ["위로"], themes: ["두려워 말라", "함께", "강하게"] },
  "이사야 43": { moods: ["위로", "감사"], themes: ["사랑", "귀함", "물", "불", "건짐"] },
  "이사야 53": { moods: ["고백", "감사"], themes: ["고난", "십자가", "대속", "채찍", "치유"] },
  "창세기 1": { moods: ["경배", "찬양"], themes: ["창조", "빛", "좋았더라"] },
  "출애굽기 15": { moods: ["찬양", "기쁨"], themes: ["승리", "구원", "바다", "노래"] },

  // 기타
  "요한계시록 4": { moods: ["경배"], themes: ["보좌", "거룩", "영광", "24장로"] },
  "요한계시록 5": { moods: ["경배", "찬양"], themes: ["어린양", "합당", "찬양", "새 노래"] },
  "히브리서 4": { moods: ["위로", "고백"], themes: ["안식", "나아감", "은혜의 보좌"] },
  "히브리서 12": { moods: ["헌신", "경배"], themes: ["달려감", "인내", "믿음의 주", "훈련"] },
};

// 키 호환성 (음악적으로 자연스러운 전환)
export const KEY_COMPATIBILITY = {
  "C":  ["C", "G", "F", "Am", "Dm", "Em"],
  "D":  ["D", "A", "G", "Bm", "Em", "F#m"],
  "E":  ["E", "B", "A", "C#m", "F#m", "G#m"],
  "F":  ["F", "C", "Bb", "Dm", "Gm", "Am"],
  "G":  ["G", "D", "C", "Em", "Am", "Bm"],
  "A":  ["A", "E", "D", "F#m", "Bm", "C#m"],
  "B":  ["B", "F#", "E", "G#m", "C#m", "D#m"],
  "Bb": ["Bb", "F", "Eb", "Gm", "Cm", "Dm"],
  "Eb": ["Eb", "Bb", "Ab", "Cm", "Fm", "Gm"],
  "Ab": ["Ab", "Eb", "Db", "Fm", "Bbm", "Cm"],
  "C#": ["C#", "G#", "F#", "A#m", "D#m"],
  "F#": ["F#", "C#", "B", "D#m", "G#m"],
};
