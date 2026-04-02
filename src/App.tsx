import React, { useState, useEffect } from 'react';
import Scene from './components/Scene';
import { AudioProvider, useAudio } from './components/AudioProvider';
import MagneticElement from './components/MagneticElement';
import GlitchText from './components/GlitchText';
import VaultCursor from './components/VaultCursor';
import { Github, Linkedin, Instagram, Share2, Check } from 'lucide-react';

const statuses = [
  'INIT_SEQUENCE_PENDING',
  'BUFFERING_VAULT_ASSETS',
  'ENCRYPTING_NODES',
  'CALIBRATING_QUANTUM_FIELD',
  'ACCESS_RESTRICTED'
];

const subMessages = [
  'CALIBRATING_HYPERDRIVE_ARRAY',
  'DECRYPTING_RESTRICTED_MODULES',
  'OPTIMIZING_LATENCY_PROTOCOLS',
  'SYNCHRONIZING_CLANDESTINE_NODES',
  'SCRUBBING_METADATA_TRAILS'
];

const MainLayout: React.FC = () => {
  const { playClick } = useAudio();
  const [hexProgress, setHexProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const finePointerQuery = window.matchMedia('(pointer: fine)');
    const updateCursorMode = () => {
      setShowCursor(
        finePointerQuery.matches ||
        navigator.maxTouchPoints > 0 ||
        'ontouchstart' in window
      );
    };
    updateCursorMode();
    finePointerQuery.addEventListener('change', updateCursorMode);
    return () => finePointerQuery.removeEventListener('change', updateCursorMode);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setHexProgress((prev) => (prev < 255 ? prev + 1 : 255));
    }, 50);

    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 3000);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % subMessages.length);
    }, 3500);

    const target = new Date("2026-08-14T00:00:00-05:00");
    const timer = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
      clearInterval(messageInterval);
      clearInterval(timer);
    };
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatNum = (num: number) => num.toString().padStart(2, '0');
  const hexString = `0x${hexProgress.toString(16).toUpperCase().padStart(2, '0')}`;

  return (
    <main className="relative w-full h-full overflow-hidden bg-onyx">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />

      <Scene />

      {showCursor && <div className="pointer-events-none"><VaultCursor /></div>}

      <div className="dom-layer p-6 md:p-12 flex flex-col justify-between h-full w-full">
        {/* Top Grid Area (Metadata) */}
        <header className="flex justify-between items-start w-full pointer-events-none">
          <div className="flex flex-col gap-1 text-[10px] tracking-[0.2em] md:tracking-[0.3em] font-medium text-silver/60 uppercase">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-silver/60 rounded-full animate-pulse" />
              {statuses[statusIndex]}
            </span>
            <span className="text-silver/30">LEAD ARCHITECT</span>
            <span className="text-silver/30">ISAIAH VELEZ</span>
          </div>

          <div className="flex flex-col gap-1 text-[10px] tracking-[0.2em] md:tracking-[0.3em] text-right font-medium text-silver/60 uppercase">
            <span>EXPERIMENTAL // V 0.1</span>
            <span className="text-silver/30">PHASE: ALPHA_DEPLOY</span>
            <span className="text-silver/30">LATENCY: 14MS // SECTOR: 7G</span>
          </div>
        </header>

        {/* Center Grid Area */}
        <section className="flex flex-col items-center justify-center w-full flex-grow text-center pt-8 md:pt-0 pointer-events-none">
          <div className="pointer-events-auto">
            <GlitchText
              text="COMING SOON"
              className="font-oswald text-5xl sm:text-8xl md:text-[8rem] lg:text-[10rem] xl:text-[12rem] leading-[0.85] tracking-tighter text-silver uppercase select-none mb-4"
            />
          </div>
          <div className="h-[1px] w-full max-w-lg bg-gradient-to-r from-transparent via-silver/30 to-transparent mb-6" />

          <div className="mx-auto max-w-[92vw] truncate px-1 text-[8px] sm:text-[10px] md:text-xs tracking-[0.35em] md:tracking-[0.5em] text-silver/60 uppercase min-h-[1.5em] mb-12 pointer-events-auto">
            <GlitchText
              key={messageIndex}
              text={subMessages[messageIndex]}
              scrambleSpeed={20}
              triggerOnHover={true}
            />
          </div>

          <div className="grid grid-cols-4 gap-4 md:gap-12 w-full max-w-3xl">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINS', value: timeLeft.minutes },
              { label: 'SECS', value: timeLeft.seconds },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <span className="font-oswald text-4xl md:text-6xl font-bold tracking-tighter mb-1.5 text-silver/90">
                  {formatNum(unit.value)}
                </span>
                <span className="text-[8px] md:text-[10px] tracking-[0.22em] md:tracking-[0.3em] text-silver/40 font-bold uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Grid Area */}
        <footer className="flex justify-between items-end w-full">
          <div className="hidden md:flex flex-col w-64 pointer-events-auto">
            <div className="flex justify-between text-[10px] tracking-[0.2em] text-silver/60 mb-2">
              <span>DECRYPTING ASSETS</span>
              <span>{hexString}</span>
            </div>
            <div className="w-full h-0.5 bg-silver/10 overflow-hidden relative">
              <div
                className="h-full bg-silver/80 transition-all duration-300 ease-out"
                style={{ width: `${(hexProgress / 255) * 100}%` }}
              />
            </div>
            <div className="mt-6 flex gap-6 text-silver/40">
              <MagneticElement strength={0.2}>
                <a href="https://github.com/isaiahvelez" target="_blank" rel="noopener noreferrer" className="hover:text-silver transition-colors" onMouseEnter={playClick}>
                  <Github size={18} />
                </a>
              </MagneticElement>
              <MagneticElement strength={0.2}>
                <a href="https://www.linkedin.com/in/isaiahvelez" target="_blank" rel="noopener noreferrer" className="hover:text-silver transition-colors" onMouseEnter={playClick}>
                  <Linkedin size={18} />
                </a>
              </MagneticElement>
              <MagneticElement strength={0.2}>
                <a href="https://www.instagram.com/isaiahmvelez" target="_blank" rel="noopener noreferrer" className="hover:text-silver transition-colors" onMouseEnter={playClick}>
                  <Instagram size={18} />
                </a>
              </MagneticElement>
              <MagneticElement strength={0.2}>
                <button onClick={handleShare} className="hover:text-silver transition-colors" onMouseEnter={playClick}>
                  {isCopied ? <Check size={18} /> : <Share2 size={18} />}
                </button>
              </MagneticElement>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col gap-4 text-center md:text-right md:items-end md:justify-end pointer-events-auto pb-8 md:pb-0 font-oswald mb-4 md:mb-0">
            {/* Mobile layout helpers */}
            <div className="md:hidden flex flex-col gap-2 mx-auto w-full max-w-64 mb-4">
              <div className="flex justify-between text-[10px] tracking-[0.2em] text-silver/60">
                <span>DECRYPTING</span>
                <span>{hexString}</span>
              </div>
              <div className="w-full h-0.5 bg-silver/10 overflow-hidden relative">
                <div
                  className="h-full bg-silver/80 transition-all duration-300 ease-out"
                  style={{ width: `${(hexProgress / 255) * 100}%` }}
                />
              </div>
            </div>

            <div className="md:hidden flex justify-center gap-6 mt-4 mb-8 text-silver/40 bg-onyx/50 py-2 rounded-lg pointer-events-auto">
              {/* Mobile Socials */}
              <a href="https://github.com/isaiahvelez" target="_blank" rel="noopener noreferrer" className="active:text-silver transition-colors"><Github size={18} /></a>
              <a href="https://www.linkedin.com/in/isaiahvelez" target="_blank" rel="noopener noreferrer" className="active:text-silver transition-colors"><Linkedin size={18} /></a>
              <a href="https://www.instagram.com/isaiahmvelez" target="_blank" rel="noopener noreferrer" className="active:text-silver transition-colors"><Instagram size={18} /></a>
              <button onClick={handleShare} className="active:text-silver transition-colors">{isCopied ? <Check size={18} /> : <Share2 size={18} />}</button>
            </div>


            <MagneticElement strength={0.3}>
              <button
                onMouseEnter={playClick}
                className="group relative px-10 py-5 bg-silver text-onyx font-oswald text-sm md:text-base tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:tracking-[0.3em] liquid-shine"
              >
                <div className="relative z-10 flex items-center gap-3">
                  <span className="font-bold">INITIALIZE SECURE CONTACT</span>
                  <div className="w-2 h-2 rounded-full border border-onyx group-hover:bg-onyx transition-colors duration-300" />
                </div>
              </button>
            </MagneticElement>
          </div>
        </footer>
      </div>
    </main>
  );
};

const App: React.FC = () => {
  return (
    <AudioProvider>
      <MainLayout />
    </AudioProvider>
  );
};

export default App;
