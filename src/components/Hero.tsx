import React from 'react';
import { Play, ArrowRight, Music2, Piano, Guitar, Mic } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-royal-purple/30 to-primary-purple/25">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/98 via-background-dark/70 to-background-dark/50"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background-dark/95 via-background-dark/60 to-transparent"></div>
      </div>

      {/* Floating musical notes animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[Piano, Guitar, Mic, Music2, Music2, Music2].map((Icon, i) => (
          <div
            key={i}
            className={`absolute text-accent-silver/10 animate-bounce`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Icon className="h-6 w-6" />
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto pt-8 sm:pt-12 lg:pt-16">
          {/* Main headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading mb-4 sm:mb-6 bg-gradient-to-r from-text-primary via-accent-silver to-primary-purple bg-clip-text text-transparent leading-tight px-2">
            Musical Mastery Begins Here
          </h1>
          
          <div className="flex items-center justify-center mb-4 sm:mb-6 px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-accent-silver to-transparent w-16 sm:w-24 lg:w-32"></div>
            <span className="px-2 sm:px-4 text-accent-silver font-medium text-sm sm:text-base">Online & In-Person</span>
            <div className="h-px bg-gradient-to-r from-transparent via-accent-silver to-transparent w-16 sm:w-24 lg:w-32"></div>
          </div>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary mb-6 sm:mb-8 leading-relaxed px-4">
            Begin your journey with experienced mentors and structured lessons designed to inspire.
            <br />
            <span className="text-accent-silver font-medium hidden sm:inline">Ignite your musical potential and discover the joy of creating harmonies.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12 px-4">
            <button 
              onClick={() => {
                const app = document.querySelector('[data-app]') as any;
                app?.setCurrentPage?.('courses');
              }}
              className="group bg-royal-gradient text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-royal-glow transition-all duration-300 flex items-center w-full sm:w-auto justify-center"
            >
              <Music2 className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              Explore Courses
              <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => {
                const app = document.querySelector('[data-app]') as any;
                app?.setCurrentPage?.('contact');
              }}
              className="group border-2 border-accent-silver text-accent-silver hover:bg-accent-silver hover:text-background-dark px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center w-full sm:w-auto justify-center"
            >
              <Play className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              Book a Free Trial
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-2xl mx-auto px-4">
            {[
              { number: '500+', label: 'Happy Students' },
              { number: '15+', label: 'Expert Faculty' },
              { number: '8+', label: 'Instruments' },
              { number: '2', label: 'Locations' }
            ].map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent-silver to-primary-purple bg-clip-text text-transparent mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-text-secondary text-xs sm:text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => {
            const ctaSection = document.querySelector('[data-section="cta-banner"]');
            ctaSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-8 h-8 bg-accent-silver/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent-silver/30 transition-all duration-300 cursor-pointer"
        >
          <div className="w-1 h-3 bg-accent-silver rounded-full"></div>
        </button>
      </div>
    </section>
  );
};

export default Hero;