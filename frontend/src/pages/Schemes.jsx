import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Calendar, ExternalLink, CheckCircle, Search, Filter, Award, TrendingUp, Users } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Schemes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedScheme, setSelectedScheme] = useState(null);

  const schemes = [
    {
      id: 1,
      name: 'PM-KISAN Samman Nidhi',
      nameMarathi: 'पीएम-किसान सन्मान निधी',
      category: 'Central',
      description: 'Income support of ₹6,000 per year to small and marginal farmers',
      eligibility: 'All landholding farmers with up to 2 hectares',
      benefits: '₹6,000 per year in 3 equal installments',
      deadline: 'Rolling basis',
      applyLink: 'https://pmkisan.gov.in',
      emoji: '💰',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      name: 'Pradhan Mantri Fasal Bima Yojana',
      nameMarathi: 'प्रधानमंत्री पीक विमा योजना',
      category: 'Central',
      description: 'Crop insurance to protect against crop loss',
      eligibility: 'All farmers growing notified crops',
      benefits: 'Low premium (1.5-2% of sum insured)',
      deadline: 'Before sowing season',
      applyLink: 'https://pmfby.gov.in',
      emoji: '🛡️',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      name: 'Soil Health Card Scheme',
      nameMarathi: 'मृदा आरोग्य कार्ड योजना',
      category: 'Central',
      description: 'Provides soil health cards to farmers',
      eligibility: 'All farmers',
      benefits: 'Free soil testing and recommendations',
      deadline: 'Ongoing',
      applyLink: 'https://soilhealth.dac.gov.in',
      emoji: '🌱',
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 4,
      name: 'Maharashtra Krishi Samrudhi Yojana',
      nameMarathi: 'महाराष्ट्र कृषी समृद्धी योजना',
      category: 'State',
      description: 'Farm mechanization and equipment subsidy',
      eligibility: 'Small and marginal farmers of Maharashtra',
      benefits: '50% subsidy on farm equipment up to ₹2 lakhs',
      deadline: 'March 31, 2026',
      applyLink: 'https://maharashtra.gov.in',
      emoji: '🚜',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 5,
      name: 'Micro Irrigation Fund',
      nameMarathi: 'सूक्ष्म सिंचन निधी',
      category: 'Central',
      description: 'Promotes drip and sprinkler irrigation',
      eligibility: 'All farmers',
      benefits: 'Subsidy up to 80% for small farmers',
      deadline: 'Ongoing',
      applyLink: 'https://pmksy.gov.in',
      emoji: '💧',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 6,
      name: 'National Agriculture Market (eNAM)',
      nameMarathi: 'राष्ट्रीय कृषी बाजार (ई-नाम)',
      category: 'Central',
      description: 'Online trading platform for agricultural produce',
      eligibility: 'Farmers and traders',
      benefits: 'Better price discovery and reduced commission',
      deadline: 'Ongoing',
      applyLink: 'https://enam.gov.in',
      emoji: '📱',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const categories = ['all', 'Central', 'State'];

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scheme.nameMarathi.includes(searchTerm);
    const matchesFilter = filterCategory === 'all' || scheme.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

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
              <Award size={40} className="text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold text-green-800 mb-2">Government Schemes</h1>
          <p className="text-xl text-gray-600">सरकारी योजना - Financial assistance for farmers</p>
        </AnimatedSection>

        {/* Search and Filter */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search schemes by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                    filterCategory === cat
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? 'All Schemes' : cat}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Schemes Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredSchemes.map((scheme, index) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedScheme(selectedScheme === scheme.id ? null : scheme.id)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-2xl"
              >
                <div className={`bg-gradient-to-r ${scheme.color} p-6 text-white`}>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{scheme.emoji}</span>
                    <div>
                      <h3 className="text-xl font-bold">{scheme.name}</h3>
                      <p className="opacity-90 text-sm">{scheme.nameMarathi}</p>
                    </div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {selectedScheme === scheme.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="p-6 border-t"
                    >
                      <p className="text-gray-700 mb-4">{scheme.description}</p>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle size={18} className="text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm">Eligibility:</p>
                            <p className="text-sm text-gray-600">{scheme.eligibility}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <FileText size={18} className="text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm">Benefits:</p>
                            <p className="text-sm text-gray-600">{scheme.benefits}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar size={18} className="text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm">Application Deadline:</p>
                            <p className="text-sm text-gray-600">{scheme.deadline}</p>
                          </div>
                        </div>
                      </div>
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        href={scheme.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:shadow-md transition"
                      >
                        Apply Now <ExternalLink size={16} />
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {selectedScheme !== scheme.id && (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    Click to view details
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Stats Section */}
        <AnimatedSection delay={0.3}>
          <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-amber-800">₹6,000</div>
                <div className="text-gray-600 mt-1">Annual PM-KISAN Benefit</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-800">80%</div>
                <div className="text-gray-600 mt-1">Micro Irrigation Subsidy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-800">1.5%</div>
                <div className="text-gray-600 mt-1">Crop Insurance Premium</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Schemes;