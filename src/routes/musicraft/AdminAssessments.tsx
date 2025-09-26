import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Download, Settings, Users, BarChart3, FileText, Eye, EyeOff } from 'lucide-react';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import { exportToCSV } from '../../psychometrics/scoring';
import { ASSESSMENT_CONFIG } from '../../psychometrics/config';

const MusicraftAdmin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const { attempts } = useAssessmentStore();

  const adminCode = import.meta.env.VITE_ADMIN_CODE;

  useEffect(() => {
    // Check if already authenticated in session
    const authenticated = sessionStorage.getItem('musicraft_admin_auth');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passcode === adminCode) {
      setIsAuthenticated(true);
      setError('');
      sessionStorage.setItem('musicraft_admin_auth', 'true');
    } else {
      setError('Invalid passcode. Please try again.');
      setPasscode('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('musicraft_admin_auth');
    setPasscode('');
  };

  const exportAttempts = () => {
    if (attempts.length === 0) {
      alert('No attempts to export');
      return;
    }

    const csvData = attempts.map(attempt => ({
      id: attempt.id,
      startedAt: new Date(attempt.startedAt).toISOString(),
      completedAt: attempt.completedAt ? new Date(attempt.completedAt).toISOString() : 'Not completed',
      overallScore: attempt.overallScore,
      overallBand: attempt.overallBand,
      recommendedLevel: attempt.recommendedLevel,
      totalAnswers: attempt.answers.length
    }));

    exportToCSV(csvData, 'musicraft-attempts.csv');
  };

  const exportScores = () => {
    if (attempts.length === 0) {
      alert('No scores to export');
      return;
    }

    const csvData = attempts.flatMap(attempt => 
      attempt.sectionScores.map(score => ({
        attemptId: attempt.id,
        completedAt: attempt.completedAt ? new Date(attempt.completedAt).toISOString() : 'Not completed',
        sectionId: score.sectionId,
        rawScore: score.rawScore,
        normalizedScore: score.normalizedScore,
        band: score.band
      }))
    );

    exportToCSV(csvData, 'musicraft-scores.csv');
  };

  const exportAnswers = () => {
    if (attempts.length === 0) {
      alert('No answers to export');
      return;
    }

    const csvData = attempts.flatMap(attempt => 
      attempt.answers.map(answer => ({
        attemptId: attempt.id,
        itemId: answer.itemId,
        sectionId: answer.sectionId,
        value: answer.value,
        timestamp: new Date(answer.timestamp).toISOString(),
        replays: answer.replays || 0
      }))
    );

    exportToCSV(csvData, 'musicraft-answers.csv');
  };

  const getCompletionRate = () => {
    if (attempts.length === 0) return 0;
    const completed = attempts.filter(a => a.completedAt).length;
    return Math.round((completed / attempts.length) * 100);
  };

  const getAverageScore = () => {
    const completed = attempts.filter(a => a.completedAt);
    if (completed.length === 0) return 0;
    const total = completed.reduce((sum, a) => sum + a.overallScore, 0);
    return Math.round(total / completed.length);
  };

  const getBandDistribution = () => {
    const completed = attempts.filter(a => a.completedAt);
    const distribution = { A: 0, B: 0, C: 0 };
    completed.forEach(a => distribution[a.overallBand]++);
    return distribution;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-gradient-to-br from-royal-900/50 to-silver-900/50 border border-royal-500/20 rounded-3xl backdrop-blur-md p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-royal-500 to-silver-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h1 className="font-audiowide text-2xl text-white mb-2">
                  Admin Access
                </h1>
                <p className="font-exo text-gray-300">
                  Enter passcode to access assessment management
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block font-exo font-medium text-white mb-2">
                    Passcode
                  </label>
                  <div className="relative">
                    <input
                      type={showPasscode ? 'text' : 'password'}
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter admin passcode"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasscode(!showPasscode)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPasscode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {error && (
                    <p className="mt-2 text-red-400 text-sm" role="alert" aria-live="polite">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-royal-600 to-royal-400 text-white font-rajdhani font-semibold text-lg py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-royal-500/25"
                >
                  Access Admin Panel
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const bandDistribution = getBandDistribution();

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-playfair text-4xl md:text-5xl mb-4 bg-gradient-to-r from-royal-400 to-silver-300 bg-clip-text text-transparent font-bold">
              Assessment Admin
            </h1>
            <p className="font-source text-xl text-gray-300">
              Manage assessment items, weights, and export data
            </p>
          </div>
          
          <button
            onClick={handleLogout}
            className="px-6 py-3 border-2 border-gray-600 text-gray-400 font-inter font-semibold rounded-xl hover:text-white hover:border-gray-500 transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-800/50 rounded-2xl p-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'config', label: 'Configuration', icon: Settings },
              { id: 'exports', label: 'Data Export', icon: Download }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center px-6 py-3 rounded-xl font-inter font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-royal-600 to-royal-400 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <IconComponent className="mr-2 h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Stats Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-royal-900/30 to-royal-800/20 border border-royal-500/20 rounded-2xl backdrop-blur-md p-6 text-center">
                  <Users className="h-8 w-8 text-royal-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{attempts.length}</div>
                  <div className="text-gray-300 font-rajdhani">Total Attempts</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-500/20 rounded-2xl backdrop-blur-md p-6 text-center">
                  <BarChart3 className="h-8 w-8 text-green-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{getCompletionRate()}%</div>
                  <div className="text-gray-300 font-rajdhani">Completion Rate</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/20 rounded-2xl backdrop-blur-md p-6 text-center">
                  <FileText className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{getAverageScore()}</div>
                  <div className="text-gray-300 font-rajdhani">Average Score</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/20 rounded-2xl backdrop-blur-md p-6 text-center">
                  <Shield className="h-8 w-8 text-purple-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{attempts.filter(a => a.completedAt).length}</div>
                  <div className="text-gray-300 font-rajdhani">Completed</div>
                </div>
              </div>

              {/* Band Distribution */}
              <div className="bg-gradient-to-br from-royal-900/30 to-royal-800/20 border border-royal-500/20 rounded-2xl backdrop-blur-md p-8">
                <h2 className="font-rajdhani text-2xl font-bold text-white mb-6">Band Distribution</h2>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="font-rajdhani text-xl font-bold text-white">A</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{bandDistribution.A}</div>
                    <div className="text-gray-300 font-rajdhani">Excellent</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="font-rajdhani text-xl font-bold text-white">B</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{bandDistribution.B}</div>
                    <div className="text-gray-300 font-rajdhani">Good</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="font-rajdhani text-xl font-bold text-white">C</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{bandDistribution.C}</div>
                    <div className="text-gray-300 font-rajdhani">Developing</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'config' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-royal-900/30 to-royal-800/20 border border-royal-500/20 rounded-2xl backdrop-blur-md p-8">
                <h2 className="font-rajdhani text-2xl font-bold text-white mb-6">Assessment Configuration</h2>
                
                <div className="space-y-6">
                  {ASSESSMENT_CONFIG.map((section) => (
                    <div key={section.id} className="border border-gray-700 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-rajdhani text-xl font-semibold text-white">
                          {section.name}
                        </h3>
                        <span className="text-royal-400 font-semibold">
                          Weight: {Math.round(section.weight * 100)}%
                        </span>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{section.description}</p>
                      
                      <div className="text-sm text-gray-400">
                        Items: {section.items.length} • 
                        Types: {[...new Set(section.items.map(i => i.type))].join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-xl">
                  <p className="text-yellow-200 text-sm">
                    <strong>Note:</strong> Configuration changes are currently stored in memory only. 
                    In production, these would be persisted to the backend database.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'exports' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-royal-900/30 to-royal-800/20 border border-royal-500/20 rounded-2xl backdrop-blur-md p-8">
                <h2 className="font-poppins text-2xl font-bold text-white mb-6">Data Export</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border border-gray-700 rounded-xl">
                    <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="font-inter text-xl font-semibold text-white mb-2">
                      Attempts
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Export all assessment attempts with basic info
                    </p>
                    <button
                      onClick={exportAttempts}
                      disabled={attempts.length === 0}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-inter font-semibold py-2 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download className="inline mr-2 h-4 w-4" />
                      Export CSV
                    </button>
                  </div>
                  
                  <div className="text-center p-6 border border-gray-700 rounded-xl">
                    <BarChart3 className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <h3 className="font-inter text-xl font-semibold text-white mb-2">
                      Scores
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Export section scores and bands for analysis
                    </p>
                    <button
                      onClick={exportScores}
                      disabled={attempts.length === 0}
                      className="w-full bg-gradient-to-r from-green-600 to-green-400 text-white font-inter font-semibold py-2 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download className="inline mr-2 h-4 w-4" />
                      Export CSV
                    </button>
                  </div>
                  
                  <div className="text-center p-6 border border-gray-700 rounded-xl">
                    <FileText className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="font-inter text-xl font-semibold text-white mb-2">
                      Answers
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Export detailed answer data for research
                    </p>
                    <button
                      onClick={exportAnswers}
                      disabled={attempts.length === 0}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white font-inter font-semibold py-2 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download className="inline mr-2 h-4 w-4" />
                      Export CSV
                    </button>
                  </div>
                </div>
                
                {attempts.length === 0 && (
                  <div className="mt-8 p-4 bg-gray-800/50 border border-gray-600 rounded-xl text-center">
                    <p className="text-gray-400">
                      No assessment data available for export. Complete some assessments first.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicraftAdmin;