import { useState, useEffect } from 'react';
import { EmblemHeader } from './components/EmblemHeader';
import { SacredStepTriggerMapper } from './components/SacredStepTriggerMapper';
import { RescueRecommender } from './components/RescueRecommender';
import { FoundationStones } from './components/FoundationStones';
import { ContinueTheJourney } from './components/ContinueTheJourney';
import { CrisisBanner } from './components/CrisisBanner';
import { BrandFooter } from './components/BrandFooter';
import { LegalModal, LegalDocType } from './components/LegalModal';
import { Compass, MessageSquareHeart } from 'lucide-react';

export default function App() {
  // Load saved stones count (defaults to 4 like in the user's foundation screenshot)
  const [stonesCount, setStonesCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('sacred_steps_foundation_count');
      return saved !== null ? Math.min(Math.max(Number(saved), 0), 12) : 4;
    } catch {
      return 4;
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'mapper' | 'recommender'>('recommender');
  
  // Legal modal state
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>('privacy');

  // Persist stones to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sacred_steps_foundation_count', stonesCount.toString());
    } catch {}
  }, [stonesCount]);

  const handleStepTaken = () => {
    setStonesCount((prev) => Math.min(prev + 1, 12));
  };

  const handleResetFoundation = () => {
    setStonesCount(0);
  };

  const handleOpenLegal = (docType: LegalDocType) => {
    setActiveLegalDoc(docType);
    setIsLegalModalOpen(true);
  };

  const handleCloseLegal = () => {
    setIsLegalModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#1C2A39] flex flex-col justify-between selection:bg-[#D4AF37]/30 selection:text-[#1C2A39]">
      {/* Background delicate radial atmosphere */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40" 
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 10%, rgba(212, 175, 55, 0.12) 0%, transparent 60%)'
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Official Brand Emblem & Header */}
        <EmblemHeader
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((prev) => !prev)}
          stonesCount={stonesCount}
        />

        {/* Sanctuary Mode Navigation Switcher */}
        <div className="w-full max-w-md mx-auto px-4 mb-4 flex items-center justify-center">
          <div className="flex items-center p-1.5 rounded-full bg-white/80 border border-[#D4AF37]/40 shadow-xs">
            <button
              onClick={() => setActiveTab('recommender')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-jakarta font-medium transition-all cursor-pointer ${
                activeTab === 'recommender'
                  ? 'bg-[#1C2A39] text-[#D4AF37] font-semibold shadow-xs'
                  : 'text-[#7A8B7B] hover:text-[#1C2A39]'
              }`}
            >
              <MessageSquareHeart className="w-4 h-4 text-[#D4AF37]" />
              <span>Rescue Recommender</span>
            </button>

            <button
              onClick={() => setActiveTab('mapper')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-jakarta font-medium transition-all cursor-pointer ${
                activeTab === 'mapper'
                  ? 'bg-[#1C2A39] text-[#D4AF37] font-semibold shadow-xs'
                  : 'text-[#7A8B7B] hover:text-[#1C2A39]'
              }`}
            >
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>Trigger Mapper</span>
            </button>
          </div>
        </div>

        {/* Main interactive area */}
        <main className="flex-1 flex flex-col justify-center py-2">
          {activeTab === 'recommender' ? (
            <RescueRecommender
              onStepTaken={handleStepTaken}
              soundEnabled={soundEnabled}
            />
          ) : (
            <SacredStepTriggerMapper
              onStepTaken={handleStepTaken}
              soundEnabled={soundEnabled}
            />
          )}

          {/* Spiritual Foundation Visualizer with "Start Over / Reset" capability */}
          <FoundationStones
            count={stonesCount}
            onReset={handleResetFoundation}
          />

          {/* Continue the Journey: 90-Second Podcast & Audio Ministry */}
          <ContinueTheJourney
            soundEnabled={soundEnabled}
          />

          {/* Crisis Lifeline Compassionate Support Banner */}
          <CrisisBanner />
        </main>

        {/* Brand Guidelines Footer with clickable Legal tabs */}
        <BrandFooter onOpenLegal={handleOpenLegal} />

        {/* Comprehensive Legal Modal Pop-Up Window */}
        <LegalModal
          isOpen={isLegalModalOpen}
          initialDoc={activeLegalDoc}
          onClose={handleCloseLegal}
        />
      </div>
    </div>
  );
}
