import { useState, useCallback, useRef, useEffect } from 'react';

interface AudioTestHook {
  isPlaying: boolean;
  canReplay: boolean;
  replaysLeft: number;
  playAudio: (frequency?: number, duration?: number) => Promise<void>;
  playSequence: (frequencies: number[], noteDuration?: number) => Promise<void>;
  playRhythm: (pattern: number[], tempo?: number) => Promise<void>;
  stopAudio: () => void;
  resetReplays: (maxReplays: number) => void;
}

export function useAudioTest(maxReplays: number = 3): AudioTestHook {
  const [isPlaying, setIsPlaying] = useState(false);
  const [replaysLeft, setReplaysLeft] = useState(maxReplays);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const lastPlayTimeRef = useRef<number>(0);

  // Initialize audio context on first use
  const getAudioContext = useCallback(async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    
    return audioContextRef.current;
  }, []);

  // Debounce audio playback to prevent rapid clicking
  const canPlay = useCallback(() => {
    const now = Date.now();
    const timeSinceLastPlay = now - lastPlayTimeRef.current;
    return timeSinceLastPlay > 500 && replaysLeft > 0 && !isPlaying;
  }, [replaysLeft, isPlaying]);

  const playTone = useCallback(async (frequency: number, duration: number, startTime: number = 0) => {
    const audioContext = await getAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + startTime);
    oscillator.type = 'sine';

    // Add envelope for natural sound
    const attackTime = 0.01;
    const releaseTime = 0.1;
    const sustainLevel = 0.3;

    gainNode.gain.setValueAtTime(0, audioContext.currentTime + startTime);
    gainNode.gain.linearRampToValueAtTime(sustainLevel, audioContext.currentTime + startTime + attackTime);
    gainNode.gain.setValueAtTime(sustainLevel, audioContext.currentTime + startTime + duration - releaseTime);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + startTime + duration);

    oscillator.start(audioContext.currentTime + startTime);
    oscillator.stop(audioContext.currentTime + startTime + duration);

    return oscillator;
  }, [getAudioContext]);

  const playAudio = useCallback(async (frequency: number = 440, duration: number = 1) => {
    if (!canPlay()) return;

    try {
      setIsPlaying(true);
      lastPlayTimeRef.current = Date.now();
      setReplaysLeft(prev => prev - 1);

      await playTone(frequency, duration);

      setTimeout(() => {
        setIsPlaying(false);
      }, duration * 1000);
    } catch (error) {
      console.error('Audio playback error:', error);
      setIsPlaying(false);
    }
  }, [canPlay, playTone]);

  const playSequence = useCallback(async (frequencies: number[], noteDuration: number = 0.5) => {
    if (!canPlay()) return;

    try {
      setIsPlaying(true);
      lastPlayTimeRef.current = Date.now();
      setReplaysLeft(prev => prev - 1);

      const promises = frequencies.map((freq, index) => 
        playTone(freq, noteDuration, index * (noteDuration + 0.1))
      );

      await Promise.all(promises);

      const totalDuration = frequencies.length * (noteDuration + 0.1) * 1000;
      setTimeout(() => {
        setIsPlaying(false);
      }, totalDuration);
    } catch (error) {
      console.error('Audio sequence playback error:', error);
      setIsPlaying(false);
    }
  }, [canPlay, playTone]);

  const playRhythm = useCallback(async (pattern: number[], tempo: number = 120) => {
    if (!canPlay()) return;

    try {
      setIsPlaying(true);
      lastPlayTimeRef.current = Date.now();
      setReplaysLeft(prev => prev - 1);

      const audioContext = await getAudioContext();
      const beatDuration = 60 / tempo; // Duration of one beat in seconds

      pattern.forEach((beat, index) => {
        if (beat === 1) {
          // Play a click sound for the beat
          const startTime = index * beatDuration;
          playTone(800, 0.1, startTime);
        }
      });

      const totalDuration = pattern.length * beatDuration * 1000;
      setTimeout(() => {
        setIsPlaying(false);
      }, totalDuration);
    } catch (error) {
      console.error('Rhythm playback error:', error);
      setIsPlaying(false);
    }
  }, [canPlay, playTone, getAudioContext]);

  const stopAudio = useCallback(() => {
    if (currentSourceRef.current) {
      currentSourceRef.current.stop();
      currentSourceRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const resetReplays = useCallback((newMaxReplays: number) => {
    setReplaysLeft(newMaxReplays);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Could implement alternative feedback for reduced motion users
      console.log('Reduced motion preference detected');
    }
  }, []);

  return {
    isPlaying,
    canReplay: replaysLeft > 0 && !isPlaying,
    replaysLeft,
    playAudio,
    playSequence,
    playRhythm,
    stopAudio,
    resetReplays
  };
}

// Utility functions for generating test audio
export const MUSICAL_FREQUENCIES = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25
};

export function generateDigitSequence(digits: number[]): number[] {
  // Convert digits to frequencies for audio playback
  const baseFreq = 400;
  return digits.map(digit => baseFreq + (digit * 50));
}

export function generateRhythmPattern(pattern: string): number[] {
  // Convert rhythm pattern string to array of beats
  // 'X' = beat, '-' = rest
  return pattern.split('').map(char => char === 'X' ? 1 : 0);
}