import { describe, it, expect } from 'vitest';
import { normalizeScore, getBand, calculateOverallScore } from '../psychometrics/scoring';
import { SectionScore } from '../store/useAssessmentStore';

describe('Assessment Scoring', () => {
  describe('normalizeScore', () => {
    it('should normalize scores correctly', () => {
      expect(normalizeScore(80, 100)).toBe(80);
      expect(normalizeScore(40, 50)).toBe(80);
      expect(normalizeScore(0, 100)).toBe(0);
      expect(normalizeScore(100, 100)).toBe(100);
    });

    it('should round to nearest integer', () => {
      expect(normalizeScore(33, 100)).toBe(33);
      expect(normalizeScore(33.7, 100)).toBe(34);
    });
  });

  describe('getBand', () => {
    it('should assign correct bands', () => {
      expect(getBand(85)).toBe('A');
      expect(getBand(80)).toBe('A');
      expect(getBand(79)).toBe('B');
      expect(getBand(60)).toBe('B');
      expect(getBand(59)).toBe('C');
      expect(getBand(0)).toBe('C');
    });

    it('should handle edge cases', () => {
      expect(getBand(80)).toBe('A'); // Exactly at threshold
      expect(getBand(60)).toBe('B'); // Exactly at threshold
    });
  });

  describe('calculateOverallScore', () => {
    it('should calculate weighted average correctly', () => {
      const sectionScores: SectionScore[] = [
        { sectionId: 'attention', rawScore: 20, normalizedScore: 80, band: 'A' },
        { sectionId: 'rhythm', rawScore: 15, normalizedScore: 60, band: 'B' },
        { sectionId: 'pitch', rawScore: 18, normalizedScore: 90, band: 'A' },
        { sectionId: 'working-memory', rawScore: 12, normalizedScore: 70, band: 'B' }
      ];

      // Expected: (80 * 0.25) + (60 * 0.25) + (90 * 0.30) + (70 * 0.20) = 76
      const result = calculateOverallScore(sectionScores);
      expect(result).toBe(76);
    });

    it('should handle empty section scores', () => {
      const result = calculateOverallScore([]);
      expect(result).toBe(0);
    });

    it('should round to nearest integer', () => {
      const sectionScores: SectionScore[] = [
        { sectionId: 'attention', rawScore: 20, normalizedScore: 83, band: 'A' },
        { sectionId: 'rhythm', rawScore: 15, normalizedScore: 67, band: 'B' },
        { sectionId: 'pitch', rawScore: 18, normalizedScore: 92, band: 'A' },
        { sectionId: 'working-memory', rawScore: 12, normalizedScore: 75, band: 'B' }
      ];

      // Expected: (83 * 0.25) + (67 * 0.25) + (92 * 0.30) + (75 * 0.20) = 79.1 → 79
      const result = calculateOverallScore(sectionScores);
      expect(result).toBe(79);
    });
  });
});