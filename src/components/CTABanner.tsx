import React from 'react';
import { Music, ArrowRight, Sparkles, Piano, Guitar, Mic, Drum } from 'lucide-react';

const CTABanner: React.FC = () => {
  return (
    <section data-section="cta-banner" className="py-20 bg-gradient-to-b from-background-dark to-royal-purple/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-royal-purple rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary-purple rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-royal-purple rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating music notes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[Piano, Guitar, Mic, Drum, Music, Music, Music, Music].map((Icon, i) => (
          <div
            key={i}
            className="absolute text-accent-silver/15 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            <Icon className="h-5 w-5" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight px-4">
            🎵 Start Learning Today
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 sm:mb-8 leading-relaxed px-4">
            Take the first step towards your musical dreams with our
            <span className="font-bold text-accent-silver"> FREE trial lesson</span>
            <br className="hidden sm:block" />
            No commitment required - just pure musical exploration!
          </p>

          {/* Benefits list */}
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            {[
              { icon: '🎯', title: 'Personalized Assessment', desc: 'Find your perfect starting point' },
              { icon: '🎵', title: 'Expert Guidance', desc: 'Meet your potential instructor' },
              { icon: '🎪', title: 'Zero Pressure', desc: 'Experience our teaching style' }
            ].map((benefit, index) => (
              <div key={index} className="bg-accent-silver/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-accent-silver/20">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{benefit.icon}</div>
                <h3 className="text-white font-semibold text-base sm:text-lg mb-1 sm:mb-2">{benefit.title}</h3>
                <p className="text-accent-silver text-xs sm:text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Main CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
            <button 
              onClick={() => {
                const app = document.querySelector('[data-app]') as any;
                app?.setCurrentPage?.('contact');
              }}
              className="group bg-accent-silver hover:bg-white text-background-dark px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-2xl text-lg sm:text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-royal-glow flex items-center w-full sm:w-auto justify-center"
            >
              <Music className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6" />
              Book Your FREE Trial
              <ArrowRight className="ml-2 sm:ml-3 h-5 sm:h-6 w-5 sm:w-6 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <div className="text-center sm:text-left w-full sm:w-auto">
              <p className="text-white font-semibold text-base sm:text-lg">Call Now: +91 9110805653</p>
              <p className="text-accent-silver text-xs sm:text-sm">Available 9 AM - 8 PM, Mon-Sat</p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-accent-silver/20 px-4">
            <p className="text-accent-silver text-xs sm:text-sm mb-3 sm:mb-4">Join hundreds of happy students across India</p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-accent-silver/80 text-xs sm:text-sm">
              <span>✅ No Hidden Fees</span>
              <span>✅ Flexible Scheduling</span>
              <span>✅ 100% Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;