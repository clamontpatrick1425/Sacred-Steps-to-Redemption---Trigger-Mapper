import React from 'react';
import { BookMarked, Shield, Lock, FileText } from 'lucide-react';
import { LegalDocType } from './LegalModal';

interface BrandFooterProps {
  onOpenLegal?: (docType: LegalDocType) => void;
}

export const BrandFooter: React.FC<BrandFooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="w-full max-w-4xl mx-auto mt-12 mb-8 px-4 text-center border-t border-[#D4AF37]/30 pt-8 text-[#7A8B7B]">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Shield className="w-4 h-4 text-[#D4AF37]" />
        <span className="font-cinzel text-xs font-bold text-[#1C2A39] tracking-wider uppercase">
          Sacred Steps Recovery System
        </span>
      </div>

      <p className="font-cormorant italic text-base text-[#1C2A39]">
        “Sustained Walking, Daily Freedom.”
      </p>

      <div className="text-xs font-jakarta text-[#7A8B7B] mt-3 space-y-1">
        <p>
          Authored by <strong className="text-[#1C2A39]">C. Lamont Patrick</strong>
        </p>
        <p>Published by Kya Daisy Publishing · Copyright © 2025–2026</p>
        <p className="text-[11px] text-[#7A8B7B]/80 pt-0.5">
          Based on the 52-Week Recovery Journal & 365 Biblical Affirmations
        </p>
      </div>

      {/* Legal & Compliance Tabs in Footer */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-jakarta">
        <button
          onClick={() => onOpenLegal && onOpenLegal('privacy')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white text-[#1C2A39] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all cursor-pointer shadow-2xs hover:shadow-xs group"
          title="Open Privacy Policy pop-up window"
        >
          <Lock className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-105 transition-transform" />
          <span className="font-medium underline decoration-transparent group-hover:decoration-[#D4AF37] underline-offset-2">
            Privacy Policy
          </span>
        </button>

        <span className="text-[#D4AF37]/40 hidden sm:inline">•</span>

        <button
          onClick={() => onOpenLegal && onOpenLegal('terms')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white text-[#1C2A39] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all cursor-pointer shadow-2xs hover:shadow-xs group"
          title="Open Terms and Conditions pop-up window"
        >
          <FileText className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-105 transition-transform" />
          <span className="font-medium underline decoration-transparent group-hover:decoration-[#D4AF37] underline-offset-2">
            Terms and Conditions
          </span>
        </button>
      </div>

      {/* Bottom Sub-info */}
      <div className="mt-4 flex items-center justify-center gap-3 text-xs font-jakarta text-[#7A8B7B]">
        <span className="inline-flex items-center gap-1 text-[#1C2A39]/80">
          <BookMarked className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>The Sacred S.T.E.P. Method™</span>
        </span>
        <span>•</span>
        <span className="text-[#7A8B7B]">Version 1.0 (2026 Edition)</span>
      </div>
    </footer>
  );
};
