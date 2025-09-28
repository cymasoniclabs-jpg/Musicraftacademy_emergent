import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
  instructor?: string;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

const BookingCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Generate available time slots
  const timeSlots: TimeSlot[] = [
    { time: '09:00 AM', available: true, instructor: 'Mrs. Laveena' },
    { time: '10:00 AM', available: true, instructor: 'Mr. Sharwin' },
    { time: '11:00 AM', available: false, instructor: 'Mrs. Laveena' },
    { time: '02:00 PM', available: true, instructor: 'Mrs. Laveena' },
    { time: '03:00 PM', available: true, instructor: 'Mr. Sharwin' },
    { time: '04:00 PM', available: true, instructor: 'Mrs. Laveena' },
    { time: '05:00 PM', available: false, instructor: 'Mr. Sharwin' },
    { time: '06:00 PM', available: true, instructor: 'Mrs. Laveena' }
  ];

  const courses = [
    'Piano', 'Guitar', 'Digital Keyboard', 'Western Vocals', 
    'Western Violin', 'Drums', 'Ukulele', 'Music Theory'
  ];

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

  const handleDateSelect = (date: Date) => {
    if (!date) return;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date >= today && date.getDay() !== 0) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Booking Submitted:', {
      date: selectedDate,
      time: selectedTime,
      ...formData
    });

    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedDate(null);
      setSelectedTime(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        message: ''
      });
    }, 3000);
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

  if (showSuccess) {
    return (
      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700/50">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
          <p className="text-gray-300 mb-2">
            Your free trial lesson has been scheduled for:
          </p>
          <p className="text-xl font-semibold text-blue-400 mb-4">
            {selectedDate?.toLocaleDateString()} at {selectedTime}
          </p>
          <p className="text-gray-400 mb-6">
            We'll send you a confirmation email with all the details shortly.
          </p>
          <div className="bg-blue-900/30 rounded-2xl p-6 border border-blue-500/20">
            <h3 className="text-white font-semibold mb-2">What to Expect:</h3>
            <ul className="text-gray-300 text-left space-y-2">
              <li>• 45-minute personalized session</li>
              <li>• Meet your potential instructor</li>
              <li>• Musical assessment & goal setting</li>
              <li>• Try our teaching methodology</li>
              <li>• Receive a customized learning roadmap</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700/50">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Calendar className="h-8 w-8 text-blue-400 mr-3" />
          <h2 className="text-3xl font-bold text-white">Book Your Free Trial</h2>
        </div>
        <p className="text-gray-400">Schedule a complimentary 45-minute lesson with our expert instructors</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Select Date
          </h3>

          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-400 hover:text-white" />
            </button>
            <h4 className="text-lg font-semibold text-white">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h4>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowRight className="h-5 w-5 text-gray-400 hover:text-white" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-gray-400 font-medium py-2">
                {day}
              </div>
            ))}
            {generateCalendarDays().map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateSelect(day.date)}
                disabled={!day.isAvailable}
                className={`p-2 text-center rounded-lg transition-all ${
                  day.isCurrentMonth
                    ? day.isAvailable
                      ? selectedDate?.toDateString() === day.date.toDateString()
                        ? 'bg-blue-600 text-white'
                        : 'text-white hover:bg-gray-700'
                      : 'text-gray-500 cursor-not-allowed'
                    : 'text-gray-600'
                } ${day.isToday ? 'ring-2 ring-blue-400' : ''}`}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Available Times
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                    disabled={!slot.available}
                    className={`p-3 rounded-xl text-sm font-medium transition-all ${
                      slot.available
                        ? selectedTime === slot.time
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-gray-900 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <div>{slot.time}</div>
                    <div className="text-xs opacity-75">{slot.instructor}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking Form */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Your Information
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+91 9999999999"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Interested Course *</label>
              <select
                required
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Message (Optional)</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Tell us about your musical goals or any questions you have..."
              />
            </div>

            <button
              type="submit"
              disabled={!selectedDate || !selectedTime || isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Booking...
                </div>
              ) : (
                'Book Free Trial'
              )}
            </button>

            {selectedDate && selectedTime && (
              <div className="bg-blue-900/30 rounded-2xl p-4 border border-blue-500/20">
                <h4 className="text-white font-semibold mb-2">Selected Slot:</h4>
                <p className="text-blue-300">
                  📅 {selectedDate.toLocaleDateString()} at {selectedTime}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;