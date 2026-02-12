'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Namaste! I am Sakhi AI. How can I help?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const quickChips = [
    { label: '🧵 Find Tailor', text: 'I need a tailor' },
    { label: '🍲 Home Food', text: 'I want home cooked food' },
    { label: '💰 Earn Money', text: 'I want to register and earn' },
    { label: '🛡️ Is this safe?', text: 'Is this app safe?' }
  ];

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Add User Message
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI Thinking
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let botResponse = { role: 'bot', text: '' };

      // --- SMART LOGIC ---
      if (lowerText.includes('tailor') || lowerText.includes('stitch') || lowerText.includes('clothes')) {
        botResponse.text = 'I found expert tailors for you! Taking you there...';
        setTimeout(() => router.push('/find-services?category=tailor'), 1500);
      } 
      else if (lowerText.includes('food') || lowerText.includes('cook') || lowerText.includes('tiffin')) {
        botResponse.text = 'Yum! Home-cooked meals are the best. Showing you nearby chefs...';
        setTimeout(() => router.push('/find-services?category=food'), 1500);
      }
      else if (lowerText.includes('earn') || lowerText.includes('register') || lowerText.includes('job')) {
        botResponse.text = 'We would love to have you! Opening the registration page...';
        setTimeout(() => router.push('/register'), 1500);
      }
      else if (lowerText.includes('safe') || lowerText.includes('trust') || lowerText.includes('fraud')) {
        botResponse.text = '100% Safe. Every woman is physically verified by the Human Care Foundation. You can see their ID on their profile.';
      }
      else {
        botResponse.text = 'I can help you find a Tailor, Cook, or Tutor. Or ask me how to Earn Money!';
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[350px] h-[450px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="animate-pulse" />
              <span className="font-bold">Sakhi AI</span>
            </div>
            <button aria-label="Close chat" onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition">
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] p-3 text-sm ${
                  msg.role === 'user'
                    ? 'bg-orange-500 text-white rounded-2xl rounded-tr-none ml-auto'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-tl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="bg-white border border-gray-200 text-gray-400 text-xs p-3 rounded-2xl rounded-tl-none w-fit shadow-sm">
                Sakhi is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Chips & Input */}
          <div className="p-3 bg-white border-t border-gray-100">
            {/* Chips Scroll */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mb-2">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip.text)}
                  className="whitespace-nowrap px-3 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-full border border-orange-100 hover:bg-orange-100 transition"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input Field */}
            <div className="flex gap-2 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-100 text-gray-800 text-sm rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition w-full"
              />
              <button
                aria-label="Send message"
                onClick={() => handleSend(input)}
                className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition transform active:scale-95 flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          aria-label="Open chat assistant"
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition duration-300 relative group"
        >
          <MessageCircle size={28} />
          
          {/* Notification Badge */}
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
            1
          </span>
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Chat with AI
          </span>
        </button>
      )}
    </div>
  );
}
