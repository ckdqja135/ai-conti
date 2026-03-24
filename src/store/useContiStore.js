import { create } from 'zustand';
import { generateCandidates } from '../utils/contiEngine';

const useContiStore = create((set, get) => ({
  // 예배 설정
  settings: {
    theme: '',
    scripture: '',
    verseContent: '',
    preferredKey: '',
    totalTime: 20,
    songCount: 0, // 0 = 자동 (시간 기반)
  },
  selectedMoods: [],

  // API 키 (localStorage 에 저장)
  apiKey: localStorage.getItem('gemini_api_key') || '',
  setApiKey: (key) => {
    localStorage.setItem('gemini_api_key', key);
    set({ apiKey: key });
  },

  // 콘티 결과
  contiItems: [],
  transitions: [],
  overallFlow: '',
  moodFlow: [],
  leaderNotes: [],
  loading: false,
  error: null,
  retryCountdown: 0,

  // 설정 업데이트
  updateSetting: (key, value) =>
    set((state) => ({
      settings: { ...state.settings, [key]: value },
    })),

  // 분위기 토글
  toggleMood: (mood) =>
    set((state) => {
      const exists = state.selectedMoods.includes(mood);
      return {
        selectedMoods: exists
          ? state.selectedMoods.filter((m) => m !== mood)
          : [...state.selectedMoods, mood],
      };
    }),

  removeMood: (mood) =>
    set((state) => ({
      selectedMoods: state.selectedMoods.filter((m) => m !== mood),
    })),

  // AI 콘티 생성
  generate: async () => {
    const { settings, selectedMoods, apiKey } = get();
    set({ loading: true, error: null });

    try {
      const res = await fetch('http://localhost:3001/api/generate-conti', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...settings,
          songCount: settings.songCount || 0,
          selectedMoods,
          apiKey,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        if (result.retrySeconds) {
          // 카운트다운 시작
          set({ loading: false, error: null, retryCountdown: result.retrySeconds });
          const timer = setInterval(() => {
            const current = get().retryCountdown;
            if (current <= 1) {
              clearInterval(timer);
              set({ retryCountdown: 0, error: null });
            } else {
              set({ retryCountdown: current - 1 });
            }
          }, 1000);
          return;
        }
        throw new Error(result.error);
      }

      const VALID_MOODS = ['경배', '찬양', '감사', '고백', '묵상', '헌신', '기쁨', '위로'];
      const cleanMood = (mood) => {
        if (!mood) return '찬양';
        // "찬양|기쁨" → "찬양"
        const first = mood.split(/[|/,]/)[0].trim();
        return VALID_MOODS.includes(first) ? first : (VALID_MOODS.find(m => mood.includes(m)) || '찬양');
      };

      const data = result.data;
      const songs = data.songs.map((song, i) => ({
        id: Date.now() + i,
        ...song,
        mood: cleanMood(song.mood),
      }));

      // 각 곡에 대해 로컬 스코어링으로 후보곡 생성
      const songsWithCandidates = songs.map((song, i) => ({
        ...song,
        candidates: generateCandidates(song, i, songs, settings),
      }));

      set({
        contiItems: songsWithCandidates,
        transitions: data.transitions || [],
        overallFlow: data.overall_flow || '',
        moodFlow: (data.mood_flow || []).map(cleanMood),
        leaderNotes: data.leader_notes || [],
        loading: false,
      });
    } catch (err) {
      set({
        loading: false,
        error: err.message || '콘티 생성에 실패했습니다.',
      });
    }
  },

  // 곡 순서 변경
  moveItem: (fromIndex, toIndex) =>
    set((state) => {
      const items = [...state.contiItems];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return { contiItems: items };
    }),

  // 곡 삭제
  removeItem: (index) =>
    set((state) => ({
      contiItems: state.contiItems.filter((_, i) => i !== index),
    })),

  // 곡 교체
  replaceItem: (index, song) =>
    set((state) => {
      const items = [...state.contiItems];
      items[index] = song;
      return { contiItems: items };
    }),

  // 후보곡으로 교체 (현재 곡을 후보 목록에 넣고, 후보곡을 메인으로)
  selectCandidate: (itemIndex, candidateIndex) =>
    set((state) => {
      const items = [...state.contiItems];
      const current = items[itemIndex];
      const candidates = [...(current.candidates || [])];
      const selected = candidates[candidateIndex];

      // 현재 곡을 후보 목록에 추가하고 선택된 후보를 제거
      const currentAsCandidate = {
        title: current.title,
        artist: current.artist,
        key: current.key,
        bpm: current.bpm,
        mood: current.mood,
        energy: current.energy,
        reason: current.reason,
      };
      candidates.splice(candidateIndex, 1, currentAsCandidate);

      items[itemIndex] = {
        ...current,
        ...selected,
        id: current.id,
        candidates,
      };
      return { contiItems: items };
    }),

  // 곡 추가
  addItem: (song) =>
    set((state) => ({
      contiItems: [...state.contiItems, song],
    })),

  // 모달 상태
  songModalOpen: false,
  customModalOpen: false,
  replaceIndex: null,

  openSongModal: (replaceIndex = null) =>
    set({ songModalOpen: true, replaceIndex }),
  closeSongModal: () =>
    set({ songModalOpen: false, replaceIndex: null }),
  openCustomModal: () =>
    set({ customModalOpen: true }),
  closeCustomModal: () =>
    set({ customModalOpen: false }),
}));

export default useContiStore;
