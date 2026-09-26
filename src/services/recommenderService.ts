export interface RecommendationResult {
  isCrisis: boolean;
  recommendationHeader?: string;
  monthTheme?: string;
  weekTitle?: string;
  dayNumber?: string;
  scripture: {
    reference: string;
    text: string;
  };
  truth: {
    lieNamed?: string;
    dismantlingStatement: string;
  };
  embrace: string;
  practice: {
    microStep: string;
    actionHint?: string;
  };
  warmSignOff: string;
}

const CRISIS_PATTERNS = [
  /suicid/i,
  /kill\s*(myself|me)/i,
  /end\s*(my\s*life|it\s*all)/i,
  /want\s*to\s*die/i,
  /harm\s*(myself|me)/i,
  /hurt\s*(myself|me)/i,
  /cutting\s*myself/i,
  /overdos/i,
  /better\s*off\s*dead/i,
  /take\s*my\s*(own)?\s*life/i,
  /no\s*reason\s*to\s*live/i,
];

export function checkIsCrisis(message: string): boolean {
  return CRISIS_PATTERNS.some((pattern) => pattern.test(message));
}

export async function getRescueRecommendation(userMessage: string): Promise<RecommendationResult> {
  // Check Crisis Protocol first (strict guardrails)
  if (checkIsCrisis(userMessage)) {
    return {
      isCrisis: true,
      scripture: { reference: '', text: '' },
      truth: { dismantlingStatement: '' },
      embrace: '',
      practice: { microStep: '' },
      warmSignOff: '',
    };
  }

  // Artificial short thinking delay for smooth contemplative pacing
  await new Promise((resolve) => setTimeout(resolve, 650));

  const text = userMessage.toLowerCase();

  // 1. Relapse / Urge / Setback
  if (text.includes('relapse') || text.includes('setback') || text.includes('urge') || text.includes('crav') || text.includes('fell') || text.includes('stumble')) {
    return {
      isCrisis: false,
      recommendationHeader: 'February — Grace for the Relapse and the Return, Day 2',
      monthTheme: 'February — Grace',
      weekTitle: 'Grace for the Relapse and the Return (Week 8)',
      dayNumber: 'Day 2',
      scripture: {
        reference: 'Proverbs 24:16',
        text: '“A just man falleth seven times, and riseth up again.”',
      },
      truth: {
        lieNamed: 'The lie says a stumble cancels your calling and disqualifies you from freedom.',
        dismantlingStatement: 'Righteousness in Scripture is measured by rising, not by never falling.',
      },
      embrace: 'I am measured by my rising, not by the number of times I’ve fallen.',
      practice: {
        microStep: 'If today follows a hard day, get back up in one visible way — a meeting, a call, a prayer.',
        actionHint: 'Make one visible move toward freedom right now. Do not wait until tomorrow.',
      },
      warmSignOff: 'I’m right here with you. Take the next step.',
    };
  }

  // 2. Hiding / Secrets / Isolation
  if (text.includes('hid') || text.includes('secret') || text.includes('isolat') || text.includes('mask') || text.includes('pretend') || text.includes('dark')) {
    return {
      isCrisis: false,
      recommendationHeader: 'February — Grace: Releasing Shame & Guilt, Day 4',
      monthTheme: 'February — Grace',
      weekTitle: 'No More Hiding (Week 7)',
      dayNumber: 'Day 4',
      scripture: {
        reference: 'Ephesians 5:13',
        text: '“All things that are reproved are made manifest by the light.”',
      },
      truth: {
        lieNamed: 'The lie whispers that hiding keeps you safe and protects you from rejection.',
        dismantlingStatement: 'What stays hidden stays powerful; what’s exposed loses its grip.',
      },
      embrace: 'I am taking power away from my secrets by refusing to let them stay hidden any longer.',
      practice: {
        microStep: 'Bring one small secret into the light today, even just to God in prayer, out loud.',
        actionHint: 'Speak what you have been keeping in the shadows. Grace meets you in the light.',
      },
      warmSignOff: 'I’m right here with you. Step into the light.',
    };
  }

  // 3. Anxiety / Fear / Future / Overwhelmed
  if (text.includes('anxi') || text.includes('future') || text.includes('fear') || text.includes('worry') || text.includes('overwhelm') || text.includes('panic') || text.includes('stress')) {
    return {
      isCrisis: false,
      recommendationHeader: 'September — Peace: Quieting the Anxious Mind, Day 1',
      monthTheme: 'September — Peace',
      weekTitle: 'Quieting the Anxious Mind (Week 35)',
      dayNumber: 'Day 1',
      scripture: {
        reference: 'Philippians 4:6-7',
        text: '“Be careful for nothing; but in every thing by prayer and supplication… let your requests be made known unto God.”',
      },
      truth: {
        lieNamed: 'The lie says you must solve every outcome right now or everything collapses.',
        dismantlingStatement: 'Anxiety has a specific, named alternative — prayer with thanksgiving, not just white-knuckled calm.',
      },
      embrace: 'I am bringing my anxious thoughts to God in specific prayer, instead of just trying to will them away.',
      practice: {
        microStep: 'Name one specific anxiety today, and turn it into a specific, spoken prayer request.',
        actionHint: 'Inhale for 4 seconds, exhale for 6. Hand this single burden to God.',
      },
      warmSignOff: 'I’m right here with you. Take the next step.',
    };
  }

  // 4. Avoiding / Procrastination / Hard conversations
  if (text.includes('avoid') || text.includes('hard') || text.includes('delay') || text.includes('procrastinat') || text.includes('facing')) {
    return {
      isCrisis: false,
      recommendationHeader: 'July — Courage: Facing What I’ve Avoided, Day 1',
      monthTheme: 'July — Courage',
      weekTitle: 'Facing the Truth About Myself (Week 27)',
      dayNumber: 'Day 1',
      scripture: {
        reference: 'Psalm 139:23-24',
        text: '“Search me, O God, and know my heart: try me, and know my thoughts.”',
      },
      truth: {
        lieNamed: 'The lie tells you that avoiding truth protects you from pain.',
        dismantlingStatement: 'Self-honesty is safer with God searching alongside me than attempted alone.',
      },
      embrace: 'I am inviting an honest search of my heart today, trusting God to reveal what I need to see.',
      practice: {
        microStep: 'Ask God to reveal one blind spot today, and write down whatever comes to mind without editing it.',
        actionHint: 'Face one small truth today with God by your side.',
      },
      warmSignOff: 'I’m right here with you. Courage begins with honesty.',
    };
  }

  // 5. Forgiveness / Bitterness / Resentment
  if (text.includes('forgiv') || text.includes('grudge') || text.includes('bitter') || text.includes('resent') || text.includes('anger') || text.includes('hurt me')) {
    return {
      isCrisis: false,
      recommendationHeader: 'August — Forgiveness: Releasing the Past, Day 1',
      monthTheme: 'August — Forgiveness',
      weekTitle: 'Letting Go of the Grudge (Week 33)',
      dayNumber: 'Day 1',
      scripture: {
        reference: 'Leviticus 19:18',
        text: '“Thou shalt not avenge, nor bear any grudge… but thou shalt love thy neighbour as thyself.”',
      },
      truth: {
        lieNamed: 'The lie says keeping a grudge protects you from being harmed again.',
        dismantlingStatement: 'Holding a grudge and loving well cannot fully coexist long-term.',
      },
      embrace: 'I am choosing to loosen my grip on this grudge, because love and resentment can’t share the same space forever.',
      practice: {
        microStep: 'Name your longest-running grudge honestly today, without minimizing it, and release it in prayer.',
        actionHint: 'Loosen your hands physically as you pray.',
      },
      warmSignOff: 'I’m right here with you. Freedom is waiting on the other side of release.',
    };
  }

  // Default: Shame / Guilt / Worthlessness (Week 5, Day 1)
  return {
    isCrisis: false,
    recommendationHeader: 'February — Grace: Releasing Shame & Guilt, Day 1',
    monthTheme: 'February — Grace',
    weekTitle: 'Releasing the Weight of Shame (Week 5)',
    dayNumber: 'Day 1',
    scripture: {
      reference: 'Psalm 34:5',
      text: '“They looked unto him, and were lightened: and their faces were not ashamed.”',
    },
    truth: {
      lieNamed: 'The lie says your worth is defined by your worst moment.',
      dismantlingStatement: 'Shame loses its grip the moment I look toward God instead of inward at myself.',
    },
    embrace: 'I am someone whose face does not have to stay covered in shame. When I look to God, the weight lifts.',
    practice: {
      microStep: 'The next time shame rises today, physically lift your eyes and say, “I look to You.”',
      actionHint: 'Raise your chin, unclench your shoulders, and speak it aloud.',
    },
    warmSignOff: 'I’m right here with you. Take the next step.',
  };
}
