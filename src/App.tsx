import { useState } from 'react';
import { TabType } from './types';
import { useCounter } from './hooks/useCounter';
import { useTheme } from './hooks/useTheme';
import { formatTime } from './utils/time';
import { getRelativeTimeString } from './utils/time';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('counter');
  const [inputValue, setInputValue] = useState('');
  const { count, history, increment, decrement, reset, addValue } = useCounter();
  const { toggleTheme } = useTheme();

  const handleAddValue = () => {
    const val = parseInt(inputValue, 10);
    if (!isNaN(val) && val !== 0) {
      addValue(val);
      setInputValue('');
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddValue();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-on-background antialiased pb-24 relative overflow-x-hidden w-full max-w-[375px] mx-auto md:max-w-none">
      {/* TopAppBar */}
      <header className="docked full-width top-0 sticky z-40 bg-indigo-50/80 dark:bg-slate-950/80 backdrop-blur-xl bg-gradient-to-b from-indigo-100/20 to-transparent dark:from-indigo-900/10 flat no shadows w-full">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold font-headline text-indigo-700 dark:text-indigo-300 tracking-tight">
            Sayac-15992
          </h1>
          <button
            onClick={toggleTheme}
            aria-label="Tema değiştir"
            className="kinetic-bounce text-indigo-600 dark:text-indigo-400 hover:scale-110 hover:text-indigo-500 transition-transform duration-300"
          >
            <span className="material-symbols-outlined text-2xl">dark_mode</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex-1 flex flex-col px-4 pt-6 pb-8 gap-8">
        {activeTab === 'counter' ? (
          <>
            {/* Counter Display */}
            <section className="flex flex-col items-center justify-center relative w-full pt-8 pb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-surface-container-low to-transparent rounded-full w-[120%] h-[120%] -translate-x-[10%] -translate-y-[10%] -z-10 blur-3xl opacity-50" />
              <div className="bg-surface-container-lowest ambient-shadow rounded-[32px] p-8 w-full flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                <p className="text-sm font-label tracking-widest text-on-surface-variant uppercase mb-4">
                  Mevcut Değer
                </p>
                <div className="font-headline text-[5rem] leading-none font-bold tracking-tighter text-on-surface flex items-baseline cursor-pointer select-none">
                  {count.toLocaleString('tr-TR')}
                </div>
              </div>
            </section>

            {/* Controls */}
            <section className="w-full flex flex-col gap-4">
              {/* Primary Action - Increment */}
              <button
                onClick={increment}
                className="kinetic-bounce w-full bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-[24px] py-6 px-8 flex items-center justify-between ambient-shadow border-none relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-active:translate-y-0 transition-transform duration-300" />
                <span className="font-headline font-bold text-2xl z-10">Arttır</span>
                <span className="material-symbols-outlined text-3xl z-10">add_circle</span>
              </button>

              {/* Secondary Actions */}
              <div className="flex gap-4 w-full">
                <button
                  onClick={decrement}
                  className="kinetic-bounce flex-1 bg-surface-container-highest text-on-surface rounded-xl py-4 px-4 flex flex-col items-center justify-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined">remove_circle</span>
                  <span className="font-body text-sm font-medium">Azalt</span>
                </button>
                <button
                  onClick={reset}
                  className="kinetic-bounce flex-1 bg-transparent border-2 border-outline-variant/30 text-on-surface-variant rounded-xl py-4 px-4 flex flex-col items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">restart_alt</span>
                  <span className="font-body text-sm font-medium">Sıfırla</span>
                </button>
              </div>
            </section>

            {/* Quick Input */}
            <section className="w-full bg-surface-container-low rounded-2xl p-5 mt-4">
              <h3 className="font-body text-sm font-semibold text-on-surface mb-3">
                Özel Değer Ekle
              </h3>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Miktar girin"
                    className="w-full bg-surface-variant text-on-surface placeholder:text-on-surface-variant/50 rounded-xl px-4 py-3 border-none focus:ring-0 focus:bg-surface focus:shadow-[0_0_0_2px_rgba(70,71,211,0.4)] transition-all font-body text-base h-full"
                  />
                </div>
                <button
                  onClick={handleAddValue}
                  className="kinetic-bounce bg-secondary-container text-on-secondary-container rounded-xl px-5 py-3 font-semibold text-sm flex items-center justify-center"
                >
                  Ekle
                </button>
              </div>
            </section>

            {/* Recent History Preview */}
            {history.length > 0 && (
              <section className="w-full mt-4">
                <div className="flex justify-between items-end mb-4 px-2">
                  <h3 className="font-headline text-xl font-bold text-on-surface">
                    Son İşlemler
                  </h3>
                  <button
                    onClick={() => setActiveTab('history')}
                    className="text-sm font-medium text-primary cursor-pointer hover:underline bg-transparent border-none p-0"
                  >
                    Tümünü Gör
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {history.slice(0, 2).map((h) => (
                    <div
                      key={h.id}
                      className="bg-surface-container-lowest rounded-2xl p-4 flex flex-col gap-2 border border-outline-variant/15"
                    >
                      <div className="flex justify-between items-start">
                        <span className="material-symbols-outlined text-primary text-xl">
                          {h.type === 'increment' || (h.type === 'reset' && h.newValue === 0 && h.previousValue !== 0) ? 'arrow_upward' : h.type === 'decrement' ? 'arrow_downward' : h.type === 'reset' ? 'restart_alt' : 'add_circle'}
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          {formatTime(h.timestamp)}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="font-headline text-2xl font-bold text-on-surface">
                          {h.newValue > h.previousValue ? '+' : ''}{h.newValue - h.previousValue}
                        </span>
                        <p className="text-xs text-on-surface-variant mt-1 line-clamp-1">
                          {h.type === 'increment' ? 'Arttırıldı' : h.type === 'decrement' ? 'Azaltıldı' : 'Sıfırlandı'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <>
            {/* History Tab */}
            <section className="flex flex-col items-center justify-center py-12 bg-surface-container-low rounded-[32px] mx-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-transparent opacity-50 pointer-events-none" />
              <h2 className="font-headline text-surface-tint text-sm uppercase tracking-[0.2em] mb-4 font-bold relative z-10">
                Güncel Sayaç
              </h2>
              <div className="bg-surface-container-lowest rounded-[40px] px-16 py-12 flex items-center justify-center shadow-[0_20px_40px_rgba(70,71,211,0.08)] relative z-10 transition-transform duration-300 hover:scale-[1.02]">
                <span className="font-headline text-[5rem] leading-none text-primary font-bold tracking-tighter">
                  {count.toLocaleString('tr-TR')}
                </span>
              </div>
              <div className="flex gap-4 mt-8 relative z-10">
                <button
                  onClick={decrement}
                  className="w-16 h-16 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center shadow-[0_10px_20px_rgba(70,71,211,0.05)] hover:scale-110 hover:shadow-[0_15px_30px_rgba(70,71,211,0.1)] transition-all duration-300 kinetic-bounce"
                >
                  <span className="material-symbols-outlined text-3xl">remove</span>
                </button>
                <button
                  onClick={increment}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-primary-container text-on-primary flex items-center justify-center shadow-[0_15px_30px_rgba(70,71,211,0.2)] hover:scale-110 transition-all duration-300 kinetic-bounce"
                >
                  <span className="material-symbols-outlined text-4xl">add</span>
                </button>
              </div>
            </section>

            {/* History List */}
            <section className="mx-4">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-headline text-3xl font-bold tracking-tight text-on-surface">
                  İşlem Geçmişi
                </h3>
              </div>

              {history.length === 0 ? (
                <div className="bg-surface-container-low rounded-[24px] p-12 flex flex-col items-center justify-center min-h-[300px] border border-outline-variant/15">
                  <div className="w-24 h-24 rounded-full bg-surface-container-highest flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(70,71,211,0.05)]">
                    <span className="material-symbols-outlined text-[48px] text-on-surface-variant/50">
                      history
                    </span>
                  </div>
                  <p className="font-body text-lg text-on-surface-variant font-medium text-center max-w-sm">
                    Henüz işlem yapılmadı. Hadi bir şeyler saymaya başla!
                  </p>
                  <div className="mt-8 opacity-60">
                    <span className="material-symbols-outlined text-3xl text-primary animate-bounce">
                      arrow_upward
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {history.map((h) => (
                    <div
                      key={h.id}
                      className="bg-surface-container-low rounded-2xl p-5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          h.type === 'increment' ? 'bg-primary/10 text-primary' :
                          h.type === 'decrement' ? 'bg-error/10 text-error' :
                          'bg-secondary/10 text-secondary'
                        }`}>
                          <span className="material-symbols-outlined text-2xl">
                            {h.type === 'increment' ? 'arrow_upward' : h.type === 'decrement' ? 'arrow_downward' : 'restart_alt'}
                          </span>
                        </div>
                        <div>
                          <p className="font-body font-medium text-on-surface">
                            {h.type === 'increment' ? `+${h.newValue - h.previousValue} Arttırıldı` :
                             h.type === 'decrement' ? `${h.newValue - h.previousValue} Azaltıldı` :
                             'Sıfırlandı'}
                          </p>
                          <p className="text-sm text-on-surface-variant">
                            {getRelativeTimeString(h.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-headline text-xl font-bold text-on-surface">
                          {h.newValue.toLocaleString('tr-TR')}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          {formatTime(h.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        <div className="h-10" />
      </main>

      {/* BottomNavBar */}
      <nav className="md:hidden fixed bottom-0 w-full rounded-t-[24px] border-none shadow-[0_-10px_40px_rgba(99,102,241,0.1)] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl z-50">
        <div className="flex justify-around items-center px-4 pb-6 pt-3">
          <button
            onClick={() => setActiveTab('counter')}
            className={`flex flex-col items-center justify-center rounded-2xl px-5 py-2 transition-all ${
              activeTab === 'counter'
                ? 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-200 scale-105'
                : 'text-slate-400 dark:text-slate-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
            }`}
          >
            <span className="material-symbols-outlined text-[24px] mb-1">counter_1</span>
            <span className="font-['Inter'] font-semibold text-[10px] tracking-wide">Sayaç</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center justify-center rounded-2xl px-5 py-2 transition-all ${
              activeTab === 'history'
                ? 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-200 scale-105'
                : 'text-slate-400 dark:text-slate-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
            }`}
          >
            <span className="material-symbols-outlined text-[24px] mb-1">history</span>
            <span className="font-['Inter'] font-semibold text-[10px] tracking-wide">Geçmiş</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;
