import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Piano, Play, ArrowRight, Music, Star, CheckCircle } from 'lucide-react';
import ContactForm from '../features/forms/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Get Started Today
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Ready to start your musical journey? Choose how you'd like to begin - quick assessment or direct contact
          </p>
        </div>

        {/* Contact Form */}
        <div className="mb-16">
          <ContactForm />
        </div>

        {/* Contact Information */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Administration */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Administration</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div>
                  <p className="text-white font-semibold">Mrs. Laveena</p>
                  <p className="text-blue-400 text-lg font-medium">+91 9110805653</p>
                  <p className="text-gray-400 text-sm">Primary Contact</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div>
                  <p className="text-white font-semibold">Mr. Sharwin Fernandes</p>
                  <p className="text-blue-400 text-lg font-medium">+91 7204731520</p>
                  <p className="text-gray-400 text-sm">Music Store & Inquiries</p>
                </div>
              </div>
            </div>
          </div>

          {/* Email & WhatsApp */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">Email Us</p>
                  <p className="text-green-400 font-medium">musicraftacademy@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-500 rounded-xl flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">WhatsApp</p>
                  <p className="text-green-400 font-medium">+91 9110805653</p>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Operating Hours</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Monday - Friday</span>
                <span className="text-white font-medium">9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Saturday</span>
                <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Sunday</span>
                <span className="text-orange-400 font-medium">By Appointment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Locations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ujire Branch */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50">
              <div className="aspect-video bg-gradient-to-br from-blue-900/50 to-purple-900/50 relative">
                <img
                  src="https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg"
                  alt="Ujire Branch"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-white mx-auto mb-2" />
                    <h3 className="text-2xl font-bold text-white">Ujire Branch</h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-white mb-3">Address</h4>
                  <p className="text-gray-300 leading-relaxed">
                    1st Floor, Shop No 43, Sai Ram Complex<br />
                    Near Belal Road, Ujire<br />
                    Karnataka 574240
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold transition-colors">
                    View on Map
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-semibold transition-colors">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>

            {/* Bangalore Branch */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50">
              <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 relative">
                <img
                  src="https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg"
                  alt="Bangalore Branch"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-white mx-auto mb-2" />
                    <h3 className="text-2xl font-bold text-white">Bangalore Branch</h3>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-orange-500 rounded-full px-4 py-2 text-sm font-semibold text-white">
                  Coming Soon
                </div>
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-white mb-3">Premium Location</h4>
                  <p className="text-gray-300 leading-relaxed">
                    We're expanding to Bangalore with a state-of-the-art facility.<br />
                    Stay tuned for location details and opening dates.
                  </p>
                </div>
                <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white py-3 rounded-xl font-semibold transition-all duration-300">
                  Get Updates
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-3xl p-12 border border-gray-700/50">
            <Piano className="h-16 w-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-8">Ready to Get Started?</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <a href="tel:+919110805653" className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <Phone className="mr-3 h-5 w-5" />
                Call Now: +91 9110805653
              </a>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <Play className="mr-3 h-5 w-5" />
                Book Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;