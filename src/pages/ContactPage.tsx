import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, User, MessageSquare, Piano, Play, ArrowRight, Music, Star, CheckCircle } from 'lucide-react';
import { submitEnquiryDual } from '../lib/submitEnquiry';

interface ContactPageProps {
  setCurrentPage?: (page: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ setCurrentPage }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Basic client validation
    const name = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    
    if (!name || !email || !/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid name & email.");
      return;
    }
    
    try {
      const result = await submitEnquiryDual(
        {
          name,
          email,
          phone,
          program: String(formData.get("course") || ""),
          intent: "Contact",
          message: String(formData.get("message") || ""),
          company: String(formData.get("location") || ""), // Using company field for location preference
        },
        { kind: "contact" }
      );
      
      console.log('Contact form submitted successfully:', result);
      
      if (result.warnings.length > 0) {
        console.warn('Contact submission warnings:', result.warnings);
      }
      
      form.reset();
      setIsSubmitted(true);
      // Hide success message after 2 minutes (120 seconds)
      setTimeout(() => setIsSubmitted(false), 120000);
    } catch (error) {
      console.error('Contact form submission error:', error);
      alert("Message could not be sent. Please try again or contact us directly at +91 9110805653.");
    }
  }

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

        {/* Pre-Assessment CTA Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-3xl p-8 md:p-12 border border-gray-700/50 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Quick Musical Assessment</h2>
                  <p className="text-blue-200">Get personalized course recommendations in 3 minutes</p>
                </div>
              </div>
              
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Take our smart assessment to discover the perfect musical path for you. We'll match you with the right course, instructor, and learning approach based on your goals and experience.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <h4 className="text-white font-semibold mb-1">Personalized</h4>
                  <p className="text-gray-300 text-sm">Tailored recommendations</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <h4 className="text-white font-semibold mb-1">Quick & Easy</h4>
                  <p className="text-gray-300 text-sm">Just 3 minutes to complete</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Music className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <h4 className="text-white font-semibold mb-1">Expert Guidance</h4>
                  <p className="text-gray-300 text-sm">Professional recommendations</p>
                </div>
              </div>
              
              <button
                onClick={() => setCurrentPage?.('pre-assessment')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-8 py-4 rounded-xl text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center mx-auto mb-4"
              >
                <Star className="mr-3 h-6 w-6" />
                Start Free Assessment
                <ArrowRight className="ml-3 h-6 w-6" />
              </button>
              
              <p className="text-gray-300 text-sm">
                ✨ Get instant course recommendations • No commitment required • 100% free
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-16">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent w-32"></div>
          <span className="px-6 text-gray-400 font-medium">OR</span>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent w-32"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
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
                  <User className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold">Mrs. Laveena</p>
                    <p className="text-blue-400 text-lg font-medium">+91 9110805653</p>
                    <p className="text-gray-400 text-sm">Primary Contact</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <User className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
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

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
              {/* Success Message */}
              {isSubmitted && (
                <div className="mb-8 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/50 rounded-2xl p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Send className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold text-green-400 mb-2">Message Received!</h4>
                  <p className="text-green-200 text-lg">
                    Thank you for your inquiry. Our team will review your message and get back to you within 24 hours. Ready to get started? Take our quick assessment to get personalized course recommendations!
                  </p>
                  <button
                    onClick={() => setCurrentPage?.('pre-assessment-from-contact')}
                    className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
                  >
                    <Star className="mr-3 h-6 w-6" />
                    Start Free Assessment
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </button>
                </div>
              )}

              <h3 className="text-3xl font-bold text-white mb-8 text-center">Send Us a Message</h3>
              
              <form action="https://formspree.io/f/xwprkkjr" method="POST" onSubmit={onSubmit} className="space-y-6">
                {/* Hidden fields for Formspree */}
                <input type="hidden" name="_subject" value="New Musicraft enquiry" />
                <input type="hidden" name="_origin" value="musicraftacademy.com" />
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Interested Course</label>
                    <select
                      name="course"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a course</option>
                      <option value="piano">Piano</option>
                      <option value="guitar">Guitar</option>
                      <option value="violin">Western Violin</option>
                      <option value="vocals">Western Vocals</option>
                      <option value="drums">Drums</option>
                      <option value="ukulele">Ukulele</option>
                      <option value="theory">Music Theory</option>
                      <option value="production">Music Production</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Preferred Location</label>
                  <select
                    name="location"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select preference</option>
                    <option value="ujire">Ujire (In-Center)</option>
                    <option value="bangalore">Bangalore (In-Center)</option>
                    <option value="online">Online Classes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your musical goals, experience level, or any questions you have..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center"
                >
                  <Send className="mr-3 h-5 w-5" />
                  Send Message
                </button>
              </form>
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
              <button 
                onClick={() => setCurrentPage?.('pre-assessment')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
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