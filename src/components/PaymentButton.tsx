import React, { useState } from 'react';
import { CreditCard, Shield, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentButtonProps {
  amount: number; // Amount in rupees
  courseName: string;
  onPaymentSuccess?: (paymentData: any) => void;
  onPaymentError?: (error: any) => void;
  className?: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  courseName,
  onPaymentSuccess,
  onPaymentError,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsLoading(true);
    setPaymentStatus('processing');

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // For demonstration, we'll create a mock order
      // In production, this should call your backend to create an order
      const orderData = {
        id: `order_${Date.now()}`,
        amount: amount * 100, // Convert to paise
        currency: 'INR'
      };

      const options: RazorpayOptions = {
        key: 'rzp_test_demo', // This should come from environment variable
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Musicraft Academy',
        description: `Enrollment for ${courseName}`,
        order_id: orderData.id,
        handler: function (response: any) {
          console.log('Payment Success:', response);
          setPaymentStatus('success');
          onPaymentSuccess?.(response);
          
          // Here you would typically verify the payment on your backend
          setTimeout(() => setPaymentStatus('idle'), 3000);
        },
        prefill: {
          name: 'Student Name',
          email: 'student@email.com',
          contact: '9999999999'
        },
        theme: {
          color: '#6366F1'
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
            setPaymentStatus('idle');
          }
        }
      };

      const razor = new window.Razorpay(options);
      
      razor.on('payment.failed', function (response: any) {
        console.error('Payment Failed:', response);
        setPaymentStatus('error');
        onPaymentError?.(response);
        setTimeout(() => setPaymentStatus('idle'), 3000);
      });

      razor.open();
      setIsLoading(false);

    } catch (error) {
      console.error('Payment Error:', error);
      setPaymentStatus('error');
      setIsLoading(false);
      onPaymentError?.(error);
      setTimeout(() => setPaymentStatus('idle'), 3000);
    }
  };

  const getButtonContent = () => {
    switch (paymentStatus) {
      case 'processing':
        return (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        );
      case 'success':
        return (
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Payment Successful!
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Payment Failed
          </div>
        );
      default:
        return (
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Pay ₹{amount.toLocaleString('en-IN')}
          </div>
        );
    }
  };

  const getButtonColor = () => {
    switch (paymentStatus) {
      case 'success':
        return 'bg-green-600 hover:bg-green-700';
      case 'error':
        return 'bg-red-600 hover:bg-red-700';
      default:
        return 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700';
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handlePayment}
        disabled={isLoading || paymentStatus === 'processing'}
        className={`w-full ${getButtonColor()} text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {getButtonContent()}
      </button>
      
      <div className="flex items-center justify-center text-sm text-gray-400">
        <Shield className="h-4 w-4 mr-1" />
        Secure payment powered by Razorpay
      </div>
      
      <div className="text-xs text-gray-500 text-center">
        Supports UPI, Cards, Net Banking & Wallets
      </div>
    </div>
  );
};

export default PaymentButton;