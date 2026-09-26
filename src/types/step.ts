export type TriggerType = 'shame' | 'setback' | 'anxiety' | 'avoidance';

export type TriggerId = 
  | TriggerType
  | 'shame-guilt' 
  | 'setback-relapse' 
  | 'anxious-overwhelmed' 
  | 'avoiding-hard';

export interface StepData {
  id: TriggerId;
  label: string;
  subtitle: string;
  weekReference: string;
  dayReference: string;
  theme: string;
  scripture: {
    reference: string;
    text: string;
  };
  truth: {
    lieNamed?: string;
    dismantlingStatement: string;
  };
  embrace: string; // "I am..." affirmation
  practice: {
    microStep: string;
    actionHint?: string;
  };
}

