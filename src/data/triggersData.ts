import { StepData } from '../types/step';

export const TRIGGERS_DATA: Record<string, StepData> = {
  'shame-guilt': {
    id: 'shame-guilt',
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
      lieNamed: 'The lie says you are your worst act, forever stained and beyond grace.',
      dismantlingStatement: 'Shame loses its grip the moment I look toward God instead of inward at myself.',
    },
    embrace: 'I am someone whose face does not have to stay covered in shame. When I look to God, the weight lifts.',
    practice: {
      microStep: 'The next time shame rises today, physically lift your eyes and say, “I look to You.”',
      actionHint: 'Look upward, release your shoulders, and speak it aloud.',
    },
  },

  'setback-relapse': {
    id: 'setback-relapse',
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
      lieNamed: 'The lie says a fall is the end of the road and you have disqualified yourself.',
      dismantlingStatement: 'Righteousness in Scripture is measured by rising, not by never falling.',
    },
    embrace: 'I am measured by my rising, not by the number of times I’ve fallen.',
    practice: {
      microStep: 'If today follows a hard day, get back up in one visible way — a meeting, a call, a prayer.',
      actionHint: 'Pick one visible move right now. Reach out before you spiral.',
    },
  },

  'anxious-overwhelmed': {
    id: 'anxious-overwhelmed',
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
      lieNamed: 'The lie whispers that you must control every outcome or disaster will follow.',
      dismantlingStatement: 'Anxiety has a specific, named alternative — prayer with thanksgiving, not just white-knuckled calm.',
    },
    embrace: 'I am bringing my anxious thoughts to God in specific prayer, instead of just trying to will them away.',
    practice: {
      microStep: 'Name one specific anxiety today, and turn it into a specific, spoken prayer request.',
      actionHint: 'Take three slow breaths, then speak that one worry to God.',
    },
  },

  'avoiding-hard': {
    id: 'avoiding-hard',
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
      lieNamed: 'The lie insists that keeping quiet or delaying protects you from pain.',
      dismantlingStatement: 'Self-honesty is safer with God searching alongside me than attempted alone.',
    },
    embrace: 'I am inviting an honest search of my heart today, trusting God to reveal what I need to see.',
    practice: {
      microStep: 'Ask God to reveal one blind spot today, and write down whatever comes to mind without editing it.',
      actionHint: 'Open a blank note or paper. Write for 2 minutes without judging yourself.',
    },
  },
};
