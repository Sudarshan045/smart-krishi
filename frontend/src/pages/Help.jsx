import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Mail, Phone, MessageCircle, HelpCircle, Clock, Award, Users, BookOpen } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Help = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I register on Smart Krishi?',
      questionMarathi: 'स्मार्ट कृषी वर नोंदणी कशी करायची?',
      answer: 'Click on the Register button in the top right corner. Fill in your name, email, mobile number, and create a password. After registration, you can access all features including crop guides, calculator, and government schemes.',
      answerMarathi: 'वरच्या उजव्या कोपर्यातील रजिस्टर बटणावर क्लिक करा. तुमचे नाव, ईमेल, मोबाईल नंबर भरा आणि पासवर्ड तयार करा. नोंदणीनंतर, तुम्ही सर्व सुविधा वापरू शकता.',
      category: 'Account'
    },
    {
      id: 2,
      question: 'How to use the Crop Calculator?',
      questionMarathi: 'क्रॉप कॅल्क्युलेटर कसा वापरायचा?',
      answer: 'Go to Calculator page, select your crop (Sugarcane/Grapes), enter land area, investment amount (optional), yield (optional), and selling price (optional). The calculator will automatically show your profit/loss with detailed breakdown.',
      answerMarathi: 'कॅल्क्युलेटर पेजवर जा, तुमचे पीक निवडा (उस/द्राक्षे), जमीन क्षेत्र, गुंतवणूक रक्कम (पर्यायी), उत्पादन (पर्यायी), आणि विक्री किंमत (पर्यायी) भरा. कॅल्क्युलेटर आपोआप तुमचा नफा/तोटा दाखवेल.',
      category: 'Calculator'
    },
    {
      id: 3,
      question: 'Are the crop guides free?',
      questionMarathi: 'पीक मार्गदर्शक मोफत आहेत का?',
      answer: 'Yes, all crop guides and educational content on Smart Krishi are completely free for all farmers. We believe in empowering farmers with knowledge.',
      answerMarathi: 'होय, स्मार्ट कृषी वरील सर्व पीक मार्गदर्शक आणि शैक्षणिक सामग्री सर्व शेतकऱ्यांसाठी पूर्णपणे मोफत आहे.',
      category: 'Content'
    },
    {
      id: 4,
      question: 'How can I apply for government schemes?',
      questionMarathi: 'सरकारी योजनांसाठी अर्ज कसा करायचा?',
      answer: 'Visit the Schemes page, find the scheme you want to apply for, and click on the "Apply Now" link. This will take you to the official government website where you can complete your application.',
      answerMarathi: 'योजना पेजवर जा, तुम्हाला ज्या योजनेसाठी अर्ज करायचा आहे ती शोधा, आणि "अर्ज करा" लिंकवर क्लिक करा. यामुळे तुम्ही अर्ज करू शकता अशा अधिकृत सरकारी वेबसाइटवर जाल.',
      category: 'Schemes'
    },
    {
      id: 5,
      question: 'Is my data safe on Smart Krishi?',
      questionMarathi: 'स्मार्ट कृषी वर माझा डेटा सुरक्षित आहे का?',
      answer: 'Yes, we take data privacy seriously. Your personal information is encrypted and never shared with third parties. We comply with all data protection regulations.',
      answerMarathi: 'होय, आम्ही डेटा गोपनीयता गांभीर्याने घेतो. तुमची वैयक्तिक माहिती एन्क्रिप्ट केली जाते आणि तृतीय पक्षांशी कधीही सामायिक केली जात नाही.',
      category: 'Security'
    },
    {
      id: 6,
      question: 'How do I contact support?',
      questionMarathi: 'मी समर्थनाशी संपर्क कसा साधू?',
      answer: 'You can call our helpline (1800-XXX-XXXX), email us at support@smartkrishi.com, or use the live chat feature available on every page.',
      answerMarathi: 'तुम्ही आमच्या हेल्पलाइन (1800-XXX-XXXX) वर कॉल करू शकता, आम्हाला support@smartkrishi.com वर ईमेल करू शकता, किंवा लाइव्ह चॅट वैशिष्ट्य वापरू शकता.',
      category: 'Support'
    }
  ];

  const categories = ['All', 'Account', 'Calculator', 'Content', 'Schemes', 'Security', 'Support'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFaqs = faqs.filter(faq => 
    selectedCategory === 'All' || faq.category === selectedCategory
  );

  return (
    <div className="py-12">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-block"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <HelpCircle size={40} className="text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold text-green-800 mb-2">Help & Support</h1>
          <p className="text-xl text-gray-600">मदत व समर्थन - We're here to help you succeed</p>
        </AnimatedSection>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Phone, title: 'Call Us', value: '1800-XXX-XXXX', subtitle: 'Mon-Sat, 9 AM - 6 PM', color: 'from-green-500 to-green-600' },
            { icon: Mail, title: 'Email Us', value: 'support@smartkrishi.com', subtitle: 'Response within 24 hours', color: 'from-blue-500 to-blue-600' },
            { icon: MessageCircle, title: 'Live Chat', value: 'Chat with our team', subtitle: 'Available 24/7', color: 'from-purple-500 to-purple-600' }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition-all"
            >
              <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <item.icon size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-green-600 font-semibold">{item.value}</p>
              <p className="text-sm text-gray-500 mt-2">{item.subtitle}</p>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-amber-50 px-6 py-5 border-b">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="text-green-600" size={24} />
                <h2 className="text-2xl font-semibold text-green-800">Frequently Asked Questions</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="divide-y">
            <AnimatePresence>
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 hover:bg-gray-50 transition"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <div>
                      <span className="text-sm text-green-600 font-semibold">{faq.category}</span>
                      <h3 className="font-semibold text-gray-800 mt-1">{faq.question}</h3>
                    </div>
                    {openFaq === faq.id ? (
                      <ChevronUp className="text-green-600 flex-shrink-0" size={20} />
                    ) : (
                      <ChevronDown className="text-green-600 flex-shrink-0" size={20} />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-3 pl-4 border-l-4 border-green-200 overflow-hidden"
                      >
                        <p className="text-gray-600">{faq.answer}</p>
                        <p className="text-gray-500 text-sm mt-2">{faq.answerMarathi}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Helpful Resources */}
        <AnimatedSection delay={0.3}>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: 'Video Tutorials', desc: 'Watch step-by-step guides', link: '/videos', color: 'from-red-500 to-red-600' },
              { icon: Users, title: 'Farmer Community', desc: 'Connect with other farmers', link: '#', color: 'from-blue-500 to-blue-600' },
              { icon: Clock, title: 'Support Hours', desc: '24/7 customer support', link: '#', color: 'from-green-500 to-green-600' }
            ].map((item, idx) => (
              <motion.a
                key={idx}
                href={item.link}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-r ${item.color} rounded-xl p-6 text-white text-center shadow-lg hover:shadow-xl transition-all block`}
              >
                <item.icon size={40} className="mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="opacity-90">{item.desc}</p>
              </motion.a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Help;