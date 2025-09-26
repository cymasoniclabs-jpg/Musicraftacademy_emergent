import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Mail, Phone, MessageSquare, Shield, CheckCircle, Send, ArrowRight, Star } from 'lucide-react';
import { ContactSchema, ContactFormData } from './schemas';
import { submitEnquiryDual } from './utils/submitEnquiryDual';

const ContactForm: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('forms');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [utmData, setUtmData] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    mode: 'onChange'
  });

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

  const onSubmit = async (data: ContactFormData) => {
    // Check honeypot
    if (data.honeypot) {
      // Silently succeed without sending
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to both Supabase and Formspree using dual submission helper
      const result = await submitEnquiryDual(
        {
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          program: data.service,
          intent: "Contact",
          message: data.message,
          consent_at: new Date().toISOString(),
          // Include UTM data
          ...utmData
        },
        { kind: "contact" }
      );

      // Log success details for debugging
      console.log('Contact form submitted successfully:', result);
      
      if (result.warnings.length > 0) {
        console.warn('Contact submission warnings:', result.warnings);
      }

      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Contact submission error:', error);
      alert('There was an error submitting your message. Please try again or contact us directly at +91 9110805653.');
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
                {t('contactForm.successTitle')}
              </h1>
              
              <p className="font-source text-xl text-gray-300 mb-8 leading-relaxed">
                {t('contactForm.successMessage')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => navigate('/musicraft/assessment')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-royal-600 to-royal-400 text-white font-inter font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-royal-500/25"
                >
                  <span className="relative flex items-center justify-center">
                    <Star className="mr-2 h-5 w-5" />
                    {t('contactForm.startAssessmentCta')}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <button
                  onClick={() => navigate('/')}
                  className="group relative px-8 py-4 border-2 border-silver-400 text-silver-400 font-inter font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:text-white hover:border-transparent"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-silver-600 to-silver-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  <span className="relative flex items-center justify-center">
                    {t('contactForm.returnHomeCta')}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-royal-900/30 to-royal-800/20 border border-royal-500/20 rounded-2xl backdrop-blur-md p-8">
        <h3 className="font-poppins text-3xl font-bold text-white mb-8 text-center">
          {t('contactForm.title')}
        </h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Honeypot field */}
          <input
            {...register('honeypot')}
            type="text"
            name="honeypot"
            className="sr-only"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-source font-medium text-white mb-2">
                {t('contactForm.fullNameLabel')}
              </label>
              <input
                {...register('fullName')}
                type="text"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all duration-200"
                placeholder={t('contactForm.fullNamePlaceholder')}
              />
              {errors.fullName && (
                <p className="mt-2 text-red-400 text-sm" role="alert" aria-live="polite">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            
            <div>
              <label className="block font-source font-medium text-white mb-2">
                {t('contactForm.emailLabel')}
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all duration-200"
                placeholder={t('contactForm.emailPlaceholder')}
              />
              {errors.email && (
                <p className="mt-2 text-red-400 text-sm" role="alert" aria-live="polite">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-source font-medium text-white mb-2">
                {t('contactForm.phoneLabel')}
              </label>
              <input
                {...register('phone')}
                type="tel"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all duration-200"
                placeholder={t('contactForm.phonePlaceholder')}
              />
              {errors.phone && (
                <p className="mt-2 text-red-400 text-sm" role="alert" aria-live="polite">
                  {errors.phone.message}
                </p>
              )}
            </div>
            
            <div>
              <label className="block font-source font-medium text-white mb-2">
                {t('contactForm.serviceLabel')}
              </label>
              <select
                {...register('service')}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">{t('contactForm.servicePlaceholder')}</option>
                <option value="enquiry">General Enquiry</option>
                <option value="trial">Free Trial</option>
                <option value="counselling">Counselling</option>
                <option value="enrol">Enrollment</option>
                <option value="other">Other</option>
              </select>
              {errors.service && (
                <p className="mt-2 text-red-400 text-sm" role="alert" aria-live="polite">
                  {errors.service.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-source font-medium text-white mb-2">
              {t('contactForm.messageLabel')}
            </label>
            <textarea
              {...register('message')}
              rows={5}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder={t('contactForm.messagePlaceholder')}
            />
            {errors.message && (
              <p className="mt-2 text-red-400 text-sm" role="alert" aria-live="polite">
                {errors.message.message}
              </p>
            )}
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
                  {t('contactForm.consentLabel')}
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
                    <Send className="mr-2 h-5 w-5" />
                    {t('contactForm.submitButton')}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;