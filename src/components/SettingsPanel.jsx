import { useState } from 'react';
import useContiStore from '../store/useContiStore';

const MOODS = ['경배', '찬양', '감사', '고백', '묵상', '헌신', '기쁨', '위로'];
const MOOD_EMOJI = {
  '경배': '', '찬양': '', '감사': '', '고백': '',
  '묵상': '', '헌신': '', '기쁨': '', '위로': '',
};
const KEYS = ['', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

export default function SettingsPanel() {
  const {
    settings, updateSetting,
    selectedMoods, toggleMood, removeMood,
    apiKey, setApiKey,
    generate, loading, error, retryCountdown,
  } = useContiStore();

  const [showKey, setShowKey] = useState(false);
  const [showApiHelp, setShowApiHelp] = useState(false);

  return (
    <section className="panel settings-panel">
      <h2 className="panel-title">예배 설정</h2>

      {/* API Key */}
      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Gemini API Key
          <span
            onClick={() => setShowApiHelp(!showApiHelp)}
            style={{
              fontSize: '0.7rem',
              fontWeight: 400,
              color: 'var(--primary)',
              cursor: 'pointer',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
            }}
          >
            API Key 발급 방법 안내
          </span>
        </label>
        <div style={{ position: 'relative' }}>
          <input
            className="form-input"
            type={showKey ? 'text' : 'password'}
            placeholder="AIzaSy..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{ paddingRight: 50 }}
          />
          <button
            onClick={() => setShowKey(!showKey)}
            style={{
              position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
              border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem',
              color: 'var(--text-secondary)',
            }}
          >
            {showKey ? '숨기기' : '보기'}
          </button>
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: 3 }}>
          API 키는 브라우저에만 저장됩니다 (서버에 저장되지 않음)
        </div>
        {showApiHelp && (
          <div style={{
            position: 'relative',
            marginTop: 8,
            padding: '14px 16px',
            paddingRight: 36,
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.78rem',
            lineHeight: 1.7,
            color: 'var(--text)',
          }}>
            <button
              onClick={() => setShowApiHelp(false)}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 22,
                height: 22,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-xs)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--border-light)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >
              ✕
            </button>
            <strong style={{ display: 'block', marginBottom: 6, color: 'var(--primary)' }}>
              Gemini API Key 발급 방법
            </strong>
            1. <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Google AI Studio</a>에 접속합니다.<br />
            2. Google 계정으로 로그인합니다.<br />
            3. "Create API Key" 버튼을 클릭합니다.<br />
            4. 생성된 키 (AIzaSy...로 시작)를 복사하여 위 입력란에 붙여넣습니다.<br />
            <div style={{ marginTop: 8, padding: '6px 10px', background: '#dcfce7', borderRadius: 'var(--radius-xs)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              무료 플랜으로도 사용 가능합니다. 키는 외부에 공유하지 마세요.
            </div>
          </div>
        )}
      </div>

      {/* 말씀 본문 */}
      <div className="form-group">
        <label>말씀 본문</label>
        <input
          className="form-input"
          type="text"
          placeholder="예: 시편 23편, 요한복음 3:16"
          value={settings.scripture}
          onChange={(e) => updateSetting('scripture', e.target.value)}
        />
        <textarea
          className="form-input"
          placeholder="말씀 내용을 입력하면 AI가 더 정확하게 매칭합니다"
          rows={3}
          value={settings.verseContent}
          onChange={(e) => updateSetting('verseContent', e.target.value)}
          style={{ marginTop: 6 }}
        />
      </div>

      {/* 예배 주제 */}
      <div className="form-group">
        <label>예배 주제</label>
        <input
          className="form-input"
          type="text"
          placeholder="예: 감사, 치유, 헌신, 부활, 성탄"
          value={settings.theme}
          onChange={(e) => updateSetting('theme', e.target.value)}
        />
      </div>

      {/* 분위기 */}
      <div className="form-group">
        <label>원하는 분위기 흐름 (순서대로 클릭, 선택사항)</label>
        <div className="mood-selector">
          {MOODS.map((mood) => (
            <button
              key={mood}
              className={`mood-chip ${selectedMoods.includes(mood) ? 'active' : ''}`}
              onClick={() => toggleMood(mood)}
            >
              {mood}
            </button>
          ))}
        </div>
        {selectedMoods.length > 0 && (
          <div className="mood-flow-display">
            {selectedMoods.map((mood, i) => (
              <span key={`${mood}-${i}`}>
                <span className="mood-flow-tag">
                  {mood}
                  <span className="remove-mood" onClick={() => removeMood(mood)}>×</span>
                </span>
                {i < selectedMoods.length - 1 && <span className="mood-flow-arrow"> → </span>}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 키 & 곡 수 & 시간 */}
      <div className="form-row">
        <div className="form-half">
          <div className="form-group">
            <label>선호 키</label>
            <select
              className="form-input"
              value={settings.preferredKey}
              onChange={(e) => updateSetting('preferredKey', e.target.value)}
            >
              {KEYS.map((k) => (
                <option key={k} value={k}>{k || '자동 (AI 판단)'}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-half">
          <div className="form-group">
            <label>곡 수</label>
            <select
              className="form-input"
              value={settings.songCount}
              onChange={(e) => updateSetting('songCount', parseInt(e.target.value))}
            >
              <option value={0}>자동</option>
              {[3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>{n}곡</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label>전체 시간 (분)</label>
        <input
          className="form-input"
          type="number"
          min={5}
          max={60}
          value={settings.totalTime}
          onChange={(e) => updateSetting('totalTime', e.target.value === '' ? '' : parseInt(e.target.value))}
        />
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div style={{
          padding: '10px 14px',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: 'var(--radius-sm)',
          color: '#dc2626',
          fontSize: '0.82rem',
          marginBottom: 8,
        }}>
          {error}
        </div>
      )}

      {/* 카운트다운 */}
      {retryCountdown > 0 && (
        <div style={{
          padding: '10px 14px',
          background: '#fffbeb',
          border: '1px solid #fde68a',
          borderRadius: 'var(--radius-sm)',
          color: '#92400e',
          fontSize: '0.82rem',
          marginBottom: 8,
          textAlign: 'center',
        }}>
          API 요청 한도 초과 — <strong>{retryCountdown}초</strong> 후 다시 시도해주세요
        </div>
      )}

      {/* 생성 버튼 */}
      <button
        className="generate-btn"
        onClick={generate}
        disabled={loading || retryCountdown > 0}
        style={(loading || retryCountdown > 0) ? { opacity: 0.7, cursor: 'wait' } : {}}
      >
        {loading ? (
          <>AI가 콘티를 구성하고 있습니다...</>
        ) : retryCountdown > 0 ? (
          <>{retryCountdown}초 후 재시도 가능</>
        ) : (
          <>AI 콘티 생성하기</>

        )}
      </button>
    </section>
  );
}
