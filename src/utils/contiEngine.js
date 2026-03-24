import { SONGS, SCRIPTURE_THEME_MAP, KEY_COMPATIBILITY } from '../data/songs';

/**
 * 콘티 생성 엔진
 *
 * 매칭 기준:
 * 1. 성경 본문 기반 테마 매칭 (가장 높은 가중치)
 * 2. 예배 주제 키워드 매칭
 * 3. 분위기(mood) 흐름 매칭
 * 4. 음악적 흐름 (키 호환성, BPM 자연스러운 전환, 에너지 곡선)
 * 5. 교회력 시즌 매칭
 */

// ────────── 성경 구절 파싱 ──────────
export function parseScripture(input) {
  if (!input) return [];

  const results = [];
  // "시편 23편", "시편 23:1-6", "시편 23", "요한복음 3:16" 등 파싱
  const normalized = input
    .replace(/편/g, '')
    .replace(/장/g, ':')
    .replace(/절/g, '')
    .trim();

  // SCRIPTURE_THEME_MAP의 키와 매칭
  for (const [key, data] of Object.entries(SCRIPTURE_THEME_MAP)) {
    // "시편 23" -> normalized에 "시편 23"이 포함되어 있는지
    const keyBase = key.replace(/:\d+.*$/, ''); // "요한복음 3:16" -> "요한복음 3"
    if (normalized.includes(keyBase) || normalized.includes(key)) {
      results.push({ ref: key, ...data });
    }
  }

  return results;
}

// ────────── 주제 키워드에서 분위기 추출 ──────────
const THEME_TO_MOOD = {
  '감사': ['감사', '찬양'],
  '추수': ['감사', '찬양', '기쁨'],
  '회개': ['고백', '묵상'],
  '고백': ['고백', '묵상'],
  '용서': ['고백', '감사', '위로'],
  '부활': ['기쁨', '찬양', '경배'],
  '성탄': ['기쁨', '경배', '묵상'],
  '크리스마스': ['기쁨', '경배', '묵상'],
  '탄생': ['기쁨', '경배'],
  '치유': ['위로', '묵상', '감사'],
  '위로': ['위로', '묵상'],
  '아픔': ['위로', '고백'],
  '헌신': ['헌신', '고백'],
  '순종': ['헌신', '고백'],
  '사명': ['헌신', '찬양'],
  '선교': ['헌신', '찬양', '기쁨'],
  '십자가': ['고백', '감사', '경배'],
  '보혈': ['고백', '감사'],
  '기쁨': ['기쁨', '찬양'],
  '즐거움': ['기쁨', '찬양'],
  '평안': ['묵상', '위로'],
  '평화': ['묵상', '위로', '찬양'],
  '안식': ['묵상', '위로'],
  '사랑': ['감사', '묵상', '경배'],
  '은혜': ['감사', '경배'],
  '영광': ['경배', '찬양'],
  '거룩': ['경배', '묵상'],
  '왕': ['경배', '찬양'],
  '승리': ['찬양', '기쁨', '경배'],
  '창조': ['경배', '찬양'],
  '목자': ['묵상', '위로', '감사'],
  '성령': ['경배', '묵상'],
  '임재': ['경배', '묵상'],
  '구원': ['감사', '찬양', '기쁨'],
  '새해': ['감사', '헌신', '찬양'],
  '졸업': ['감사', '헌신'],
  '송구영신': ['감사', '헌신', '찬양'],
};

