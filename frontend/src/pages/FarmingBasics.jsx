import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mountain, Droplet, Sprout, Tractor, Bug,
  Calendar, Package, ChevronRight, Award, AlertCircle,
  CheckCircle, Leaf, BookOpen, Search, Shield,
  MapPin, CloudRain, Sun, Thermometer, Scissors, TrendingUp,
  FlaskConical
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';
import { farmingBasicsContent } from '../data/farmingBasicsContent';
import TranslatedText from '../components/common/TranslatedText';

const FarmingBasics = () => {
  const [activeCategory, setActiveCategory] = useState('soil');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);
  const { language } = useLanguage();

  // Category Images - Using working Unsplash images
  const categories = [
    { id: 'soil', name: 'Soil Science', nameMarathi: 'मृदा विज्ञान', icon: Mountain, color: 'from-amber-500 to-amber-600', image: '/images/soil_prep.png' },
    { id: 'water', name: 'Water Management', nameMarathi: 'जल व्यवस्थापन', icon: Droplet, color: 'from-blue-500 to-blue-600', image: '/images/water_irrigation.png' },
    { id: 'crops', name: 'Crop Science', nameMarathi: 'पीक विज्ञान', icon: Sprout, color: 'from-green-500 to-green-600', image: '/images/hero_bg.png' },
    { id: 'equipment', name: 'Farm Equipment', nameMarathi: 'शेती उपकरणे', icon: Tractor, color: 'from-orange-500 to-orange-600', image: '/images/tractor_equipment.png' },
    { id: 'pests', name: 'Pest & Disease', nameMarathi: 'कीड व रोग', icon: Bug, color: 'from-red-500 to-red-600', image: '/images/pest_disease.png' },
    { id: 'fertilizers', name: 'Fertilizers', nameMarathi: 'खते', icon: FlaskConical, color: 'from-purple-500 to-purple-600', image: '/images/fertilizer_bag.png' },
    { id: 'seasons', name: 'Season Planning', nameMarathi: 'हंगाम नियोजन', icon: Calendar, color: 'from-cyan-500 to-cyan-600', image: '/images/season_calendar.png' },
    { id: 'postharvest', name: 'Post-Harvest', nameMarathi: 'कापणी उपरांत', icon: Package, color: 'from-teal-500 to-teal-600', image: '/images/harvest_boxes.png' }
  ];

  // Load active content based on language
  const currentContent = farmingBasicsContent[activeCategory]?.[language] || farmingBasicsContent[activeCategory]?.['en'];

  const currentCategory = categories.find(c => c.id === activeCategory);
  const IconComponent = currentCategory?.icon || BookOpen;
  const categoryColor = currentCategory?.color || 'from-green-500 to-green-600';
  const categoryImage = currentCategory?.image;

  const filteredSections = currentContent.sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Premium Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden rounded-b-[3rem] lg:rounded-b-[5rem] shadow-2xl mb-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/hero_bg.png")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/95 via-green-900/80 to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-400 text-sm font-black tracking-widest mb-8"
            >
              <BookOpen size={18} fill="currentColor" />
              <TranslatedText>Knowledge Hub</TranslatedText>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight"
            >
              <TranslatedText>Master the Art of</TranslatedText> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-amber-300">
                <TranslatedText>Modern Farming</TranslatedText>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-300 mb-10 max-w-2xl font-medium"
            >
              <TranslatedText>Your complete visual guide to agricultural excellence. Explore best practices, from soil preparation to advanced harvest techniques.</TranslatedText>
            </motion.p>

            {/* Search Bar in Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-xl group"
            >
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-400 transition-colors" size={22} />
              <input
                type="text"
                placeholder={language === 'mr' ? 'शेतीचे विषय शोधा...' : "Search farming topics..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white/20 transition-all font-medium shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-custom">
        {/* Premium Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 mb-16">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative overflow-hidden rounded-[3rem] transition-all duration-300 group ${
                  isActive ? 'ring-4 ring-green-500 shadow-2xl scale-105 z-10' : 'shadow-md hover:shadow-xl'
                }`}
              >
                <div className="aspect-square relative">
                  <img
                    src={cat.image}
                    alt={language === 'mr' ? cat.nameMarathi : cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 transition-opacity duration-300 ${isActive ? 'bg-gradient-to-t from-green-900/90 via-green-900/40 to-transparent' : 'bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent hover:from-green-900/80'
                    }`} />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 backdrop-blur-md transition-colors ${isActive ? 'bg-green-500/30 border border-green-400/50' : 'bg-white/10 border border-white/20'
                      }`}>
                      <CatIcon size={18} className={`transition-colors ${isActive ? 'text-green-300' : 'text-white'
                        }`} />
                    </div>
                    <p className={`text-xs font-bold transition-colors leading-tight ${isActive ? 'text-white' : 'text-white/90'
                      }`}>
                      <TranslatedText>{cat.name}</TranslatedText>
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="bg-white rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100"
          >
            {/* Elegant Category Header */}
            <div className="relative h-56 lg:h-64 overflow-hidden">
              <img
                src={categoryImage}
                alt={currentContent.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${categoryColor} opacity-90`} />
              <div className="absolute inset-0 flex items-center p-8 lg:p-12 text-white">
                <div className="flex items-center gap-6">
                  <div className="bg-white/20 backdrop-blur-md p-5 rounded-[2rem] border border-white/30 shadow-xl">
                    <IconComponent size={48} className="text-white drop-shadow-md" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black drop-shadow-sm mb-2">{currentContent.title}</h2>
                    <p className="text-white/90 text-lg lg:text-xl max-w-2xl font-medium leading-relaxed drop-shadow-sm">{currentContent.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="divide-y divide-gray-100/80">
              {filteredSections.map((section, idx) => {
                const isExpanded = expandedSection === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="overflow-hidden bg-white"
                  >
                    <button
                      onClick={() => setExpandedSection(isExpanded ? null : idx)}
                      className={`w-full px-8 py-6 flex justify-between items-center transition-colors duration-300 ${isExpanded ? 'bg-gray-50/80' : 'hover:bg-gray-50/50'
                        }`}
                    >
                      <div className="flex items-center gap-5">
                        <div className={`p-4 rounded-2xl transition-colors duration-300 shadow-sm border border-gray-100 ${isExpanded ? `bg-gradient-to-br ${categoryColor} text-white` : 'bg-white text-gray-500 group-hover:text-gray-800'
                          }`}>
                          {section.icon ? React.createElement(section.icon, { size: 24 }) : <BookOpen size={24} />}
                        </div>
                        <span className={`text-xl lg:text-2xl font-bold tracking-tight transition-colors ${isExpanded ? 'text-gray-900' : 'text-gray-700'
                          }`}>{section.title}</span>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-gray-200/50 text-gray-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                        >
                          <ChevronRight size={20} />
                        </motion.div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-8 pb-8 pt-2"
                        >
                          <div className="bg-gray-50/50 rounded-3xl p-6 lg:p-8 border border-gray-100">
                            {section.image && (
                              <div className="mb-6 rounded-[2rem] overflow-hidden shadow-lg border border-gray-200/50 relative group">
                                <img
                                  src={section.image}
                                  alt={section.title}
                                  className="w-full h-56 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                              </div>
                            )}
                            <ul className="space-y-4">
                              {section.items.map((item, i) => (
                                typeof item === 'string' ? (
                                  <li key={i} className="flex items-start gap-3 text-gray-700 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-base font-medium leading-relaxed">{item}</span>
                                  </li>
                                ) : (
                                  <li key={i} className="flex flex-col md:flex-row gap-5 items-start bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                                    {item.image && (
                                      <div className="shrink-0 w-full md:w-40 h-28 rounded-xl overflow-hidden shadow-sm">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                      </div>
                                    )}
                                    <div>
                                      <h4 className="font-bold text-lg text-gray-900 mb-2">{item.name}</h4>
                                      <p className="text-base text-gray-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                  </li>
                                )
                              ))}
                            </ul>
                            {section.tips && (
                              <div className="mt-6 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200/50 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                  <Award size={100} className="text-amber-500" />
                                </div>
                                <h4 className="font-bold text-amber-900 mb-4 flex items-center gap-2 text-lg relative z-10">
                                  <div className="p-2 bg-amber-100 rounded-lg">
                                    <Award size={20} className="text-amber-600" />
                                  </div>
                                  <TranslatedText>Pro Tips for Farmers</TranslatedText>
                                </h4>
                                <ul className="space-y-2 relative z-10">
                                  {section.tips.map((tip, ti) => (
                                    <li key={ti} className="flex items-start gap-3 text-amber-800 font-medium">
                                      <ChevronRight size={18} className="mt-0.5 text-amber-500 flex-shrink-0" />
                                      <span className="leading-relaxed">{tip}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Premium Footer Tips */}
        <AnimatedSection delay={0.3}>
          <div className="mt-16 bg-gradient-to-r from-green-800 to-[#0f172a] rounded-[3rem] p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
              <Sprout size={200} />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/20 shrink-0">
                <Shield size={48} className="text-green-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-black mb-6 tracking-tight"><TranslatedText>Farmer's Golden Rules</TranslatedText></h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-base font-medium">
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <CheckCircle size={18} className="text-green-400 shrink-0" />
                    <span><TranslatedText>Test soil before every planting season</TranslatedText></span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <CheckCircle size={18} className="text-green-400 shrink-0" />
                    <span><TranslatedText>Water based on crop need, not calendar</TranslatedText></span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <CheckCircle size={18} className="text-green-400 shrink-0" />
                    <span><TranslatedText>Monitor fields daily for pests</TranslatedText></span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <CheckCircle size={18} className="text-green-400 shrink-0" />
                    <span><TranslatedText>Rotate crops to maintain soil health</TranslatedText></span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <CheckCircle size={18} className="text-green-400 shrink-0" />
                    <span><TranslatedText>Keep learning new farming techniques</TranslatedText></span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <CheckCircle size={18} className="text-green-400 shrink-0" />
                    <span><TranslatedText>Connect with local agricultural officers</TranslatedText></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default FarmingBasics;