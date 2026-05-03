import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Calendar, 
  ExternalLink, 
  CheckCircle, 
  Search, 
  Filter, 
  Award, 
  TrendingUp, 
  Users,
  ChevronRight,
  Info,
  ShieldCheck,
  Zap,
  Droplets,
  ArrowRight
} from 'lucide-react';
import TranslatedText from '../components/common/TranslatedText';
import { useLanguage } from '../context/LanguageContext';

const Schemes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [expandedScheme, setExpandedScheme] = useState(null);
  const { language, translateInstant } = useLanguage();

  const schemes = [
    {
      id: 1,
      name: 'PM-KISAN Samman Nidhi',
      nameMarathi: 'पीएम-किसान सन्मान निधी',
      category: 'Central',
      description: 'The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central sector scheme providing direct income support. It aims to supplement the financial needs of landholding farmers to procure various inputs to ensure proper crop health and appropriate yields.',
      eligibility: 'All landholding farmer families across the country with cultivable land in their names.',
      benefits: 'Direct financial benefit of ₹6,000 per year in three installments of ₹2,000.',
      deadline: 'Rolling basis (Apply anytime)',
      applyLink: 'https://pmkisan.gov.in',
      emoji: '💰',
      color: 'from-blue-600 to-indigo-600',
      icon: Award
    },
    {
      id: 2,
      name: 'Namoji Shetkari Sanman Nidhi',
      nameMarathi: 'नमो शेतकरी सन्मान निधी योजना',
      category: 'State',
      description: 'Maharashtra state government\'s additional income support scheme for farmers, matching the PM-KISAN amount to double the benefit.',
      eligibility: 'All farmers registered and eligible for PM-KISAN in Maharashtra.',
      benefits: 'Additional ₹6,000 per year from the state government, making it total ₹12,000 including PM-KISAN.',
      deadline: 'Automatic for PM-KISAN beneficiaries',
      applyLink: 'https://mahadbt.maharashtra.gov.in',
      emoji: '🤝',
      color: 'from-orange-600 to-red-600',
      icon: Users
    },
    {
      id: 3,
      name: 'Kusum Yojana (Solar Pumps)',
      nameMarathi: 'कुसुम योजना (सौर कृषी पंप)',
      category: 'Central',
      description: 'PM-KUSUM scheme provides solar pumps to farmers for irrigation, reducing dependency on diesel pumps and providing day-time reliable power.',
      eligibility: 'Farmers with verified land records and a water source (well/borewell).',
      benefits: '90% to 95% subsidy on solar pump sets. Only 5-10% contribution from the farmer.',
      deadline: 'Limited quotas released periodically',
      applyLink: 'https://www.mahaurja.com',
      emoji: '☀️',
      color: 'from-yellow-500 to-amber-600',
      icon: Zap
    },
    {
      id: 4,
      name: 'Magel Tyala Shetale',
      nameMarathi: 'मागेल त्याला शेततळे योजना',
      category: 'State',
      description: 'A scheme to provide farm ponds to every farmer who demands one, ensuring water security for crops during dry spells.',
      eligibility: 'Minimum 0.60 hectare land ownership in Maharashtra.',
      benefits: 'Direct subsidy of ₹50,000 for constructing a farm pond of standard size.',
      deadline: 'Open application via MahaDBT',
      applyLink: 'https://mahadbt.maharashtra.gov.in',
      emoji: '🌊',
      color: 'from-cyan-600 to-blue-700',
      icon: Droplets
    },
    {
      id: 5,
      name: 'PM Fasal Bima Yojana',
      nameMarathi: 'प्रधानमंत्री पीक विमा योजना',
      category: 'Central',
      description: 'Comprehensive insurance cover against crop failure due to natural calamities, pests, and diseases.',
      eligibility: 'All farmers including sharecroppers and tenant farmers growing notified crops.',
      benefits: 'Extremely low premium: 2% for Kharif, 1.5% for Rabi. Claims paid directly to bank accounts.',
      deadline: '15 days before sowing season ends',
      applyLink: 'https://pmfby.gov.in',
      emoji: '🛡️',
      color: 'from-emerald-600 to-green-700',
      icon: ShieldCheck
    },
    {
      id: 6,
      name: 'Soil Health Card',
      nameMarathi: 'मृदा आरोग्य कार्ड योजना',
      category: 'Central',
      description: 'Provides information to farmers on the nutrient status of their soil along with recommendations on appropriate dosage of fertilizers.',
      eligibility: 'All farmers in India.',
      benefits: 'Detailed report on 12 critical soil parameters. Helps cut fertilizer costs by 10-25%.',
      deadline: 'Ongoing',
      applyLink: 'https://soilhealth.dac.gov.in',
      emoji: '🌱',
      color: 'from-green-600 to-emerald-700',
      icon: TrendingUp
    },
    {
      id: 7,
      name: 'Gopinath Munde Apghat Vima',
      nameMarathi: 'गोपीनाथ मुंडे शेतकरी अपघात विमा',
      category: 'State',
      description: 'Insurance cover for farmers in case of accidental death or disability, providing financial security to the family.',
      eligibility: 'All farmers in Maharashtra aged between 10 to 75 years.',
      benefits: '₹2 Lakh for death or double limb loss; ₹1 Lakh for single limb loss.',
      deadline: 'Submit claim within 90 days of accident',
      applyLink: 'https://krishi.maharashtra.gov.in',
      emoji: '🏥',
      color: 'from-rose-600 to-pink-700',
      icon: Info
    },
    {
      id: 8,
      name: 'Interest Subsidy Scheme',
      nameMarathi: 'डॉ. पंजाबराव देशमुख व्याज सवलत',
      category: 'State',
      description: 'Interest subsidy on short-term crop loans for farmers who repay their loans on time.',
      eligibility: 'Farmers taking crop loans from District Central Co-op Banks or Nationalized Banks.',
      benefits: '0% interest on loans up to ₹3 Lakh for timely repayment.',
      deadline: 'Bank-specific repayment dates',
      applyLink: 'https://mahadbt.maharashtra.gov.in',
      emoji: '📉',
      color: 'from-violet-600 to-purple-700',
      icon: FileText
    }
  ];

  const categories = ['all', 'Central', 'State'];

  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      const name = language === 'mr' ? scheme.nameMarathi : scheme.name;
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterCategory === 'all' || scheme.category === filterCategory;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterCategory, language]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Premium Hero Section */}
      <div className="relative pt-24 pb-32 lg:pt-32 lg:pb-48 overflow-hidden rounded-b-[4rem] shadow-2xl mb-12">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/harvest_boxes.png")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/95 via-amber-900/80 to-transparent mix-blend-multiply opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80" />
        </div>
        
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-sm font-black tracking-widest mb-8 shadow-2xl"
          >
            <Award size={18} />
            <TranslatedText>Government Schemes</TranslatedText>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]"
          >
            <TranslatedText>Financial Support</TranslatedText> <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300 drop-shadow-sm">
              <TranslatedText>For Every Farmer</TranslatedText>
            </span>
          </motion.h1>

          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-amber-400 transition-colors" size={24} />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'mr' ? "योजना शोधा..." : "Search for schemes..."}
              className="w-full bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-3xl py-6 pl-16 pr-8 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-amber-400 outline-none transition-all text-xl font-bold"
            />
          </div>
        </div>
      </div>

      <div className="container-custom max-w-7xl mx-auto -mt-16 relative z-20">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${
                filterCategory === cat 
                  ? 'bg-gray-900 text-white shadow-2xl scale-105' 
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
              }`}
            >
              <TranslatedText>{cat === 'all' ? 'All Schemes' : cat + ' Schemes'}</TranslatedText>
            </button>
          ))}
        </div>

        {/* Schemes Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredSchemes.map((scheme) => (
              <motion.div
                key={scheme.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`group bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-[0_8px_40px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all duration-500 ${
                  expandedScheme === scheme.id ? 'ring-2 ring-gray-900' : ''
                }`}
              >
                <div 
                  className="cursor-pointer p-8 lg:p-10"
                  onClick={() => setExpandedScheme(expandedScheme === scheme.id ? null : scheme.id)}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-5 rounded-[2rem] bg-gradient-to-br ${scheme.color} text-white shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                      {React.createElement(scheme.icon, { size: 32 })}
                    </div>
                    <div className="px-4 py-2 bg-gray-50 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400 border border-gray-100">
                      {scheme.category}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {language === 'mr' ? scheme.nameMarathi : scheme.name}
                  </h3>
                  
                  <p className="text-gray-500 font-bold leading-relaxed line-clamp-2">
                    <TranslatedText>{scheme.description}</TranslatedText>
                  </p>

                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{scheme.emoji}</span>
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                        <TranslatedText>Click for details</TranslatedText>
                      </span>
                    </div>
                    <ChevronRight 
                      className={`text-gray-300 transition-transform duration-500 ${expandedScheme === scheme.id ? 'rotate-90 text-gray-900' : ''}`} 
                      size={24} 
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {expandedScheme === scheme.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 lg:px-10 pb-10 border-t border-gray-50 bg-gray-50/50"
                    >
                      <div className="pt-8 space-y-8">
                        <div className="grid sm:grid-cols-2 gap-8">
                          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                              <CheckCircle size={14} className="text-green-500" />
                              <TranslatedText>Eligibility</TranslatedText>
                            </h4>
                            <p className="text-sm font-bold text-gray-700 leading-relaxed">
                              <TranslatedText>{scheme.eligibility}</TranslatedText>
                            </p>
                          </div>
                          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                              <Calendar size={14} className="text-blue-500" />
                              <TranslatedText>Application Deadline</TranslatedText>
                            </h4>
                            <p className="text-sm font-bold text-gray-700 leading-relaxed">
                              <TranslatedText>{scheme.deadline}</TranslatedText>
                            </p>
                          </div>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Zap size={14} className="text-amber-500" />
                            <TranslatedText>Benefits & Financial Aid</TranslatedText>
                          </h4>
                          <p className="text-lg font-black text-gray-900 leading-relaxed">
                            <TranslatedText>{scheme.benefits}</TranslatedText>
                          </p>
                        </div>

                        <a 
                          href={scheme.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full py-6 rounded-[2rem] bg-gradient-to-r ${scheme.color} text-white font-black text-xl flex items-center justify-center gap-4 shadow-2xl transition-all hover:scale-[1.02] active:scale-95`}
                        >
                          <TranslatedText>Apply Now</TranslatedText>
                          <ArrowRight size={24} />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Info Banner */}
        <div className="mt-24 p-12 bg-gray-900 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Info size={200} />
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
                <TranslatedText>Need help with</TranslatedText> <br/>
                <span className="text-amber-400"><TranslatedText>Documentation?</TranslatedText></span>
              </h2>
              <p className="text-xl text-white/70 font-bold mb-8 max-w-lg">
                <TranslatedText>Applying for government schemes requires verified documents like 7/12 extract, Aadhar Card, and Bank Passbook. Visit your nearest Maha e-Seva Kendra for assistance.</TranslatedText>
              </p>
              <button className="flex items-center gap-4 px-8 py-4 bg-white text-gray-900 rounded-2xl font-black hover:bg-amber-400 transition-colors">
                <TranslatedText>Find Nearest Kendra</TranslatedText>
                <ArrowRight size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Total Beneficiaries', value: '1.2Cr+', color: 'text-amber-400' },
                { label: 'Funds Disbursed', value: '₹500Cr+', color: 'text-blue-400' },
                { label: 'Active Schemes', value: '45+', color: 'text-green-400' },
                { label: 'Success Rate', value: '98%', color: 'text-purple-400' }
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                  <p className={`text-3xl font-black ${stat.color} mb-1`}>{stat.value}</p>
                  <p className="text-xs font-black uppercase tracking-widest text-white/50"><TranslatedText>{stat.label}</TranslatedText></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schemes;