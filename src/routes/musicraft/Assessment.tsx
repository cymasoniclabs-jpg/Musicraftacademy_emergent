import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, ChevronLeft, ChevronRight, Play, Volume2, VolumeX, Clock, CheckCircle } from 'lucide-react';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import { ASSESSMENT_CONFIG } from '../../psychometrics/config';
import { useAudioTest, MUSICAL_FREQUENCIES } from '../../hooks/useAudioTest';
import { calculateSectionScore, calculateOverallScore, getRecommendedLevel, getBand } from '../../psychometrics/scoring';
import { submitEnquiryDual } from '../../lib/submitEnquiry';

const MusicraftAssessment: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentAttempt,
    currentSection,
    currentItem,
    startAssessment,
    saveAnswer,
    nextItem,
    prevItem,
    nextSection,
    prevSection,
    completeAssessment
  } = useAssessmentStore();

  const [attemptId, setAttemptId] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string | number>('');
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [focusCount, setFocusCount] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const { playAudio, playSequence, isPlaying, canReplay, replaysLeft, resetReplays } = useAudioTest(3);

  const currentSectionData = ASSESSMENT_CONFIG[currentSection];
  const currentItemData = currentSectionData?.items[currentItem];
  const totalSections = ASSESSMENT_CONFIG.length;
  const totalItems = currentSectionData?.items.length || 0;
  const progress = ((currentSection * 5 + currentItem + 1) / (totalSections * 5)) * 100;

  // Initialize assessment on mount
  useEffect(() => {
    if (!currentAttempt) {
      const id = startAssessment();
      setAttemptId(id);
    } else {
      setAttemptId(currentAttempt.id);
    }
  }, [currentAttempt, startAssessment]);

  // Reset audio replays when item changes
  useEffect(() => {
    if (currentItemData?.audioData) {
      resetReplays(currentItemData.audioData.maxReplays);
    }
    setUserAnswer('');
    setTapTimes([]);
    setFocusCount(0);
    setTimerActive(false);
  }, [currentSection, currentItem, currentItemData, resetReplays]);

  // Timer for timed focus tasks
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      // Auto-submit timed task
      handleNext();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const handleAudioPlay = async () => {
    if (!currentItemData?.audioData || !canReplay || !isAudioEnabled) return;

    const { type } = currentItemData;
    
    try {
      switch (type) {
        case 'pitch-comparison':
          // Play two tones in sequence
          await playSequence([MUSICAL_FREQUENCIES.C4, MUSICAL_FREQUENCIES.E4], 0.8);
          break;
        
        case 'audio-comparison':
          // Play rhythm patterns (simplified)
          await playSequence([400, 400, 600, 400], 0.3);
          break;
        
        case 'interval-id':
          // Play interval
          await playSequence([MUSICAL_FREQUENCIES.C4, MUSICAL_FREQUENCIES.E4], 1.0);
          break;
        
        case 'digit-span':
          // Play digit sequence (simplified with tones)
          const digits = [400, 500, 450]; // Representing digits as different frequencies
          await playSequence(digits, 0.6);
          break;
        
        case 'motif-recall':
          // Play musical motif
          await playSequence([MUSICAL_FREQUENCIES.C4, MUSICAL_FREQUENCIES.E4, MUSICAL_FREQUENCIES.G4], 0.5);
          break;
        
        case 'timed-focus':
          // Start timed audio sequence
          if (currentItemData.timedData) {
            setTimeLeft(Math.floor(currentItemData.timedData.duration / 1000));
            setTimerActive(true);
            // Play background audio pattern
            await playSequence([800, 400, 800, 400, 900, 400, 800], 0.4);
          }
          break;
        
        default:
          await playAudio(440, 1);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };

  const handleTap = () => {
    if (currentItemData?.type === 'tap-tempo') {
      const now = Date.now();
      setTapTimes(prev => [...prev, now]);
    } else if (currentItemData?.type === 'timed-focus') {
      setFocusCount(prev => prev + 1);
    }
  };

  const handleAnswerChange = (value: string | number) => {
    setUserAnswer(value);
  };

  const handleNext = () => {
    if (!currentItemData) return;

    // Save current answer
    let finalAnswer: string | number = userAnswer;
    
    if (currentItemData.type === 'tap-tempo' && tapTimes.length > 1) {
      // Calculate tempo accuracy
      const intervals = tapTimes.slice(1).map((time, i) => time - tapTimes[i]);
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const expectedInterval = 60000 / 120; // 120 BPM
      const accuracy = Math.max(0, 1 - Math.abs(avgInterval - expectedInterval) / expectedInterval);
      finalAnswer = accuracy;
    } else if (currentItemData.type === 'timed-focus') {
      finalAnswer = focusCount;
    }

    saveAnswer({
      itemId: currentItemData.id,
      sectionId: currentItemData.sectionId,
      value: finalAnswer,
      timestamp: Date.now(),
      replays: (currentItemData.audioData?.maxReplays || 0) - replaysLeft
    });

    // Navigate to next item or section
    if (currentItem < totalItems - 1) {
      nextItem();
    } else if (currentSection < totalSections - 1) {
      nextSection();
    } else {
      // Complete assessment
      completeAssessmentAndNavigate();
    }
  };

  const handlePrevious = () => {
    if (currentItem > 0) {
      prevItem();
    } else if (currentSection > 0) {
      prevSection();
    }
  };

  const completeAssessmentAndNavigate = () => {
    if (!currentAttempt) return;

    // Calculate section scores
    const sectionScores = ASSESSMENT_CONFIG.map(section => 
      calculateSectionScore(section.id, currentAttempt.answers)
    );

    // Calculate overall score and recommendations
    const overallScore = calculateOverallScore(sectionScores);
    const overallBand = getBand(overallScore);
    const recommendedLevel = getRecommendedLevel(overallScore, sectionScores);

    // Submit to Formspree if enabled
    submitAssessmentResults(currentAttempt, sectionScores, overallScore, overallBand, recommendedLevel);
    // Complete the assessment
    completeAssessment(sectionScores, overallScore, overallBand, recommendedLevel);

    // Navigate to results
    navigate(`/musicraft/assessment/result/${attemptId}`);
  };

  const submitAssessmentResults = async (attempt: any, sectionScores: any[], overallScore: number, overallBand: string, recommendedLevel: string) => {
    try {
      // Submit assessment results to both Supabase and Formspree
      const result = await submitEnquiryDual(
        {
          name: `Assessment User ${attempt.id.slice(0, 8)}`,
          email: 'assessment@musicraftacademy.com', // Placeholder - real email would come from enrollment
          program: recommendedLevel,
          intent: 'Pre-Assessment',
          message: `Assessment Results:
- Overall Score: ${overallScore}/100 (Band ${overallBand})
- Recommended Level: ${recommendedLevel}
- Section Scores: ${sectionScores.map(s => `${s.sectionId}: ${s.normalizedScore}/100 (${s.band})`).join(', ')}
- Total Answers: ${attempt.answers.length}
- Started: ${new Date(attempt.startedAt).toISOString()}
- Completed: ${new Date().toISOString()}
- Attempt ID: ${attempt.id}`,
          consent_at: new Date().toISOString()
        },
        { kind: "preassessment" }
      );
      
      console.log('Assessment results submitted successfully:', result);
      
      if (result.warnings.length > 0) {
        console.warn('Assessment submission warnings:', result.warnings);
      }
    } catch (error) {
      console.warn('Failed to submit assessment results:', error);
      // Continue with local completion - don't block user experience
    }
  };
  
  const renderQuestion = () => {
    if (!currentItemData) return null;

    const { type, question, description, options } = currentItemData;

    switch (type) {
      case 'likert':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-inter text-2xl font-semibold text-white mb-4">
                {question}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {options?.map((option, index) => (
                <label key={index} className="cursor-pointer">
                  <input
                    type="radio"
                    name="likert"
                    value={index + 1}
                    checked={userAnswer === index + 1}
                    onChange={(e) => handleAnswerChange(parseInt(e.target.value))}
                    className="sr-only"
                  />
                  <div className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                    userAnswer === index + 1
                      ? 'border-royal-500 bg-royal-500/20 text-white'
                      : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                  }`}>
                    <div className="font-semibold mb-2">{index + 1}</div>
                    <div className="text-sm">{option}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      case 'audio-comparison':
      case 'pitch-comparison':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-rajdhani text-2xl font-semibold text-white mb-4">
                {question}
              </h3>
              {description && (
                <p className="font-exo text-gray-300 mb-6">{description}</p>
              )}
            </div>

            <div className="flex justify-center mb-8">
              <button
                onClick={handleAudioPlay}
                disabled={!canReplay || isPlaying || !isAudioEnabled}
                className="group relative px-8 py-4 bg-gradient-to-r from-royal-600 to-royal-400 text-white font-rajdhani font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-royal-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative flex items-center">
                  {isPlaying ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Playing...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-5 w-5" />
                      {replaysLeft > 0 ? `Play Audio (${replaysLeft} left)` : 'No replays left'}
                    </>
                  )}
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {type === 'pitch-comparison' ? (
                ['Higher', 'Lower', 'Same'].map((option) => (
                  <label key={option} className="cursor-pointer">
                    <input
                      type="radio"
                      name="comparison"
                      value={option.toLowerCase()}
                      checked={userAnswer === option.toLowerCase()}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                      userAnswer === option.toLowerCase()
                        ? 'border-royal-500 bg-royal-500/20 text-white'
                        : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                    }`}>
                      {option}
                    </div>
                  </label>
                ))
              ) : (
                ['Same', 'Different'].map((option) => (
                  <label key={option} className="cursor-pointer">
                    <input
                      type="radio"
                      name="comparison"
                      value={option.toLowerCase()}
                      checked={userAnswer === option.toLowerCase()}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                      userAnswer === option.toLowerCase()
                        ? 'border-royal-500 bg-royal-500/20 text-white'
                        : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                    }`}>
                      {option}
                    </div>
                  </label>
                ))
              )}
            </div>
          </div>
        );

      case 'timed-focus':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-rajdhani text-2xl font-semibold text-white mb-4">
                {question}
              </h3>
              {description && (
                <p className="font-exo text-gray-300 mb-6">{description}</p>
              )}
            </div>

            {!timerActive ? (
              <div className="flex justify-center">
                <button
                  onClick={handleAudioPlay}
                  disabled={!isAudioEnabled}
                  className="group relative px-8 py-4 bg-gradient-to-r from-royal-600 to-royal-400 text-white font-rajdhani font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-royal-500/25 disabled:opacity-50"
                >
                  <span className="relative flex items-center">
                    <Play className="mr-2 h-5 w-5" />
                    Start Task
                  </span>
                </button>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center space-x-4">
                  <Clock className="h-6 w-6 text-royal-400" />
                  <span className="font-rajdhani text-2xl font-bold text-white">
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                
                <button
                  onClick={handleTap}
                  className="px-12 py-6 bg-gradient-to-r from-silver-600 to-silver-400 text-white font-rajdhani font-bold text-xl rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Click When You Hear It
                </button>
                
                <p className="font-exo text-gray-300">
                  Count: {focusCount}
                </p>
              </div>
            )}
          </div>
        );

      case 'tap-tempo':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-rajdhani text-2xl font-semibold text-white mb-4">
                {question}
              </h3>
              {description && (
                <p className="font-exo text-gray-300 mb-6">{description}</p>
              )}
            </div>

            <div className="flex justify-center mb-8">
              <button
                onClick={handleAudioPlay}
                disabled={!canReplay || isPlaying || !isAudioEnabled}
                className="group relative px-8 py-4 bg-gradient-to-r from-royal-600 to-royal-400 text-white font-rajdhani font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-royal-500/25 disabled:opacity-50"
              >
                <span className="relative flex items-center">
                  <Play className="mr-2 h-5 w-5" />
                  {isPlaying ? 'Playing...' : `Play Beat (${replaysLeft} left)`}
                </span>
              </button>
            </div>

            <div className="text-center space-y-6">
              <button
                onClick={handleTap}
                className="px-16 py-8 bg-gradient-to-r from-silver-600 to-silver-400 text-white font-rajdhani font-bold text-2xl rounded-xl hover:shadow-lg transition-all duration-300"
              >
                TAP
              </button>
              
              <p className="font-exo text-gray-300">
                Taps: {tapTimes.length}
              </p>
            </div>
          </div>
        );

      case 'digit-span':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-rajdhani text-2xl font-semibold text-white mb-4">
                {question}
              </h3>
              {description && (
                <p className="font-exo text-gray-300 mb-6">{description}</p>
              )}
            </div>

            <div className="flex justify-center mb-8">
              <button
                onClick={handleAudioPlay}
                disabled={!canReplay || isPlaying || !isAudioEnabled}
                className="group relative px-8 py-4 bg-gradient-to-r from-royal-600 to-royal-400 text-white font-rajdhani font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-royal-500/25 disabled:opacity-50"
              >
                <span className="relative flex items-center">
                  <Play className="mr-2 h-5 w-5" />
                  {isPlaying ? 'Playing...' : `Play Sequence (${replaysLeft} left)`}
                </span>
              </button>
            </div>

            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="Enter the digits you heard"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white text-center text-xl font-mono placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        );

      case 'interval-id':
      case 'motif-recall':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-rajdhani text-2xl font-semibold text-white mb-4">
                {question}
              </h3>
              {description && (
                <p className="font-exo text-gray-300 mb-6">{description}</p>
              )}
            </div>

            <div className="flex justify-center mb-8">
              <button
                onClick={handleAudioPlay}
                disabled={!canReplay || isPlaying || !isAudioEnabled}
                className="group relative px-8 py-4 bg-gradient-to-r from-royal-600 to-royal-400 text-white font-rajdhani font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-royal-500/25 disabled:opacity-50"
              >
                <span className="relative flex items-center">
                  <Play className="mr-2 h-5 w-5" />
                  {isPlaying ? 'Playing...' : `Play Audio (${replaysLeft} left)`}
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {options?.map((option) => (
                <label key={option} className="cursor-pointer">
                  <input
                    type="radio"
                    name="multiple-choice"
                    value={option}
                    checked={userAnswer === option}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                    userAnswer === option
                      ? 'border-royal-500 bg-royal-500/20 text-white'
                      : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                  }`}>
                    {option}
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <p className="font-exo text-gray-300">Question type not implemented</p>
            <p className="font-source text-white">Loading assessment...</p>
          </div>
        );
    }
  };

  if (!currentSectionData || !currentItemData) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-royal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-poppins text-4xl md:text-5xl mb-4 bg-gradient-to-r from-royal-400 to-silver-300 bg-clip-text text-transparent font-bold">
            Find your best starting point
          </h1>
          <p className="font-inter text-xl text-silver-200 mb-2 font-medium">
            Pre-Assessment
          </p>
          <p className="font-source text-gray-300">
            Section {currentSection + 1} of {totalSections}: {currentSectionData.name}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="font-source text-sm text-gray-400">
              Question {currentItem + 1} of {totalItems}
            </span>
            <span className="font-source text-sm text-gray-400">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-royal-500 to-silver-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Audio Control */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
              isAudioEnabled
                ? 'bg-royal-600 text-white'
                : 'bg-gray-600 text-gray-300'
            }`}
          >
            {isAudioEnabled ? (
              <>
                <Volume2 className="mr-2 h-4 w-4" />
                Audio Enabled
              </>
            ) : (
              <>
                <VolumeX className="mr-2 h-4 w-4" />
                Audio Disabled
              </>
            )}
          </button>
        </div>

        {/* Question Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-royal-900/30 to-royal-800/20 border border-royal-500/20 rounded-2xl backdrop-blur-md p-8 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentSection}-${currentItem}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderQuestion()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentSection === 0 && currentItem === 0}
              className="group relative px-6 py-3 border-2 border-gray-600 text-gray-400 font-rajdhani font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:text-white hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:border-gray-600"
            >
              <span className="relative flex items-center">
                <ChevronLeft className="mr-2 h-5 w-5" />
                Previous
              </span>
            </button>

            <div className="flex items-center space-x-4">
              <span className="font-exo text-gray-400">
                {currentSection + 1}/{totalSections} sections
              </span>
            </div>

            <button
              onClick={handleNext}
              disabled={!userAnswer && currentItemData.type !== 'timed-focus'}
              className="group relative px-6 py-3 bg-gradient-to-r from-royal-600 to-royal-400 text-white font-rajdhani font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-royal-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              <span className="relative flex items-center">
                {currentSection === totalSections - 1 && currentItem === totalItems - 1 ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Complete
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicraftAssessment;