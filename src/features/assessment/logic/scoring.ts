import { AssessmentAnswer, SectionScore } from '../store';
import { ASSESSMENT_CONFIG, SECTION_WEIGHTS, BAND_THRESHOLDS, RECOMMENDATION_RULES } from './config';

export function normalizeScore(rawScore: number, maxScore: number): number {
  return Math.round((rawScore / maxScore) * 100);
}

export function calculateSectionScore(sectionId: string, answers: AssessmentAnswer[]): SectionScore {
  const section = ASSESSMENT_CONFIG.find(s => s.id === sectionId);
  if (!section) {
    throw new Error(`Section ${sectionId} not found`);
  }

  const sectionAnswers = answers.filter(a => a.sectionId === sectionId);
  let totalScore = 0;
  let maxPossibleScore = 0;

  section.items.forEach(item => {
    const answer = sectionAnswers.find(a => a.itemId === item.id);
    maxPossibleScore += item.weight * getMaxItemScore(item.type);

    if (answer) {
      const itemScore = calculateItemScore(item, answer);
      totalScore += itemScore * item.weight;
    }
  });

  const rawScore = totalScore;
  const normalizedScore = normalizeScore(totalScore, maxPossibleScore);
  const band = getBand(normalizedScore);

  return {
    sectionId: sectionId as any,
    rawScore,
    normalizedScore,
    band
  };
}

function getMaxItemScore(itemType: string): number {
  switch (itemType) {
    case 'likert':
      return 5; // 1-5 scale
    case 'timed-focus':
    case 'audio-comparison':
    case 'pitch-comparison':
    case 'interval-id':
    case 'motif-recall':
      return 1; // correct/incorrect
    case 'tap-tempo':
      return 1; // accuracy score
    case 'digit-span':
      return 1; // correct/incorrect
    default:
      return 1;
  }
}

function calculateItemScore(item: any, answer: AssessmentAnswer): number {
  switch (item.type) {
    case 'likert':
      return typeof answer.value === 'number' ? answer.value : 0;
    
    case 'audio-comparison':
    case 'pitch-comparison':
    case 'interval-id':
    case 'motif-recall':
      return answer.value === item.correctAnswer ? 1 : 0;
    
    case 'digit-span':
      return answer.value === item.correctAnswer ? 1 : 0;
    
    case 'timed-focus':
      // For timed focus tasks, score based on accuracy
      const target = item.timedData?.targetCount || 1;
      const userCount = typeof answer.value === 'number' ? answer.value : 0;
      const accuracy = Math.max(0, 1 - Math.abs(target - userCount) / target);
      return accuracy;
    
    case 'tap-tempo':
      // For tap tempo, score based on timing accuracy (simplified)
      return typeof answer.value === 'number' ? Math.min(1, answer.value) : 0;
    
    default:
      return 0;
  }
}

export function getBand(score: number): 'A' | 'B' | 'C' {
  if (score >= BAND_THRESHOLDS.A) return 'A';
  if (score >= BAND_THRESHOLDS.B) return 'B';
  return 'C';
}

export function calculateOverallScore(sectionScores: SectionScore[]): number {
  let weightedSum = 0;
  let totalWeight = 0;

  sectionScores.forEach(score => {
    const weight = SECTION_WEIGHTS[score.sectionId as keyof typeof SECTION_WEIGHTS] || 0;
    weightedSum += score.normalizedScore * weight;
    totalWeight += weight;
  });

  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
}

export function getRecommendedLevel(overallScore: number, sectionScores: SectionScore[]): string {
  // Check for MAX program eligibility (high overall + balanced sections)
  if (overallScore >= 85) {
    const allSectionsGood = sectionScores.every(s => s.normalizedScore >= 75);
    if (allSectionsGood) {
      return 'MAX';
    }
  }

  // Standard level recommendations
  if (overallScore >= 75) return 'Advanced';
  if (overallScore >= 60) return 'Intermediate';
  return 'Beginner';
}

export function generateRecommendations(sectionScores: SectionScore[]): string[] {
  const recommendations: string[] = [];

  sectionScores.forEach(score => {
    switch (score.sectionId) {
      case 'pitch':
        if (score.normalizedScore < RECOMMENDATION_RULES.lowPitch.threshold) {
          recommendations.push(RECOMMENDATION_RULES.lowPitch.recommendation);
        }
        break;
      case 'rhythm':
        if (score.normalizedScore < RECOMMENDATION_RULES.lowRhythm.threshold) {
          recommendations.push(RECOMMENDATION_RULES.lowRhythm.recommendation);
        }
        break;
      case 'attention':
        if (score.normalizedScore < RECOMMENDATION_RULES.lowAttention.threshold) {
          recommendations.push(RECOMMENDATION_RULES.lowAttention.recommendation);
        }
        break;
      case 'wm':
        if (score.normalizedScore < RECOMMENDATION_RULES.lowWorkingMemory.threshold) {
          recommendations.push(RECOMMENDATION_RULES.lowWorkingMemory.recommendation);
        }
        break;
    }
  });

  // Add general recommendations based on overall performance
  if (recommendations.length === 0) {
    recommendations.push('Continue with regular practice and maintain your current learning pace');
  }

  return recommendations;
}

export function exportToCSV(data: any[], filename: string): void {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in CSV
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}