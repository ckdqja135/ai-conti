import { useState } from 'react';
import useContiStore from '../store/useContiStore';

const MOODS = ['경배', '찬양', '감사', '고백', '묵상', '헌신', '기쁨', '위로'];
const KEYS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

export default function CustomSongModal() {
  const { addItem, customModalOpen, closeCustomModal } = useContiStore();
  const [form, setForm] = useState({
    title: '', artist: '', key: 'G', bpm: 120, mood: '찬양', energy: 5,
  });

  const handleAdd = () => {
    if (!form.title.trim()) return;
    addItem({
      id: Date.now(),
      title: form.title.trim(),
      artist: form.artist.trim() || '직접 입력',
      key: form.key,
      bpm: parseInt(form.bpm) || 120,
      mood: form.mood,
      energy: parseInt(form.energy) || 5,
      tempo: form.bpm < 80 ? 'slow' : form.bpm < 110 ? 'medium' : 'fast',
      themes: [],
      scripture: [],
      season: '일반',
    });
    setForm({ title: '', artist: '', key: 'G', bpm: 120, mood: '찬양', energy: 5 });
    closeCustomModal();
  };

  if (!customModalOpen) return null;

  return (
    <div className="modal-overlay active" onClick={(e) => e.target === e.currentTarget && closeCustomModal()}>
      <div className="modal">
        <div className="modal-header">
          <h3>직접 곡 추가</h3>
          <button className="modal-close" onClick={closeCustomModal}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>곡 제목</label>
            <input
              className="form-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="곡 제목"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>아티스트 / 출처</label>
            <input
              className="form-input"
              value={form.artist}
              onChange={(e) => setForm({ ...form, artist: e.target.value })}
              placeholder="예: 마커스워십"
            />
          </div>
          <div className="form-row">
            <div className="form-half">
              <div className="form-group">
                <label>키</label>
                <select
                  className="form-input"
                  value={form.key}
                  onChange={(e) => setForm({ ...form, key: e.target.value })}
                >
                  {KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
            </div>
            <div className="form-half">
              <div className="form-group">
                <label>BPM</label>
                <input
                  className="form-input"
                  type="number"
                  min={40}
                  max={200}
                  value={form.bpm}
                  onChange={(e) => setForm({ ...form, bpm: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-half">
              <div className="form-group">
                <label>분위기</label>
                <select
                  className="form-input"
                  value={form.mood}
                  onChange={(e) => setForm({ ...form, mood: e.target.value })}
                >
                  {MOODS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <div className="form-half">
              <div className="form-group">
                <label>에너지 (1~10)</label>
                <input
                  className="form-input"
                  type="number"
                  min={1}
                  max={10}
                  value={form.energy}
                  onChange={(e) => setForm({ ...form, energy: e.target.value })}
                />
              </div>
            </div>
          </div>
          <button className="generate-btn" onClick={handleAdd}>추가하기</button>
        </div>
      </div>
    </div>
  );
}