// ────────── 분위기 흐름 결정 ──────────
export function determineMoodFlow(theme, scripture, verseContent, selectedMoods, songCount) {
  // 사용자가 직접 선택한 분위기가 있으면 우선
  if (selectedMoods && selectedMoods.length > 0) {
    return expandMoodFlow(selectedMoods, songCount);
  }

  const text = `${theme} ${scripture} ${verseContent}`.toLowerCase();
  let moodScores = {};

  // 1. 성경 구절 기반 분위기 추출
  const parsedScriptures = parseScripture(scripture);
  parsedScriptures.forEach(s => {
    s.moods.forEach((mood, idx) => {
      moodScores[mood] = (moodScores[mood] || 0) + (3 - idx); // 첫 번째가 더 높은 점수
    });
  });

  // 2. 주제 키워드 기반 분위기 추출
  for (const [keyword, moods] of Object.entries(THEME_TO_MOOD)) {
    if (text.includes(keyword)) {
      moods.forEach((mood, idx) => {
        moodScores[mood] = (moodScores[mood] || 0) + (2 - idx * 0.5);
      });
    }
  }

  // 점수 기반으로 분위기 순서 결정
  const sortedMoods = Object.entries(moodScores)
    .sort((a, b) => b[1] - a[1])
    .map(([mood]) => mood);

  if (sortedMoods.length >= 2) {
    // 예배 흐름: 느린 → 빠른/신나는 → 느린 (산 모양)
    const energyOrder = { '기쁨': 5, '찬양': 4, '경배': 3, '감사': 2.5, '고백': 2, '위로': 1.5, '묵상': 1, '헌신': 1.5 };
    const flow = sortedMoods.slice(0, Math.min(sortedMoods.length, songCount));

    // 산 모양 커브: 낮은 에너지 → 높은 에너지 → 낮은 에너지
    flow.sort((a, b) => (energyOrder[a] || 0) - (energyOrder[b] || 0)); // 에너지 낮은순 정렬
    // 가운데에 높은 에너지 배치
    const low = flow.filter((_, i) => i < Math.ceil(flow.length / 2));
    const high = flow.filter((_, i) => i >= Math.ceil(flow.length / 2));
    const reordered = [];
    // 앞부분: 낮은 에너지
    for (let i = 0; i < Math.floor(low.length / 2); i++) reordered.push(low[i]);
    // 가운데: 높은 에너지
    high.reverse().forEach(m => reordered.push(m));
    // 뒷부분: 낮은 에너지
    for (let i = Math.floor(low.length / 2); i < low.length; i++) reordered.push(low[i]);

    return expandMoodFlow(reordered, songCount);
  }

  // 기본 흐름: 묵상 → 감사 → 찬양/경배 → 감사 → 헌신
  return expandMoodFlow(['묵상', '감사', '찬양', '경배', '감사', '헌신'], songCount);
}

function expandMoodFlow(moods, targetCount) {
  if (moods.length >= targetCount) return moods.slice(0, targetCount);

  const result = [...moods];
  // 마지막 분위기를 반복하거나, 사이에 채우기
  while (result.length < targetCount) {
    // 마지막 두 분위기 사이에 자연스러운 전환 추가
    const last = result[result.length - 1];
    const natural = getRelatedMoods(last);
    const next = natural.find(m => !result.includes(m) || result.filter(r => r === m).length < 2) || last;
    result.push(next);
  }
  return result;
}

function getRelatedMoods(mood) {
  const map = {
    '경배': ['찬양', '감사', '묵상'],
    '찬양': ['경배', '기쁨', '감사'],
    '감사': ['찬양', '경배', '묵상'],
    '고백': ['묵상', '위로', '헌신'],
    '묵상': ['위로', '헌신', '고백'],
    '헌신': ['고백', '묵상', '경배'],
    '기쁨': ['찬양', '감사', '경배'],
    '위로': ['묵상', '고백', '감사'],
  };
  return map[mood] || ['찬양'];
}

