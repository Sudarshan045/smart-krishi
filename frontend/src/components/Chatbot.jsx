import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Leaf, 
  HelpCircle,
  Minimize2,
  Maximize2,
  Trash2,
  Zap,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TranslatedText from './common/TranslatedText';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: 'Namaste! I am your Smart Krishi AI assistant. How can I help you with your farming today?', 
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const { language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { 
      id: Date.now(), 
      text: input, 
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const apiUrl = baseUrl.replace(/\/api$/, '') + '/api/ai/chat';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, language })
      });
      const data = await response.json();
      
      const botMessage = { 
        id: Date.now() + 1, 
        text: data.reply, 
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestions = [
    'How to increase sugarcane yield?',
    'Disease symptoms in grapes',
    'Latest government schemes',
    'Soil testing centers near me'
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            onClick={() => setIsOpen(true)}
            className="group w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white shadow-[0_20px_50px_rgb(5,150,105,0.4)] hover:bg-emerald-700 hover:scale-110 transition-all duration-500 relative"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-emerald-400 animate-ping opacity-20 group-hover:hidden" />
            <MessageCircle size={32} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, transformOrigin: 'bottom right' }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? '80px' : '650px',
              width: isMinimized ? '300px' : '450px'
            }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="bg-white/80 backdrop-blur-3xl border border-white rounded-[3rem] shadow-[0_30px_100px_rgb(0,0,0,0.15)] flex flex-col overflow-hidden transition-all duration-500"
          >
            {/* Header */}
            <div className="p-8 flex items-center justify-between border-b border-gray-100 bg-white/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100 relative">
                  <Bot size={24} className="text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 tracking-tighter">Smart Krishi AI</h3>
                  <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles size={10} fill="currentColor" />
                    <TranslatedText>Online Assistant</TranslatedText>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-8 no-scrollbar space-y-6">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: msg.sender === 'bot' ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`flex gap-4 max-w-[85%] ${msg.sender === 'bot' ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                          msg.sender === 'bot' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-900 text-white'
                        }`}>
                          {msg.sender === 'bot' ? <Leaf size={18} /> : <User size={18} />}
                        </div>
                        <div className={`p-5 rounded-[2rem] font-bold text-sm leading-relaxed shadow-sm ${
                          msg.sender === 'bot' 
                            ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100' 
                            : 'bg-emerald-600 text-white rounded-tr-none'
                        }`}>
                          <TranslatedText>{msg.text}</TranslatedText>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                        <Leaf size={18} className="animate-pulse" />
                      </div>
                      <div className="bg-white p-5 rounded-[2rem] rounded-tl-none border border-gray-100 flex gap-1.5">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggestions */}
                <div className="px-8 pb-4 flex gap-2 overflow-x-auto no-scrollbar">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => { setInput(s); }}
                      className="whitespace-nowrap px-4 py-2 bg-white border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
                    >
                      <TranslatedText>{s}</TranslatedText>
                    </button>
                  ))}
                </div>

                {/* Input Area */}
                <div className="p-8 bg-white/50 border-t border-gray-100">
                  <form onSubmit={handleSend} className="relative flex items-center">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={language === 'mr' ? 'तुमचा प्रश्न इथे लिहा...' : 'Ask your farming question...'}
                      className="w-full bg-white border-2 border-transparent rounded-[2rem] py-5 pl-8 pr-20 font-bold text-gray-900 shadow-inner focus:border-emerald-400 outline-none transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isTyping}
                      className="absolute right-3 p-4 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-lg"
                    >
                      <Send size={20} />
                    </button>
                  </form>
                  <div className="mt-4 flex items-center justify-between px-2">
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <Zap size={10} fill="currentColor" className="text-amber-500" />
                      <TranslatedText>Powered by Smart AI</TranslatedText>
                    </div>
                    <button 
                      onClick={() => setMessages([{ id: 1, text: 'History cleared.', sender: 'bot', timestamp: new Date() }])}
                      className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 size={10} />
                      <TranslatedText>Clear Chat</TranslatedText>
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;