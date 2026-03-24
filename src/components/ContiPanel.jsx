import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import useContiStore from '../store/useContiStore';

const MOOD_EMOJI = {
  '경배': '', '찬양': '', '감사': '', '고백': '',
  '묵상': '', '헌신': '', '기쁨': '', '위로': '',
};
const MOOD_COLOR = {
  '경배': '#dc2626', '찬양': '#f59e0b', '감사': '#10b981', '고백': '#6366f1',
  '묵상': '#8b5cf6', '헌신': '#ec4899', '기쁨': '#f97316', '위로': '#06b6d4',
};

function estimateDuration(bpm) {
  if (bpm < 70) return 5;
  if (bpm < 90) return 4.5;
  if (bpm < 120) return 4;
  return 3.5;
}

export default function ContiPanel() {
  const {
    contiItems, transitions, overallFlow, moodFlow, leaderNotes,
    moveItem, removeItem, settings,
    openCustomModal, selectCandidate,
  } = useContiStore();

  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [expandedReason, setExpandedReason] = useState(new Set());
  const [expandedCandidates, setExpandedCandidates] = useState(new Set());
  const [saveLabel, setSaveLabel] = useState('이미지');
  const captureRef = useRef(null);

  const handleDragStart = (index) => setDragIndex(index);
  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };
  const handleDragEnd = () => {
    if (dragIndex !== null && dragOverIndex !== null && dragIndex !== dragOverIndex) {
      moveItem(dragIndex, dragOverIndex);
    }
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleCopy = () => {
    if (contiItems.length === 0) return;
    const theme = settings.theme || '예배';
    const verse = settings.scripture || '';

    let text = `══════════════════════════════════\n`;
    text += `  찬양 콘티 — ${theme}\n`;
    if (verse) text += `  말씀: ${verse}\n`;
    text += `══════════════════════════════════\n\n`;

    if (overallFlow) {
      text += `${overallFlow}\n\n`;
    }

    contiItems.forEach((song, i) => {
      text += `${i + 1}. ${song.title}\n`;
      text += `   ${song.artist} | Key: ${song.key} | BPM: ${song.bpm} | ${song.mood}\n`;
      if (song.scripture_connection) text += `   ${song.scripture_connection}\n`;
      if (song.reason) text += `   ${song.reason}\n`;

      const transition = transitions.find(t => t.from_index === i);
      if (transition) {
        text += `   → ${transition.note}\n`;
      }
      text += `\n`;
    });

    const totalDuration = contiItems.reduce((sum, s) => sum + (s.duration_min || estimateDuration(s.bpm || 100)), 0);
    text += `──────────────────────────────────\n`;
    text += `총 ${contiItems.length}곡 | ~${totalDuration}분\n`;

    navigator.clipboard.writeText(text).then(() => {
      setCopyLabel('복사됨!');
      setTimeout(() => setCopyLabel('복사'), 2000);
    });
  };

  const [copyLabel, setCopyLabel] = useState('복사');

  const handleSaveImage = async () => {
    if (!captureRef.current) return;
    setSaveLabel('저장 중...');
    try {
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        // 버튼, 후보곡 등 UI 요소는 캡처에서 제외
        ignoreElements: (el) => el.dataset.noCapture === 'true',
      });
      const link = document.createElement('a');
      const theme = settings.theme || '예배';
      const date = new Date().toISOString().slice(0, 10);
      link.download = `콘티_${theme}_${date}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setSaveLabel('저장됨!');
    } catch {
      setSaveLabel('실패');
    }
    setTimeout(() => setSaveLabel('이미지'), 2000);
  };

  if (contiItems.length === 0) {
    return (
      <section className="panel">
        <div className="conti-header">
          <h2 className="panel-title">콘티 (예배 흐름)</h2>
        </div>
        <div className="empty-state">
          <div className="icon"></div>
          <p>왼쪽에서 예배 설정을 입력하고<br /><strong>"AI 콘티 생성하기"</strong>를 눌러주세요</p>
          <p style={{ marginTop: 10, fontSize: '0.82rem', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
            Gemini AI가 말씀 본문을 분석하여<br />
            주제에 맞는 곡, 키, BPM, 에너지 흐름을 추천합니다
          </p>
        </div>
      </section>
    );
  }

  const totalDuration = contiItems.reduce((sum, s) => sum + (s.duration_min || estimateDuration(s.bpm || 100)), 0);
  const avgBpm = Math.round(contiItems.reduce((sum, s) => sum + (s.bpm || 100), 0) / contiItems.length);
  const keys = [...new Set(contiItems.map(s => s.key))];

  return (
    <section className="panel">
      <div className="conti-header">
        <h2 className="panel-title">콘티 (예배 흐름)</h2>
        <div className="conti-actions">
          <button className="action-btn" onClick={handleCopy}>{copyLabel}</button>
          <button className="action-btn" onClick={handleSaveImage}>{saveLabel}</button>
          <button className="action-btn" onClick={() => window.print()}>인쇄</button>
        </div>
      </div>

      <div ref={captureRef}>
      {/* 전체 흐름 설명 */}
      {overallFlow && (
        <div style={{
          padding: '12px 16px',
          background: 'var(--primary-bg)',
          borderRadius: 'var(--radius-sm)',
          marginBottom: 16,
          fontSize: '0.85rem',
          color: 'var(--primary)',
          lineHeight: 1.6,
          borderLeft: '3px solid var(--primary)',
        }}>
          {overallFlow}
        </div>
      )}

      {/* 분위기 흐름 */}
      {moodFlow.length > 0 && (
        <div className="mood-flow-display" style={{ marginBottom: 16 }}>
          {moodFlow.map((mood, i) => (
            <span key={i}>
              <span className="mood-flow-tag" style={{
                background: `${MOOD_COLOR[mood]}15`,
                color: MOOD_COLOR[mood],
              }}>
                {mood}
              </span>
              {i < moodFlow.length - 1 && <span className="mood-flow-arrow"> → </span>}
            </span>
          ))}
        </div>
      )}

      {/* 곡 리스트 */}
      {contiItems.map((song, index) => {
        const transition = transitions.find(t => t.from_index === index);

        return (
          <div key={song.id || index}>
            <div
              className={`conti-item ${dragIndex === index ? 'dragging' : ''} ${dragOverIndex === index ? 'drag-over' : ''}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            >
              <div className="conti-item-header">
                <div className="conti-number" style={{ background: MOOD_COLOR[song.mood] || '#6b7280' }}>
                  {index + 1}
                </div>
                <div className="conti-song-info">
                  <div className="conti-song-title">{song.title}</div>
                  <div className="conti-song-artist">{song.artist}</div>
                </div>
              </div>

              <div className="conti-item-details">
                <span className="conti-tag">{song.key}</span>
                <span className="conti-tag">BPM {song.bpm}</span>
                <span className="conti-tag mood">
                  {song.mood}
                </span>
                <span className="conti-tag">{song.energy}/10</span>
                <span className="conti-tag">~{song.duration_min || estimateDuration(song.bpm || 100)}분</span>
              </div>

              {/* 성경 구절 연결 */}
              {song.scripture_connection && (
                <div className="conti-item-details" style={{ marginTop: 4 }}>
                  <span className="conti-tag" style={{ background: '#fef3c7', color: '#92400e' }}>
                    {song.scripture_connection}
                  </span>
                </div>
              )}

              {/* 멘트 */}
              {song.ment && (
                <div style={{
                  marginLeft: 38, marginTop: 6, padding: '8px 12px',
                  background: '#f0fdf4', borderRadius: 'var(--radius-xs)',
                  borderLeft: '3px solid #22c55e',
                  fontSize: '0.8rem', color: '#15803d', lineHeight: 1.5,
                }}>
                  {song.ment}
                </div>
              )}

              {/* 선택 이유 (토글) */}
              {song.reason && (
                <div style={{ marginLeft: 38, marginTop: 6 }}>
                  <button
                    onClick={() => setExpandedReason(prev => { const next = new Set(prev); next.has(index) ? next.delete(index) : next.add(index); return next; })}
                    style={{
                      border: 'none', background: 'none', cursor: 'pointer',
                      fontSize: '0.75rem', color: 'var(--primary-light)',
                      padding: 0,
                    }}
                  >
                    {expandedReason.has(index) ? '▼ 선택 이유 접기' : '▶ 선택 이유 보기'}
                  </button>
                  {expandedReason.has(index) && (
                    <div style={{
                      marginTop: 4, padding: '8px 12px',
                      background: 'var(--border-light)', borderRadius: 'var(--radius-xs)',
                      fontSize: '0.78rem', color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                    }}>
                      {song.reason}
                    </div>
                  )}
                </div>
              )}

              {/* 후보곡 */}
              {song.candidates && song.candidates.length > 0 && (
                <div style={{ marginLeft: 38, marginTop: 6 }} data-no-capture="true">
                  <button
                    onClick={() => setExpandedCandidates(prev => { const next = new Set(prev); next.has(index) ? next.delete(index) : next.add(index); return next; })}
                    style={{
                      border: 'none', background: 'none', cursor: 'pointer',
                      fontSize: '0.75rem', color: 'var(--text-tertiary)',
                      padding: 0,
                    }}
                  >
                    {expandedCandidates.has(index) ? '▼ 후보곡 접기' : '▶ 후보곡 보기'}
                    <span style={{
                      marginLeft: 4, padding: '1px 6px',
                      background: 'var(--border-light)', borderRadius: 10,
                      fontSize: '0.7rem',
                    }}>
                      {song.candidates.length}
                    </span>
                  </button>
                  {expandedCandidates.has(index) && (
                    <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {song.candidates.map((cand, ci) => (
                        <div
                          key={ci}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '8px 12px',
                            background: 'var(--border-light)', borderRadius: 'var(--radius-xs)',
                            fontSize: '0.8rem',
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                              {cand.title}
                            </div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: 2 }}>
                              {cand.artist} · {cand.key} · {cand.bpm}BPM · {cand.mood}
                            </div>
                            {cand.reason && (
                              <div style={{ color: 'var(--text-tertiary)', fontSize: '0.72rem', marginTop: 3, lineHeight: 1.4 }}>
                                {cand.reason}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => selectCandidate(index, ci)}
                            style={{
                              marginLeft: 10, padding: '4px 10px',
                              border: '1px solid var(--primary)',
                              background: 'var(--primary-bg)',
                              color: 'var(--primary)',
                              borderRadius: 'var(--radius-xs)',
                              cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            선택
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="conti-item-actions" data-no-capture="true">
                <button className="item-btn" onClick={() => moveItem(index, Math.max(0, index - 1))} title="위로">위</button>
                <button className="item-btn" onClick={() => moveItem(index, Math.min(contiItems.length - 1, index + 1))} title="아래로">아래</button>
                <button className="item-btn delete" onClick={() => removeItem(index)} title="삭제">X</button>
              </div>
            </div>

            {/* 전환 노트 */}
            {transition && index < contiItems.length - 1 && (
              <div className="conti-transition">
                <span className="arrow">|</span>
                <span className="note">{transition.note}</span>
              </div>
            )}
            {!transition && index < contiItems.length - 1 && (
              <div className="conti-transition">
                <span className="arrow">|</span>
              </div>
            )}
          </div>
        );
      })}

      {/* 곡 추가 */}
      <div className="add-song-area" data-no-capture="true">
        <button className="add-song-btn" onClick={openCustomModal}>직접 곡 추가</button>
      </div>

      {/* 요약 */}
      <div className="conti-summary">
        <div className="summary-item">
          <div className="summary-label">총 곡수</div>
          <div className="summary-value">{contiItems.length}곡</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">예상 시간</div>
          <div className="summary-value">~{totalDuration}분</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">평균 BPM</div>
          <div className="summary-value">{avgBpm}</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">사용 키</div>
          <div className="summary-value">{keys.join(', ')}</div>
        </div>
      </div>

      {/* 타임테이블 */}
      <div style={{
        marginBottom: 16, padding: '12px 16px',
        background: 'var(--surface)', borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-light)',
      }}>
        <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: 10 }}>타임테이블</div>
        {(() => {
          let elapsed = 0;
          return contiItems.map((song, i) => {
            const dur = song.duration_min || estimateDuration(song.bpm || 100);
            const startMin = elapsed;
            elapsed += dur;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '4px 0', fontSize: '0.8rem',
                borderBottom: i < contiItems.length - 1 ? '1px solid var(--border-light)' : 'none',
              }}>
                <span style={{
                  minWidth: 60, color: 'var(--text-tertiary)', fontFamily: 'monospace',
                }}>
                  {String(Math.floor(startMin)).padStart(2, '0')}:{String(Math.round((startMin % 1) * 60)).padStart(2, '0')}
                </span>
                <span style={{
                  width: 20, height: 20, borderRadius: '50%', display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center',
                  background: MOOD_COLOR[song.mood] || '#6b7280', color: '#fff',
                  fontSize: '0.65rem', fontWeight: 700, flexShrink: 0,
                }}>
                  {i + 1}
                </span>
                <span style={{ flex: 1, fontWeight: 500 }}>{song.title}</span>
                <span style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>~{dur}분</span>
              </div>
            );
          });
        })()}
        <div style={{
          marginTop: 8, paddingTop: 8, borderTop: '2px solid var(--border-light)',
          fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)',
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span>총 예상 시간</span>
          <span>~{contiItems.reduce((s, song) => s + (song.duration_min || estimateDuration(song.bpm || 100)), 0)}분</span>
        </div>
      </div>

      {/* 인도 유의사항 */}
      {leaderNotes && leaderNotes.length > 0 && (
        <div style={{
          marginBottom: 16, padding: '12px 16px',
          background: '#fefce8', borderRadius: 'var(--radius-sm)',
          border: '1px solid #fde68a',
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: 8, color: '#854d0e' }}>
            인도 유의사항
          </div>
          <ul style={{
            margin: 0, paddingLeft: 20,
            fontSize: '0.82rem', color: '#713f12', lineHeight: 1.7,
          }}>
            {leaderNotes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 에너지 그래프 */}
      <div className="energy-graph">
        <div className="energy-graph-title">에너지 흐름</div>
        <div className="energy-bars" style={{ paddingBottom: 18 }}>
          {contiItems.map((song, i) => (
            <div
              key={i}
              className="energy-bar"
              style={{
                height: `${(song.energy || 5) * 10}%`,
                background: MOOD_COLOR[song.mood] || '#6b7280',
                opacity: 0.8,
              }}
            >
              <div className="energy-bar-label">{i + 1}</div>
            </div>
          ))}
        </div>
      </div>
      </div>{/* captureRef 끝 */}
    </section>
  );
}