// ────────── 곡 스코어링 ──────────
function scoreSong(song, context) {
  const {
    targetMood,
    theme,
    scripture,
    verseContent,
    preferredKey,
    prevSong,
    position, // 0-based
    totalPositions,
    usedIds,
    parsedScriptures,
  } = context;

  if (usedIds.has(song.id)) return -Infinity;

  let score = 0;
  const text = `${theme} ${scripture} ${verseContent}`.toLowerCase();

  // ── 1. 분위기 매칭 (최대 30점) ──
  if (song.mood === targetMood) {
    score += 30;
  } else {
    const related = getRelatedMoods(targetMood);
    const relIdx = related.indexOf(song.mood);
    if (relIdx !== -1) {
      score += 15 - relIdx * 5; // 15, 10, 5
    }
  }

  // ── 2. 성경 구절 테마 매칭 (최대 25점) ──
  if (parsedScriptures.length > 0) {
    let scriptureScore = 0;
    parsedScriptures.forEach(s => {
      // 곡의 scripture 필드와 직접 매칭
      if (song.scripture) {
        song.scripture.forEach(songRef => {
          const songRefBase = songRef.replace(/:\d+.*$/, '');
          if (s.ref.includes(songRefBase) || songRefBase.includes(s.ref.replace(/:\d+.*$/, ''))) {
            scriptureScore += 25; // 직접 매칭 - 최고점
          }
        });
      }
      // 테마 매칭
      s.themes.forEach(t => {
        if (song.themes.includes(t)) {
          scriptureScore += 5;
        }
      });
    });
    score += Math.min(scriptureScore, 25);
  }

  // ── 3. 주제 키워드 매칭 (최대 20점) ──
  let themeScore = 0;
  song.themes.forEach(tag => {
    if (text.includes(tag)) themeScore += 5;
  });
  score += Math.min(themeScore, 20);

  // ── 4. 음악적 흐름 (최대 15점) ──
  if (prevSong) {
    // 키 호환성
    const compatible = KEY_COMPATIBILITY[prevSong.key] || [];
    if (song.key === prevSong.key) score += 8; // 같은 키가 가장 자연스러움
    else if (compatible.includes(song.key)) score += 5;

    // BPM 흐름
    const bpmDiff = Math.abs(song.bpm - prevSong.bpm);
    if (bpmDiff <= 10) score += 5;
    else if (bpmDiff <= 25) score += 3;
    else if (bpmDiff <= 40) score += 1;
    // 큰 BPM 차이는 페널티
    if (bpmDiff > 60) score -= 5;

    // 에너지 흐름
    const energyDiff = Math.abs(song.energy - prevSong.energy);
    if (energyDiff <= 2) score += 2;
    else if (energyDiff > 5) score -= 3;
  }

  // ── 5. 포지션 적합도 (최대 10점) ──
  // 예배 흐름: 느린 곡 → 빠르고 신나는 곡 → 느린 곡 (산 모양 커브)
  const positionRatio = position / (totalPositions - 1 || 1);

  // 첫 곡: 느린/잔잔한 곡 선호
  if (position === 0) {
    if (song.energy <= 4) score += 8;
    else if (song.energy <= 6) score += 4;
    if (song.tempo === 'slow') score += 2;
  }
  // 마지막 곡: 느린/잔잔한 곡 선호
  else if (position === totalPositions - 1) {
    if (song.energy <= 3) score += 8;
    else if (song.energy <= 5) score += 4;
    if (song.tempo === 'slow') score += 2;
  }
  // 중간: 에너지 높고 빠른 곡 선호 (산 꼭대기)
  else {
    // 산 모양 커브: 가운데로 갈수록 에너지 높아짐
    const idealEnergy = positionRatio < 0.5
      ? 3 + positionRatio * 14  // 상승 (3 → 10)
      : 10 - (positionRatio - 0.5) * 14; // 하강 (10 → 3)
    const energyFit = 5 - Math.abs(song.energy - idealEnergy);
    score += Math.max(0, energyFit);
    // 가운데 곡일수록 빠른 템포 보너스
    if (positionRatio > 0.25 && positionRatio < 0.75) {
      if (song.tempo === 'fast') score += 3;
      else if (song.tempo === 'medium') score += 1;
    }
  }

  // ── 6. 선호 키 (최대 5점) ──
  if (preferredKey && song.key === preferredKey) score += 5;

  // ── 7. 교회력 시즌 보너스 (최대 5점) ──
  const season = detectSeason(text);
  if (season && song.season === season) score += 5;
  // 시즌이 아닌데 시즌곡이면 페널티
  if (!season && song.season !== '일반') score -= 3;

  // ── 8. 약간의 랜덤성 (다양성 확보) ──
  score += Math.random() * 2;

  return score;
}

function detectSeason(text) {
  if (text.includes('성탄') || text.includes('크리스마스') || text.includes('대림')) return '성탄절';
  if (text.includes('부활')) return '부활절';
  if (text.includes('사순') || text.includes('수난') || text.includes('고난')) return '사순절';
  if (text.includes('성령강림') || text.includes('오순절')) return '성령강림절';
  return null;
}

// ────────── 메인 생성 함수 ──────────
export function generateContiList({
  theme = '',
  scripture = '',
  verseContent = '',
  selectedMoods = [],
  preferredKey = '',
  totalTime = 20,
  songCount: requestedSongCount = 0,
}) {
  // 곡 수: 사용자가 지정하면 그대로, 아니면 시간 기반 자동 계산
  const songCount = requestedSongCount > 0
    ? requestedSongCount
    : Math.max(3, Math.min(8, Math.round(totalTime / 4)));
  const parsedScriptures = parseScripture(scripture);

  // 분위기 흐름 결정
  const moodFlow = determineMoodFlow(theme, scripture, verseContent, selectedMoods, songCount);

  // 각 슬롯에 곡 배치
  const result = [];
  const usedIds = new Set();

  moodFlow.forEach((targetMood, position) => {
    const context = {
      targetMood,
      theme,
      scripture,
      verseContent,
      preferredKey,
      prevSong: result[result.length - 1] || null,
      position,
      totalPositions: moodFlow.length,
      usedIds,
      parsedScriptures,
    };

    // 모든 곡에 대해 스코어 계산
    const scored = SONGS.map(song => ({
      song,
      score: scoreSong(song, context),
    }))
      .filter(s => s.score > -Infinity)
      .sort((a, b) => b.score - a.score);

    if (scored.length > 0) {
      const selected = scored[0].song;
      usedIds.add(selected.id);
      result.push({
        ...selected,
        _targetMood: targetMood,
        _score: scored[0].score,
      });
    }
  });

  return {
    songs: result,
    moodFlow,
    metadata: {
      songCount: result.length,
      totalDuration: result.reduce((sum, s) => sum + estimateDuration(s.bpm), 0),
      avgBpm: Math.round(result.reduce((sum, s) => sum + s.bpm, 0) / result.length),
      keys: [...new Set(result.map(s => s.key))],
      energyCurve: result.map(s => s.energy),
    },
  };
}

