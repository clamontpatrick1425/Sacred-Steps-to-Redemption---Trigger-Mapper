import { StepData, TriggerType } from '../types/step';

/**
 * Mock database / repository for S.T.E.P. data rooted in
 * 'Sacred Steps to Redemption: 365 Biblical Affirmations'
 */
const MOCK_STEP_DATABASE: Record<TriggerType, StepData> = {
  shame: {
    id: 'shame',
    label: 'I feel shame or guilt',
    subtitle: 'Releasing the Weight of Shame',
    weekReference: 'Week 5, Day 1',
    dayReference: 'Day 1',
    theme: 'Grace: Releasing Shame & Guilt',
    scripture: {
      reference: 'Psalm 34:5',
      text: '“They looked unto him, and were lightened: and their faces were not ashamed.”',
    },
    truth: {
      lieNamed: 'The lie says you are your worst act and must hide in condemnation.',
      dismantlingStatement: 'Shame loses its grip the moment I look toward God instead of inward at myself.',
    },
    embrace: 'I am someone whose face does not have to stay covered in shame. When I look to God, the weight lifts.',
    practice: {
      microStep: 'The next time shame rises today, physically lift your eyes and say, “I look to You.”',
      actionHint: 'Look upward, unclench your jaw, and speak this truth aloud.',
    },
  },

  setback: {
    id: 'setback',
    label: 'I had a setback or relapse urge',
    subtitle: 'Grace for the Relapse & the Return',
    weekReference: 'Week 8, Day 2',
    dayReference: 'Day 2',
    theme: 'Grace for the Relapse and the Return',
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
      actionHint: 'Take one visible recovery step right now before shame takes the lead.',
    },
  },

  anxiety: {
    id: 'anxiety',
    label: 'I am anxious or overwhelmed',
    subtitle: 'Quieting the Anxious Mind',
    weekReference: 'Week 35, Day 1',
    dayReference: 'Day 1',
    theme: 'Peace: Quieting the Anxious Mind',
    scripture: {
      reference: 'Philippians 4:6-7',
      text: '“Be careful for nothing; but in every thing by prayer and supplication… let your requests be made known unto God.”',
    },
    truth: {
      lieNamed: 'The lie says you must solve every unknown alone or catastrophe is inevitable.',
      dismantlingStatement: 'Anxiety has a specific, named alternative — prayer with thanksgiving, not just white-knuckled calm.',
    },
    embrace: 'I am bringing my anxious thoughts to God in specific prayer, instead of just trying to will them away.',
    practice: {
      microStep: 'Name one specific anxiety today, and turn it into a specific, spoken prayer request.',
      actionHint: 'Inhale slowly for 4 seconds, exhale for 6, and hand this one worry to God.',
    },
  },

  avoidance: {
    id: 'avoidance',
    label: 'I am avoiding something hard',
    subtitle: 'Facing What I’ve Avoided',
    weekReference: 'Week 27, Day 1',
    dayReference: 'Day 1',
    theme: 'Courage: Facing What I’ve Avoided',
    scripture: {
      reference: 'Psalm 139:23-24',
      text: '“Search me, O God, and know my heart: try me, and know my thoughts.”',
    },
    truth: {
      lieNamed: 'The lie insists avoiding the hard thing will protect you from uncomfortable pain.',
      dismantlingStatement: 'Self-honesty is safer with God searching alongside me than attempted alone.',
    },
    embrace: 'I am inviting an honest search of my heart today, trusting God to reveal what I need to see.',
    practice: {
      microStep: 'Ask God to reveal one blind spot today, and write down whatever comes to mind without editing it.',
      actionHint: 'Jot down the thing you’ve been putting off for 2 minutes without judging yourself.',
    },
  },
};

/**
 * Normalizes user/trigger inputs into a valid TriggerType
 */
export function normalizeTriggerType(input: string): TriggerType {
  const clean = input.toLowerCase().trim();
  if (clean.includes('shame') || clean.includes('guilt')) return 'shame';
  if (clean.includes('setback') || clean.includes('relapse')) return 'setback';
  if (clean.includes('anxi') || clean.includes('overwhelm')) return 'anxiety';
  if (clean.includes('avoid') || clean.includes('hard')) return 'avoidance';
  return 'shame'; // safe fallback
}

/**
 * Data fetching function for the Universal Sacred Step Trigger Mapper.
 * 
 * Accepts a trigger type (e.g., 'shame', 'setback', 'anxiety', 'avoidance')
 * and returns a Promise resolving with mock S.T.E.P. data (Scripture, Truth, Embrace, Practice).
 * 
 * FUTURE API EXPANSION NOTE:
 * When connecting to a real backend REST/GraphQL API:
 * ```typescript
 * const response = await fetch(`/api/steps/${triggerType}`);
 * if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
 * return await response.json();
 * ```
 */
export async function fetchStepData(triggerType: TriggerType | string): Promise<StepData> {
  const normalizedKey = normalizeTriggerType(triggerType);

  // Simulate network roundtrip latency to demonstrate real-world asynchronous behavior
  await new Promise((resolve) => setTimeout(resolve, 120));

  const data = MOCK_STEP_DATABASE[normalizedKey];
  if (!data) {
    throw new Error(`No S.T.E.P. data found for trigger: ${triggerType}`);
  }

  // Return a cloned object to prevent unintended mutations
  return JSON.parse(JSON.stringify(data));
}
