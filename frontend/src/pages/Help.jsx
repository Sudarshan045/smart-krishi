import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  MessageCircle, 
  HelpCircle, 
  Clock, 
  Award, 
  Users, 
  BookOpen, 
  Search,
  ExternalLink,
  MapPin,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';
import TranslatedText from '../components/common/TranslatedText';

const Help = () => {
  const { language, translateInstant } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const faqs = [
    {
      id: 1,
      question: 'How do I register on Smart Krishi?',
      questionMarathi: 'स्मार्ट कृषी वर नोंदणी कशी करायची?',
      answer: 'Click on the Register button in the top right corner. Fill in your name, email, mobile number, and create a password. After registration, you can access all features including crop guides, calculator, and government schemes.',
      category: 'Account'
    },
    {
      id: 2,
      question: 'How to use the Agri Calculator?',
      questionMarathi: 'कृषी गणकयंत्र कसे वापरायचे?',
      answer: 'Go to Calculator page, select your crop (Sugarcane/Grapes), enter land area, investment amount (optional), yield (optional), and selling price (optional). The calculator will automatically show your profit/loss with detailed breakdown.',
      category: 'Calculator'
    },
    {
      id: 3,
      question: 'Are the crop guides free?',
      questionMarathi: 'पीक मार्गदर्शक मोफत आहेत का?',
      answer: 'Yes, all crop guides and educational content on Smart Krishi are completely free for all farmers. We believe in empowering farmers with knowledge.',
      category: 'Content'
    },
    {
      id: 4,
      question: 'How can I apply for government schemes?',
      questionMarathi: 'सरकारी योजनांसाठी अर्ज कसा करायचा?',
      answer: 'Visit the Schemes page, find the scheme you want to apply for, and click on the "Apply Now" link. This will take you to the official government website where you can complete your application.',
      category: 'Schemes'
    },
    {
      id: 5,
      question: 'Is my data safe on Smart Krishi?',
      questionMarathi: 'स्मार्ट कृषी वर माझा डेटा सुरक्षित आहे का?',
      answer: 'Yes, we take data privacy seriously. Your personal information is encrypted and never shared with third parties. We comply with all data protection regulations.',
      category: 'Security'
    },
    {
      id: 6,
      question: 'How do I contact support?',
      questionMarathi: 'मी समर्थनाशी संपर्क कसा साधू?',
      answer: 'You can call our helpline (1800-XXX-XXXX), email us at support@smartkrishi.com, or use the live chat feature available on every page.',
      category: 'Support'
    }
  ];

  const categories = ['All', 'Account', 'Calculator', 'Content', 'Schemes', 'Security', 'Support'];

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const q = language === 'mr' ? faq.questionMarathi : faq.question;
      const matchesSearch = q.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [selectedCategory, searchTerm, language]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Premium Hero Section */}
      <div className="relative pt-24 pb-32 lg:pt-32 lg:pb-48 overflow-hidden rounded-b-[4rem] shadow-2xl mb-12">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/sugarcane_bg.png")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/95 via-green-900/80 to-transparent mix-blend-multiply opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80" />
        </div>
        
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-green-300 text-sm font-black tracking-widest mb-8 shadow-2xl"
          >
            <HelpCircle size={18} />
            <TranslatedText>Help & Support</TranslatedText>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]"
          >
            <TranslatedText>How can we</TranslatedText> <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 drop-shadow-sm">
              <TranslatedText>Help You Today?</TranslatedText>
            </span>
          </motion.h1>

          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-green-400 transition-colors" size={24} />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'mr' ? "तुमचे प्रश्न इथे शोधा..." : "Search for answers..."}
              className="w-full bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-3xl py-6 pl-16 pr-8 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-green-400 outline-none transition-all text-xl font-bold"
            />
          </div>
        </div>
      </div>

      <div className="container-custom max-w-7xl mx-auto -mt-16 relative z-20">
        {/* Contact Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Phone, title: 'Call Us', value: '1800-123-4567', desc: 'Mon-Sat, 9 AM - 6 PM', color: 'bg-green-500' },
            { icon: Mail, title: 'Email Us', value: 'support@smartkrishi.com', desc: 'Response in 24 hours', color: 'bg-blue-500' },
            { icon: MessageCircle, title: 'Live Chat', value: 'Chat with Experts', desc: 'Instant agricultural help', color: 'bg-emerald-500' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white p-8 rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-2xl transition-all duration-500 text-center"
            >
              <div className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                <item.icon size={36} className="text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-widest text-xs">
                <TranslatedText>{item.title}</TranslatedText>
              </h3>
              <p className="text-2xl font-black text-gray-900 mb-2">
                <TranslatedText>{item.value}</TranslatedText>
              </p>
              <p className="text-gray-400 font-bold text-sm">
                <TranslatedText>{item.desc}</TranslatedText>
              </p>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-[3.5rem] shadow-[0_8px_60px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden">
          <div className="p-12 border-b border-gray-100 bg-gray-50/50">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Award size={32} className="text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900 leading-tight">
                    <TranslatedText>Common</TranslatedText> <br/>
                    <span className="text-green-600 uppercase tracking-widest text-sm font-black"><TranslatedText>Farmer Inquiries</TranslatedText></span>
                  </h2>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                      selectedCategory === cat 
                        ? 'bg-gray-900 text-white shadow-xl' 
                        : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                    }`}
                  >
                    <TranslatedText>{cat}</TranslatedText>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-8">
            <AnimatePresence mode="popLayout">
              {filteredFaqs.map((faq, idx) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="mb-4"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className={`w-full p-8 rounded-[2rem] flex items-center justify-between transition-all text-left ${
                      openFaq === faq.id ? 'bg-green-50 shadow-inner' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${
                        openFaq === faq.id ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-green-600 mb-1 block">
                          <TranslatedText>{faq.category}</TranslatedText>
                        </span>
                        <h3 className={`text-xl font-black ${openFaq === faq.id ? 'text-green-900' : 'text-gray-800'}`}>
                          {language === 'mr' ? faq.questionMarathi : faq.question}
                        </h3>
                      </div>
                    </div>
                    {openFaq === faq.id ? (
                      <ChevronUp className="text-green-600" size={24} />
                    ) : (
                      <ChevronDown className="text-gray-300" size={24} />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-12 pt-4 ml-16 border-l-4 border-green-200">
                          <p className="text-xl font-bold text-gray-600 leading-relaxed">
                            {language === 'mr' ? translateInstant(faq.answer) : faq.answer}
                          </p>
                          <div className="mt-8 flex items-center gap-4">
                            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-colors">
                              <TranslatedText>Was this helpful?</TranslatedText>
                            </button>
                            <button className="text-green-600 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                              <TranslatedText>Read More</TranslatedText> <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Local Support Centers */}
        <div className="mt-20 p-12 bg-gray-900 rounded-[3.5rem] text-white shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <MapPin size={240} />
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md mb-8">
                <ShieldCheck size={20} className="text-green-400" />
                <span className="text-sm font-black uppercase tracking-widest text-green-400"><TranslatedText>Verified Support</TranslatedText></span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">
                <TranslatedText>Visit Your Nearest</TranslatedText> <br/>
                <span className="text-emerald-400"><TranslatedText>Krishi Seva Kendra</TranslatedText></span>
              </h2>
              <p className="text-xl text-gray-400 font-bold mb-10 max-w-lg">
                <TranslatedText>For physical assistance with documentation and offline scheme applications, visit our partner centers across Maharashtra.</TranslatedText>
              </p>
              <button className="px-10 py-5 bg-green-600 hover:bg-green-700 rounded-2xl font-black text-xl shadow-xl transition-all flex items-center gap-4">
                <MapPin size={24} />
                <TranslatedText>Find Nearest Center</TranslatedText>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Centers', count: '1,200+', icon: Award },
                { label: 'Districts', count: '36', icon: Zap },
                { label: 'Experts', count: '5,000+', icon: Users },
                { label: 'Support 24/7', count: 'Online', icon: Clock }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors">
                  <stat.icon className="text-green-400 mb-4" size={32} />
                  <div className="text-3xl font-black mb-1">{stat.count}</div>
                  <div className="text-gray-500 font-black uppercase tracking-widest text-[10px]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;