import React from 'react';
import { Piano, Facebook, Instagram, Youtube, Mail, Phone, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex-shrink-0">
                <Piano className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-white">Musicraft Academy</h3>
                <p className="text-xs text-gray-400">Musical Mastery Begins Here</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              At Musicraft, we believe in nurturing talent and fostering a love for music that lasts a lifetime. 
              Ignite your musical potential and discover the joy of creating harmonies that resonate with your soul.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 hover:bg-pink-500 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 hover:bg-red-500 rounded-lg flex items-center justify-center transition-colors">
                <Youtube className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { id: 'courses', label: 'Our Courses' },
                { id: 'about', label: 'About Us' },
                { id: 'testimonials', label: 'Testimonials' },
                { id: 'store', label: 'Music Store' },
                { id: 'blog', label: 'Blog & Resources' },
                { id: 'contact', label: 'Contact Us' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => setCurrentPage(link.id)}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-white font-semibold text-lg mb-6">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-white font-medium">Administration</p>
                  <p className="text-sm text-gray-400">Mrs. Laveena: +91 9110805653</p>
                  <p className="text-sm text-gray-400">Mr. Sharwin: +91 7204731520</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-white font-medium">Email</p>
                  <p className="text-sm text-gray-400 break-all">musicraftacademy@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-white font-medium">Operating Hours</p>
                  <p className="text-sm text-gray-400">Mon-Sat: 9 AM - 8 PM</p>
                  <p className="text-sm text-gray-400">Sunday: By Appointment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-white font-semibold text-lg mb-6">Our Locations</h4>
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-white font-medium">Ujire Branch</p>
                    <p className="text-gray-400 text-sm">1st Floor, Shop No 43, Sai Ram Complex, near Belal Road, Ujire, Karnataka 574240</p>
                  </div>
                </div>
                <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                  View on Map →
                </button>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-white font-medium">Bangalore Branch</p>
                    <p className="text-gray-400 text-sm">Coming Soon - Premium Location</p>
                  </div>
                </div>
                <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                  Get Updates →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-6 sm:p-8 text-center">
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-4">Join the Musicraft Community</h4>
            <p className="text-sm sm:text-base text-gray-300 mb-6">Get weekly music tips, course updates, and exclusive offers</p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap text-sm sm:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            © 2025 Musicraft Academy. All rights reserved. | 
            <span className="text-blue-400 ml-1">Empowering Musical Dreams Across India</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;