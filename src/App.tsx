import React, { useState, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyMusicraft from './components/WhyMusicraft';
import Testimonials from './components/Testimonials';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

// Lazy load pages
const CoursesPage = React.lazy(() => import('./pages/EnhancedCoursesPage'));
const TestimonialsPage = React.lazy(() => import('./pages/TestimonialsPage'));
const ContactPage = React.lazy(() => import('./routes/ContactPage'));
const StorePage = React.lazy(() => import('./pages/StorePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const BlogPage = React.lazy(() => import('./pages/BlogPage'));
const InteractiveDemoPage = React.lazy(() => import('./pages/InteractiveDemoPage'));

// Lazy load Musicraft routes
const MusicraftLanding = React.lazy(() => import('./routes/musicraft/index'));
const EnrollPage = React.lazy(() => import('./routes/EnrollPage'));
const AssessmentPage = React.lazy(() => import('./routes/AssessmentPage'));
const AssessmentResultPage = React.lazy(() => import('./routes/AssessmentResultPage'));
const AdminAssessmentsPage = React.lazy(() => import('./routes/AdminAssessmentsPage'));

const LoadingSpinner = () => (
  <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white">Loading...</p>
    </div>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'courses':
        return <CoursesPage />;
      case 'testimonials':
        return <TestimonialsPage setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactPage setCurrentPage={setCurrentPage} />;
      case 'store':
        return <StorePage />;
      case 'about':
        return <AboutPage />;
      case 'blog':
        return <BlogPage />;
      default:
        return (
          <>
            <Hero />
            <Services />
            <WhyMusicraft />
            <Testimonials setCurrentPage={setCurrentPage} />
            <CTABanner />
          </>
        );
    }
  };

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="min-h-screen bg-background-dark text-text-primary font-body" data-app ref={(el) => { if (el) (el as any).setCurrentPage = setCurrentPage; }}>
          <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={renderPage()} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/musicraft" element={<MusicraftLanding />} />
              <Route path="/musicraft/enroll" element={<EnrollPage />} />
              <Route path="/musicraft/assessment" element={<AssessmentPage />} />
              <Route path="/musicraft/assessment/result/:attemptId" element={<AssessmentResultPage />} />
              <Route path="/musicraft/admin/assessments" element={<AdminAssessmentsPage />} />
              <Route path="*" element={renderPage()} />
            </Routes>
          </Suspense>
          <Footer setCurrentPage={setCurrentPage} />
          <ChatBot />
        </div>
      </Suspense>
    </I18nextProvider>
  );
}

export default App;