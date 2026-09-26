export interface VoiceNarrator {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  style: string;
  toneDescription: string;
}

export interface PodcastVoiceResponse {
  success: boolean;
  audioUrl: string;
  audioLengthInSeconds: number;
  voice: VoiceNarrator;
  remainingCharacterCount?: number;
  error?: string;
}

export const FALLBACK_VOICES: VoiceNarrator[] = [
  {
    id: 'en-US-edmund',
    name: 'Edmund',
    gender: 'Male',
    style: 'Inspirational',
    toneDescription: 'Grounded, authoritative, faith-anchored',
  },
  {
    id: 'en-US-natalie',
    name: 'Natalie',
    gender: 'Female',
    style: 'Conversational',
    toneDescription: 'Warm, empathetic, safe sanctuary',
  },
  {
    id: 'en-US-carter',
    name: 'Carter',
    gender: 'Male',
    style: 'Calm',
    toneDescription: 'Gentle, contemplative, reflective',
  },
  {
    id: 'en-US-terrell',
    name: 'Terrell',
    gender: 'Male',
    style: 'Inspirational',
    toneDescription: 'Resilient, encouraging, uplifting',
  },
  {
    id: 'en-US-samantha',
    name: 'Samantha',
    gender: 'Female',
    style: 'Conversational',
    toneDescription: 'Clear, compassionate, authentic',
  },
  {
    id: 'en-US-wayne',
    name: 'Wayne',
    gender: 'Male',
    style: 'Calm',
    toneDescription: 'Deep, steadying, reassuring',
  },
  {
    id: 'en-US-daniel',
    name: 'Daniel',
    gender: 'Male',
    style: 'Inspirational',
    toneDescription: 'Storyteller, hopeful, earnest',
  },
  {
    id: 'en-US-miles',
    name: 'Miles',
    gender: 'Male',
    style: 'Calm',
    toneDescription: 'Quiet confidence, meditative warmth',
  },
];

// Curated 90-Second Episode Scripts tailored for Murf Voice rotation
export interface PodcastEpisode {
  id: string;
  episodeNumber: string;
  monthTheme: string;
  title: string;
  durationLabel: string;
  scriptText: string;
  suggestedVoiceId?: string;
  summary: string;
}

export const CURATED_PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 'ep-57',
    episodeNumber: 'Ep. 57',
    monthTheme: 'February — Grace',
    title: 'Week 8 — Grace for the Return',
    durationLabel: '1:30',
    summary: '90 seconds of truth for when you feel like giving up after a stumble.',
    scriptText: `Did you stumble yesterday? Are you sitting in your car or at your kitchen table with that familiar, sickening whisper that you've ruined everything and blown your streak? Listen to Proverbs chapter 24, verse 16: "A just man falleth seven times, and riseth up again." Notice that Scripture does not define the righteous by never falling. It defines them by rising. Falling is an event; rising is an identity. The lie tells you a single slip cancels your calling. Psychology calls this the abstinence violation effect—where up to seventy percent of people turn a brief stumble into a full relapse, not from the slip itself, but from the crushing shame that follows. God's truth shatters that trap: you are not disqualified. Speak this truth with me out loud right now: "I am measured by my rising, not by the number of times I've fallen. Grace meets me right here on the floor, and gives me strength to stand." Your Sacred Step today: do not wait until tomorrow to start over. Get back up in one visible way before this hour ends. Send one honest text, make one recovery call, or whisper one thirty-second prayer. I'm right here with you. Take the next step. Sacred Steps to Redemption. A Path to Recovery, A Life in Grace.`,
  },
  {
    id: 'ep-56',
    episodeNumber: 'Ep. 56',
    monthTheme: 'February — Grace',
    title: 'Week 8 — Breaking the Stumble Loop',
    durationLabel: '1:30',
    summary: 'Dismantling the spiral of self-punishment and replacing it with immediate grace.',
    scriptText: `What do you do right after you fail? If you're like most of us, you start a trial in your own head, and you play the prosecutor, the judge, and the jury. But Romans 8:1 reminds us: "There is therefore now no condemnation to them which are in Christ Jesus." The prosecutor has been dismissed from the courtroom. The lie insists that punishing yourself proves you're truly sorry. Neuroscience reveals that harsh self-criticism actually increases cortisol, flooding the reward pathways that trigger addictive relapse. Self-compassion isn't giving yourself permission to sin—it's giving yourself the oxygen you need to stand back up. Speak this declaration today: "I refuse to condemn what God has already washed clean. I step out of the penalty box and into His transforming grace." Your Sacred Step: Catch your inner critic red-handed today. When the accusation starts, stop, breathe, and speak one word of forgiveness over your heart. Sacred Steps to Redemption. A Path to Recovery, A Life in Grace.`,
  },
  {
    id: 'ep-55',
    episodeNumber: 'Ep. 55',
    monthTheme: 'February — Grace',
    title: 'Week 7 — No More Hiding in the Shadows',
    durationLabel: '1:30',
    summary: 'Taking the power away from secrets by stepping into the healing light.',
    scriptText: `Have you ever felt like you're wearing an armor of perfection, terrified that if anyone saw the real struggle behind your smile, they would walk away? Ephesians 5:13 says: "All things that are reproved are made manifest by the light: for whatsoever doth make manifest is light." What stays hidden stays poisonous. What is brought into the light loses its fangs. Shame thrives in darkness and dies in exposure. Brené Brown's research confirms that shame cannot survive empathy and honest connection. When you speak the secret, you break the curse. Say this aloud with me: "I am taking the power away from my secrets. I do not have to hide to be loved." Your Sacred Step today: Bring one small shadow into the light. Tell a trusted sponsor, a prayer partner, or whisper it honestly to God in prayer. Step into the open air. Sacred Steps to Redemption. A Path to Recovery, A Life in Grace.`,
  },
  {
    id: 'ep-54',
    episodeNumber: 'Ep. 54',
    monthTheme: 'January — Identity',
    title: 'Week 5 — When Shame Speaks First',
    durationLabel: '1:30',
    summary: 'Lifting your eyes to God so shame loses its suffocating grip.',
    scriptText: `When you wake up in the morning, which voice speaks first? Is it God's tender affirmation, or that sinking dread reminding you of who you used to be? Psalm 34:5 declares: "They looked unto him, and were lightened: and their faces were not ashamed." Notice that simple direction. They didn't stare at their wounds. They didn't gaze into the mirror trying to manufacture self-esteem. They looked up. The truth is simple: shame cannot survive in the presence of God's radiant face. When you look to Him, the weight literally begins to lift off your chest. Declare this today: "My face does not belong in the dirt. I lift my eyes to Jesus, and shame has to let go." Your Sacred Step: The moment a shame wave hits you today, physically lift your chin, take a deep breath, and say: "Lord, I look to You." Sacred Steps to Redemption. A Path to Recovery, A Life in Grace.`,
  },
];

// Call the server-side proxy route to generate speech with Murf AI
export async function generatePodcastAudio(params: {
  text: string;
  voiceId?: string;
  previousVoiceId?: string;
}): Promise<PodcastVoiceResponse> {
  const response = await fetch('/api/podcast/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Voice generation failed (${response.status})`);
  }

  return response.json();
}

// Fetch the available voice roster
export async function getVoiceRoster(): Promise<{ voices: VoiceNarrator[]; lastUsedVoiceId: string }> {
  try {
    const response = await fetch('/api/podcast/voices');
    if (!response.ok) {
      return { voices: FALLBACK_VOICES, lastUsedVoiceId: '' };
    }
    return response.json();
  } catch {
    return { voices: FALLBACK_VOICES, lastUsedVoiceId: '' };
  }
}
