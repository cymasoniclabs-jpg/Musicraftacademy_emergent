import React from 'react';
import { Piano, Heart, Target, Users, Award, Star, Lightbulb, Globe, Music, Guitar, Mic } from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Creativity',
      description: 'Fostering creative expression and artistic growth in every student',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: Target,
      title: 'Discipline',
      description: 'Building structured learning habits that lead to mastery',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Star,
      title: 'Confidence',
      description: 'Empowering students to perform with self-assurance and joy',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making quality music education available to everyone, everywhere',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const team = [
    {
      id: 1,
      name: 'Mrs. Laveena Fernandes',
      role: 'Co-Founder & Principal',
      specialization: 'Piano, Music Theory, Administration',
      experience: '12+ years',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
      bio: 'A passionate educator with over a decade of experience in music pedagogy. Specializes in classical piano and music theory, with a gift for making complex concepts accessible to students of all ages.',
      qualifications: ['Grade 8 Piano ABRSM', 'Music Education Diploma', 'Advanced Music Theory']
    },
    {
      id: 2,
      name: 'Mr. Sharwin Fernandes',
      role: 'Co-Founder & Lead Instructor',
      specialization: 'Guitar, Music Production, Technology',
      experience: '15+ years',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      bio: 'A versatile musician and technology enthusiast who brings modern teaching methods to traditional music education. Expert in both acoustic and electric guitar, with extensive experience in digital music production.',
      qualifications: ['Professional Guitar Certification', 'Audio Engineering Diploma', 'Music Production Specialist']
    },
    {
      id: 3,
      name: 'Ms. Priya Shenoy',
      role: 'Senior Vocal Instructor',
      specialization: 'Western Vocals, Performance Training',
      experience: '10+ years',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      bio: 'Former professional vocalist with extensive performance experience. Specializes in developing vocal technique, stage presence, and helping students overcome performance anxiety.',
      qualifications: ['Grade 8 Vocals Trinity', 'Performance Arts Degree', 'Voice Therapy Certification']
    },
    {
      id: 4,
      name: 'Mr. Arun Kumar',
      role: 'Violin & Music Theory Instructor',
      specialization: 'Classical Violin, Advanced Theory',
      experience: '8+ years',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
      bio: 'Classically trained violinist with a deep understanding of music theory. Known for his patience with beginners and ability to guide advanced students through complex repertoire.',
      qualifications: ['Grade 8 Violin ABRSM', 'Music Theory Diploma', 'Classical Performance Certificate']
    }
  ];

  const achievements = [
    { number: '500+', label: 'Students Taught', icon: Users },
    { number: '95%', label: 'Grade Pass Rate', icon: Award },
    { number: '15+', label: 'Expert Faculty', icon: Star },
    { number: '8+', label: 'Years of Excellence', icon: Music }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            About Musicraft Academy
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Where passion meets pedagogy - discover our journey of transforming musical dreams into reality
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6 flex items-center">
                <Music className="h-10 w-10 text-blue-400 mr-4" />
                Our Story — From No Map to Making One
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  I grew up in Ujire, a small town in Dakshina Kannada, dreaming of learning music — but there was no curriculum, no facility, no one to show the path. Years later, after hunting for teachers, self-study, and countless hours of practice, I decided to build the school I wish I'd had.
                </p>
                <p>
                  When we opened <strong>Musicraft – Ujire</strong>, we went all in: a state-of-the-art yet sensible setup with pianos, keyboards, guitars, drums, Western and Indian classical vocals, percussion, a quiet practice room, basic recording tools, and lesson materials. The first few months were electric — kids walked in curious, parents were hopeful, and for the first time, the community had a true music school.
                </p>
                <p>
                  But soon, reality tapped us on the shoulder:
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <span><strong>Qualified instructors were hard to retain.</strong> Many had to commute from the nearest city, and consistency suffered.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <span><strong>Students told us:</strong> "We're learning, but we still can't play." That's when we realized what was missing — <strong>General Music Education (GME)</strong> — the foundations schools never covered: rhythm literacy, pitch/ear training, notation, listening habits, ensemble skills.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <span><strong>Our internal flow wasn't unified.</strong> Scheduling, tracking progress, and keeping quality consistent across classes and teachers needed a backbone.</span>
                  </li>
                </ul>
                <p>
                  So we did what builders do — <strong>we redesigned the learning path, not just the rooms.</strong>
                </p>
                <p>
                  We created <strong>GME Before Instruments</strong> — a school-level foundation course that teaches beat, subdivision, solfège, reading, listening, and practice habits <em>before</em> students pick an instrument. We partnered with local schools like Anugraha English Medium and Christ School (Ujire) and installed compact starter labs. And when teacher availability was still a bottleneck, we engineered a <strong>"Conference Bridge" classroom</strong> — our instruments feed into a low-latency AV link with live transcription, a trained local facilitator manages the room, and a master teacher instructs remotely.
                </p>
                <p>
                  Then, we went a step further: we layered in <strong>AI/ML tools</strong> — recording classes (with consent), generating dashboards for practice and progress, auto-creating aural/reading tests, and even building an <strong>Instructor Twin</strong> to answer doubts between classes and nudge students to practice.
                </p>
                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border border-gray-700/50">
                  <p className="text-lg font-medium text-blue-300 mb-4">
                    The short version?
                  </p>
                  <p>
                    We turned a staffing problem into a <strong>systems solution</strong> — making music learning <strong>transparent, local-language friendly (Kannada), and outcome-tracked</strong> for every student who walks through our doors.
                  </p>
                </div>
                <div className="text-right pt-4 border-t border-gray-700/50">
                  <p className="text-blue-300 font-semibold">— Melroy Fernandes</p>
                  <p className="text-gray-400 text-sm italic">Founder, Musicraft Academy</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-3xl p-8 border border-gray-700/50">
              <img
                src="https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg"
                alt="Music Academy"
                className="w-full h-80 object-cover rounded-2xl mb-6"
              />
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Innovation Through Necessity</h3>
                <p className="text-gray-300">
                  What started as a local music school evolved into a technology-enhanced learning system 
                  that combines traditional music education with modern innovation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4">
                <Piano className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Mission</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              To inspire a lifelong love for music through accessible, personalized, and innovative 
              music education that nurtures both technical excellence and creative expression.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Guitar className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              To become India's leading hub for comprehensive music education, recognized globally 
              for our innovative teaching methods and the success of our students.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mic className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Philosophy</h3>
            <p className="text-gray-300 leading-relaxed">
              We believe music education should be structured yet personalized, challenging yet joyful, 
              focusing on both technical mastery and the pure pleasure of making music.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="group text-center p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-105">
                  <div className={`w-20 h-20 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/50 mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-blue-400 mr-2" />
                    <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {achievement.number}
                    </span>
                  </div>
                  <p className="text-gray-300 font-medium">{achievement.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">Team — Execution Power for EduTech at Scale</h2>
          
          {/* Partners */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8">Partners</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
                <h4 className="text-2xl font-bold text-white mb-2">Melroy Lynal Fernandes</h4>
                <p className="text-gray-300 leading-relaxed">
                  B.Sc. CS, Berklee certs, Glen Ballard Award; 8+ years music education experience; Academic Director at leading Bangalore music school; collaborated with Rockschool London, Australian Institute of Music, Musicians Institute Hollywood; music pedagogy expert and edtech enthusiast.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
                <h4 className="text-2xl font-bold text-white mb-2">Lavina Santhmayora</h4>
                <p className="text-gray-300 leading-relaxed">
                  M.Com, Company Secretary; 14+ years finance, accounting, and resource management expertise; worked extensively with NGOs; specializes in optimizing financial systems and compliance.
                </p>
              </div>
            </div>
          </div>

          {/* EduTech Leadership */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8">EduTech Leadership</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
                <h4 className="text-xl font-bold text-white mb-2">Sharwin Fernandes</h4>
                <p className="text-blue-400 font-semibold mb-3">CEO, Musicraft & MAX</p>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Berklee certs, RSL L3 Music Production & Composition; accomplished music educator; trained 5,000+ students over 5 years; Assistant Instructor and pedagogy specialist with inclusive teaching philosophy.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
                <h4 className="text-xl font-bold text-white mb-2">Srishti Shastri</h4>
                <p className="text-blue-400 font-semibold mb-3">CTO, Cyma EduTech Labs</p>
                <p className="text-gray-300 leading-relaxed text-sm">
                  RSL L3; L5 Associate (TMSB), Teaching pedagogy research expert, 2 years experience in curriculum design
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
                <h4 className="text-xl font-bold text-white mb-2">Sydney Dominic Coutinho</h4>
                <p className="text-blue-400 font-semibold mb-3">COO</p>
                <p className="text-gray-300 leading-relaxed text-sm">
                  BCA; COO leading end-to-end operations; strong corporate background in audio business operations; expertise in leadership, partner success, and account management.
                </p>
              </div>
            </div>
          </div>

          {/* Cluster / Center Heads */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8">Cluster / Center Heads</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
                <h4 className="text-xl font-bold text-white mb-2">Rolan Roy Dsouza</h4>
                <p className="text-blue-400 font-semibold mb-3">Chief Instructor & Bengaluru Cluster Head</p>
                <p className="text-gray-300 leading-relaxed text-sm">
                  M.A. Journalism, Keyboard G6 & Piano G2; 10+ years music education experience; oversees franchise operations and faculty training with patient, inclusive approach.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
                <h4 className="text-xl font-bold text-white mb-2">Roshan Dsouza</h4>
                <p className="text-blue-400 font-semibold mb-3">Pedagogy Researcher</p>
                <p className="text-gray-300 leading-relaxed text-sm">
                  B.Com; Pedagogy researcher specializing in adaptive, learner-centered curricula; designs assessment systems and integrates technology for inclusive music education.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
                <h4 className="text-xl font-bold text-white mb-2">Jason James Dsouza</h4>
                <p className="text-blue-400 font-semibold mb-3">Online Cluster Head</p>
                <p className="text-gray-300 leading-relaxed text-sm">
                  First-year degree; dedicated educator specializing in supporting children with learning challenges; expertise in patient, clear, and adaptive online instruction.
                </p>
              </div>
            </div>
          </div>

          {/* Tech & Content */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8">Tech & Content</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
                <h4 className="text-xl font-bold text-white mb-2">Pramith Lobo</h4>
                <p className="text-blue-400 font-semibold mb-3">Head of Innovation, Loxmere Studios</p>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Master's in AI & Robotics from Queen Mary University London; entrepreneur leading Colliwaye and Atlis ventures.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
                <h4 className="text-xl font-bold text-white mb-2">Melita Fernandes</h4>
                <p className="text-blue-400 font-semibold mb-3">IT & Social Media Manager</p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
                <h4 className="text-xl font-bold text-white mb-2">Joys Anita Lobo</h4>
                <p className="text-blue-400 font-semibold mb-3">AI/ML & Content Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Teaching Philosophy */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/50 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">Our Teaching Philosophy</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Structured learning meets personalized attention - where every student's musical journey is unique
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Structured Yet Flexible',
                description: 'Our curriculum follows proven methodologies while adapting to individual learning styles and pace',
                icon: Target
              },
              {
                title: 'Technical Excellence',
                description: 'Strong foundation in technique and theory, preparing students for international certifications',
                icon: Award
              },
              {
                title: 'Joy of Music',
                description: 'We ensure learning remains enjoyable, fostering a lifelong passion for musical expression',
                icon: Heart
              }
            ].map((philosophy, index) => {
              const IconComponent = philosophy.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{philosophy.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{philosophy.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-3xl p-12 border border-gray-700/50">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Musical Family?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the Musicraft difference - where your musical journey is guided by passion, expertise, and personalized attention
            </p>
            <button 
              onClick={() => {
                const app = document.querySelector('[data-app]') as any;
                app?.setCurrentPage?.('contact');
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Book Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;