import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Footprints, Check, Sparkles, BookOpen, Quote, RotateCcw, Loader2 } from 'lucide-react';
import { StepData, TriggerType } from '../types/step';
import { TRIGGERS_DATA } from '../data/triggersData';
import { fetchStepData } from '../services/stepService';
import { playSacredChime } from '../utils/audioChime';

interface SacredStepTriggerMapperProps {
  onStepTaken?: (triggerType: TriggerType) => void;
  soundEnabled?: boolean;
}

// 4 trigger chips specified in brand requirements
const TRIGGER_CHIPS: Array<{ id: TriggerType; label: string }> = [
  { id: 'shame', label: 'I feel shame or guilt' },
  { id: 'setback', label: 'I had a setback or relapse urge' },
  { id: 'anxiety', label: 'I am anxious or overwhelmed' },
  { id: 'avoidance', label: 'I am avoiding something hard' },
];

export const SacredStepTriggerMapper: React.FC<SacredStepTriggerMapperProps> = ({
  onStepTaken,
  soundEnabled = true,
}) => {
  // 1. State for managing which trigger chip is currently active (nullable for full reset)
  const [activeTrigger, setActiveTrigger] = useState<TriggerType | null>('shame');

  // 2. State for holding the currently fetched S.T.E.P. data
  const [stepData, setStepData] = useState<StepData | null>(() => {
    return (TRIGGERS_DATA['shame-guilt'] as StepData) || null;
  });

  // 3. Loading state during asynchronous data fetching
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 4. State for tracking completed steps per trigger (Grace Mode Success)
  const [completedSteps, setCompletedSteps] = useState<Record<TriggerType, boolean>>({
    shame: false,
    setback: false,
    anxiety: false,
    avoidance: false,
  });

  // Fetch S.T.E.P. data when a trigger chip is selected
  const handleSelectTrigger = async (triggerType: TriggerType) => {
    // If clicking the active chip again, toggle it off / deselect
    if (activeTrigger === triggerType) {
      setActiveTrigger(null);
      setStepData(null);
      return;
    }

    // Update active state immediately so only that chip displays 'active' styling
    setActiveTrigger(triggerType);
    setIsLoading(true);

    try {
      // Call the data fetching function
      const fetchedData = await fetchStepData(triggerType);
      setStepData(fetchedData);
    } catch (error) {
      console.error('Error fetching S.T.E.P. data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch for the default active trigger
  useEffect(() => {
    if (activeTrigger) {
      handleSelectTrigger(activeTrigger);
    }
  }, []);

  const isCompleted = activeTrigger ? !!completedSteps[activeTrigger] : false;

  const handleTakeStep = () => {
    if (!activeTrigger) return;

    setCompletedSteps((prev) => ({
      ...prev,
      [activeTrigger]: true,
    }));

    if (soundEnabled) {
      playSacredChime();
    }

    if (onStepTaken) {
      onStepTaken(activeTrigger);
    }
  };

  // Reset the entire "What are you facing right now?" card
  const handleResetCard = () => {
    setActiveTrigger(null);
    setStepData(null);
    setIsLoading(false);
    setCompletedSteps({
      shame: false,
      setback: false,
      anxiety: false,
      avoidance: false,
    });
  };

  const handleResetCurrentStep = () => {
    if (!activeTrigger) return;
    setCompletedSteps((prev) => ({
      ...prev,
      [activeTrigger]: false,
    }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4">
      {/* Main Card: White (#FFFFFF) with 1px Dawn Gold (#D4AF37) border & shadow-md */}
      <motion.div
        layout
        className="w-full bg-[#FFFFFF] rounded-3xl border border-[#D4AF37] shadow-md p-6 sm:p-8 md:p-10 transition-shadow duration-300 relative"
      >
        {/* Top Control Bar with Reset Card button */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-jakarta text-xs uppercase tracking-widest text-[#7A8B7B] font-semibold">
            The Sacred S.T.E.P. Method™
          </span>

          {/* Reset Card Button */}
          {(activeTrigger !== null || Object.values(completedSteps).some(Boolean)) && (
            <button
              onClick={handleResetCard}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-jakarta text-[#7A8B7B] hover:text-[#1C2A39] hover:bg-[#F9F6F0] rounded-full border border-[#7A8B7B]/30 hover:border-[#D4AF37] transition-all cursor-pointer"
              title="Reset What are you facing right now? card"
            >
              <RotateCcw className="w-3 h-3 text-[#D4AF37]" />
              <span>Reset Card</span>
            </button>
          )}
        </div>

        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C2A39] tracking-tight">
            What are you facing right now?
          </h2>
          <p className="font-jakarta text-sm text-[#7A8B7B] mt-2 max-w-lg mx-auto">
            Select what you are carrying into this moment. God meets you here with truth, grace, and a single next step.
          </p>
        </div>

        {/* Trigger Selection: 4 clickable chips in a responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8" role="group" aria-label="Trigger Selection">
          {TRIGGER_CHIPS.map((chip) => {
            const isActive = activeTrigger === chip.id;
            const hasCompleted = completedSteps[chip.id];

            return (
              <button
                key={chip.id}
                onClick={() => handleSelectTrigger(chip.id)}
                className={`relative px-5 py-3.5 rounded-2xl text-sm sm:text-base font-jakarta transition-all duration-200 text-left flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#1C2A39] font-semibold border border-[#D4AF37] shadow-sm transform scale-[1.01]'
                    : 'bg-[#F9F6F0] text-[#1C2A39] border border-[#7A8B7B] hover:border-[#D4AF37] hover:bg-[#F9F6F0]/90'
                }`}
                aria-pressed={isActive}
              >
                <span className="leading-snug">{chip.label}</span>
                {hasCompleted && (
                  <span
                    className={`ml-2 p-1 rounded-full text-xs shrink-0 ${
                      isActive ? 'bg-[#1C2A39] text-[#D4AF37]' : 'bg-[#7A8B7B] text-white'
                    }`}
                    title="Sacred Step Taken"
                  >
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic S.T.E.P. Expansion with Framer Motion */}
        <div className="relative min-h-[100px]">
          {isLoading && (
            <div className="flex items-center justify-center py-8 text-[#7A8B7B] gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37]" />
              <span className="font-cormorant italic text-lg text-[#1C2A39]">
                Preparing God’s truth for this moment...
              </span>
            </div>
          )}

          {/* When card is reset (no active trigger selected) */}
          {!isLoading && !activeTrigger && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-[#F9F6F0]/80 border border-dashed border-[#D4AF37]/60 text-center my-2"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-2 text-[#D4AF37] shadow-xs">
                <Footprints className="w-5 h-5" />
              </div>
              <h3 className="font-cormorant text-xl font-bold text-[#1C2A39]">
                Card Ready for a New Step
              </h3>
              <p className="font-jakarta text-xs text-[#7A8B7B] mt-1 max-w-md mx-auto">
                Tap any trigger chip above to uncover the Scripture anchor, dismantle the lie, and take your Sacred Step.
              </p>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {!isLoading && activeTrigger && stepData && (
              <motion.div
                key={stepData.id}
                initial={{ opacity: 0, y: 12, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                {/* Context Label from Book */}
                <div className="flex items-center justify-between border-t border-[#D4AF37]/25 pt-6 pb-4">
                  <div className="flex items-center gap-2 text-xs font-jakarta text-[#7A8B7B]">
                    <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                    <span>
                      <strong className="text-[#1C2A39] font-medium">{stepData.weekReference}</strong> · {stepData.theme}
                    </span>
                  </div>
                  {isCompleted && (
                    <button
                      onClick={handleResetCurrentStep}
                      className="flex items-center gap-1 text-xs text-[#7A8B7B] hover:text-[#1C2A39] transition-colors cursor-pointer"
                      title="Re-open this step"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Step</span>
                    </button>
                  )}
                </div>

                {/* S.T.E.P. Framework Content */}
                <div className="space-y-6 my-2">
                  {/* (S) Scripture: In 'Caveat' italic font, color #1C2A39 */}
                  <div className="relative pl-4 border-l-2 border-[#D4AF37]">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-cormorant font-bold text-lg text-[#1C2A39] uppercase tracking-wider">
                        (S) Scripture
                      </span>
                      <span className="text-xs font-jakarta font-semibold text-[#7A8B7B]">
                        {stepData.scripture.reference}
                      </span>
                    </div>
                    <p className="font-caveat italic text-2xl sm:text-3xl text-[#1C2A39] leading-snug tracking-wide">
                      {stepData.scripture.text}
                    </p>
                  </div>

                  {/* (T) Truth: In 'Plus Jakarta Sans', color #2B2B2B */}
                  <div className="pl-4 border-l-2 border-[#7A8B7B]/50">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-cormorant font-bold text-lg text-[#1C2A39] uppercase tracking-wider">
                        (T) Truth
                      </span>
                    </div>
                    {stepData.truth.lieNamed && (
                      <p className="font-jakarta text-xs text-[#7A8B7B] italic mb-1">
                        Lie dismantled: {stepData.truth.lieNamed}
                      </p>
                    )}
                    <p className="font-jakarta text-base sm:text-lg text-[#2B2B2B] font-medium leading-relaxed">
                      {stepData.truth.dismantlingStatement}
                    </p>
                  </div>

                  {/* (E) Embrace: In 'Cormorant Garamond Italic', color #1C2A39, inside soft Warm Sand (#F9F6F0) rounded box */}
                  <div className="rounded-2xl bg-[#F9F6F0] border border-[#D4AF37]/30 p-5 sm:p-6 shadow-xs relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-cormorant font-bold text-lg text-[#1C2A39] uppercase tracking-wider">
                        (E) Embrace
                      </span>
                      <Quote className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <p className="font-cormorant italic text-xl sm:text-2xl text-[#1C2A39] font-medium leading-relaxed">
                      “{stepData.embrace}”
                    </p>
                    <p className="text-[11px] font-jakarta text-[#7A8B7B] mt-2 uppercase tracking-wider">
                      Speak this affirmation out loud with intention
                    </p>
                  </div>

                  {/* (P) Practice: In 'Plus Jakarta Sans', color #2B2B2B, with a small 'Footprints' icon in Dawn Gold */}
                  <div className="pl-4 border-l-2 border-[#D4AF37]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-cormorant font-bold text-lg text-[#1C2A39] uppercase tracking-wider">
                        (P) Practice
                      </span>
                      <Footprints className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <p className="font-jakarta text-base sm:text-lg text-[#2B2B2B] leading-relaxed">
                      {stepData.practice.microStep}
                    </p>
                    {stepData.practice.actionHint && (
                      <p className="text-xs font-jakarta text-[#7A8B7B] mt-1.5 flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                        {stepData.practice.actionHint}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Button & Grace Mode Success */}
                <div className="pt-8 pb-2 text-center">
                  <AnimatePresence mode="wait">
                    {!isCompleted ? (
                      <motion.div
                        key="uncompleted-btn"
                        initial={{ scale: 0.96, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.96, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col items-center"
                      >
                        <button
                          onClick={handleTakeStep}
                          className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1C2A39] text-[#F9F6F0] font-jakarta font-semibold text-base sm:text-lg shadow-md hover:bg-[#1C2A39]/90 hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
                        >
                          <Footprints className="w-5 h-5 text-[#D4AF37]" />
                          <span>I Took This Sacred Step</span>
                        </button>
                        <p className="text-xs font-cormorant italic text-[#7A8B7B] mt-3">
                          “I'm right here with you. Take the next step.”
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="completed-btn"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center"
                      >
                        {/* Changed button to Muted Sage with a checkmark */}
                        <button
                          disabled
                          className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#7A8B7B] text-[#FFFFFF] font-jakarta font-semibold text-base sm:text-lg shadow-sm flex items-center justify-center gap-2.5 mx-auto cursor-default"
                        >
                          <Check className="w-5 h-5 stroke-[3] text-white" />
                          <span>Sacred Step Completed</span>
                        </button>

                        {/* Gentle success text below */}
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15, duration: 0.35 }}
                          className="mt-4 p-4 rounded-2xl bg-[#F9F6F0] border border-[#D4AF37]/40 max-w-lg mx-auto"
                        >
                          <div className="flex items-center justify-center gap-1.5 text-[#D4AF37] mb-1">
                            <Sparkles className="w-4 h-4" />
                            <span className="font-cinzel text-xs font-semibold uppercase tracking-wider text-[#1C2A39]">
                              Grace in Action
                            </span>
                          </div>
                          <p className="font-cormorant italic text-lg sm:text-xl text-[#1C2A39] font-medium leading-relaxed">
                            “Well done. Consistency over perfection. You are adding another stone to your foundation.”
                          </p>
                          <p className="text-xs font-jakarta text-[#7A8B7B] mt-2">
                            Romans 12:2 · Renewal is not a single event — it is a daily practice.
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
