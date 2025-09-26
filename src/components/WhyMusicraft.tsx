import React from 'react';
import { Users, Target, Award, Clock, Star, Heart, TrendingUp, Shield, Music, Piano, Guitar, Mic } from 'lucide-react';

const WhyMusicraft: React.FC = () => {
  const features = [
    {
      icon: Music,
      title: 'Experienced Faculty',
      description: 'Learn from certified musicians with extensive performance and teaching credentials',
      stat: '15+ Expert Instructors'
    },
    {
      icon: Piano,
      title: 'Personalized Lessons',
      description: 'Customized learning paths designed for your musical goals and skill development',
      stat: '1:1 & Small Batches'
    },
    {
      icon: Award,
      title: 'International Certifications',
      description: 'ABRSM, Trinity, and RSL certified programs with global recognition',
      stat: 'Grade 1-8 Certification'
    },
    {
      icon: Guitar,
      title: 'Maximum Flexibility',
      description: 'Hybrid learning options with flexible scheduling for busy lifestyles',
      stat: 'Online & Offline Options'
    }
  ];

  const achievements = [
    { icon: Star, number: '4.9', label: 'Student Rating' },
    { icon: Heart, number: '95%', label: 'Student Retention' },
    { icon: TrendingUp, number: '500+', label: 'Success Stories' },
    { icon: Shield, number: '100%', label: 'Satisfaction Guarantee' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-royal-purple/10 to-background-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-royal-purple rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-primary-purple rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading mb-4 sm:mb-6 bg-gradient-to-r from-accent-silver to-primary-purple bg-clip-text text-transparent px-4">
            Why Choose Musicraft?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto px-4">
            We're committed to nurturing talent and fostering a love for music that lasts a lifetime
          </p>
        </div>

        {/* Main Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group text-center p-6 lg:p-8 rounded-2xl bg-gradient-to-b from-card-dark/90 to-background-dark/90 backdrop-blur-sm border border-royal-purple/40 hover:border-accent-silver/60 transition-all duration-500 hover:transform hover:scale-105"
              >
                <div className="w-16 sm:w-18 lg:w-20 h-16 sm:h-18 lg:h-20 bg-royal-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-8 sm:h-9 lg:h-10 w-8 sm:w-9 lg:w-10 text-white" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-3 sm:mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-sm sm:text-base text-text-secondary mb-4 sm:mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="bg-gradient-to-r from-royal-purple/30 to-primary-purple/30 rounded-xl p-2 sm:p-3">
                  <span className="text-accent-silver font-semibold text-xs sm:text-sm">
                    {feature.stat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Achievements Bar */}
        <div className="bg-gradient-to-r from-royal-purple/60 to-primary-purple/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-royal-purple/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center mb-2 sm:mb-4">
                    <IconComponent className="h-4 sm:h-5 lg:h-6 w-4 sm:w-5 lg:w-6 text-accent-silver mr-1 sm:mr-2" />
                    <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-accent-silver to-primary-purple bg-clip-text text-transparent">
                      {achievement.number}
                    </span>
                  </div>
                  <p className="text-text-primary font-medium text-xs sm:text-sm">
                    {achievement.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12">
          <button 
            onClick={() => {
              const app = document.querySelector('[data-app]') as any;
              app?.setCurrentPage?.('contact');
            }}
            className="bg-royal-gradient text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-royal-glow transition-all duration-300"
          >
            Discover Your Musical Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyMusicraft;