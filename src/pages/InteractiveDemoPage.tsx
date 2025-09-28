import React from 'react';
import VirtualPiano from '../components/VirtualPiano';
import { Music2, Piano, Guitar, ArrowLeft, Sparkles } from 'lucide-react';

const InteractiveDemoPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-yellow-400 mr-3" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Try Before You Enroll
            </h1>
            <Sparkles className="h-8 w-8 text-yellow-400 ml-3" />
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Experience our interactive instruments and get a feel for music learning at Musicraft Academy
          </p>
        </div>

        {/* Back Button */}
        <div className="mb-8">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Courses
          </button>
        </div>

        {/* Virtual Piano Section */}
        <div className="mb-16">
          <VirtualPiano />
        </div>

        {/* Coming Soon Instruments */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[
            {
              name: 'Virtual Guitar',
              icon: Guitar,
              description: 'Interactive guitar with chord library and strumming patterns',
              status: 'Coming Soon',
              color: 'from-green-500 to-emerald-500'
            },
            {
              name: 'Beat Maker',
              icon: Music2,
              description: 'Create your own beats and rhythms with our drum sequencer',
              status: 'Coming Soon', 
              color: 'from-purple-500 to-pink-500'
            }
          ].map((instrument, index) => {
            const IconComponent = instrument.icon;
            return (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 text-center">
                <div className={`w-20 h-20 bg-gradient-to-r ${instrument.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <IconComponent className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{instrument.name}</h3>
                <p className="text-gray-400 mb-6">{instrument.description}</p>
                <div className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full font-medium">
                  {instrument.status}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Enjoyed the virtual piano? Imagine what you could achieve with professional instruction!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                const app = document.querySelector('[data-app]') as any;
                app?.setCurrentPage?.('courses');
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-transform"
            >
              <Piano className="inline h-5 w-5 mr-2" />
              Enroll in Piano Course
            </button>
            <button 
              onClick={() => {
                const app = document.querySelector('[data-app]') as any;
                app?.setCurrentPage?.('contact');
              }}
              className="border-2 border-gray-400 hover:border-blue-400 text-gray-300 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all"
            >
              Book Free Trial
            </button>
          </div>
        </div>

        {/* Learning Benefits */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose Professional Lessons?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Proper Technique',
                description: 'Learn correct finger positioning and playing techniques from the start',
                emoji: '🎯'
              },
              {
                title: 'Structured Learning',
                description: 'Follow a proven curriculum designed for progressive skill development',
                emoji: '📚'
              },
              {
                title: 'Personal Feedback',
                description: 'Get immediate corrections and guidance from experienced instructors',
                emoji: '👨‍🏫'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl mb-4">{benefit.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemoPage;