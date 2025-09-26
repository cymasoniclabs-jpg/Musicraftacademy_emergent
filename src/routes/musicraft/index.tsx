import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, Users, Award, TrendingUp, ArrowRight, BookOpen, Brain } from 'lucide-react';

const MusicraftLanding: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-poppins text-5xl md:text-7xl mb-6 bg-gradient-to-r from-royal-400 to-silver-300 bg-clip-text text-transparent font-bold">
              MUSICRAFT
            </h1>
            <p className="font-inter text-2xl md:text-3xl text-silver-200 mb-8 font-medium">
              Start your learning journey
            </p>
            <p className="font-source text-xl text-gray-300 mb-12 leading-relaxed">
              Discover your musical potential through our scientifically-designed assessment 
              and personalized learning programs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/musicraft/enroll"
                className="group relative px-8 py-4 border-2 border-royal-400 text-royal-400 font-inter font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:text-white hover:border-transparent"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-royal-600 to-royal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <span className="relative flex items-center">
                  Start your learning journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link
                to="/musicraft/assessment"
                className="group relative px-8 py-4 border-2 border-silver-400 text-silver-400 font-inter font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:text-white hover:border-transparent"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-silver-600 to-silver-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <span className="relative flex items-center">
                  <Brain className="mr-2 h-5 w-5" />
                  Take Pre-Assessment
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="font-poppins text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Musicraft?
            </h2>
            <p className="font-source text-xl text-gray-300 max-w-3xl mx-auto">
              Our scientifically-backed approach combines traditional music education 
              with modern assessment techniques.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: 'Scientific Assessment',
                description: 'Psychometric evaluation of your musical abilities and learning style'
              },
              {
                icon: Users,
                title: 'Personalized Learning',
                description: 'Customized curriculum based on your assessment results'
              },
              {
                icon: Award,
                title: 'Expert Faculty',
                description: 'Learn from certified musicians and experienced educators'
              },
              {
                icon: TrendingUp,
                title: 'Proven Results',
                description: 'Track your progress with measurable outcomes'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  className="bg-gradient-to-br from-royal-900/30 to-royal-800/20 border border-royal-500/20 rounded-2xl backdrop-blur-md p-8 text-center hover:border-royal-400/40 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-royal-500 to-silver-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-inter text-xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="font-source text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-royal-900/50 to-silver-900/50 rounded-3xl p-12 text-center border border-royal-500/20"
          >
            <Music className="h-16 w-16 text-royal-400 mx-auto mb-6" />
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Begin Your Musical Journey?
            </h2>
            <p className="font-source text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Take our comprehensive pre-assessment to discover your musical strengths 
              and get personalized recommendations for your learning path.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/musicraft/assessment"
                className="group relative px-8 py-4 bg-gradient-to-r from-royal-600 to-royal-400 text-white font-inter font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-royal-500/25"
              >
                <span className="relative flex items-center justify-center">
                  <Brain className="mr-2 h-5 w-5" />
                  Start Pre-Assessment
                </span>
              </Link>
              
              <Link
                to="/musicraft/enroll"
                className="group relative px-8 py-4 border-2 border-silver-400 text-silver-400 font-inter font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:text-white hover:border-transparent"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-silver-600 to-silver-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <span className="relative flex items-center justify-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Enroll Now
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MusicraftLanding;