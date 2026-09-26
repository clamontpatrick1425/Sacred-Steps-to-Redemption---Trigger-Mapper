import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Roster of curated Murf AI voices tailored for sacred recovery & daily podcasts
export interface CuratedVoice {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  style: string;
  toneDescription: string;
}

export const SACRED_RECOVERY_VOICES: CuratedVoice[] = [
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

// In-memory tracker for voice rotation history across podcasts
let lastUsedVoiceId = '';

// Helper to pick a voice from the roster, guaranteeing rotation so the same voice is never used consecutively
function getNextRotatedVoice(excludeVoiceId?: string): CuratedVoice {
  const excluded = new Set<string>();
  if (excludeVoiceId) excluded.add(excludeVoiceId);
  if (lastUsedVoiceId) excluded.add(lastUsedVoiceId);

  const eligibleVoices = SACRED_RECOVERY_VOICES.filter((v) => !excluded.has(v.id));
  const pool = eligibleVoices.length > 0
    ? eligibleVoices
    : SACRED_RECOVERY_VOICES.filter((v) => v.id !== lastUsedVoiceId);
  const finalPool = pool.length > 0 ? pool : SACRED_RECOVERY_VOICES;

  const randomIndex = Math.floor(Math.random() * finalPool.length);
  const selected = finalPool[randomIndex];
  lastUsedVoiceId = selected.id;
  return selected;
}

// 1. Get available rotated voice roster
app.get('/api/podcast/voices', (_req: Request, res: Response) => {
  res.json({
    voices: SACRED_RECOVERY_VOICES,
    lastUsedVoiceId,
  });
});

// 2. Generate voice for podcast episode using Murf AI with automatic voice rotation
app.post('/api/podcast/generate', async (req: Request, res: Response) => {
  try {
    const { text, previousVoiceId } = req.body;

    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text prompt is required for podcast generation' });
      return;
    }

    const murfApiKey = process.env.MURF_API_KEY;
    if (!murfApiKey) {
      res.status(500).json({
        error: 'MURF_API_KEY is not configured on the server',
      });
      return;
    }

    // Automatically rotate to a different voice for each podcast creation
    const chosenVoice = getNextRotatedVoice(previousVoiceId);

    // Format text: strip brackets/cues like [MUSIC CUE], [PAUSE], [TONE SHIFT], [EMPHASIS]
    const cleanText = text
      .replace(/\[(?:MUSIC CUE|PAUSE|TONE SHIFT|EMPHASIS)[^\]]*\]/gi, ' ')
      .replace(/[*_#]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    // Call Murf AI Text-to-Speech API
    const murfResponse = await fetch('https://api.murf.ai/v1/speech/generate', {
      method: 'POST',
      headers: {
        'api-key': murfApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        voiceId: chosenVoice.id,
        style: chosenVoice.style,
        text: cleanText,
        format: 'MP3',
        rate: 0,
        pitch: 0,
      }),
    });

    if (!murfResponse.ok) {
      const errorText = await murfResponse.text();
      console.error('Murf AI API error:', murfResponse.status, errorText);
      res.status(murfResponse.status).json({
        error: `Murf AI generation failed: ${murfResponse.statusText}`,
        details: errorText,
      });
      return;
    }

    const data = await murfResponse.json();

    res.json({
      success: true,
      audioUrl: data.audioFile,
      audioLengthInSeconds: data.audioLengthInSeconds,
      voice: chosenVoice,
      remainingCharacterCount: data.remainingCharacterCount,
    });
  } catch (error: any) {
    console.error('Error generating podcast voice:', error);
    res.status(500).json({
      error: 'Internal server error generating voice',
      message: error.message,
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Dynamic import of vite in dev mode
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
