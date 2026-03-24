import SettingsPanel from './components/SettingsPanel';
import ContiPanel from './components/ContiPanel';
import CustomSongModal from './components/CustomSongModal';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>초보 인도자 도우미</h1>
        <p className="subtitle">AI가 말씀과 분위기에 맞는 예배 흐름을 디자인합니다</p>
      </header>

      <main className="main-layout">
        <SettingsPanel />
        <ContiPanel />
      </main>

      <CustomSongModal />
    </div>
  );
}
