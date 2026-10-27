import { useEffect, useState } from 'react';

export default function LogoLoader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`logo-loader-overlay ${hidden ? 'hidden' : ''}`}>
      <div className="flex flex-col items-center gap-6">
        <div className="relative animate-scale-in">
          <img
            src="/WhatsApp_Image_2026-09-15_at_16.38.48.jpeg"
            alt="Mpohlo Holdings"
            className="w-44 h-44 sm:w-48 sm:h-48 object-contain mix-blend-screen"
          />
        </div>
        <div
          className="text-center"
          style={{
            opacity: 0,
            animation: 'fadeInText 1s ease-out 0.8s forwards',
          }}
        >
          <div className="font-serif text-2xl font-bold text-white tracking-wide">
            Mpohlo Holdings
          </div>
          <div
            className="text-xs font-medium tracking-[3px] text-gold-300 mt-1"
          >
            DEBT COUNSELLING
          </div>
        </div>
        {/* Loading bar */}
        <div className="w-40 h-0.5 bg-ink-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gold-500 rounded-full"
            style={{
              animation: 'loadBar 1.8s ease-out forwards',
            }}
          />
          <style>{`
            @keyframes loadBar {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
