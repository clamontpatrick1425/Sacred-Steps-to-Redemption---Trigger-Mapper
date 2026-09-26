import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  Footprints,
  Check,
  Sparkles,
  PhoneCall,
  RotateCcw,
  BookOpen,
  Quote,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { getRescueRecommendation, RecommendationResult } from '../services/recommenderService';
import { playSacredChime } from '../utils/audioChime';

interface RescueRecommenderProps {
  onStepTaken?: () => void;
  soundEnabled?: boolean;
}

const QUICK_PROMPT_CHIPS = [
  'I feel overwhelming shame',
  'I had a setback or relapse urge',
  'I am anxious about the future',
  'I feel like I\'m hiding',
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'guide';
  text?: string;
  recommendation?: RecommendationResult;
}

export const RescueRecommender: React.FC<RescueRecommenderProps> = ({
  onStepTaken,
  soundEnabled = true,
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isCrisisActive, setIsCrisisActive] = useState(false);
  const [stepCommitted, setStepCommitted] = useState<Record<string, boolean>>({});

  // Chat message history
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'guide',
      text: 'Peace be with you. In every storm, there is a verse that holds you, a truth that breaks the lie, and a single step toward freedom. What are you facing right now?',
    },
  ]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isThinking) return;

    // Reset input
    setInputMessage('');

    // Add user message
    const userMsgId = `user-${Date.now()}`;
    setMessages((prev) => [...prev, { id: userMsgId, sender: 'user', text: trimmed }]);

    // Trigger subtle thinking state
    setIsThinking(true);

    try {
      const rec = await getRescueRecommendation(trimmed);

      // Crisis Guardrail Interception
      if (rec.isCrisis) {
        setIsCrisisActive(true);
        setIsThinking(false);
        return;
      }

      // Append Guide recommendation message
      const guideMsgId = `guide-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: guideMsgId,
          sender: 'guide',
          recommendation: rec,
        },
      ]);
    } catch (err) {
      console.error('Failed to get recommendation:', err);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  const handleTakeStep = (messageId: string) => {
    setStepCommitted((prev) => ({ ...prev, [messageId]: true }));
    if (soundEnabled) {
      playSacredChime();
    }
    if (onStepTaken) {
      onStepTaken();
    }
  };

  const handleResetCrisis = () => {
    setIsCrisisActive(false);
  };

  const handleResetCard = () => {
    setMessages([
      {
        id: 'welcome-1',
        sender: 'guide',
        text: 'Peace be with you. In every storm, there is a verse that holds you, a truth that breaks the lie, and a single step toward freedom. What are you facing right now?',
      },
    ]);
    setInputMessage('');
    setIsThinking(false);
    setIsCrisisActive(false);
    setStepCommitted({});
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-4" aria-label="Rescue Recommender Sanctuary">
      {/* Background: Deep Sacred Blue (#1C2A39) to create a calm, safe, "sanctuary" feel */}
      <div className="w-full bg-[#1C2A39] text-[#F9F6F0] rounded-3xl border border-[#D4AF37]/50 shadow-xl overflow-hidden relative">
        
        {/* Subtle decorative inner ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(ellipse at 50% 0%, #D4AF37 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* 1. Header & Subtitle */}
        <div className="p-6 sm:p-8 text-center relative z-10 border-b border-[#D4AF37]/25">
          <div className="flex items-center justify-between mb-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-jakarta text-[#D4AF37] uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Rescue Recommender · Spiritual Companion</span>
            </div>

            {/* Reset Card button */}
            {(messages.length > 1 || inputMessage || isCrisisActive) && (
              <button
                onClick={handleResetCard}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-jakarta text-[#F9F6F0]/75 hover:text-[#D4AF37] hover:bg-white/10 rounded-full border border-white/20 hover:border-[#D4AF37]/60 transition-all cursor-pointer"
                title="Reset What are you facing right now? card"
              >
                <RotateCcw className="w-3 h-3 text-[#D4AF37]" />
                <span>Reset Card</span>
              </button>
            )}
          </div>

          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-semibold text-[#D4AF37] tracking-tight">
            What are you facing right now?
          </h2>

          <p className="font-jakarta text-sm sm:text-base text-[#F9F6F0]/85 mt-2 max-w-xl mx-auto leading-relaxed">
            You don't have to carry this alone. Tell me what's on your heart, or tap a prompt below.
          </p>

          {/* 2. Quick Prompt Chips */}
          {!isCrisisActive && (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-2xl mx-auto">
              {QUICK_PROMPT_CHIPS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isThinking}
                  className="px-4 py-3 rounded-2xl bg-[#F9F6F0] text-[#1C2A39] font-jakarta font-medium text-xs sm:text-sm text-left flex items-center justify-between border border-transparent hover:border-[#D4AF37] hover:shadow-md active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                >
                  <span className="leading-snug">{prompt}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#1C2A39]/60 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 5. Crisis Fallback: Immediately hide chat & display 988 Lifeline Banner */}
        {isCrisisActive ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 sm:p-10 relative z-10 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#F9F6F0] text-[#1C2A39] border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-4 shadow-lg">
              <ShieldAlert className="w-8 h-8 text-[#D4AF37]" />
            </div>

            <h3 className="font-cormorant text-3xl font-bold text-[#D4AF37]">
              Please Reach Out for Support
            </h3>

            <div className="mt-4 p-5 rounded-2xl bg-[#FFFFFF] text-[#1C2A39] border border-[#D4AF37] max-w-xl mx-auto text-left shadow-md">
              <p className="font-jakarta text-sm sm:text-base leading-relaxed text-[#2B2B2B]">
                “I hear how much pain you are in, and you don't have to carry this alone right now. Please reach out to people who can help keep you safe: Call or text <strong>988</strong> (Suicide & Crisis Lifeline) or go to the nearest emergency room. I am here to pray with you when you are safe.”
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="tel:988"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#D4AF37] text-[#1C2A39] font-jakarta font-bold text-sm sm:text-base hover:bg-[#D4AF37]/90 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <PhoneCall className="w-4 h-4 text-[#1C2A39]" />
                <span>Call or Text 988 (Toll-Free 24/7)</span>
              </a>

              <button
                onClick={handleResetCrisis}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/10 text-[#F9F6F0] font-jakarta text-xs sm:text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/20"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Return to Recommender</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* 3. Chat Area */
          <div className="p-4 sm:p-6 space-y-4 max-h-[560px] overflow-y-auto relative z-10">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {/* User Message Bubble */}
                {msg.sender === 'user' && (
                  <div className="max-w-[85%] sm:max-w-[75%] px-5 py-3 rounded-2xl rounded-tr-xs bg-[#F9F6F0] text-[#1C2A39] font-jakarta text-sm sm:text-base shadow-sm font-medium">
                    {msg.text}
                  </div>
                )}

                {/* Guide Greeting/Message */}
                {msg.sender === 'guide' && msg.text && (
                  <div className="max-w-[90%] sm:max-w-[85%] px-5 py-4 rounded-2xl rounded-tl-xs bg-[#FFFFFF]/10 border border-[#D4AF37]/30 text-[#F9F6F0] font-jakarta text-sm sm:text-base leading-relaxed backdrop-blur-xs">
                    {msg.text}
                  </div>
                )}

                {/* Formatted S.T.E.P. Recommendation */}
                {msg.sender === 'guide' && msg.recommendation && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="w-full max-w-full my-2 p-5 sm:p-7 rounded-3xl bg-[#FFFFFF] text-[#1C2A39] border border-[#D4AF37] shadow-xl"
                  >
                    {/* Recommendation Header in Dawn Gold, bold */}
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#D4AF37]/30">
                      <BookOpen className="w-5 h-5 text-[#D4AF37] shrink-0" />
                      <span className="font-cinzel text-sm sm:text-base font-bold text-[#D4AF37] tracking-wide">
                        📖 I recommend: {msg.recommendation.recommendationHeader}
                      </span>
                    </div>

                    {/* S.T.E.P. Details */}
                    <div className="space-y-5">
                      {/* (S) Scripture in Caveat italic */}
                      <div className="pl-4 border-l-2 border-[#D4AF37]">
                        <div className="flex items-baseline gap-2 mb-0.5">
                          <span className="font-cormorant font-bold text-lg text-[#1C2A39] uppercase tracking-wider">
                            (S) Scripture
                          </span>
                          <span className="text-xs font-jakarta font-semibold text-[#7A8B7B]">
                            {msg.recommendation.scripture.reference}
                          </span>
                        </div>
                        <p className="font-caveat italic text-2xl sm:text-3xl text-[#1C2A39] leading-snug">
                          {msg.recommendation.scripture.text}
                        </p>
                      </div>

                      {/* (T) Truth in Plus Jakarta Sans */}
                      <div className="pl-4 border-l-2 border-[#7A8B7B]/50">
                        <span className="font-cormorant font-bold text-lg text-[#1C2A39] uppercase tracking-wider block mb-0.5">
                          (T) Truth
                        </span>
                        {msg.recommendation.truth.lieNamed && (
                          <p className="font-jakarta text-xs text-[#7A8B7B] italic mb-1">
                            Lie dismantled: {msg.recommendation.truth.lieNamed}
                          </p>
                        )}
                        <p className="font-jakarta text-sm sm:text-base text-[#2B2B2B] leading-relaxed">
                          {msg.recommendation.truth.dismantlingStatement}
                        </p>
                      </div>

                      {/* (E) Embrace in soft Warm Sand (#F9F6F0) rounded box */}
                      <div className="rounded-2xl bg-[#F9F6F0] border border-[#D4AF37]/35 p-4 sm:p-5 shadow-xs relative">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-cormorant font-bold text-lg text-[#1C2A39] uppercase tracking-wider">
                            (E) Embrace
                          </span>
                          <Quote className="w-4 h-4 text-[#D4AF37]" />
                        </div>
                        <p className="font-cormorant italic text-xl sm:text-2xl text-[#1C2A39] font-medium leading-relaxed">
                          “{msg.recommendation.embrace}”
                        </p>
                        <p className="text-[11px] font-jakarta text-[#7A8B7B] mt-1.5 uppercase tracking-wider">
                          Speak this truth out loud to renew your mind
                        </p>
                      </div>

                      {/* (P) Practice in Plus Jakarta Sans with small Footprints icon */}
                      <div className="pl-4 border-l-2 border-[#D4AF37]">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-cormorant font-bold text-lg text-[#1C2A39] uppercase tracking-wider">
                            (P) Practice
                          </span>
                          <Footprints className="w-4 h-4 text-[#D4AF37]" />
                        </div>
                        <p className="font-jakarta text-sm sm:text-base text-[#2B2B2B] leading-relaxed">
                          {msg.recommendation.practice.microStep}
                        </p>
                        {msg.recommendation.practice.actionHint && (
                          <p className="text-xs font-jakarta text-[#7A8B7B] mt-1 flex items-center gap-1.5">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                            {msg.recommendation.practice.actionHint}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 4. Action Button: "I Will Take This Step Today" (Dawn Gold background, Deep Sacred Blue text) */}
                    <div className="mt-7 pt-5 border-t border-[#D4AF37]/25 text-center">
                      {!stepCommitted[msg.id] ? (
                        <div className="flex flex-col items-center">
                          <button
                            onClick={() => handleTakeStep(msg.id)}
                            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#D4AF37] text-[#1C2A39] font-jakarta font-bold text-base shadow-md hover:bg-[#D4AF37]/90 hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                          >
                            <Footprints className="w-5 h-5 text-[#1C2A39]" />
                            <span>I Will Take This Step Today</span>
                          </button>
                          <p className="text-xs font-cormorant italic text-[#7A8B7B] mt-2.5">
                            “{msg.recommendation.warmSignOff}”
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center animate-in fade-in duration-300">
                          <button
                            disabled
                            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#7A8B7B] text-[#FFFFFF] font-jakarta font-semibold text-base shadow-sm flex items-center justify-center gap-2 cursor-default"
                          >
                            <Check className="w-5 h-5 stroke-[3] text-white" />
                            <span>Committed to Today’s Step</span>
                          </button>
                          <p className="text-xs font-cormorant italic text-[#1C2A39] mt-2.5 font-medium">
                            Well done. Consistency over perfection. You are adding another stone to your foundation.
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}

            {/* Thinking Animation: subtle pulsing Dawn Gold circle */}
            <AnimatePresence>
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-[#D4AF37]/30 max-w-sm"
                >
                  <div className="relative flex items-center justify-center w-6 h-6">
                    <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-[#D4AF37] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]"></span>
                  </div>
                  <span className="font-cormorant italic text-base text-[#D4AF37]">
                    Seeking God’s word for you...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Input Bar Form */}
        {!isCrisisActive && (
          <form
            onSubmit={handleSubmit}
            className="p-4 sm:p-5 bg-[#15212E] border-t border-[#D4AF37]/30 flex items-center gap-2 relative z-10"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="What struggle, fear, or urge is on your heart right now?"
              disabled={isThinking}
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-[#F9F6F0] placeholder:text-[#F9F6F0]/50 text-sm font-jakarta border border-white/15 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isThinking}
              aria-label="Send message"
              className="px-5 py-3 rounded-xl bg-[#D4AF37] text-[#1C2A39] font-jakarta font-semibold text-sm hover:bg-[#D4AF37]/90 active:scale-[0.98] transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
