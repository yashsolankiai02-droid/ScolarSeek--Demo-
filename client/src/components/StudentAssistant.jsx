import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import { useApplications } from '../contexts/ApplicationsContext';

export default function StudentAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hi! I am your Scholarship Assistant. Ask me about eligibility, documents, or deadlines!' }
  ]);
  const [input, setInput] = useState('');

  const location = useLocation();
  const { completionPercentage } = useProfile();
  const { applications } = useApplications();

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userText }]);
    setInput('');

    // Rule-based logic for prototype bot
    setTimeout(() => {
      let botResponse = "I'm not sure about that. Please refer to the official scholarship documentation.";
      const query = userText.toLowerCase();

      // Determine context
      const onProfile = location.pathname === '/profile';
      const onApplications = location.pathname === '/applications';
      
      if (query.includes('eligible') || query.includes('can i apply')) {
        if (completionPercentage < 100) {
          botResponse = "Your profile is not complete yet! Please fill out all required fields in your profile so I can accurately match scholarships for you.";
        } else {
          botResponse = "Based on your completed profile, our engine matches you to several scholarships. Check your Dashboard for personalized recommendations.";
        }
      } 
      else if (query.includes('document') || query.includes('certificate')) {
        botResponse = "Generally, you will need your Aadhaar, Income Certificate, Caste Certificate (if applicable), and your previous year's marksheets. The exact requirements depend on the specific scholarship.";
      }
      else if (query.includes('deadline')) {
        if (applications.length > 0) {
          botResponse = `You have ${applications.length} active application(s). Check the 'My Applications' page to ensure you don't miss their upcoming deadlines.`;
        } else {
          botResponse = "Most government scholarships close between September and November. Check the specific scholarship details for the exact date.";
        }
      }
      else if (query.includes('hello') || query.includes('hi ')) {
        botResponse = "Hello! How can I help you with your scholarship journey today?";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botResponse }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-brand-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-brand-700 hover:scale-105 transition-all z-40 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-20 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col z-50 transition-all origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-brand-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <h3 className="font-bold text-sm">Student Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-brand-100 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto h-80 space-y-4 bg-gray-50 dark:bg-gray-900/80">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                msg.sender === 'user' 
                  ? 'bg-brand-600 text-white rounded-tr-sm' 
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-tl-sm shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl flex items-center space-x-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-transparent rounded-lg px-4 py-2 text-sm focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="p-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
}
