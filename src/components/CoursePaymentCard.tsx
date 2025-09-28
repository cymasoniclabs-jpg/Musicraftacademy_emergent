import React, { useState } from 'react';
import { Music, Clock, Users, Star, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PaymentButton from './PaymentButton';

interface CoursePaymentCardProps {
  courseName: string;
  monthlyPrice: number;
  features: string[];
  duration: string;
  ageGroup: string;
  level: string;
  icon: React.ComponentType<any>;
  gradient: string;
  popular?: boolean;
}

const CoursePaymentCard: React.FC<CoursePaymentCardProps> = ({
  courseName,
  monthlyPrice,
  features,
  duration,
  ageGroup,
  level,
  icon: IconComponent,
  gradient,
  popular = false
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  const [showPlanModal, setShowPlanModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const calculatePrice = () => {
    switch (selectedPlan) {
      case 'quarterly':
        return Math.floor(monthlyPrice * 3 * 0.9); // 10% discount
      case 'annual':
        return Math.floor(monthlyPrice * 12 * 0.8); // 20% discount
      default:
        return monthlyPrice;
    }
  };

  const getDiscountText = () => {
    switch (selectedPlan) {
      case 'quarterly':
        return '10% Off';
      case 'annual':
        return '20% Off - Best Value';
      default:
        return null;
    }
  };

  const handlePaymentSuccess = (paymentData: any) => {
    console.log('Payment successful for course:', courseName, paymentData);
    // Here you would typically:
    // 1. Send payment data to your backend
    // 2. Enroll the student in the course
    // 3. Send confirmation email
    // 4. Redirect to dashboard or success page
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed for course:', courseName, error);
    // Handle payment failure
  };

  const handleEnrollNow = () => {
    setShowPlanModal(true);
  };

  const handleRazorpayPayment = () => {
    // Mock Razorpay integration
    alert(`Mock Razorpay payment for ${courseName} - ₹${calculatePrice().toLocaleString('en-IN')}. This is a demo version.`);
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
            ×
          </button>
          
          <div className="text-center">
            <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">
              {t('Enroll in')} {courseName}
            </h2>
            
            <div className="bg-gray-800 rounded-xl p-4 mb-6">
              <p className="text-gray-300 text-sm mb-2">
                {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
              </p>
              <p className="text-2xl font-bold text-white mb-2">
                ₹{calculatePrice().toLocaleString('en-IN')}
              </p>
              {getDiscountText() && (
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {getDiscountText()}
                </span>
              )}
              <ul className="text-xs text-gray-400 mt-3 space-y-1">
                <li>• {duration}</li>
                <li>• Individual lessons</li>
                <li>• Certificate upon completion</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleRazorpayPayment}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all"
              >
                {t('Proceed to Payment (Razorpay)')}
              </button>
              
              <button
                onClick={() => {
                  setShowPlanModal(false);
                  navigate('/contact');
                }}
                className="w-full bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              >
                {t('Talk to Us First')}
              </button>
              
              <button
                onClick={() => {
                  setShowPlanModal(false);
                  navigate('/book-trial');
                }}
                className="w-full bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              >
                {t('Book Free Trial')}
              </button>
              
              <p className="text-sm text-gray-400">
                {t('Or try our')} {' '}
                <button
                  onClick={() => {
                    setShowPlanModal(false);
                    navigate('/musicraft/assessment');
                  }}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  {t('Pre-Assessment')}
                </button>
                {' '}{t('to personalize your plan')}
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-400">
                {t('Secure payment powered by Razorpay')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`relative bg-card-dark/60 backdrop-blur-sm rounded-2xl p-6 hover:bg-card-dark/80 transition-all duration-500 transform hover:scale-105 border ${
      popular ? 'border-yellow-500 ring-2 ring-yellow-500/20' : 'border-royal-purple/30'
    }`}>
      
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      {/* Course Icon */}
      <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
        <IconComponent className="h-8 w-8 text-white" />
      </div>

      {/* Course Name */}
      <h3 className="text-2xl font-semibold text-text-primary mb-2 text-center">
        {courseName}
      </h3>

      {/* Course Details */}
      <div className="space-y-2 mb-6 text-center">
        <div className="flex items-center justify-center text-sm text-text-secondary">
          <Clock className="h-4 w-4 mr-1" />
          {duration}
        </div>
        <div className="flex items-center justify-center text-sm text-text-secondary">
          <Users className="h-4 w-4 mr-1" />
          Age: {ageGroup}
        </div>
        <div className="flex items-center justify-center text-sm text-text-secondary">
          <Star className="h-4 w-4 mr-1" />
          Level: {level}
        </div>
      </div>

      {/* Plan Selection */}
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { key: 'monthly', label: 'Monthly', desc: '1 Month' },
            { key: 'quarterly', label: 'Quarterly', desc: '3 Months' },
            { key: 'annual', label: 'Annual', desc: '12 Months' }
          ].map((plan) => (
            <button
              key={plan.key}
              onClick={() => setSelectedPlan(plan.key as any)}
              className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedPlan === plan.key
                  ? `bg-gradient-to-r ${gradient} text-white`
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div>{plan.label}</div>
              <div className="text-xs opacity-75">{plan.desc}</div>
            </button>
          ))}
        </div>

        {/* Price Display */}
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-text-primary">
            ₹{calculatePrice().toLocaleString('en-IN')}
          </div>
          {selectedPlan !== 'monthly' && (
            <div className="text-sm text-gray-400">
              ₹{Math.floor(calculatePrice() / (selectedPlan === 'quarterly' ? 3 : 12)).toLocaleString('en-IN')}/month
            </div>
          )}
          {getDiscountText() && (
            <div className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
              {getDiscountText()}
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-text-primary">
            <CheckCircle className={`h-4 w-4 mr-3 flex-shrink-0 text-green-500`} />
            {feature}
          </li>
        ))}
      </ul>

      {/* Payment Button */}
      <PaymentButton
        amount={calculatePrice()}
        courseName={`${courseName} - ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan`}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
        className="mt-4"
      />
    </div>
  );
};

export default CoursePaymentCard;