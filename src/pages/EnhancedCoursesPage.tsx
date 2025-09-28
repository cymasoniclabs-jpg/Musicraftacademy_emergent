import React, { useState } from 'react';
import { Piano, Guitar, Headphones, Mic, Music, Users, Clock, Award, Play, ArrowRight, Drum, Volume2 } from 'lucide-react';
import CoursePaymentCard from '../components/CoursePaymentCard';

const EnhancedCoursesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('in-center');

  const inCenterCourses = [
    {
      id: 1,
      courseName: 'Piano',
      icon: Piano,
      level: 'Beginner to Advanced',
      duration: '6-12 months per grade',
      ageGroup: '5+',
      monthlyPrice: 3000,
      features: [
        'Professional piano training',
        'Sight-reading & music theory',
        'Classical & contemporary repertoire',
        'Individual lessons',
        'ABRSM grade preparation',
        'Performance opportunities'
      ],
      gradient: 'from-blue-500 to-cyan-500',
      popular: true
    },
    {
      id: 2,
      courseName: 'Guitar',
      icon: Guitar,
      level: 'Beginner to Advanced', 
      duration: '6-12 months per grade',
      ageGroup: '10+',
      monthlyPrice: 2800,
      features: [
        'Acoustic & electric guitar',
        'Chord progressions & strumming',
        'Fingerpicking techniques',
        'Lead guitar & solos',
        'Music theory application',
        'Popular songs practice'
      ],
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      courseName: 'Digital Keyboard',
      icon: Piano,
      level: 'Beginner to Advanced',
      duration: '4-8 months',
      ageGroup: '8+',
      monthlyPrice: 2500,
      features: [
        'Modern keyboard techniques',
        'Digital sound exploration',
        'Rhythm programming',
        'MIDI basics',
        'Electronic music production',
        'Performance skills'
      ],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      courseName: 'Western Violin',
      icon: Volume2,
      level: 'Beginner to Advanced',
      duration: '8-15 months per grade',
      ageGroup: '6+',
      monthlyPrice: 3500,
      features: [
        'Classical violin technique',
        'Proper bowing methods',
        'Intonation training',
        'Scale practice',
        'Classical repertoire',
        'Performance preparation'
      ],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      courseName: 'Western Vocals',
      icon: Mic,
      level: 'Beginner to Advanced',
      duration: '6-12 months',
      ageGroup: '8+',
      monthlyPrice: 2200,
      features: [
        'Breath control techniques',
        'Pitch accuracy training',
        'Voice range extension',
        'Stage presence',
        'Song interpretation',
        'Performance confidence'
      ],
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 6,
      courseName: 'Drums',
      icon: Drum,
      level: 'Beginner to Intermediate',
      duration: '6-10 months',
      ageGroup: '10+',
      monthlyPrice: 3200,
      features: [
        'Basic rudiments',
        'Coordination development',
        'Different music styles',
        'Rhythm patterns',
        'Fill techniques',
        'Performance skills'
      ],
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const onlineCourses = [
    {
      id: 1,
      courseName: 'Piano (Online)',
      icon: Piano,
      level: 'Beginner to Advanced',
      duration: '6-12 months per grade',
      ageGroup: '8+',
      monthlyPrice: 2500,
      features: [
        'HD video lessons',
        'Real-time feedback',
        'Digital sheet music',
        'Progress tracking',
        'Flexible scheduling',
        'Recording reviews'
      ],
      gradient: 'from-blue-500 to-cyan-500',
      popular: true
    },
    {
      id: 2,
      courseName: 'Guitar (Online)',
      icon: Guitar,
      level: 'Beginner to Advanced',
      duration: '6-12 months per grade',
      ageGroup: '10+',
      monthlyPrice: 2200,
      features: [
        'Interactive video lessons',
        'Tab reading',
        'Chord library access',
        'Practice backing tracks',
        'Online jamming sessions',
        'Performance videos'
      ],
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      courseName: 'Music Production',
      icon: Headphones,
      level: 'Beginner to Advanced',
      duration: '3-6 months',
      ageGroup: '12+',
      monthlyPrice: 4500,
      features: [
        'DAW software training',
        'Mixing & mastering',
        'Beat making',
        'Sound design',
        'Audio engineering',
        'Portfolio development'
      ],
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      id: 4,
      courseName: 'Western Vocals (Online)',
      icon: Mic,
      level: 'Beginner to Advanced',
      duration: '6-12 months',
      ageGroup: '10+',
      monthlyPrice: 2000,
      features: [
        'Voice analysis tools',
        'Breathing exercises',
        'Range extension',
        'Song practice library',
        'Performance recording',
        'Personalized feedback'
      ],
      gradient: 'from-pink-500 to-rose-500'
    }
  ];

  const currentCourses = activeTab === 'in-center' ? inCenterCourses : onlineCourses;

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Choose Your Course
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Professional music education with flexible payment plans and instant enrollment
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-700/50">
            <button
              onClick={() => setActiveTab('in-center')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'in-center'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              In-Center Lessons
            </button>
            <button
              onClick={() => setActiveTab('online')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'online'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Online Lessons
            </button>
          </div>
        </div>

        {/* Course Grid with Payment Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
          {currentCourses.map((course) => (
            <CoursePaymentCard
              key={course.id}
              courseName={course.courseName}
              monthlyPrice={course.monthlyPrice}
              features={course.features}
              duration={course.duration}
              ageGroup={course.ageGroup}
              level={course.level}
              icon={course.icon}
              gradient={course.gradient}
              popular={course.popular || false}
            />
          ))}
        </div>

        {/* Payment Benefits */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20 mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Why Choose Our Payment Plans?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Flexible Payment',
                description: 'Monthly, Quarterly, or Annual plans with automatic discounts',
                icon: '💳',
                color: 'text-green-400'
              },
              {
                title: 'Secure Payments',
                description: 'Razorpay secured payments with UPI, Cards, and Net Banking',
                icon: '🔒',
                color: 'text-blue-400'
              },
              {
                title: 'Instant Enrollment',
                description: 'Start your musical journey immediately after payment',
                icon: '⚡',
                color: 'text-yellow-400'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className={`text-xl font-bold ${benefit.color} mb-4`}>
                  {benefit.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact for Custom Plans */}
        <div className="text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need a Custom Plan?
            </h3>
            <p className="text-gray-400 mb-6">
              Contact us for family discounts, corporate training, or special requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform">
                📞 Call: +91 9110805653
              </button>
              <button className="border-2 border-gray-600 hover:border-blue-400 text-gray-300 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all">
                📧 Email Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCoursesPage;