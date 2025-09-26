import React, { useState } from 'react';
import { Star, Play, Quote, Award, Piano, Filter } from 'lucide-react';

interface TestimonialsPageProps {
  setCurrentPage: (page: string) => void;
}

const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ setCurrentPage }) => {
  const [filterType, setFilterType] = useState('all');
  const [filterCourse, setFilterCourse] = useState('all');

  const testimonials = [
    {
      id: 1,
      name: 'Arjun Patel',
      age: 16,
      course: 'Piano',
      location: 'Bangalore',
      type: 'student',
      rating: 5,
      text: "Musicraft has completely transformed my understanding of music. When I started, I could barely play a simple melody. Now, after 18 months, I'm performing Grade 5 pieces with confidence! The teachers are incredibly patient and adapt their teaching style to match my learning pace. The theory classes have also helped me understand the 'why' behind the music, not just the 'how'. I've even started composing my own pieces!",
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      achievement: 'Grade 5 Piano Certified',
      videoThumbnail: true,
      featured: true
    },
    {
      id: 2,
      name: 'Mrs. Priya Sharma',
      role: 'Parent of Ananya (12)',
      course: 'Guitar (Online)',
      location: 'Mumbai',
      type: 'parent',
      rating: 5,
      text: "Initially, I was skeptical about online music lessons, but Musicraft proved me wrong! My daughter Ananya has been learning guitar online for 10 months now, and her progress is remarkable. The teachers use interactive tools and provide personalized feedback on recorded practice sessions. She's now playing her favorite songs and even performed at her school's annual function. The flexible scheduling has been a blessing for our busy lifestyle.",
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
      achievement: 'Online Learning Success',
      googleReview: true
    },
    {
      id: 3,
      name: 'Rahul Kumar',
      age: 24,
      course: 'Music Production',
      location: 'Delhi',
      type: 'student',
      rating: 5,
      text: "The music production crash course at Musicraft opened up a completely new world for me. As a software engineer, I always loved music but never knew how to create it digitally. The course covers everything from DAW basics to advanced mixing and mastering techniques. The instructors are industry professionals who share real-world insights. I'm now producing music for local artists and even released my own EP on streaming platforms!",
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
      achievement: 'Professional Producer',
      videoThumbnail: true
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      age: 14,
      course: 'Western Vocals',
      location: 'Ujire',
      type: 'student',
      rating: 5,
      text: "I used to be extremely shy and would never sing in front of anyone. My parents enrolled me in vocal classes at Musicraft, and it's been life-changing! The instructors focus not just on technique but also on building confidence. Through breathing exercises, pitch training, and performance opportunities, I've grown so much. Last month, I won first place in our school's talent show, and I'm now part of the local church choir!",
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      achievement: 'Talent Show Winner',
      featured: true
    },
    {
      id: 5,
      name: 'Mr. Rajesh Nair',
      role: 'Parent of twins (8 & 10)',
      course: 'Piano & Violin',
      location: 'Ujire',
      type: 'parent',
      rating: 5,
      text: "Both my children started learning at Musicraft - one piano, one violin. The academy's approach to teaching young children is exceptional. They make learning fun through games and interactive activities while maintaining proper technique. The progress tracking system helps us understand exactly where they stand. What I appreciate most is how they've instilled discipline and a genuine love for music in both kids.",
      image: 'https://images.pexels.com/photos/1516775/pexels-photo-1516775.jpeg',
      achievement: 'Twins Success Story',
      googleReview: true
    },
    {
      id: 6,
      name: 'Kavya Shetty',
      age: 22,
      course: 'Ukulele (Online)',
      location: 'Mangalore',
      type: 'student',
      rating: 5,
      text: "I wanted to learn a musical instrument but thought I was too old to start. The ukulele course at Musicraft proved me wrong! The online format was perfect for my college schedule. Within 4 months, I could play dozens of songs and even started a small band with friends. The instructors are encouraging and the community of learners is so supportive. Music has become my stress-buster and creative outlet!",
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
      achievement: 'Started College Band'
    },
    {
      id: 7,
      name: 'Aditya Bhat',
      age: 19,
      course: 'Guitar',
      location: 'Bangalore',
      type: 'student',
      rating: 5,
      text: "Learning guitar at Musicraft has been an incredible journey. I started as a complete beginner and am now able to play complex pieces and even do some basic songwriting. The teachers focus on both technical skills and musical expression. They introduced me to various genres - from classical fingerpicking to rock solos. The in-person sessions are interactive and motivating. I'm now preparing for my Grade 6 examination!",
      image: 'https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg',
      achievement: 'Grade 6 Preparation',
      videoThumbnail: true
    },
    {
      id: 8,
      name: 'Mrs. Lakshmi Rao',
      role: 'Adult learner',
      course: 'Piano (Online)',
      location: 'Chennai',
      type: 'student',
      rating: 5,
      text: "At 45, I decided to fulfill my childhood dream of learning piano. Musicraft's adult learning program is fantastic! The teachers understand that adult learners have different needs and constraints. They're patient, encouraging, and flexible with scheduling. After 8 months of online lessons, I can play beautiful pieces and it's become my favorite way to relax after work. Age is truly just a number when it comes to learning music!",
      image: 'https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg',
      achievement: 'Dream Fulfilled at 45'
    }
  ];

  const videoTestimonials = [
    {
      id: 1,
      title: 'Arjun\'s Piano Performance',
      description: 'Grade 5 piano piece performed with confidence',
      thumbnail: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg',
      student: 'Arjun Patel',
      course: 'Piano'
    },
    {
      id: 2,
      title: 'Sneha\'s Winning Performance',
      description: 'The vocal performance that won the school talent show',
      thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
      student: 'Sneha Reddy',
      course: 'Western Vocals'
    },
    {
      id: 3,
      title: 'Rahul\'s Original Composition',
      description: 'Self-produced track showcasing learned skills',
      thumbnail: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg',
      student: 'Rahul Kumar',
      course: 'Music Production'
    },
    {
      id: 4,
      title: 'Guitar Ensemble Performance',
      description: 'Students performing together at annual concert',
      thumbnail: 'https://images.pexels.com/photos/1516775/pexels-photo-1516775.jpeg',
      student: 'Multiple Students',
      course: 'Guitar'
    },
    {
      id: 5,
      title: 'Online Student Showcase',
      description: 'Collection of performances from online students',
      thumbnail: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
      student: 'Online Community',
      course: 'Various'
    },
    {
      id: 6,
      title: 'Young Musicians Concert',
      description: 'Annual concert featuring our youngest talents',
      thumbnail: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      student: 'Young Students',
      course: 'Various'
    }
  ];

  const filteredTestimonials = testimonials.filter(testimonial => {
    const typeMatch = filterType === 'all' || testimonial.type === filterType;
    const courseMatch = filterCourse === 'all' || testimonial.course.toLowerCase().includes(filterCourse.toLowerCase());
    return typeMatch && courseMatch;
  });

  const courses = [...new Set(testimonials.map(t => t.course))];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Student Testimonials
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Hear from our musical family - real stories of transformation, growth, and musical achievement
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-12">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-blue-400" />
              <span className="text-white font-medium">Filter by:</span>
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Reviews</option>
              <option value="student">Students</option>
              <option value="parent">Parents</option>
            </select>
            
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Courses</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Success Stories</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredTestimonials.filter(t => t.featured).map((testimonial) => (
              <div key={testimonial.id} className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 relative overflow-hidden">
                <div className="absolute top-8 right-8 opacity-10">
                  <Quote className="h-16 w-16 text-blue-400" />
                </div>
                
                <div className="flex items-start space-x-6 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {testimonial.name}
                      {testimonial.age && <span className="text-gray-400 font-normal">, {testimonial.age}</span>}
                    </h3>
                    <p className="text-blue-400 font-medium">{testimonial.course}</p>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  </div>
                  {testimonial.videoThumbnail && (
                    <div className="bg-red-600 rounded-full p-2">
                      <Play className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                
                <blockquote className="text-gray-200 leading-relaxed mb-6">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-blue-400 mr-2" />
                    <span className="text-blue-300 font-semibold">{testimonial.achievement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">All Reviews</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <h4 className="text-white font-semibold text-sm">
                      {testimonial.name}
                      {testimonial.age && <span className="text-gray-400">, {testimonial.age}</span>}
                    </h4>
                  </div>
                  {testimonial.googleReview && (
                    <div className="bg-blue-600 rounded px-2 py-1 text-xs text-white">
                      Google
                    </div>
                  )}
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
                  "{testimonial.text.substring(0, 150)}..."
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-400">{testimonial.course}</span>
                  <span className="text-gray-400">{testimonial.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            The Jam - Just Acoustic Moments
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoTestimonials.map((video) => (
              <div key={video.id} className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all duration-300 transform hover:scale-105">
                <div className="relative aspect-video bg-gradient-to-br from-blue-900/50 to-purple-900/50">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="group-hover:scale-110 transition-transform duration-300 bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </button>
                  </div>
                  <div className="absolute top-4 right-4 bg-red-600 rounded-full px-3 py-1 text-xs text-white font-semibold">
                    Video
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-white font-semibold mb-2">{video.title}</h4>
                  <p className="text-gray-400 text-sm mb-3">{video.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-blue-400">{video.student}</span>
                    <span className="text-gray-400">{video.course}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-3xl p-12 border border-gray-700/50">
          <Piano className="h-16 w-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Write Your Success Story?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of happy students who've transformed their musical dreams into reality
          </p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Book Your Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;