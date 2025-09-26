import React, { useState } from 'react';
import { Piano, Guitar, Headphones, Mic, Music, Users, Clock, Award, Play, ArrowRight, Drum, Volume2 } from 'lucide-react';

const CoursesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('in-center');

  const inCenterCourses = [
    {
      id: 1,
      name: 'Piano',
      icon: Piano,
      level: 'Beginner to Advanced',
      duration: '6-12 months per grade',
      age: '5+',
      description: 'Master classical and contemporary piano techniques with personalized instruction',
      skills: ['Sight-Reading', 'Music Theory', 'Classical Repertoire', 'Improvisation'],
      price: '₹3,000/month',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      name: 'Digital Keyboard',
      icon: Piano,
      level: 'Beginner to Advanced',
      duration: '4-8 months',
      age: '8+',
      description: 'Explore modern keyboard techniques and digital music production',
      skills: ['Electronic Sounds', 'Rhythm Programming', 'MIDI', 'Performance'],
      price: '₹2,500/month',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      name: 'Guitar',
      icon: Guitar,
      level: 'Beginner to Advanced',
      duration: '6-12 months per grade',
      age: '10+',
      description: 'Learn acoustic and electric guitar with focus on technique and musicality',
      skills: ['Chord Progressions', 'Fingerpicking', 'Strumming', 'Lead Guitar'],
      price: '₹2,800/month',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      name: 'Western Violin',
      icon: Volume2,
      level: 'Beginner to Advanced',
      duration: '8-15 months per grade',
      age: '6+',
      description: 'Classical violin training with proper bowing techniques and intonation',
      skills: ['Bowing Techniques', 'Scales', 'Classical Pieces', 'Performance'],
      price: '₹3,500/month',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      name: 'Western Vocals',
      icon: Mic,
      level: 'Beginner to Advanced',
      duration: '6-12 months',
      age: '8+',
      description: 'Develop your voice with proper breathing, pitch, and performance techniques',
      skills: ['Breath Control', 'Pitch Accuracy', 'Stage Presence', 'Song Interpretation'],
      price: '₹2,200/month',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 6,
      name: 'Drums',
      icon: Drum,
      level: 'Beginner to Intermediate',
      duration: '6-10 months',
      age: '10+',
      description: 'Learn rhythm, coordination, and various drumming styles',
      skills: ['Rudiments', 'Coordination', 'Different Styles', 'Performance'],
      price: '₹3,200/month',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      id: 7,
      name: 'Ukulele',
      icon: Guitar,
      level: 'Beginner to Intermediate',
      duration: '3-6 months',
      age: '6+',
      description: 'Perfect starter instrument with quick progress and fun learning',
      skills: ['Chord Strumming', 'Fingerpicking', 'Hawaiian Style', 'Pop Songs'],
      price: '₹2,000/month',
      gradient: 'from-teal-500 to-cyan-500'
    },
    {
      id: 8,
      name: 'Music Theory',
      icon: Award,
      level: 'All Levels',
      duration: '6-12 months per grade',
      age: '8+',
      description: 'Comprehensive music theory from basics to advanced concepts',
      skills: ['Notation', 'Harmony', 'Analysis', 'Composition'],
      price: '₹1,800/month',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  const onlineCourses = [
    {
      id: 1,
      name: 'Piano (Online)',
      icon: Piano,
      level: 'Beginner to Advanced',
      duration: '6-12 months per grade',
      age: '8+',
      description: 'Interactive online piano lessons with real-time feedback',
      skills: ['Digital Learning', 'Flexible Scheduling', 'Recording Reviews', 'Progress Tracking'],
      price: '₹2,500/month',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      name: 'Guitar (Online)',
      icon: Guitar,
      level: 'Beginner to Advanced',
      duration: '6-12 months per grade',
      age: '10+',
      description: 'Comprehensive online guitar program with HD video lessons',
      skills: ['Video Lessons', 'Tab Reading', 'Online Jamming', 'Performance Videos'],
      price: '₹2,200/month',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      name: 'Western Vocals (Online)',
      icon: Mic,
      level: 'Beginner to Advanced',
      duration: '6-12 months',
      age: '10+',
      description: 'Vocal training through online sessions with voice analysis',
      skills: ['Voice Analysis', 'Breathing Exercises', 'Range Extension', 'Song Practice'],
      price: '₹2,000/month',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 4,
      name: 'Ukulele (Online)',
      icon: Guitar,
      level: 'Beginner to Intermediate',
      duration: '3-6 months',
      age: '8+',
      description: 'Fun and engaging ukulele lessons perfect for beginners',
      skills: ['Easy Chords', 'Strumming Patterns', 'Popular Songs', 'Quick Progress'],
      price: '₹1,800/month',
      gradient: 'from-teal-500 to-cyan-500'
    },
    {
      id: 5,
      name: 'Western Violin (Online)',
      icon: Music,
      level: 'Beginner to Intermediate',
      duration: '8-12 months per grade',
      age: '8+',
      description: 'Online violin lessons with technique focus and progress tracking',
      skills: ['Proper Posture', 'Bow Technique', 'Scale Practice', 'Simple Pieces'],
      price: '₹2,800/month',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 6,
      name: 'Music Theory (Online)',
      icon: Award,
      level: 'All Levels',
      duration: '6-12 months per grade',
      age: '10+',
      description: 'Complete music theory course with interactive exercises',
      skills: ['Interactive Exercises', 'Ear Training', 'Composition', 'Grade Preparation'],
      price: '₹1,500/month',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      id: 7,
      name: 'Music Production',
      icon: Headphones,
      level: 'Beginner to Advanced',
      duration: '3-6 months crash course',
      age: '12+',
      description: 'Complete music production course from basics to professional level',
      skills: ['DAW Mastery', 'Mixing', 'Mastering', 'Beat Making', 'Sound Design'],
      price: '₹4,500/month',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const currentCourses = activeTab === 'in-center' ? inCenterCourses : onlineCourses;

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Our Courses
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Choose from our comprehensive range of music courses, designed to take you from beginner to professional level
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

        {/* Course Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
          {currentCourses.map((course) => {
            const IconComponent = course.icon;
            return (
              <div
                key={course.id}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
              >
                {/* Course Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${course.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{course.price}</div>
                    <div className="text-sm text-gray-400">per month</div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {course.name}
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  {course.description}
                </p>

                {/* Course Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <Award className="h-4 w-4 text-blue-400 mr-3" />
                    <span className="text-gray-300">Level: </span>
                    <span className="text-white font-medium ml-1">{course.level}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-blue-400 mr-3" />
                    <span className="text-gray-300">Duration: </span>
                    <span className="text-white font-medium ml-1">{course.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 text-blue-400 mr-3" />
                    <span className="text-gray-300">Age: </span>
                    <span className="text-white font-medium ml-1">{course.age}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Skills You'll Gain</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {course.skills.map((skill, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className={`w-2 h-2 bg-gradient-to-r ${course.gradient} rounded-full mr-2`}></div>
                        <span className="text-gray-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className={`w-full bg-gradient-to-r ${course.gradient} text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center`}>
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </button>
                  <button className="w-full border-2 border-gray-600 hover:border-blue-400 text-gray-300 hover:text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center">
                    Enroll Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sample Lesson Structure */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/50">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Sample Lesson Structure
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Lesson Introduction',
                description: 'Review previous lesson, set goals for today, warm-up exercises',
                icon: Play,
                color: 'from-blue-500 to-cyan-500'
              },
              {
                step: '2',
                title: 'Guided Practical Session',
                description: 'Hands-on practice with instructor guidance, technique development',
                icon: Users,
                color: 'from-purple-500 to-pink-500'
              },
              {
                step: '3',
                title: 'Theory & Technical Instruction',
                description: 'Music theory concepts, technical exercises, homework assignment',
                icon: Award,
                color: 'from-green-500 to-emerald-500'
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <div className={`text-4xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-4`}>
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;