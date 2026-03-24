import { useState } from 'react';
import { SONGS } from '../data/songs';
import useContiStore from '../store/useContiStore';
import { getMoodEmoji } from '../utils/contiEngine';

const FILTERS = ['전체', '경배', '찬양', '감사', '고백', '묵상', '헌신', '기쁨', '위로'];

export default function SongModal() {
  const {
    contiItems, replaceItem, addItem,
    songModalOpen, replaceIndex, closeSongModal,
  } = useContiStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('전체');

  const usedIds = new Set(contiItems.map((s) => s.id));

  let filtered = SONGS;
  if (filter !== '전체') {
    filtered = filtered.filter((s) => s.mood === filter);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q) ||
        s.themes.some((t) => t.includes(q)) ||
        (s.scripture && s.scripture.some((sc) => sc.includes(q)))
    );
  }

  const handleSelect = (song) => {
    if (replaceIndex !== null) {
      replaceItem(replaceIndex, { ...song });
    } else {
      addItem({ ...song });
    }
    closeSongModal();
  };

  if (!songModalOpen) return null;

  return (
    <div className="modal-overlay active" onClick={(e) => e.target === e.currentTarget && closeSongModal()}>
      <div className="modal">
        <div className="modal-header">
          <h3>{replaceIndex !== null ? '곡 교체' : '곡 추가'}</h3>
          <button className="modal-close" onClick={closeSongModal}>&times;</button>
        </div>
        <div className="modal-body">
          <input
            className="form-input"
            type="text"
            placeholder="곡 제목, 아티스트, 테마, 성경구절로 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />

          <div className="song-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-chip ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="song-list">
            {filtered.map((song) => (
              <div
                key={song.id}
                className={`song-list-item ${usedIds.has(song.id) ? 'used' : ''}`}
                onClick={() => handleSelect(song)}
              >
                <div>
                  <h4>{song.title}</h4>
                  <div className="song-sub">
                    {song.artist} · {song.mood}
                    {song.scripture?.length > 0 && ` · ${song.scripture[0]}`}
                  </div>
                </div>
                <div className="song-meta">
                  <div>{song.key} · {song.bpm}BPM</div>
                  <div>{song.energy}/10</div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: 24, color: 'var(--text-tertiary)' }}>
                검색 결과가 없습니다
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