// ────────── 후보곡 생성 ──────────
export function generateCandidates(song, index, allItems, settings = {}) {
  const {
    theme = '',
    scripture = '',
    verseContent = '',
    preferredKey = '',
  } = settings;

  const parsedScriptures = parseScripture(scripture);
  const usedIds = new Set(allItems.map(s => s.id));
  const prevSong = index > 0 ? allItems[index - 1] : null;

  const context = {
    targetMood: song.mood,
    theme,
    scripture,
    verseContent,
    preferredKey,
    prevSong,
    position: index,
    totalPositions: allItems.length,
    usedIds,
    parsedScriptures,
  };

  const scored = SONGS
    .filter(s => !usedIds.has(s.id))
    .map(s => ({ song: s, score: scoreSong(s, context) }))
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return scored.map(s => s.song);
}

// ────────── 유틸리티 ──────────
export function estimateDuration(bpm) {
  if (bpm < 70) return 5;
  if (bpm < 90) return 4.5;
  if (bpm < 120) return 4;
  return 3.5;
}

export function getTransitionNote(fromSong, toSong) {
  const notes = [];
  const bpmDiff = Math.abs(fromSong.bpm - toSong.bpm);

  if (fromSong.key !== toSong.key) {
    notes.push(`키 전환: ${fromSong.key} → ${toSong.key}`);
  }

  if (bpmDiff > 30) {
    notes.push(toSong.bpm > fromSong.bpm ? '템포 올리며 전환' : '템포 내리며 전환');
  } else if (bpmDiff > 10) {
    notes.push(toSong.bpm > fromSong.bpm ? '약간 빠르게' : '약간 느리게');
  }

  const moodTransitions = {
    '기쁨→찬양': '자연스럽게 이어가기',
    '찬양→경배': '분위기 고조, 깊은 경배로',
    '경배→묵상': '연주 유지하며 조용히',
    '묵상→헌신': '묵상 후 결단의 시간',
    '고백→위로': '고백 후 위로의 말씀',
    '위로→묵상': '위로 가운데 묵상',
    '감사→찬양': '감사에서 찬양으로 고조',
    '경배→감사': '경배 후 감사의 고백',
    '찬양→감사': '찬양 후 감사의 시간',
    '감사→경배': '감사에서 깊은 경배로',
    '감사→묵상': '감사하며 묵상으로',
    '묵상→경배': '묵상에서 경배로 올라가기',
    '기쁨→경배': '기쁨의 환호에서 경배로',
    '경배→헌신': '경배 후 헌신의 응답',
    '고백→묵상': '고백 후 조용한 묵상',
    '위로→헌신': '위로받은 후 결단',
    '위로→감사': '위로 가운데 감사',
    '헌신→묵상': '헌신 후 조용한 마무리',
  };

  const moodKey = `${fromSong.mood}→${toSong.mood}`;
  if (moodTransitions[moodKey]) {
    notes.push(moodTransitions[moodKey]);
  }

  return notes.length > 0 ? notes.join(' · ') : '자연스럽게 연결';
}

export function getMoodEmoji(mood) {
  const map = {
    '경배': '', '찬양': '', '감사': '', '고백': '',
    '묵상': '', '헌신': '', '기쁨': '', '위로': '',
  };
  return map[mood] || '';
}

export function getMoodColor(mood) {
  const map = {
    '경배': '#dc2626',
    '찬양': '#f59e0b',
    '감사': '#10b981',
    '고백': '#6366f1',
    '묵상': '#8b5cf6',
    '헌신': '#ec4899',
    '기쁨': '#f97316',
    '위로': '#06b6d4',
  };
  return map[mood] || '#6b7280';
}
