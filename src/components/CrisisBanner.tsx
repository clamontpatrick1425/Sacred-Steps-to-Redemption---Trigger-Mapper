import React, { useState } from 'react';
import { LifeBuoy, X, PhoneCall } from 'lucide-react';

export const CrisisBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-6 text-center">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="text-xs text-[#7A8B7B] hover:text-[#1C2A39] underline decoration-[#D4AF37]/50 underline-offset-4 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <LifeBuoy className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>In acute crisis or needing immediate support? Reach 988 Lifeline</span>
        </button>
      ) : (
        <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-sm text-left relative animate-in fade-in duration-300">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close crisis lifeline message"
            className="absolute top-3 right-3 text-[#7A8B7B] hover:text-[#1C2A39] p-1 rounded-full hover:bg-[#F9F6F0] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3 pr-6">
            <div className="p-2 rounded-full bg-[#F9F6F0] text-[#1C2A39] border border-[#D4AF37]/30 shrink-0">
              <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="font-cormorant text-lg font-bold text-[#1C2A39]">
                You Do Not Have to Carry This Alone
              </h4>
              <p className="text-xs text-[#2B2B2B] mt-1 leading-relaxed font-jakarta">
                If you are in deep distress or having thoughts of harm, please pause and connect with someone who can help keep you safe.
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-3">
                <a
                  href="tel:988"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C2A39] text-[#F9F6F0] text-xs font-semibold hover:bg-[#1C2A39]/90 transition-all shadow-xs"
                >
                  <PhoneCall className="w-3 h-3 text-[#D4AF37]" />
                  <span>Call or Text 988 (Free, Confidential 24/7)</span>
                </a>
                <span className="text-xs text-[#7A8B7B] font-cormorant italic">
                  I am here to pray with you when you are safe.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
