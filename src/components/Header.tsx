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
  const { i18n } = useTranslation();

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
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
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
            <button 
              onClick={() => setCurrentPage('contact')}
            >
              Book Free Trial
            </button>
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
              <button
                onClick={toggleLanguage}
                className="text-left px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-accent-blue hover:bg-card-dark rounded-lg border border-gray-600 mx-4"
              >
                {i18n.language === 'en' ? 'ಕನ್ನಡ (KN)' : 'English (EN)'}
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className="bg-primary-gradient text-white px-4 py-2 rounded-xl text-sm font-medium mx-4 shadow-lg"
              >
                Book Free Trial
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;