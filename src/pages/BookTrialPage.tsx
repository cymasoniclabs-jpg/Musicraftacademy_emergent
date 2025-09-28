import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface TimeSlot {
  time: string;
  instructor: string;
  instructorId: string;
  available: boolean;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  consent: boolean;
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    date: string;
    time: string;
    instructor: string;
  };
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, bookingDetails }) => {
  const { t } = useTranslation('forms');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleStartAssessment = () => {
    navigate('/musicraft/assessment');
    onClose();
  };

  const handleAddToCalendar = () => {
    // Generate ICS file for calendar
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Musicraft Academy//Trial Lesson//EN
BEGIN:VEVENT
UID:${Date.now()}@musicraftacademy.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${bookingDetails.date}T${bookingDetails.time.replace(':', '')}00
DURATION:PT45M
SUMMARY:Free Trial Music Lesson - Musicraft Academy
DESCRIPTION:Your free trial lesson with ${bookingDetails.instructor}
LOCATION:Musicraft Academy, Ujire
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'musicraft-trial-lesson.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('bookTrial.freeTrialBooked')}
          </h2>
          <p className="text-gray-300 mb-4">
            {t('bookTrial.tailorSession')}
          </p>
          
          <div className="bg-blue-900/30 rounded-xl p-4 border border-blue-500/20 mb-6">
            <p className="text-blue-300 text-sm">
              📅 {bookingDetails.date}<br/>
              ⏰ {bookingDetails.time}<br/>
              👨‍🏫 {bookingDetails.instructor}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleStartAssessment}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all"
            >
              {t('bookTrial.startPreAssessment')}
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCalendar}
                className="bg-gray-800 text-white px-4 py-2 rounded-xl font-medium hover:bg-gray-700 transition-colors text-sm"
              >
                {t('bookTrial.addToCalendar')}
              </button>
              <button
                onClick={onClose}
                className="bg-gray-800 text-white px-4 py-2 rounded-xl font-medium hover:bg-gray-700 transition-colors text-sm"
              >
                {t('bookTrial.goToHome')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookTrialPage: React.FC = () => {
  const { t } = useTranslation('forms');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const courses = [
    'Piano', 'Guitar', 'Digital Keyboard', 'Western Vocals', 
    'Western Violin', 'Drums', 'Ukulele', 'Music Theory', 'Music Production'
  ];

  // Mock instructor data (in real app, this would come from Supabase)
  const mockInstructors = [
    { id: '1', name: 'Mrs. Laveena' },
    { id: '2', name: 'Mr. Sharwin' }
  ];

  // Generate mock available time slots based on selected date
  useEffect(() => {
    if (!selectedDate) {
      setAvailableSlots([]);
      return;
    }

    // Mock time slots generation
    const mockSlots: TimeSlot[] = [
      { time: '09:00', instructor: 'Mrs. Laveena', instructorId: '1', available: true },
      { time: '10:00', instructor: 'Mr. Sharwin', instructorId: '2', available: true },
      { time: '11:00', instructor: 'Mrs. Laveena', instructorId: '1', available: Math.random() > 0.3 },
      { time: '14:00', instructor: 'Mrs. Laveena', instructorId: '1', available: true },
      { time: '15:00', instructor: 'Mr. Sharwin', instructorId: '2', available: true },
      { time: '16:00', instructor: 'Mrs. Laveena', instructorId: '1', available: Math.random() > 0.4 },
      { time: '17:00', instructor: 'Mr. Sharwin', instructorId: '2', available: Math.random() > 0.2 },
      { time: '18:00', instructor: 'Mrs. Laveena', instructorId: '1', available: true }
    ];

    setAvailableSlots(mockSlots);
  }, [selectedDate]);

  // Capture UTM and referrer on component mount
  useEffect(() => {
    const captureUTM = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const utm = {
        source: urlParams.get('utm_source'),
        medium: urlParams.get('utm_medium'),
        campaign: urlParams.get('utm_campaign'),
        content: urlParams.get('utm_content'),
        term: urlParams.get('utm_term'),
        referrer: document.referrer
      };
      
      // Store in localStorage for form submission
      localStorage.setItem('utm_data', JSON.stringify(utm));
    };

    captureUTM();
  }, []);

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.getTime() === today.getTime();
      const isPast = date < today;
      const isWeekend = date.getDay() === 0; // Sunday
      const isAvailable = isCurrentMonth && !isPast && !isWeekend;

      days.push({
        date,
        isCurrentMonth,
        isToday,
        isPast,
        isWeekend,
        isAvailable
      });
    }

    return days;
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid Indian phone number';
    }

    if (!formData.course) {
      errors.course = 'Please select a course';
    }

    if (!formData.consent) {
      errors.consent = 'Please accept the terms and conditions';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleDateSelect = (date: Date) => {
    if (!date) return;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date >= today && date.getDay() !== 0) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedTime(slot);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Get UTM data from localStorage
      const utmData = JSON.parse(localStorage.getItem('utm_data') || '{}');
      
      const payload = {
        route: 'trial_booking',
        payload: {
          instructor_id: selectedTime.instructorId,
          date: selectedDate.toISOString().split('T')[0],
          start_time: selectedTime.time + ':00',
          end_time: (parseInt(selectedTime.time.split(':')[0]) + 1).toString().padStart(2, '0') + ':00:00',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          course: formData.course,
          message: formData.message,
          utm: utmData,
          consent_at: new Date().toISOString(),
          status: 'booked'
        }
      };

      // Submit to Supabase Edge Function
      const response = await fetch(import.meta.env.VITE_EDGE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        console.error('Booking failed:', await response.text());
        alert('Booking failed. Please try again or contact us directly.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(currentMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(currentMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Calendar className="h-10 w-10 text-blue-400 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {t('bookTrial.title')}
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-4">
              {t('bookTrial.subtitle')}
            </p>
            <div className="flex items-center justify-center space-x-6 text-gray-400">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{t('bookTrial.minutes')}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{t('bookTrial.onlineInCenter')}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>{t('bookTrial.noCommitment')}</span>
              </div>
            </div>
          </div>

          {/* Main Booking Interface */}
          <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700/50">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Calendar Section */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <Calendar className="h-6 w-6 mr-3" />
                  {t('bookTrial.selectDate')}
                </h3>

                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-3 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5 text-gray-400 hover:text-white" />
                  </button>
                  <h4 className="text-xl font-semibold text-white">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h4>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-3 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ArrowRight className="h-5 w-5 text-gray-400 hover:text-white" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2 mb-8">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-gray-400 font-medium py-3 text-sm">
                      {day}
                    </div>
                  ))}
                  {generateCalendarDays().map((day, index) => (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(day.date)}
                      disabled={!day.isAvailable}
                      className={`p-3 text-center rounded-lg transition-all text-sm ${
                        day.isCurrentMonth
                          ? day.isAvailable
                            ? selectedDate?.toDateString() === day.date.toDateString()
                              ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                              : 'text-white hover:bg-gray-700'
                            : 'text-gray-500 cursor-not-allowed'
                          : 'text-gray-600'
                      } ${day.isToday ? 'ring-2 ring-blue-400' : ''}`}
                    >
                      {day.date.getDate()}
                    </button>
                  ))}
                </div>

                {/* Available Time Slots */}
                {selectedDate && availableSlots.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      {t('bookTrial.availableTimes')}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {availableSlots.map((slot, index) => (
                        <button
                          key={index}
                          onClick={() => handleTimeSelect(slot)}
                          disabled={!slot.available}
                          className={`p-4 rounded-xl text-sm font-medium transition-all ${
                            slot.available
                              ? selectedTime?.time === slot.time && selectedTime?.instructorId === slot.instructorId
                                ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                                : 'bg-gray-800 text-white hover:bg-gray-700'
                              : 'bg-gray-900 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <div className="font-semibold">{formatTime(slot.time)}</div>
                          <div className="text-xs opacity-75">{slot.instructor}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Booking Form */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <User className="h-6 w-6 mr-3" />
                  {t('bookTrial.yourInformation')}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      {t('bookTrial.fullName')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({...formData, name: e.target.value});
                        if (formErrors.name) {
                          setFormErrors({...formErrors, name: ''});
                        }
                      }}
                      className={`w-full bg-gray-800 border ${formErrors.name ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder={t('bookTrial.yourFullName')}
                    />
                    {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      {t('bookTrial.emailAddress')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({...formData, email: e.target.value});
                        if (formErrors.email) {
                          setFormErrors({...formErrors, email: ''});
                        }
                      }}
                      className={`w-full bg-gray-800 border ${formErrors.email ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      {t('bookTrial.phoneNumber')} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({...formData, phone: e.target.value});
                        if (formErrors.phone) {
                          setFormErrors({...formErrors, phone: ''});
                        }
                      }}
                      className={`w-full bg-gray-800 border ${formErrors.phone ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="+91 9999999999"
                    />
                    {formErrors.phone && <p className="text-red-400 text-sm mt-1">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      {t('Interested Course')} *
                    </label>
                    <select
                      required
                      value={formData.course}
                      onChange={(e) => {
                        setFormData({...formData, course: e.target.value});
                        if (formErrors.course) {
                          setFormErrors({...formErrors, course: ''});
                        }
                      }}
                      className={`w-full bg-gray-800 border ${formErrors.course ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">{t('Select a course')}</option>
                      {courses.map((course) => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                    {formErrors.course && <p className="text-red-400 text-sm mt-1">{formErrors.course}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      {t('Message')} ({t('Optional')})
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder={t('Tell us about your musical goals or any questions you have...')}
                    />
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consent}
                      onChange={(e) => {
                        setFormData({...formData, consent: e.target.checked});
                        if (formErrors.consent) {
                          setFormErrors({...formErrors, consent: ''});
                        }
                      }}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-300">
                      {t('I agree to receive communication from Musicraft Academy regarding my trial lesson and course information.')} *
                    </label>
                  </div>
                  {formErrors.consent && <p className="text-red-400 text-sm">{formErrors.consent}</p>}

                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime || isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {t('Booking...')}
                      </div>
                    ) : (
                      t('Book Free Trial')
                    )}
                  </button>

                  {selectedDate && selectedTime && (
                    <div className="bg-blue-900/30 rounded-2xl p-4 border border-blue-500/20">
                      <h4 className="text-white font-semibold mb-2">{t('Selected Slot')}:</h4>
                      <p className="text-blue-300">
                        📅 {selectedDate.toLocaleDateString()} at {formatTime(selectedTime.time)}
                        <br />
                        👨‍🏫 {selectedTime.instructor}
                      </p>
                    </div>
                  )}
                </form>

                <div className="mt-8 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h4 className="text-white font-semibold mb-4">{t('What to Expect')}:</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                      {t('45-minute personalized session')}
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                      {t('Meet your potential instructor')}
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                      {t('Musical assessment & goal setting')}
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                      {t('Try our teaching methodology')}
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                      {t('Receive a customized learning roadmap')}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          // Reset form
          setSelectedDate(null);
          setSelectedTime(null);
          setFormData({
            name: '',
            email: '',
            phone: '',
            course: '',
            message: '',
            consent: false
          });
        }}
        bookingDetails={{
          date: selectedDate?.toLocaleDateString() || '',
          time: selectedTime ? formatTime(selectedTime.time) : '',
          instructor: selectedTime?.instructor || ''
        }}
      />
    </div>
  );
};

export default BookTrialPage;