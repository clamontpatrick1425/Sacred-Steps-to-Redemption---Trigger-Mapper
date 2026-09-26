import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Headphones,
  Play,
  Pause,
  Music,
  Users,
  ExternalLink,
  Sparkles,
  Check,
  X,
  Radio,
  Clock,
  Loader2,
} from 'lucide-react';
import { playSacredChime } from '../utils/audioChime';
import {
  VoiceNarrator,
  CURATED_PODCAST_EPISODES,
  PodcastEpisode,
  generatePodcastAudio,
  FALLBACK_VOICES,
} from '../services/podcastVoiceService';

interface ContinueTheJourneyProps {
  onExplorePremium?: () => void;
  soundEnabled?: boolean;
}

export const ContinueTheJourney: React.FC<ContinueTheJourneyProps> = ({
  onExplorePremium,
  soundEnabled = true,
}) => {
  // Episode & Audio states
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode>(CURATED_PODCAST_EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentVoice, setCurrentVoice] = useState<VoiceNarrator>(FALLBACK_VOICES[0]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(90);

  // Modals & Feedback
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showEpisodeModal, setShowEpisodeModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Audio element reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Setup / Clean up audio events
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Generate or Rotate Voice for the active episode using Murf AI
  const handleGenerateOrRotateVoice = async () => {
    setIsGenerating(true);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    try {
      const response = await generatePodcastAudio({
        text: activeEpisode.scriptText,
        previousVoiceId: currentVoice?.id,
      });

      if (response.success && response.audioUrl) {
        setAudioUrl(response.audioUrl);
        setCurrentVoice(response.voice);
        setDurationSeconds(Math.round(response.audioLengthInSeconds) || 90);
        setPlaybackSeconds(0);

        // Initialize audio
        if (audioRef.current) {
          audioRef.current.pause();
        }

        const newAudio = new Audio(response.audioUrl);
        audioRef.current = newAudio;

        newAudio.ontimeupdate = () => {
          setPlaybackSeconds(Math.floor(newAudio.currentTime));
        };

        newAudio.onended = () => {
          setIsPlaying(false);
          setPlaybackSeconds(0);
        };

        newAudio.onerror = (e) => {
          console.error('Audio playback error:', e);
          setIsPlaying(false);
        };

        await newAudio.play();
        setIsPlaying(true);
        if (soundEnabled) {
          playSacredChime();
        }
      }
    } catch (err: any) {
      console.error('Voice generation error:', err);
      // Fallback preview mode
      setIsPlaying(true);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Play / Pause Toggle
  const handleTogglePlay = async () => {
    // If not generated yet or no audio element, generate with a rotated voice!
    if (!audioRef.current || !audioUrl) {
      await handleGenerateOrRotateVoice();
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error('Playback error:', err);
        // Regenerate if URL expired
        await handleGenerateOrRotateVoice();
      }
    }
  };

  // Select an episode in modal, automatically generating with rotated voice
  const handleSelectEpisode = async (ep: PodcastEpisode) => {
    // If it's already active and audio is ready, toggle play/pause
    if (activeEpisode.id === ep.id && audioRef.current && audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch {
          // If expired, regenerate below
        }
      }
      return;
    }

    // Switch to new episode and generate with dynamically rotated voice
    setActiveEpisode(ep);
    setAudioUrl(null);
    setPlaybackSeconds(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setIsGenerating(true);

    try {
      const response = await generatePodcastAudio({
        text: ep.scriptText,
        previousVoiceId: currentVoice?.id,
      });

      if (response.success && response.audioUrl) {
        setAudioUrl(response.audioUrl);
        setCurrentVoice(response.voice);
        setDurationSeconds(Math.round(response.audioLengthInSeconds) || 90);
        setPlaybackSeconds(0);

        const newAudio = new Audio(response.audioUrl);
        audioRef.current = newAudio;

        newAudio.ontimeupdate = () => {
          setPlaybackSeconds(Math.floor(newAudio.currentTime));
        };

        newAudio.onended = () => {
          setIsPlaying(false);
          setPlaybackSeconds(0);
        };

        newAudio.onerror = () => {
          setIsPlaying(false);
        };

        await newAudio.play();
        setIsPlaying(true);
        if (soundEnabled) {
          playSacredChime();
        }
      }
    } catch (err: any) {
      console.error('Episode playback error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <section
      className="w-full max-w-3xl mx-auto px-4 mt-8 mb-4"
      aria-label="Continue the Journey"
    >
      {/* 1. Header & 2. Subtitle */}
      <div className="text-center mb-6">
        <h2 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#1C2A39] tracking-tight">
          Continue the Journey
        </h2>
        <p className="font-jakarta text-sm text-[#7A8B7B] mt-1">
          Daily inspiration in your pocket — 90 seconds at a time.
        </p>
      </div>

      {/* 3. FEATURED CARD: "Sacred Steps Podcast" (Full-width, prominent) */}
      <motion.div
        whileHover={{ scale: 1.01, boxShadow: '0 20px 25px -5px rgba(28, 42, 57, 0.15)' }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full bg-[#1C2A39] text-[#F9F6F0] rounded-3xl border border-[#D4AF37] p-6 sm:p-8 md:p-9 shadow-lg relative overflow-hidden"
      >
        {/* Ambient background radiance */}
        <div
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          {/* Top badge & icon with Play Button and Timer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-inner shrink-0">
                <Headphones className="w-8 h-8 stroke-[1.8]" />
              </div>
              <div>
                <span className="font-jakarta text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                  <span>Sacred Steps: 90-Second Daily Podcast</span>
                </span>
                <h3 className="font-cormorant text-xl sm:text-2xl md:text-3xl font-bold text-[#F9F6F0] tracking-tight mt-0.5">
                  A Path to Recovery, A Life in Grace
                </h3>
              </div>
            </div>

            {/* Play Button & Timer Control */}
            <div className="flex items-center gap-3 bg-white/10 border border-[#D4AF37]/40 rounded-full px-3.5 py-1.5 self-start sm:self-auto backdrop-blur-xs shadow-inner">
              <button
                onClick={handleTogglePlay}
                disabled={isGenerating}
                className="relative p-2.5 rounded-full bg-[#D4AF37] text-[#1C2A39] hover:bg-[#D4AF37]/90 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer disabled:opacity-50"
                title={isPlaying ? 'Pause episode' : 'Play daily 90-second episode'}
                aria-label={isPlaying ? 'Pause podcast' : 'Play podcast'}
              >
                {/* Subtle pulse ring when active */}
                {isPlaying && (
                  <motion.span
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-full border-2 border-[#D4AF37]"
                  />
                )}

                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              {/* Timer & Soundwave */}
              <div className="flex items-center gap-2 pr-1">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-jakarta text-xs font-semibold text-[#F9F6F0] tracking-wide tabular-nums">
                  {formatTime(playbackSeconds)} / {formatTime(durationSeconds || 90)}
                </span>

                {isPlaying && (
                  <div className="flex items-center gap-0.5 ml-1">
                    {[0.4, 0.9, 0.5, 0.8].map((h, i) => (
                      <motion.span
                        key={i}
                        animate={{ scaleY: [0.25, h, 0.25] }}
                        transition={{
                          duration: 0.5 + i * 0.1,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="w-0.5 h-3 bg-[#D4AF37] rounded-full inline-block origin-bottom"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="font-jakarta text-sm text-[#F9F6F0] leading-relaxed max-w-2xl mb-2 font-normal">
            Inspirational, motivational, and informative episodes to fuel your walk. New episodes daily — short enough to listen on your commute, powerful enough to shift your day.
          </p>

          {/* Tagline in Caveat italic (Muted Sage) */}
          <p className="font-caveat italic text-xl sm:text-2xl text-[#7A8B7B] tracking-wide mb-6">
            “A Path to Recovery, A Life in Grace.”
          </p>

          {/* Action Buttons (horizontal row) */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Spotify Button */}
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#D4AF37] text-[#1C2A39] font-jakarta font-bold text-xs sm:text-sm hover:bg-[#D4AF37]/90 hover:shadow-md active:scale-98 transition-all flex items-center gap-2"
            >
              <span>Listen on Spotify</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Apple Podcasts Button */}
            <a
              href="https://podcasts.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#F9F6F0] text-[#1C2A39] font-jakarta font-bold text-xs sm:text-sm hover:bg-white hover:shadow-md active:scale-98 transition-all flex items-center gap-2"
            >
              <span>Listen on Apple Podcasts</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* View All Episodes Button */}
            <button
              onClick={() => setShowEpisodeModal(true)}
              className="px-5 py-2.5 rounded-full border border-[#7A8B7B] text-[#F9F6F0] font-jakarta font-medium text-xs sm:text-sm hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-white/5 active:scale-98 transition-all cursor-pointer"
            >
              View All Episodes
            </button>
          </div>
        </div>
      </motion.div>

      {/* 4. SECONDARY CARDS (2-column grid below) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {/* Card 1: Companion Worship Music */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#D4AF37] p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all hover:shadow-md">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#F9F6F0] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-3">
              <Music className="w-5 h-5" />
            </div>
            <h4 className="font-cormorant text-xl font-bold text-[#1C2A39] mb-1.5">
              Companion Worship Music
            </h4>
            <p className="font-jakarta text-xs sm:text-sm text-[#2B2B2B] leading-relaxed mb-4">
              Ambient soundscapes for prayer, journaling, and quiet reflection.
            </p>
          </div>

          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto self-start px-5 py-2 rounded-full border border-[#1C2A39] text-[#1C2A39] font-jakarta font-semibold text-xs hover:bg-[#1C2A39] hover:text-[#F9F6F0] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Listen on Spotify</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Card 2: Join the Community */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#D4AF37] p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all hover:shadow-md">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#F9F6F0] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-cormorant text-xl font-bold text-[#1C2A39] mb-1.5">
              Join the Community
            </h4>
            <p className="font-jakarta text-xs sm:text-sm text-[#2B2B2B] leading-relaxed mb-4">
              Connect with others walking this path of redemption.
            </p>
          </div>

          <button
            onClick={() => showNotification('Opening community portal: sacredstepsrecovery.org')}
            className="w-full sm:w-auto self-start px-5 py-2 rounded-full border border-[#1C2A39] text-[#1C2A39] font-jakarta font-semibold text-xs hover:bg-[#1C2A39] hover:text-[#F9F6F0] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Visit Ministry Site</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 5. SUBTLE UPGRADE INVITATION (Footer) */}
      <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#D4AF37] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <p className="font-jakarta text-xs sm:text-sm text-[#1C2A39] font-medium">
            Want ad-free listening, exclusive bonus episodes, and the full 365-day journey?
          </p>
        </div>

        <button
          onClick={() => {
            if (onExplorePremium) {
              onExplorePremium();
            } else {
              setShowPremiumModal(true);
            }
          }}
          className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#1C2A39] font-jakarta font-bold text-xs sm:text-sm hover:bg-[#D4AF37]/90 active:scale-98 transition-all shrink-0 cursor-pointer shadow-xs"
        >
          Explore Premium
        </button>
      </div>

      {/* Toast feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#1C2A39] text-[#F9F6F0] border border-[#D4AF37] text-xs font-jakarta shadow-lg flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-[#D4AF37]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Episodes Modal with Voice Rotation indicator */}
      <AnimatePresence>
        {showEpisodeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2A39]/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-[#D4AF37] max-w-lg w-full p-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30 mb-4">
                <div className="flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <h3 className="font-cormorant text-2xl font-bold text-[#1C2A39]">
                      90-Second Episodes
                    </h3>
                    <p className="text-[11px] font-jakarta text-[#7A8B7B]">
                      Daily 90-second audio companions
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEpisodeModal(false)}
                  className="p-1 rounded-full text-[#7A8B7B] hover:text-[#1C2A39] hover:bg-gray-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {CURATED_PODCAST_EPISODES.map((item) => {
                  const isCurrent = activeEpisode.id === item.id;
                  const isCurrentActive = isCurrent && (isPlaying || isGenerating);

                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-[#1C2A39] text-[#F9F6F0] border-[#D4AF37]'
                          : 'bg-[#F9F6F0] text-[#1C2A39] border-[#D4AF37]/25 hover:border-[#D4AF37]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <span
                            className={`text-[10px] font-jakarta font-semibold uppercase tracking-wider ${
                              isCurrent ? 'text-[#D4AF37]' : 'text-[#7A8B7B]'
                            }`}
                          >
                            {item.episodeNumber} · {item.durationLabel} · {item.monthTheme}
                          </span>
                          <p className="font-cormorant font-bold text-base mt-0.5">
                            {item.title}
                          </p>
                          <p
                            className={`text-xs font-jakarta mt-1 line-clamp-2 ${
                              isCurrent
                                ? 'text-[#F9F6F0]/80'
                                : 'text-[#2B2B2B]/80'
                            }`}
                          >
                            {item.summary}
                          </p>

                          {/* In-modal audio tracker when active */}
                          {isCurrent && (isPlaying || playbackSeconds > 0 || isGenerating) && (
                            <div className="mt-2.5 pt-2 border-t border-white/10 space-y-1">
                              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                                <div
                                  className="bg-[#D4AF37] h-full transition-all duration-300"
                                  style={{
                                    width: `${Math.min((playbackSeconds / (durationSeconds || 90)) * 100, 100)}%`,
                                  }}
                                />
                              </div>
                              <div className="flex justify-between text-[10px] font-jakarta text-[#D4AF37]">
                                <span>{formatTime(playbackSeconds)}</span>
                                <span>{formatTime(durationSeconds)}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => handleSelectEpisode(item)}
                          disabled={isGenerating && isCurrent}
                          className={`p-2.5 rounded-full shrink-0 transition-transform active:scale-95 cursor-pointer disabled:opacity-60 ${
                            isCurrent
                              ? 'bg-[#D4AF37] text-[#1C2A39]'
                              : 'bg-[#1C2A39] text-[#D4AF37]'
                          }`}
                          title="Listen to this episode"
                          aria-label={isCurrent && isPlaying ? 'Pause' : 'Play'}
                        >
                          {isCurrent && isGenerating ? (
                            <Loader2 className="w-4 h-4 animate-spin text-[#1C2A39]" />
                          ) : isCurrent && isPlaying ? (
                            <Pause className="w-4 h-4 fill-current" />
                          ) : (
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 pt-3 border-t border-[#D4AF37]/20 flex justify-between items-center text-xs font-jakarta text-[#7A8B7B]">
                <span>New episodes published daily at 6:00 AM</span>
                <button
                  onClick={() => setShowEpisodeModal(false)}
                  className="px-4 py-1.5 rounded-full bg-[#1C2A39] text-[#F9F6F0] font-medium cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Premium Exploration Modal */}
      <AnimatePresence>
        {showPremiumModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2A39]/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-[#D4AF37] max-w-md w-full p-6 shadow-2xl relative text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto mb-3 text-[#D4AF37]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-cormorant text-2xl font-bold text-[#1C2A39]">
                Sacred Steps Premium Journey
              </h3>
              <p className="font-jakarta text-xs text-[#7A8B7B] mt-1 mb-4">
                Deepen your spiritual walking rhythm with unhurried grace.
              </p>

              <div className="p-4 rounded-2xl bg-[#F9F6F0] border border-[#D4AF37]/35 text-left text-xs font-jakarta space-y-2.5 text-[#2B2B2B] mb-5">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Ad-free 90-second daily podcast stream</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Full 52-Week Recovery Journal audio companion</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Exclusive extended weekend audio meditations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Monthly community prayer & recovery circles</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setShowPremiumModal(false);
                    showNotification('Thank you for your interest! Premium enrollment opens soon.');
                  }}
                  className="w-full py-3 rounded-full bg-[#D4AF37] text-[#1C2A39] font-jakarta font-bold text-sm hover:bg-[#D4AF37]/90 cursor-pointer shadow-sm"
                >
                  Join the Waitlist
                </button>
                <button
                  onClick={() => setShowPremiumModal(false)}
                  className="w-full py-2 text-xs font-jakarta text-[#7A8B7B] hover:text-[#1C2A39] cursor-pointer"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
