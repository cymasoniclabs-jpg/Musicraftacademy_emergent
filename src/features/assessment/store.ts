import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from 'uuid';

export type Section = "pitch" | "rhythm" | "wm" | "attention";

export interface AssessmentAnswer {
  itemId: string;
  sectionId: Section;
  value: number | string;
  timestamp: number;
  replays?: number;
}

export interface SectionScore {
  sectionId: Section;
  rawScore: number;
  normalizedScore: number;
  band: 'A' | 'B' | 'C';
}

export interface AssessmentAttempt {
  id: string;
  startedAt: number;
  completedAt?: number;
  answers: AssessmentAnswer[];
  sectionScores: SectionScore[];
  overallScore: number;
  overallBand: 'A' | 'B' | 'C';
  recommendedLevel: 'Beginner' | 'Early-Intermediate' | 'Intermediate' | 'Advanced' | 'MAX';
}

interface AssessmentState {
  currentAttempt: AssessmentAttempt | null;
  attempts: AssessmentAttempt[];
  currentSection: number;
  currentItem: number;
  locale: "en" | "kn";
  
  // Actions
  startAssessment: () => string;
  saveAnswer: (answer: AssessmentAnswer) => void;
  nextItem: () => void;
  prevItem: () => void;
  nextSection: () => void;
  prevSection: () => void;
  completeAssessment: (sectionScores: SectionScore[], overallScore: number, overallBand: 'A' | 'B' | 'C', recommendedLevel: string) => void;
  getAttempt: (id: string) => AssessmentAttempt | null;
  resetCurrentAttempt: () => void;
  setLocale: (locale: "en" | "kn") => void;
}

export const useAssessment = create<AssessmentState>()(
  persist(
    (set, get) => ({
      currentAttempt: null,
      attempts: [],
      currentSection: 0,
      currentItem: 0,
      locale: "en",

      startAssessment: () => {
        const id = uuidv4();
        const attempt: AssessmentAttempt = {
          id,
          startedAt: Date.now(),
          answers: [],
          sectionScores: [],
          overallScore: 0,
          overallBand: 'C',
          recommendedLevel: 'Beginner'
        };
        
        set({ 
          currentAttempt: attempt,
          currentSection: 0,
          currentItem: 0
        });
        
        return id;
      },

      saveAnswer: (answer) => {
        const { currentAttempt } = get();
        if (!currentAttempt) return;

        const existingIndex = currentAttempt.answers.findIndex(
          a => a.itemId === answer.itemId
        );

        const updatedAnswers = [...currentAttempt.answers];
        if (existingIndex >= 0) {
          updatedAnswers[existingIndex] = answer;
        } else {
          updatedAnswers.push(answer);
        }

        set({
          currentAttempt: {
            ...currentAttempt,
            answers: updatedAnswers
          }
        });
      },

      nextItem: () => {
        set(state => ({ currentItem: state.currentItem + 1 }));
      },

      prevItem: () => {
        set(state => ({ currentItem: Math.max(0, state.currentItem - 1) }));
      },

      nextSection: () => {
        set(state => ({ 
          currentSection: state.currentSection + 1,
          currentItem: 0
        }));
      },

      prevSection: () => {
        set(state => ({ 
          currentSection: Math.max(0, state.currentSection - 1),
          currentItem: 0
        }));
      },

      completeAssessment: (sectionScores, overallScore, overallBand, recommendedLevel) => {
        const { currentAttempt, attempts } = get();
        if (!currentAttempt) return;

        const completedAttempt: AssessmentAttempt = {
          ...currentAttempt,
          completedAt: Date.now(),
          sectionScores,
          overallScore,
          overallBand,
          recommendedLevel: recommendedLevel as any
        };

        set({
          currentAttempt: completedAttempt,
          attempts: [...attempts, completedAttempt]
        });
      },

      getAttempt: (id) => {
        const { attempts, currentAttempt } = get();
        if (currentAttempt?.id === id) return currentAttempt;
        return attempts.find(a => a.id === id) || null;
      },

      resetCurrentAttempt: () => {
        set({ 
          currentAttempt: null,
          currentSection: 0,
          currentItem: 0
        });
      },

      setLocale: (locale) => {
        set({ locale });
      }
    }),
    {
      name: "musicraft-assessment-store",
      partialize: (state) => ({
        attempts: state.attempts,
        currentAttempt: state.currentAttempt,
        locale: state.locale
      })
    }
  )
);