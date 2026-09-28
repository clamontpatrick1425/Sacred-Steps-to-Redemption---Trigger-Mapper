import React from 'react';
import { Shield, Sparkles, Volume2, VolumeX, HeartHandshake } from 'lucide-react';

interface EmblemHeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  stonesCount: number;
}

export const EmblemHeader: React.FC<EmblemHeaderProps> = ({
  soundEnabled,
  onToggleSound,
  stonesCount,
}) => {
  return (
    <header className="w-full max-w-4xl mx-auto pt-8 pb-6 px-4 text-center">
      {/* Top micro brand pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/50 bg-[#FFFFFF] shadow-xs text-xs uppercase tracking-widest text-[#1C2A39] font-medium mb-4">
        <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>Version 1.0 · 2026 Edition</span>
      </div>

      {/* Main Title in Cinzel / Cormorant Garamond */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative mb-3 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-[#D4AF37] bg-[#1C2A39] flex items-center justify-center shadow-md text-[#D4AF37]">
            <Shield className="w-6 h-6 stroke-[1.75]" />
          </div>
        </div>

        <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-[#1C2A39] uppercase">
          Sacred Steps to Redemption
        </h1>

        {/* Tagline */}
        <p className="text-xs sm:text-sm tracking-wider uppercase text-[#1C2A39]/70 mt-2 font-jakarta">
          A Path to Recovery, A Life in Grace
        </p>
      </div>

      {/* Controls & Stones Bar */}
      <div className="mt-5 flex items-center justify-between max-w-lg mx-auto px-4 py-2 rounded-xl bg-white/70 border border-[#D4AF37]/30 text-xs text-[#1C2A39]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="font-jakarta font-medium">
            Foundation Stones: <strong className="text-[#1C2A39] font-bold">{stonesCount}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute sacred chime' : 'Enable sacred chime'}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[#1C2A39] hover:bg-[#F9F6F0] transition-colors border border-transparent hover:border-[#D4AF37]/40 cursor-pointer"
            title={soundEnabled ? 'Sacred Chime Enabled' : 'Sacred Chime Muted'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#7A8B7B]" />
                <span className="text-[11px] hidden sm:inline">Chime On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#7A8B7B]" />
                <span className="text-[11px] hidden sm:inline">Chime Muted</span>
              </>
            )}
          </button>

          <a
            href="tel:988"
            className="flex items-center gap-1 text-[11px] text-[#7A8B7B] hover:text-[#1C2A39] transition-colors"
            title="988 Suicide & Crisis Lifeline"
          >
            <HeartHandshake className="w-3 h-3 text-[#D4AF37]" />
            <span className="hidden sm:inline">988 Lifeline</span>
          </a>
        </div>
      </div>
    </header>
  );
};
