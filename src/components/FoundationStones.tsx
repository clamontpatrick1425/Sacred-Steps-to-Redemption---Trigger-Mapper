import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react';

interface FoundationStonesProps {
  count: number;
  onReset?: () => void;
  onSelectStone?: (index: number) => void;
}

export const FoundationStones: React.FC<FoundationStonesProps> = ({
  count,
  onReset,
  onSelectStone,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // 12 stones for the 12 Monthly Themes in Sacred Steps to Redemption
  const themes = [
    'Identity',
    'Grace',
    'Faith',
    'Freedom',
    'Healing',
    'Discipline',
    'Courage',
    'Forgiveness',
    'Peace',
    'Purpose',
    'Gratitude',
    'Redemption',
  ];

  const handleConfirmReset = () => {
    if (onReset) {
      onReset();
    }
    setShowConfirmReset(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mt-6">
      <div className="bg-[#FFFFFF]/95 rounded-2xl border border-[#D4AF37]/35 p-5 shadow-xs transition-all">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-cormorant text-2xl font-bold text-[#1C2A39]">
              Your Spiritual Foundation
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-jakarta text-[#7A8B7B]">
              “Consistency over perfection” · <strong className="text-[#1C2A39]">{count}</strong> {count === 1 ? 'stone' : 'stones'} anchored
            </span>

            {/* Reset / Start Over Controls */}
            {onReset && (
              <div className="flex items-center">
                {!showConfirmReset ? (
                  <button
                    onClick={() => setShowConfirmReset(true)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-jakarta text-[#7A8B7B] hover:text-[#1C2A39] hover:bg-[#F9F6F0] rounded-lg border border-[#7A8B7B]/30 hover:border-[#D4AF37] transition-all cursor-pointer"
                    title="Reset or start over your foundation stones"
                  >
                    <RotateCcw className="w-3 h-3 text-[#D4AF37]" />
                    <span>Start Over</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 bg-[#F9F6F0] p-1 rounded-lg border border-[#D4AF37]">
                    <span className="text-[11px] font-jakarta text-[#1C2A39] px-1 font-medium">
                      Reset stones?
                    </span>
                    <button
                      onClick={handleConfirmReset}
                      className="px-2 py-0.5 text-[11px] font-semibold bg-[#1C2A39] text-[#F9F6F0] rounded hover:bg-[#1C2A39]/90 transition-colors cursor-pointer"
                    >
                      Yes, reset
                    </button>
                    <button
                      onClick={() => setShowConfirmReset(false)}
                      className="px-1.5 py-0.5 text-[11px] text-[#7A8B7B] hover:text-[#1C2A39] cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-[#2B2B2B] mb-3.5 leading-relaxed font-jakarta">
          Each time you take a Sacred Step instead of succumbing to shame, fear, or avoidance, you set an unshakeable stone into your recovery foundation.
        </p>

        {/* 12 Theme Stone Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {themes.map((theme, index) => {
            const isAnchored = index < count;
            return (
              <button
                key={theme}
                onClick={() => onSelectStone && onSelectStone(index)}
                className={`p-2 rounded-xl text-center transition-all cursor-pointer text-left focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                  isAnchored
                    ? 'bg-[#1C2A39] text-[#F9F6F0] border border-[#D4AF37] shadow-xs'
                    : 'bg-[#F9F6F0] text-[#7A8B7B] border border-[#7A8B7B]/30 hover:border-[#D4AF37]/50'
                }`}
                title={`Step ${index + 1}: ${theme} ${isAnchored ? '(Anchored)' : '(Pending)'}`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] font-jakarta uppercase tracking-wider font-semibold">
                    Step {index + 1}
                  </span>
                  {isAnchored ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-[#7A8B7B]/30 inline-block" />
                  )}
                </div>
                <div className="font-cormorant text-sm font-semibold truncate">
                  {theme}
                </div>
              </button>
            );
          })}
        </div>

        {count >= 12 && (
          <div className="mt-3 p-3 rounded-xl bg-[#F9F6F0] border border-[#D4AF37] flex items-center gap-2 text-xs text-[#1C2A39]">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span className="font-cormorant italic text-sm">
              All 12 Foundation Stones anchored. A complete circle of grace: “He which hath begun a good work in you will perform it.” (Phil. 1:6)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
