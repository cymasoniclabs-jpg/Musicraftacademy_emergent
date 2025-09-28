import React from 'react';
import { Piano, Globe, GraduationCap, ShoppingBag, Music, Guitar, Headphones, Users, Mic, Drum, Play } from 'lucide-react';

interface ServicesProps {
  setCurrentPage?: (page: string) => void;
}

const Services: React.FC<ServicesProps> = ({ setCurrentPage }) => {
  const services = [
    {
      icon: Piano,
      title: 'Instrumental Lessons (In-Center)',
      description: 'Master piano, guitar, drums, violin and more with expert instructors at our premium facilities',
      gradient: 'from-blue-500 to-cyan-500',
      features: ['Professional instruments', 'Certified instructors', 'Grade-based curriculum']
    },
    {
      icon: Headphones,
      title: 'Online Music Classes',
      description: 'Experience immersive online music education with real-time feedback and interactive learning',
      gradient: 'from-purple-500 to-pink-500',
      features: ['HD video lessons', 'Real-time feedback', 'Practice tracking']
    },
    {
      icon: Music,
      title: 'Music Theory & Certification',
      description: 'Comprehensive music theory and internationally recognized certification programs',
      gradient: 'from-green-500 to-emerald-500',
      features: ['ABRSM/Trinity grades', 'Music theory mastery', 'Performance certificates']
    },
    {
      icon: Guitar,
      title: 'Music Store',
      description: 'Curated collection of professional instruments and accessories with expert recommendations',
      gradient: 'from-orange-500 to-red-500',
      features: ['Premium instruments', 'Professional accessories', 'Expert consultation']
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background-dark to-royal-purple/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading mb-4 sm:mb-6 bg-gradient-to-r from-text-primary to-accent-silver bg-clip-text text-transparent px-4">
            What We Offer
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto px-4">
            Comprehensive music education tailored to your needs, whether you prefer in-person or online learning
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-card-dark/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 hover:bg-card-dark/80 transition-all duration-500 transform hover:scale-105 hover:shadow-royal-glow hover:ring-1 hover:ring-royal-purple border border-royal-purple/30"
              >
                <div className={`w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                  <IconComponent className="h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:w-8 text-white" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-3 sm:mb-4 group-hover:text-accent-silver transition-colors text-center lg:text-left">
                  {service.title}
                </h3>
                
                <p className="text-sm sm:text-base text-text-secondary mb-4 sm:mb-6 leading-relaxed text-center lg:text-left">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-xs sm:text-sm text-text-primary justify-center lg:justify-start">
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-3`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {index === 0 && (
                    <button 
                      onClick={() => setCurrentPage?.('demo')}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg flex items-center justify-center"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Try Virtual Piano
                    </button>
                  )}
                  <button className={`w-full bg-gradient-to-r ${service.gradient} text-white py-2 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:shadow-royal-glow`}>
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;