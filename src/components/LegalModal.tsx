import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Shield,
  FileText,
  Lock,
  Printer,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS, LegalDocument } from '../data/legalDocuments';

export type LegalDocType = 'privacy' | 'terms';

interface LegalModalProps {
  isOpen: boolean;
  initialDoc?: LegalDocType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialDoc = 'privacy',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalDocType>(initialDoc);
  const [copied, setCopied] = useState(false);

  // Sync tab if initialDoc changes when opened
  useEffect(() => {
    if (isOpen && initialDoc) {
      setActiveTab(initialDoc);
    }
  }, [isOpen, initialDoc]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const activeDocument: LegalDocument =
    activeTab === 'privacy' ? PRIVACY_POLICY : TERMS_AND_CONDITIONS;

  const handleCopyText = () => {
    const fullText = `${activeDocument.title}\n${activeDocument.subtitle}\nVersion: ${activeDocument.version} (${activeDocument.lastUpdated})\n\n${activeDocument.summary}\n\n` +
      activeDocument.sections
        .map((s) => `${s.title}\n${s.content.join('\n')}`)
        .join('\n\n');

    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1C2A39]/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#FFFFFF] rounded-3xl border border-[#D4AF37] shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* Header bar */}
            <div className="bg-[#1C2A39] text-[#F9F6F0] px-5 sm:px-8 py-5 border-b border-[#D4AF37]/40 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h2
                      id="legal-modal-title"
                      className="font-cinzel text-lg sm:text-xl font-bold tracking-wide text-[#F9F6F0] uppercase"
                    >
                      Sacred Steps Legal & Privacy Sanctuary
                    </h2>
                    <p className="text-[11px] font-jakarta text-[#D4AF37]">
                      Version 1.0 (2026 Edition) · Kya Daisy Publishing
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-2 rounded-full text-[#F9F6F0]/70 hover:text-[#F9F6F0] hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Tabs inside Modal */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center p-1 rounded-full bg-white/10 border border-[#D4AF37]/30">
                  <button
                    onClick={() => setActiveTab('privacy')}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-jakarta font-medium transition-all cursor-pointer ${
                      activeTab === 'privacy'
                        ? 'bg-[#D4AF37] text-[#1C2A39] font-bold shadow-xs'
                        : 'text-[#F9F6F0]/80 hover:text-[#F9F6F0]'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Privacy Policy</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('terms')}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-jakarta font-medium transition-all cursor-pointer ${
                      activeTab === 'terms'
                        ? 'bg-[#D4AF37] text-[#1C2A39] font-bold shadow-xs'
                        : 'text-[#F9F6F0]/80 hover:text-[#F9F6F0]'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Terms & Conditions</span>
                  </button>
                </div>

                {/* Action buttons (Print / Copy) */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyText}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#F9F6F0] text-xs font-jakarta border border-white/10 transition-colors cursor-pointer"
                    title="Copy full text"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="hidden sm:inline">Copy Text</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#F9F6F0] text-xs font-jakarta border border-white/10 transition-colors cursor-pointer"
                    title="Print document"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="hidden sm:inline">Print</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-6 text-[#2B2B2B] bg-[#F9F6F0]/30">
              {/* Document Sub-header & Summary Box */}
              <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#D4AF37]/35 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#1C2A39]">
                    {activeDocument.title}
                  </h3>
                  <span className="text-xs font-jakarta text-[#7A8B7B]">
                    Last Updated: {activeDocument.lastUpdated}
                  </span>
                </div>

                <p className="text-xs text-[#7A8B7B] font-jakarta mb-3">
                  {activeDocument.subtitle}
                </p>

                <div className="p-3.5 rounded-xl bg-[#F9F6F0] border-l-4 border-[#D4AF37] text-xs sm:text-sm font-jakarta text-[#1C2A39] leading-relaxed">
                  <strong>Summary: </strong>
                  {activeDocument.summary}
                </div>

                {/* Important Medical & Emergency Callout for Terms */}
                {activeTab === 'terms' && (
                  <div className="mt-3.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-2.5 text-xs font-jakarta">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Spiritual Companion Protocol: </strong>
                      Sacred Steps is a faith-rooted recovery tool, not a clinical healthcare service. If you are in immediate danger or severe crisis, call or text <strong>988</strong> anytime.
                    </div>
                  </div>
                )}
              </div>

              {/* Sections list */}
              <div className="space-y-6">
                {activeDocument.sections.map((section) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#D4AF37]/25 shadow-xs transition-shadow hover:shadow-sm"
                  >
                    <h4 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1C2A39] mb-3 flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{section.title}</span>
                    </h4>

                    <div className="space-y-2.5 pl-6 font-jakarta text-xs sm:text-sm text-[#2B2B2B] leading-relaxed">
                      {section.content.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Quick Help Contact Box */}
              <div className="p-4 rounded-xl bg-white border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-jakarta text-[#7A8B7B]">
                <div className="flex items-center gap-2 text-center sm:text-left">
                  <Shield className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>
                    Questions? Reach our ministry at{' '}
                    <a
                      href="mailto:scaredstepstoredemption@gmail.com"
                      className="text-[#1C2A39] font-semibold underline decoration-[#D4AF37]"
                    >
                      scaredstepstoredemption@gmail.com
                    </a>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="tel:988"
                    className="inline-flex items-center gap-1 text-[#D4AF37] hover:underline font-medium"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>988 Crisis Lifeline</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Bar with Close button */}
            <div className="px-6 py-4 bg-white border-t border-[#D4AF37]/25 flex items-center justify-between">
              <span className="text-xs font-jakarta text-[#7A8B7B] hidden sm:inline">
                Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border text-[10px]">Esc</kbd> or click outside to dismiss
              </span>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2 rounded-full bg-[#1C2A39] text-[#F9F6F0] font-jakarta font-semibold text-xs sm:text-sm hover:bg-[#1C2A39]/90 transition-all cursor-pointer ml-auto"
              >
                Close Document
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
