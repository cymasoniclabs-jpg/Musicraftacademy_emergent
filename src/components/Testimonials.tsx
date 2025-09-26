import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, Play } from 'lucide-react';

interface TestimonialsProps {
  setCurrentPage?: (page: string) => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ setCurrentPage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Arjun Patel',
      age: 16,
      course: 'Piano & Music Theory',
      rating: 5,
      text: "Musicraft has transformed my understanding of music completely. The teachers are incredibly patient and skilled. I've gone from barely knowing the keys to performing grade 5 pieces confidently!",
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      type: 'student',
      achievement: 'Grade 5 Piano Certified'
    },
    {
      id: 2,
      name: 'Mrs. Priya Sharma',
      role: 'Parent',
      course: 'Guitar Lessons for daughter',
      rating: 5,
      text: "My daughter started learning guitar here 8 months ago. The online classes are so well-structured, and we love how the teachers adapt to her learning pace. She's now composing her own songs!",
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
      type: 'parent',
      achievement: 'Amazing Progress'
    },
    {
      id: 3,
      name: 'Rahul Kumar',
      age: 24,
      course: 'Music Production',
      rating: 5,
      text: "The music production crash course at Musicraft opened up a whole new world for me. From DAW basics to advanced mixing techniques, everything is covered brilliantly. Now I'm producing for local artists!",
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
      type: 'student',
      achievement: 'Professional Producer'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      age: 14,
      course: 'Western Vocals',
      rating: 5,
      text: "I was so shy before joining Musicraft. The vocal training not only improved my singing but also boosted my confidence tremendously. I recently won our school's talent show!",
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      type: 'student',
      achievement: 'Talent Show Winner'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real stories from our musical family - students and parents share their Musicraft journey
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700/50 relative overflow-hidden">
            {/* Quote background */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote className="h-24 w-24 text-blue-400" />
            </div>
            
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/3">
                <div className="relative">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-48 h-48 rounded-2xl object-cover mx-auto shadow-2xl border-4 border-gray-700"
                  />
                  {currentTestimonial.type === 'student' && (
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl px-4 py-2">
                      <span className="text-white text-sm font-semibold">{currentTestimonial.achievement}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="lg:w-2/3">
                <div className="flex items-center mb-4">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-2xl md:text-3xl text-gray-200 font-medium mb-6 leading-relaxed">
                  "{currentTestimonial.text}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">
                      {currentTestimonial.name}
                      {currentTestimonial.age && (
                        <span className="text-gray-400 font-normal">, {currentTestimonial.age}</span>
                      )}
                    </h4>
                    <p className="text-blue-400 font-medium">{currentTestimonial.course}</p>
                    {currentTestimonial.role && (
                      <p className="text-gray-400 text-sm">{currentTestimonial.role}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={prevTestimonial}
                      className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center space-x-3 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-blue-400 to-purple-400 w-8'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Video Testimonials Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            The Jam - Just Acoustic Moments
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((video) => (
              <div key={video} className="group relative bg-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                  <button className="group-hover:scale-110 transition-transform duration-300 bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </button>
                </div>
                <div className="p-4">
                  <h4 className="text-white font-medium mb-1">Student Performance {video}</h4>
                  <p className="text-gray-400 text-sm">Watch our talented students showcase their skills</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => {
              setCurrentPage?.('testimonials');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            See More Testimonials
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;