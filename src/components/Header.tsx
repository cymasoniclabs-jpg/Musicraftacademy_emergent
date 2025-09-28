import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Music, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const { t, i18n } = useTranslation('forms');
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'about', label: 'About Us' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'store', label: 'Music Store' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'kn' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleEnrollNow = () => {
    setShowPlanModal(true);
  };

  const handleBookFreeTrial = () => {
    navigate('/book-trial');
    setIsMenuOpen(false);
  };

  const handlePreAssessment = () => {
    navigate('/musicraft/assessment');
    setIsMenuOpen(false);
  };

  // Plan Modal Component
  const PlanModal = () => {
    if (!showPlanModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700 relative">
          <button
            onClick={() => setShowPlanModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              {t('header.enrollInCourses')}
            </h2>
            <p className="text-gray-300 mb-6">
              {t('header.chooseHowToBegin')}
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => {
                  // Mock Razorpay modal
                  alert('Razorpay payment gateway would open here. This is a demo version.');
                  setShowPlanModal(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all"
              >
                {t('header.proceedToPayment')}
              </button>
              
              <button
                onClick={() => {
                  setShowPlanModal(false);
                  handleNavClick('contact');
                }}
                className="w-full bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              >
                {t('header.talkToUsFirst')}
              </button>
              
              <button
                onClick={() => {
                  setShowPlanModal(false);
                  handleBookFreeTrial();
                }}
                className="w-full bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              >
                {t('header.bookFreeTrial')}
              </button>
              
              <p className="text-sm text-gray-400">
                {t('header.orTryOur')} {' '}
                <button
                  onClick={() => {
                    setShowPlanModal(false);
                    handlePreAssessment();
                  }}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  {t('header.preAssessment')}
                </button>
                {' '}{t('header.toPersonalizePlan')}
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-400">
                {t('header.securePayment')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background-dark/95 backdrop-blur-sm border-b border-card-dark">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="group-hover:scale-105 transition-all duration-300 flex-shrink-0">
              <img 
                src="/LoDi-M logo Musicraft Invert.png.svg" 
                alt="Musicraft Academy Logo" 
                className="h-8 sm:h-10 w-auto"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-heading bg-gradient-to-r from-accent-indigo to-primary-royal bg-clip-text text-transparent truncate">
                Musicraft Academy
              </h1>
              <p className="text-xs text-text-secondary -mt-1 hidden sm:block">Musical Mastery Begins Here</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium text-text-primary hover:text-blue-400 transition-colors px-3 py-1 border border-gray-600 rounded-lg"
            >
              {i18n.language === 'en' ? 'KN' : 'EN'}
            </button>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-all duration-300 hover:text-blue-400 whitespace-nowrap ${
                  currentPage === item.id
                    ? 'text-accent-blue border-b-2 border-accent-blue pb-1'
                    : 'text-text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Three Primary CTAs */}
            <div className="flex items-center space-x-3 ml-4">
              <button
                onClick={handleEnrollNow}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
              >
                {t('header.enrollNow')}
              </button>
              
              <button
                onClick={handleBookFreeTrial}
                className="border border-blue-500 text-blue-400 px-6 py-2 rounded-xl text-sm font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                {t('header.bookFreeTrial')}
              </button>
              
              <button
                onClick={handlePreAssessment}
                className="border border-purple-500 text-purple-400 px-6 py-2 rounded-xl text-sm font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                {t('header.preAssessment')}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-card-dark transition-colors flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-card-dark">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-accent-blue hover:bg-card-dark rounded-lg ${
                    currentPage === item.id ? 'text-accent-blue' : 'text-text-primary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="border-t border-card-dark pt-4 px-4">
                <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide">{t('header.quickActions')}</p>
                
                <button
                  onClick={handleEnrollNow}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl text-sm font-semibold mb-3"
                >
                  {t('header.enrollNow')}
                </button>
                
                <button
                  onClick={handleBookFreeTrial}
                  className="w-full border border-blue-500 text-blue-400 px-4 py-3 rounded-xl text-sm font-semibold mb-3 hover:bg-blue-500 hover:text-white transition-all"
                >
                  {t('header.bookFreeTrial')}
                </button>
                
                <button
                  onClick={handlePreAssessment}
                  className="w-full border border-purple-500 text-purple-400 px-4 py-3 rounded-xl text-sm font-semibold mb-3 hover:bg-purple-500 hover:text-white transition-all"
                >
                  {t('header.preAssessment')}
                </button>
              </div>
              
              <button
                onClick={toggleLanguage}
                className="text-left px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-accent-blue hover:bg-card-dark rounded-lg border border-gray-600 mx-4"
              >
                {i18n.language === 'en' ? 'ಕನ್ನಡ (KN)' : 'English (EN)'}
              </button>
            </div>
          </div>
        )}
      </nav>
      
      {/* Plan Modal */}
      <PlanModal />
    </header>
  );
};

export default Header;