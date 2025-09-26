export interface AssessmentItem {
  id: string;
  sectionId: string;
  type: 'likert' | 'timed-focus' | 'audio-comparison' | 'tap-tempo' | 'pitch-comparison' | 'interval-id' | 'digit-span' | 'motif-recall';
  question: string;
  description?: string;
  options?: string[];
  audioData?: {
    samples: string[];
    maxReplays: number;
    playbackDuration: number;
  };
  timedData?: {
    duration: number;
    targetCount: number;
  };
  correctAnswer?: string | number;
  weight: number;
}

export interface AssessmentSection {
  id: string;
  name: string;
  description: string;
  weight: number;
  items: AssessmentItem[];
}

export const ASSESSMENT_CONFIG: AssessmentSection[] = [
  {
    id: 'attention',
    name: 'Attention & Focus',
    description: 'Measures sustained attention and focus abilities',
    weight: 0.25,
    items: [
      {
        id: 'att_1',
        sectionId: 'attention',
        type: 'likert',
        question: 'I can focus on musical tasks for extended periods without getting distracted',
        options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
        weight: 1
      },
      {
        id: 'att_2',
        sectionId: 'attention',
        type: 'likert',
        question: 'I notice small details in music (subtle rhythm changes, pitch variations)',
        options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
        weight: 1
      },
      {
        id: 'att_3',
        sectionId: 'attention',
        type: 'likert',
        question: 'I can maintain concentration even when there are distractions around me',
        options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
        weight: 1
      },
      {
        id: 'att_4',
        sectionId: 'attention',
        type: 'timed-focus',
        question: 'Count the number of high-pitched beeps in this sequence',
        description: 'Listen carefully and count only the high-pitched sounds',
        timedData: {
          duration: 15000,
          targetCount: 7
        },
        weight: 1.5
      },
      {
        id: 'att_5',
        sectionId: 'attention',
        type: 'timed-focus',
        question: 'Identify when the rhythm pattern changes',
        description: 'Click when you hear the rhythm pattern change from the original',
        timedData: {
          duration: 20000,
          targetCount: 3
        },
        weight: 1.5
      }
    ]
  },
  {
    id: 'rhythm',
    name: 'Rhythm Perception',
    description: 'Evaluates rhythm recognition and timing abilities',
    weight: 0.25,
    items: [
      {
        id: 'rhy_1',
        sectionId: 'rhythm',
        type: 'audio-comparison',
        question: 'Are these two rhythm patterns the same or different?',
        audioData: {
          samples: ['rhythm_1a', 'rhythm_1b'],
          maxReplays: 3,
          playbackDuration: 4000
        },
        correctAnswer: 'different',
        weight: 1
      },
      {
        id: 'rhy_2',
        sectionId: 'rhythm',
        type: 'audio-comparison',
        question: 'Are these two rhythm patterns the same or different?',
        audioData: {
          samples: ['rhythm_2a', 'rhythm_2b'],
          maxReplays: 3,
          playbackDuration: 4000
        },
        correctAnswer: 'same',
        weight: 1
      },
      {
        id: 'rhy_3',
        sectionId: 'rhythm',
        type: 'audio-comparison',
        question: 'Are these two rhythm patterns the same or different?',
        audioData: {
          samples: ['rhythm_3a', 'rhythm_3b'],
          maxReplays: 3,
          playbackDuration: 4000
        },
        correctAnswer: 'different',
        weight: 1
      },
      {
        id: 'rhy_4',
        sectionId: 'rhythm',
        type: 'audio-comparison',
        question: 'Are these two rhythm patterns the same or different?',
        audioData: {
          samples: ['rhythm_4a', 'rhythm_4b'],
          maxReplays: 3,
          playbackDuration: 4000
        },
        correctAnswer: 'same',
        weight: 1
      },
      {
        id: 'rhy_5',
        sectionId: 'rhythm',
        type: 'tap-tempo',
        question: 'Tap along with the beat you hear',
        description: 'Listen to the rhythm and tap the spacebar or click to match the beat',
        audioData: {
          samples: ['tempo_120'],
          maxReplays: 2,
          playbackDuration: 8000
        },
        weight: 1
      }
    ]
  },
  {
    id: 'pitch',
    name: 'Pitch Discrimination',
    description: 'Tests ability to distinguish pitch differences and intervals',
    weight: 0.30,
    items: [
      {
        id: 'pit_1',
        sectionId: 'pitch',
        type: 'pitch-comparison',
        question: 'Is the second tone higher, lower, or the same as the first?',
        audioData: {
          samples: ['tone_c4', 'tone_e4'],
          maxReplays: 3,
          playbackDuration: 2000
        },
        correctAnswer: 'higher',
        weight: 1
      },
      {
        id: 'pit_2',
        sectionId: 'pitch',
        type: 'pitch-comparison',
        question: 'Is the second tone higher, lower, or the same as the first?',
        audioData: {
          samples: ['tone_g4', 'tone_d4'],
          maxReplays: 3,
          playbackDuration: 2000
        },
        correctAnswer: 'lower',
        weight: 1
      },
      {
        id: 'pit_3',
        sectionId: 'pitch',
        type: 'pitch-comparison',
        question: 'Is the second tone higher, lower, or the same as the first?',
        audioData: {
          samples: ['tone_a4', 'tone_a4'],
          maxReplays: 3,
          playbackDuration: 2000
        },
        correctAnswer: 'same',
        weight: 1
      },
      {
        id: 'pit_4',
        sectionId: 'pitch',
        type: 'pitch-comparison',
        question: 'Is the second tone higher, lower, or the same as the first?',
        audioData: {
          samples: ['tone_f4', 'tone_c4'],
          maxReplays: 3,
          playbackDuration: 2000
        },
        correctAnswer: 'lower',
        weight: 1
      },
      {
        id: 'pit_5',
        sectionId: 'pitch',
        type: 'interval-id',
        question: 'What interval do you hear between these two notes?',
        description: 'Listen to both notes and identify the musical interval',
        options: ['Unison', 'Minor 2nd', 'Major 2nd', 'Minor 3rd', 'Major 3rd', 'Perfect 4th', 'Perfect 5th'],
        audioData: {
          samples: ['interval_major_3rd'],
          maxReplays: 3,
          playbackDuration: 3000
        },
        correctAnswer: 'Major 3rd',
        weight: 1.5
      }
    ]
  },
  {
    id: 'wm',
    name: 'Working Memory',
    description: 'Assesses musical memory and information processing',
    weight: 0.20,
    items: [
      {
        id: 'wm_1',
        sectionId: 'wm',
        type: 'digit-span',
        question: 'Listen to this sequence of numbers and repeat them back',
        description: 'You will hear a sequence of digits. Type them back in the same order.',
        audioData: {
          samples: ['digits_4_7_2'],
          maxReplays: 2,
          playbackDuration: 3000
        },
        correctAnswer: '472',
        weight: 1
      },
      {
        id: 'wm_2',
        sectionId: 'wm',
        type: 'digit-span',
        question: 'Listen to this sequence of numbers and repeat them back',
        description: 'You will hear a sequence of digits. Type them back in the same order.',
        audioData: {
          samples: ['digits_8_3_9_1'],
          maxReplays: 2,
          playbackDuration: 4000
        },
        correctAnswer: '8391',
        weight: 1
      },
      {
        id: 'wm_3',
        sectionId: 'wm',
        type: 'digit-span',
        question: 'Listen to this sequence of numbers and repeat them back',
        description: 'You will hear a sequence of digits. Type them back in the same order.',
        audioData: {
          samples: ['digits_5_2_8_7_4'],
          maxReplays: 2,
          playbackDuration: 5000
        },
        correctAnswer: '52874',
        weight: 1
      },
      {
        id: 'wm_4',
        sectionId: 'wm',
        type: 'motif-recall',
        question: 'Which melody matches what you just heard?',
        description: 'Listen to the melody, then choose the matching option',
        options: ['Melody A', 'Melody B', 'Melody C'],
        audioData: {
          samples: ['motif_original', 'motif_a', 'motif_b', 'motif_c'],
          maxReplays: 2,
          playbackDuration: 4000
        },
        correctAnswer: 'Melody B',
        weight: 1.5
      },
      {
        id: 'wm_5',
        sectionId: 'wm',
        type: 'motif-recall',
        question: 'Which melody matches what you just heard?',
        description: 'Listen to the melody, then choose the matching option',
        options: ['Melody A', 'Melody B', 'Melody C'],
        audioData: {
          samples: ['motif2_original', 'motif2_a', 'motif2_b', 'motif2_c'],
          maxReplays: 2,
          playbackDuration: 4000
        },
        correctAnswer: 'Melody A',
        weight: 1.5
      }
    ]
  }
];

export const SECTION_WEIGHTS = {
  attention: 0.25,
  rhythm: 0.25,
  pitch: 0.30,
  wm: 0.20
};

export const BAND_THRESHOLDS = {
  A: 80,
  B: 60,
  C: 0
};

export const RECOMMENDATION_RULES = {
  lowPitch: {
    threshold: 60,
    recommendation: 'Focus on ear-training modules and slower tempo practice to develop pitch recognition'
  },
  lowRhythm: {
    threshold: 60,
    recommendation: 'Use metronome scaffolding and dedicated rhythm labs to strengthen timing skills'
  },
  lowAttention: {
    threshold: 60,
    recommendation: 'Benefit from shorter lesson blocks with visual cues and structured practice routines'
  },
  lowWorkingMemory: {
    threshold: 60,
    recommendation: 'Use chunking techniques and spaced repetition to improve musical memory'
  }
};