import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Music, Piano, Guitar, Mic, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Musicraft assistant. I can help you with music theory questions, course information, pricing, enrollment procedures, and navigate you to different pages. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Navigation requests
    if (message.includes('take me to') || message.includes('go to') || message.includes('show me') || message.includes('navigate to')) {
      if (message.includes('book trial') || message.includes('trial lesson') || message.includes('free trial')) {
        setTimeout(() => navigate('/book-trial'), 1000);
        return "I'll take you to our Free Trial booking page where you can schedule your complimentary 45-minute lesson with our expert instructors!";
      }
      
      if (message.includes('assessment') || message.includes('pre-assessment')) {
        setTimeout(() => navigate('/musicraft/assessment'), 1000);
        return "I'll take you to our Pre-Assessment page where you can take a personalized musical evaluation to help us tailor your learning experience!";
      }
      
      if (message.includes('course') && (message.includes('page') || message.includes('list'))) {
        // Navigate to courses page via state change since it's handled by setCurrentPage
        return "Let me show you our comprehensive course offerings! You can find detailed information about all our music programs including Piano, Guitar, Vocals, Violin, Drums, and more.";
      }
      
      if (message.includes('contact') || message.includes('contact us')) {
        setTimeout(() => navigate('/contact'), 1000);
        return "I'll take you to our Contact page where you can reach out to us directly or fill out our inquiry form!";
      }
      
      if (message.includes('enroll') && (message.includes('page') || message.includes('form'))) {
        setTimeout(() => navigate('/musicraft/enroll'), 1000);
        return "I'll take you to our Enrollment page where you can begin your musical journey with us!";
      }
      
      if (message.includes('home') || message.includes('main page')) {
        setTimeout(() => navigate('/'), 1000);
        return "Taking you back to our homepage where you can explore all that Musicraft Academy has to offer!";
      }
    }
    
    // Quick action requests
    if (message.includes('book') && (message.includes('trial') || message.includes('lesson'))) {
      setTimeout(() => navigate('/book-trial'), 1000);
      return "Perfect! I'll take you to book your free trial lesson. You can choose your preferred date, time, and instructor. Our 45-minute trial includes a musical assessment and personalized learning plan!";
    }
    
    if (message.includes('start assessment') || message.includes('take assessment')) {
      setTimeout(() => navigate('/musicraft/assessment'), 1000);
      return "Great choice! The Pre-Assessment helps us understand your musical background and goals. I'm taking you there now - it only takes a few minutes and provides valuable insights for your learning journey!";
    }
    
    // Music Theory Questions
    if (message.includes('scale') || message.includes('major') || message.includes('minor')) {
      return "Great question about scales! A major scale follows the pattern: Whole-Whole-Half-Whole-Whole-Whole-Half steps. For example, C major has no sharps or flats: C-D-E-F-G-A-B-C. Minor scales have different patterns - natural minor is: W-H-W-W-H-W-W. Would you like to know about a specific scale?";
    }
    
    if (message.includes('chord') || message.includes('triad')) {
      return "Chords are built by stacking thirds! A major triad has a root, major third, and perfect fifth. For C major: C-E-G. Minor triads lower the third by a half-step, so C minor is C-Eb-G. Seventh chords add another third on top. Which chord would you like to learn about?";
    }
    
    if (message.includes('time signature') || message.includes('rhythm')) {
      return "Time signatures tell us how to count time in music! The top number shows beats per measure, bottom shows note value. 4/4 means 4 quarter-note beats per measure. 3/4 is waltz time (3 quarter notes). 2/4 is march time. Need help with a specific time signature?";
    }
    
    if (message.includes('key signature') || message.includes('sharp') || message.includes('flat')) {
      return "Key signatures tell us which notes to play sharp or flat throughout a piece. The order of sharps is F#-C#-G#-D#-A#-E#-B#. For flats: Bb-Eb-Ab-Db-Gb-Cb-Fb. To find the major key: for sharps, go up a half-step from the last sharp. For flats, the second-to-last flat is the key. Want to know about a specific key?";
    }
    
    if (message.includes('interval')) {
      return "Intervals measure the distance between two notes! Perfect intervals (unison, 4th, 5th, octave) and major intervals (2nd, 3rd, 6th, 7th) can be made minor, augmented, or diminished. A major 3rd is 4 half-steps, minor 3rd is 3 half-steps. Perfect 5th is 7 half-steps. Which interval would you like to explore?";
    }
    
    // Pricing Questions
    if (message.includes('price') || message.includes('cost') || message.includes('fee') || message.includes('pricing')) {
      return "Our course pricing varies by instrument and format:\n\n🎹 Piano: ₹3,000/month\n🎸 Guitar: ₹2,800/month\n🎤 Western Vocals: ₹2,200/month\n🎻 Violin: ₹3,500/month\n🥁 Drums: ₹3,200/month\n🎵 Ukulele: ₹2,000/month\n📚 Music Theory: ₹1,800/month\n🎧 Music Production: ₹4,500/month\n\nOnline classes are typically ₹300-500 less per month. We also offer family discounts and flexible payment plans!";
    }
    
    if (message.includes('discount') || message.includes('offer')) {
      return "We offer several discounts:\n• Family discount: 15% off for 2+ family members\n• Annual payment: 10% discount\n• Student referral: ₹500 credit for each successful referral\n• Early bird: 20% off first month for new students\n\nWould you like to know about our current promotions?";
    }
    
    // Course Information
    if (message.includes('course') || message.includes('lesson') || message.includes('class')) {
      return "We offer comprehensive courses in:\n\n🎹 Piano & Digital Keyboard\n🎸 Guitar (Acoustic & Electric)\n🎤 Western Vocals\n🎻 Western Violin\n🥁 Drums & Percussion\n🎵 Ukulele\n📚 Music Theory (All Grades)\n🎧 Music Production\n\nAll courses available both online and in-center. Which instrument interests you most?";
    }
    
    if (message.includes('grade') || message.includes('certification') || message.includes('exam')) {
      return "We prepare students for internationally recognized certifications:\n\n• ABRSM (Associated Board of Royal Schools of Music)\n• Trinity College London\n• RSL (Rockschool)\n\nGrades 1-8 available for most instruments. Our pass rate is 95%! Grade exams help track progress and are recognized globally. Interested in a specific grade level?";
    }
    
    // Enrollment Process
    if (message.includes('enroll') || message.includes('admission') || message.includes('join') || message.includes('start')) {
      return "Enrollment is easy! Here's the process:\n\n1️⃣ Book a FREE trial lesson\n2️⃣ Complete our musical assessment\n3️⃣ Meet your assigned instructor\n4️⃣ Choose your schedule & payment plan\n5️⃣ Start your musical journey!\n\nNo admission fees, and you can start any time of the year. Ready to book your free trial?";
    }
    
    if (message.includes('trial') || message.includes('free') || message.includes('demo')) {
      return "Our FREE trial lesson includes:\n\n✅ 45-minute personalized session\n✅ Musical assessment & goal setting\n✅ Meet your potential instructor\n✅ Try our teaching methodology\n✅ No commitment required\n\nWe'll also provide a customized learning roadmap based on your goals. Would you like to book your trial now?";
    }
    
    // Schedule & Timing
    if (message.includes('schedule') || message.includes('time') || message.includes('timing') || message.includes('when')) {
      return "We offer flexible scheduling:\n\n⏰ Monday-Friday: 9 AM - 8 PM\n⏰ Saturday: 9 AM - 6 PM\n⏰ Sunday: By appointment\n\nBoth individual and group classes available. Online classes can be scheduled outside these hours too. We work around your schedule! What time works best for you?";
    }
    
    // Location
    if (message.includes('location') || message.includes('address') || message.includes('where')) {
      return "We have centers in:\n\n📍 Ujire: 1st Floor, Shop No 43, Sai Ram Complex, near Belal Road, Karnataka 574240\n📍 Bangalore: Premium location coming soon!\n🌐 Online: Available worldwide\n\nWhich location would you prefer for your lessons?";
    }
    
    // Instruments
    if (message.includes('piano') || message.includes('keyboard')) {
      return "Our Piano/Keyboard program covers:\n\n🎹 Classical & contemporary techniques\n🎹 Sight-reading & music theory\n🎹 Grade 1-8 ABRSM preparation\n🎹 Popular songs & improvisation\n\nPrice: ₹3,000/month (in-center), ₹2,500/month (online)\nAge: 5+ years\nDuration: 6-12 months per grade\n\nWould you like to book a trial lesson?";
    }
    
    if (message.includes('guitar')) {
      return "Our Guitar program includes:\n\n🎸 Acoustic & electric guitar\n🎸 Chord progressions & strumming\n🎸 Fingerpicking & lead guitar\n🎸 Popular songs & music theory\n\nPrice: ₹2,800/month (in-center), ₹2,200/month (online)\nAge: 10+ years\nDuration: 6-12 months per grade\n\nInterested in acoustic or electric guitar?";
    }
    
    if (message.includes('vocal') || message.includes('singing') || message.includes('voice')) {
      return "Our Western Vocals program focuses on:\n\n🎤 Proper breathing & pitch control\n🎤 Voice training & range extension\n🎤 Performance skills & stage presence\n🎤 Popular songs & vocal techniques\n\nPrice: ₹2,200/month (in-center), ₹2,000/month (online)\nAge: 8+ years\nDuration: 6-12 months\n\nWould you like to explore your vocal potential?";
    }
    
    // Contact & Support
    if (message.includes('contact') || message.includes('phone') || message.includes('call')) {
      return "You can reach us at:\n\n📞 Mrs. Laveena: +91 9110805653 (Primary Contact)\n📞 Mr. Sharwin: +91 7204731520 (Music Store & Inquiries)\n📧 Email: musicraftacademy@gmail.com\n💬 WhatsApp: +91 9110805653\n\nWe're available Mon-Sat, 9 AM - 8 PM. How can we help you today?";
    }
    
    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Welcome to Musicraft Academy! 🎵 I'm here to help you with any questions about our music courses, pricing, theory, or enrollment. What would you like to know?";
    }
    
    if (message.includes('thank')) {
      return "You're very welcome! 😊 I'm always here to help with your musical journey. Feel free to ask me anything about music theory, our courses, or enrollment. Is there anything else you'd like to know?";
    }
    
    // Default response
    return "I'd be happy to help you with that! I can assist with:\n\n🎵 Music theory questions\n💰 Course pricing & discounts\n📚 Course information\n📝 Enrollment procedures\n📍 Location & scheduling\n🎹 Specific instrument details\n\nCould you please be more specific about what you'd like to know? Or feel free to call us at +91 9110805653 for immediate assistance!";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What are your course prices?",
    "How do I enroll?",
    "What is a major scale?",
    "Tell me about piano lessons",
    "Do you offer online classes?"
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'hidden' : 'flex'
        } items-center justify-center`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Musicraft Assistant</h3>
                <p className="text-blue-100 text-sm">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot ? 'bg-blue-600' : 'bg-purple-600'
                  }`}>
                    {message.isBot ? (
                      <Bot className="h-4 w-4 text-white" />
                    ) : (
                      <User className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`rounded-2xl p-3 ${
                    message.isBot 
                      ? 'bg-gray-800 text-gray-200' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-800 rounded-2xl p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-gray-400 text-xs mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputText(question);
                      handleSendMessage();
                    }}
                    className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about music theory, courses, pricing..."
                className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-all duration-300"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;