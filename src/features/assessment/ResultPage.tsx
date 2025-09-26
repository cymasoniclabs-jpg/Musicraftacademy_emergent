import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Brain, Award, TrendingUp, Download, Share2, RotateCcw, BookOpen, ArrowRight } from 'lucide-react';
import { useAssessment } from './store';
import { generateRecommendations, exportToCSV } from './logic/scoring';
import { ASSESSMENT_CONFIG } from './logic/config';

const ResultPage: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('assessment');
  const { getAttempt, resetCurrentAttempt } = useAssessment();
  const [attempt, setAttempt] = useState(useAssessment.getState().currentAttempt);

  useEffect(() => {
    if (attemptId) {
      const foundAttempt = getAttempt(attemptId);
      if (foundAttempt) {
        setAttempt(foundAttempt);
      }
    }
  }, [attemptId, getAttempt]);

  if (!attempt || !attempt.completedAt) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-16 w-16 text-royal-400 mx-auto mb-6" />
          <h1 className="font-inter text-2xl font-bold text-white mb-4">
            {t('assessmentResult.notFoundTitle')}
          </h1>
          <p className="font-source text-gray-300 mb-8">
            {t('assessmentResult.notFoundMessage')}
          </p>
          <button
            onClick={() => navigate('/musicraft/assessment')}
            className="group relative px-8 py-4 bg-gradient-to-r from-royal-600 to-royal-400 text-white font-inter font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-royal-500/25"
          >
            <span className="relative flex items-center justify-center">
              <RotateCcw className="mr-2 h-5 w-5" />
              {t('assessmentResult.takeNewAssessmentCta')}
            </span>
          </button>
        </div>
      </div>
    );
  }

  const recommendations = generateRecommendations(attempt.sectionScores);

  const getBandColor = (band: 'A' | 'B' | 'C') => {
    switch (band) {
      case 'A': return 'from-green-500 to-emerald-500';
      case 'B': return 'from-yellow-500 to-orange-500';
      case 'C': return 'from-red-500 to-pink-500';
    }
  };

  const getBandLabel = (band: 'A' | 'B' | 'C') => {
    return t(`assessmentResult.bandLabel${band}`);
  };

  const handleDownloadCSV = () => {
    const csvData = [
      {
        attemptId: attempt.id,
        completedAt: new Date(attempt.completedAt!).toISOString(),
        overallScore: attempt.overallScore,
        overallBand: attempt.overallBand,
        recommendedLevel: attempt.recommendedLevel,
        ...attempt.sectionScores.reduce((acc, score) => ({
          ...acc,
          [`${score.sectionId}_score`]: score.normalizedScore,
          [`${score.sectionId}_band`]: score.band
        }), {})
      }
    ];
    
    exportToCSV(csvData, `musicraft-assessment-${attempt.id}.csv`);
  };

  const handleShare = () => {
    const shareData = {
      overallScore: attempt.overallScore,
      overallBand: attempt.overallBand,
      recommendedLevel: attempt.recommendedLevel,
      sections: attempt.sectionScores.map(s => ({
        section: s.sectionId,
        score: s.normalizedScore,
        band: s.band
      }))
    };
    
    const shareUrl = `${window.location.origin}/musicraft/assessment/result/${attempt.id}?data=${encodeURIComponent(JSON.stringify(shareData))}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Musicraft Assessment Results',
        text: `I scored ${attempt.overallScore}/100 on my musical assessment!`,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert(t('assessmentResult.shareAlert'));
    }
  };

  const handleRetakeAssessment = () => {
    resetCurrentAttempt();
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="font-poppins text-4xl md:text-5xl mb-6 bg-gradient-to-r from-royal-400 to-silver-300 bg-clip-text text-transparent font-bold">
          {t('assessmentResult.headerTitle')}
        </h1>
        <p className="font-source text-xl text-gray-300 max-w-2xl mx-auto">
          {t('assessmentResult.headerSubtitle')}
        </p>
      </div>

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-2xl mx-auto mb-16"
      >
        <div className="bg-gradient-to-br from-royal-900/50 to-silver-900/50 border border-royal-500/20 rounded-3xl backdrop-blur-md p-12 text-center">
          <div className={`w-32 h-32 bg-gradient-to-r ${getBandColor(attempt.overallBand)} rounded-full flex items-center justify-center mx-auto mb-6`}>
            <span className="font-inter text-4xl text-white">
              {attempt.overallScore}
            </span>
          </div>
          
          <h2 className="font-inter text-3xl font-bold text-white mb-2">
            {t('assessmentResult.overallScoreTitle', { bandLabel: getBandLabel(attempt.overallBand) })}
          </h2>
          
          <p className="font-source text-xl text-gray-300 mb-6">
            {t('assessmentResult.overallScoreBandLevel', {
              band: attempt.overallBand,
              level: attempt.recommendedLevel
            })}
          </p>
          
          {attempt.recommendedLevel === 'MAX' && (
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-2xl p-6">
              <h3 className="font-inter text-xl font-bold text-purple-300 mb-2">
                {t('assessmentResult.maxProgramEligibleTitle')}
              </h3>
              <p className="font-source text-purple-200">
                {t('assessmentResult.maxProgramEligibleMessage')}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Section Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="font-inter text-3xl font-bold text-white mb-8 text-center">
          {t('assessmentResult.sectionBreakdownTitle')}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {attempt.sectionScores.map((score, index) => {
            const section = ASSESSMENT_CONFIG.find(s => s.id === score.sectionId);
            return (
              <motion.div
                key={score.sectionId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-gradient-to-br from-royal-900/30 to-royal-800/20 border border-royal-500/20 rounded-2xl backdrop-blur-md p-6 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${getBandColor(score.band)} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <span className="font-inter text-xl font-bold text-white">
                    {score.band}
                  </span>
                </div>
                
                <h3 className="font-inter text-xl font-semibold text-white mb-2">
                  {section?.name}
                </h3>
                
                <div className="mb-4">
                  <div className="text-2xl font-bold text-royal-300 mb-1">
                    {score.normalizedScore}/100
                  </div>
                  <div className="text-sm text-gray-400">
                    {getBandLabel(score.band)}
                  </div>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${getBandColor(score.band)} h-2 rounded-full transition-all duration-1000`}
                    style={{ width: `${score.normalizedScore}%` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="font-inter text-3xl font-bold text-white mb-8 text-center">
          {t('assessmentResult.practiceTipsTitle')}
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {recommendations.map((recommendation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              className="bg-gradient-to-r from-silver-900/30 to-royal-900/30 border border-silver-500/20 rounded-2xl backdrop-blur-md p-6 flex items-start"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-silver-500 to-royal-400 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <p className="font-source text-gray-200 leading-relaxed">
                {recommendation}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center space-y-8"
      >
        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => navigate('/musicraft/enroll')}
            className="group relative px-8 py-4 bg-gradient-to-r from-royal-600 to-royal-400 text-white font-inter font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-royal-500/25"
          >
            <span className="relative flex items-center justify-center">
              <BookOpen className="mr-2 h-5 w-5" />
              {t('assessmentResult.enrollNowCta')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button
            onClick={() => {
              handleRetakeAssessment();
              navigate('/musicraft/assessment');
            }}
            className="group relative px-8 py-4 border-2 border-silver-400 text-silver-400 font-inter font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:text-white hover:border-transparent"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-silver-600 to-silver-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            <span className="relative flex items-center justify-center">
              <RotateCcw className="mr-2 h-5 w-5" />
              {t('assessmentResult.retakeAssessmentCta')}
            </span>
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownloadCSV}
            className="group relative px-6 py-3 border-2 border-gray-600 text-gray-400 font-inter font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:text-white hover:border-gray-500"
          >
            <span className="relative flex items-center justify-center">
              <Download className="mr-2 h-4 w-4" />
              {t('assessmentResult.downloadCsvCta')}
            </span>
          </button>
          
          <button
            onClick={handleShare}
            className="group relative px-6 py-3 border-2 border-gray-600 text-gray-400 font-inter font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:text-white hover:border-gray-500"
          >
            <span className="relative flex items-center justify-center">
              <Share2 className="mr-2 h-4 w-4" />
              {t('assessmentResult.shareResultsCta')}
            </span>
          </button>
        </div>

        {/* Assessment Info */}
        <div className="text-center pt-8 border-t border-gray-700">
          <p className="font-source text-gray-400 text-sm">
            {t('assessmentResult.assessmentCompletedOn', {
              date: new Date(attempt.completedAt!).toLocaleDateString(),
              id: attempt.id.slice(0, 8)
            })}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultPage;