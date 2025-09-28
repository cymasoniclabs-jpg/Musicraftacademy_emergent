import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Piano, Calendar, Star, CheckCircle, ArrowRight } from 'lucide-react';
import ContactForm from '../features/forms/ContactForm';
import BookingCalendar from '../components/BookingCalendar';

const EnhancedContactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'book' | 'contact'>('book');

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Get Started Today
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Ready to start your musical journey? Book your free trial lesson or get in touch with us
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-700/50">
            <button
              onClick={() => setActiveTab('book')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center ${
                activeTab === 'book'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Free Trial
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center ${
                activeTab === 'contact'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Send Message
            </button>
          </div>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'book' ? (
          <div className="mb-16">
            <BookingCalendar />
          </div>
        ) : (
          <div className="mb-16">
            <ContactForm />
          </div>
        )}

        {/* Contact Information */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Administration */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Contact Us</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold">Mrs. Laveena</p>
                  <p className="text-blue-400 text-lg font-medium">+91 9110805653</p>
                  <p className="text-gray-400 text-sm">Primary Contact & Admissions</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold">Mr. Sharwin Fernandes</p>
                  <p className="text-green-400 text-lg font-medium">+91 7204731520</p>
                  <p className="text-gray-400 text-sm">Music Store & General Inquiries</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold">Email Us</p>
                  <p className="text-purple-400 text-lg font-medium">musicraftacademy@gmail.com</p>
                  <p className="text-gray-400 text-sm">For detailed inquiries</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Centers</h3>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-white font-semibold mb-2">Ujire Center</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  1st Floor, Shop No 43<br />
                  Sai Ram Complex, near Belal Road<br />
                  Ujire, Karnataka 574240
                </p>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Bangalore Center</p>
                <p className="text-yellow-400 text-sm">
                  🚀 Coming Soon!
                </p>
                <p className="text-gray-400 text-sm">Premium location in the heart of the city</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Online Classes</p>
                <p className="text-blue-400 text-sm">
                  🌐 Available Worldwide
                </p>
                <p className="text-gray-400 text-sm">Learn from anywhere with HD video lessons</p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Schedule</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Monday - Friday</span>
                <span className="text-white font-medium">9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Saturday</span>
                <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Sunday</span>
                <span className="text-yellow-400 font-medium">By Appointment</span>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400">
                  Online classes available outside regular hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Why Choose Musicraft Academy?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Expert Faculty',
                description: '15+ certified instructors with years of teaching experience',
                icon: '👨‍🏫',
                color: 'text-blue-400'
              },
              {
                title: 'Proven Results',
                description: '500+ happy students with 95% grade exam pass rate',
                icon: '🏆',
                color: 'text-green-400'
              },
              {
                title: 'Flexible Learning',
                description: 'In-center and online options with flexible scheduling',
                icon: '⏰',
                color: 'text-purple-400'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-bold ${feature.color} mb-4`}>
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Begin Your Musical Journey?
            </h3>
            <p className="text-gray-400 mb-6">
              Join hundreds of students who have discovered the joy of music with us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setActiveTab('book')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Free Trial Now
              </button>
              <button className="border-2 border-gray-600 hover:border-blue-400 text-gray-300 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center">
                <Piano className="h-5 w-5 mr-2" />
                View Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedContactPage;