import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Calendar, Users, BookOpen, MessageSquare, Shield, CheckCircle, Brain, ArrowRight } from 'lucide-react';
import { submitEnquiryDual } from '../../lib/submitEnquiry';

// Validation schema
const enrollmentSchema = z.object({
  studentName: z.string()
    .min(1, 'Student name is required')
    .refine(val => val.trim().split(' ').length >= 2, 'Please enter full name (minimum 2 words)'),
  
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  phone: z.string()
    .min(1, 'Phone number is required')
    .refine(val => {
      const cleanVal = val.trim().replace(/\s+/g, ''); // Remove all whitespace
      // India mobile: exactly 10 digits starting with 6-9
      const indiaPattern = /^[6-9]\d{9}$/;
      // E.164: + followed by country code and number (1-15 digits total)
      const e164Pattern = /^\+[1-9]\d{1,14}$/;
      
      return indiaPattern.test(cleanVal) || e164Pattern.test(cleanVal);
    }, 'Please enter a valid phone number (10-digit India mobile or +country format)'),
  
  age: z.number()
    .min(5, 'Age must be at least 5')
    .max(99, 'Age must be less than 100'),
  
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional()
    .refine((val) => {
      if (!val || val.trim() === '') return true; // Optional field
      const cleanVal = val.trim().replace(/\s+/g, '');
      const indiaPattern = /^[6-9]\d{9}$/;
      const e164Pattern = /^\+[1-9]\d{1,14}$/;
      return indiaPattern.test(cleanVal) || e164Pattern.test(cleanVal);
    }, 'Please enter a valid phone number (10-digit India mobile or +country format)'),
  
  program: z.enum(['Beginner', 'Intermediate', 'Advanced', 'MAX'], {
    required_error: 'Please select a program'
  }),
  
  intent: z.enum(['Enrol now', 'Trial', 'Counselling'], {
    required_error: 'Please select your intent'
  }),
  
  accessibilityNeeds: z.string().optional(),
  
  message: z.string()
    .min(20, 'Please provide at least 20 characters describing your goals'),
  
  consent: z.boolean()
    .refine(val => val === true, 'You must agree to be contacted and consent to the Privacy Policy'),
  
  website: z.string().optional() // Honeypot field
}).refine(data => {
  // Guardian info required if age < 18
  if (data.age < 18) {
    return data.guardianName && data.guardianName.trim().length > 0 && 
           data.guardianPhone && data.guardianPhone.trim().length > 0;
  }
  return true;
}, {
  message: 'Guardian name and phone are required for students under 18',
  path: ['guardianName']
});

type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

const MusicraftEnroll: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [utmData, setUtmData] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset
  } = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentSchema),
    mode: 'onChange'
  });

  const watchAge = watch('age');
  const watchConsent = watch('consent');

  // Capture UTM parameters on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string> = {};
    
    // Capture UTM parameters
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = urlParams.get(param);
      if (value) utmParams[param] = value;
    });
    
    // Capture referrer
    if (document.referrer) {
      utmParams.referrer = document.referrer;
    }
    
    // Store in localStorage and state
    if (Object.keys(utmParams).length > 0) {
      localStorage.setItem('musicraft_utm', JSON.stringify(utmParams));
      setUtmData(utmParams);
    } else {
      // Try to get from localStorage if not in URL
      const stored = localStorage.getItem('musicraft_utm');
      if (stored) {
        setUtmData(JSON.parse(stored));
      }
    }
  }, []);

  const onSubmit = async (data: EnrollmentFormData) => {
    // Check honeypot
    if (data.website) {
      // Silently succeed without sending
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to both Supabase and Formspree using dual submission helper
      const result = await submitEnquiryDual(
        {
          name: data.studentName,
          email: data.email,
          phone: data.phone,
          program: data.program,
          intent: data.intent,
          message: `Age: ${data.age}${data.guardianName ? `, Guardian: ${data.guardianName} (${data.guardianPhone})` : ''}${data.accessibilityNeeds ? `, Accessibility: ${data.accessibilityNeeds}` : ''}\n\nGoals: ${data.message}`,
          consent_at: new Date().toISOString(),
          // Include UTM data
          ...utmData
        },
        { kind: "contact" }
      );

      // Log success details for debugging
      console.log('Enrollment submitted successfully:', result);
      
      if (result.warnings.length > 0) {
        console.warn('Submission warnings:', result.warnings);
      }

      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your enrollment. Please try again or contact us directly at +91 9110805653.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-gradient-to-br from-royal-900/50 to-silver-900/50 border border-royal-500/20 rounded-3xl backdrop-blur-md p-12">
              <div className="w-20 h-20 bg-gradient-to-r from-royal-500 to-silver-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              
              <h1 className="font-poppins text-3xl md:text-4xl text-white mb-4 font-bold">
                Connected with Frequency
              </h1>
              
              <p className="font-source text-xl text-gray-300 mb-8 leading-relaxed">
                Thank you for your enrollment! Our team will review your information and contact you within 24 hours to discuss your musical journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/musicraft/assessment"
                  className="group relative px-8 py-4 bg-gradient-to-r from-royal-600 to-royal-400 text-white font-inter font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-royal-500/25"
                >
                  <span className="relative flex items-center justify-center">
                    <Brain className="mr-2 h-5 w-5" />
                    Start Pre-Assessment
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                
                <Link
                  to="/musicraft"
                  className="group relative px-8 py-4 border-2 border-silver-400 text-silver-400 font-inter font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:text-white hover:border-transparent"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-silver-600 to-silver-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  <span className="relative flex items-center justify-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Explore Programs
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-poppins text-4xl md:text-5xl mb-6 bg-gradient-to-r from-royal-400 to-silver-300 bg-clip-text text-transparent font-bold">
              Start Your Learning Journey
            </h1>
            <p className="font-source text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of students who have discovered their musical potential with Musicraft's personalized approach.
            </p>
          </div>

          {/* Form */}
          <div className="bg-gradient-to-br from-royal-900/30 to-royal-800/20 border border-royal-500/20 rounded-2xl backdrop-blur-md p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Honeypot field */}
              <input
                {...register('website')}
                type="text"
                name="website"
                className="sr-only"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Student Information */}
              <div className="space-y-6">
                <h2 className="font-inter text-2xl font-semibold text-white flex items-center">
                  <User className="mr-3 h-6 w-6 text-royal-400" />
                  Student Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-source font-medium text-white mb-2">
                      Student Full Name *
                    </label>
                    <input
                      {...register('studentName')}
                      type="text"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter full name (minimum 2 words)"
                    />
                    {errors.studentName && (
                      <p className="mt-2 text-red-400 text-sm" role="alert" aria-live="polite">
                        {errors.studentName.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block font-source font-medium text-white mb-2">
                      Age *
                    </label>
                    <input
                      {...register('age', { valueAsNumber: true })}
                      type="number"
                      min="5"
                      max="99"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter age"
                    />
                    {errors.age && (
                      <p className="mt-2 text-red-400 text-sm" role="alert" aria-live="polite">
                        {errors.age.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-source font-medium text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-red-400 text-sm" role="alert" aria-live="polite">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block font-source font-medium text-white mb-2">
                      Phone Number *
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter phone number"
                    />
                    {errors.phone && (
                      <p className="mt-2 text-red-400 text-sm" role="alert" aria-live="polite">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Guardian Information (conditional) */}
                {watchAge && watchAge < 18 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h3 className="font-inter text-xl font-semibold text-white flex items-center">
                      <Users className="mr-3 h-5 w-5 text-royal-400" />
                      Guardian Information (Required for under 18)
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-source font-medium text-white mb-2">
                          Guardian Name *
                        </label>
                        <input
                          {...register('guardianName')}
                          type="text"
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all duration-200"
                          placeholder="Guardian's full name"
                        />
                        {errors.guardianName && (
                          <p className="mt-2 text-red-400 text-sm" role="alert" aria-live="polite">
                            {errors.guardianName.message}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block font-source font-medium text-white mb-2">
                          Guardian Phone *
                        </label>
                        <input
                          {...register('guardianPhone')}
                          type="tel"
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all duration-200"
                          placeholder="Guardian's phone number"
                        />
                        {errors.guardianPhone && (
                          <p className="mt-2 text-red-400 text-sm" role="alert" aria-live="polite">
                            {errors.guardianPhone.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Program Selection */}
              <div className="space-y-6">
                <h2 className="font-inter text-2xl font-semibold text-white flex items-center">
                  <BookOpen className="mr-3 h-6 w-6 text-royal-400" />
                  Program Selection
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-source font-medium text-white mb-2">
                      Program Level *
                    </label>
                    <select
                      {...register('program')}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select program level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="MAX">MAX</option>
                    </select>
                    {errors.program && (
                      <p className="mt-2 text-red-400 text-sm" role="alert" aria-live="polite">
                        {errors.program.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block font-source font-medium text-white mb-2">
                      Intent *
                    </label>
                    <select
                      {...register('intent')}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select your intent</option>
                      <option value="Enrol now">Enrol now</option>
                      <option value="Trial">Trial</option>
                      <option value="Counselling">Counselling</option>
                    </select>
                    {errors.intent && (
                      <p className="mt-2 text-red-400 text-sm" role="alert" aria-live="polite">
                        {errors.intent.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <h2 className="font-inter text-2xl font-semibold text-white flex items-center">
                  <MessageSquare className="mr-3 h-6 w-6 text-royal-400" />
                  Additional Information
                </h2>
                
                <div>
                  <label className="block font-source font-medium text-white mb-2">
                    Accessibility Needs (Optional)
                  </label>
                  <textarea
                    {...register('accessibilityNeeds')}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Please describe any accessibility needs or accommodations required"
                  />
                </div>
                
                <div>
                  <label className="block font-source font-medium text-white mb-2">
                    Message / Goals *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell us about your musical goals, experience, or any specific requirements (minimum 20 characters)"
                  />
                  {errors.message && (
                    <p className="mt-2 text-red-400 text-sm" role="alert" aria-live="polite">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Consent */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <input
                    {...register('consent')}
                    type="checkbox"
                    id="consent"
                    className="mt-1 h-5 w-5 text-royal-500 bg-gray-800 border-gray-600 rounded focus:ring-royal-500 focus:ring-2"
                  />
                  <label htmlFor="consent" className="font-source text-gray-300 leading-relaxed">
                    <span className="flex items-start">
                      <Shield className="mr-2 h-5 w-5 text-royal-400 mt-0.5 flex-shrink-0" />
                      I agree to be contacted about Musicraft programs and consent to processing my data as per the Privacy Policy. *
                    </span>
                  </label>
                </div>
                {errors.consent && (
                  <p className="text-red-400 text-sm" role="alert" aria-live="polite">
                    {errors.consent.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="group relative w-full px-8 py-4 bg-gradient-to-r from-royal-600 to-royal-400 text-white font-inter font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-royal-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  <span className="relative flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Submit Enrollment
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MusicraftEnroll;