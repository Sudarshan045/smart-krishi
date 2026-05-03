import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator as CalcIcon, 
  TrendingUp, 
  ArrowRight, 
  Award, 
  MapPin, 
  Sun, 
  Sprout, 
  Info,
  ChevronRight,
  Package,
  ShoppingCart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import TranslatedText from '../components/common/TranslatedText';
import { useLanguage } from '../context/LanguageContext';
import { regionCropData, districts, seasons } from '../data/regionCropData';
import { marketplaceProducts } from '../data/marketplaceProducts';

const SmartAdvisor = () => {
  const { language, translateInstant } = useLanguage();
  
  // Tab State
  const [activeTab, setActiveTab] = useState('recommendation'); // 'recommendation' or 'calculator'

  // Recommendation State
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);

  // Agri Calculator State
  const [calcData, setCalcData] = useState({
    productId: '',
    area: '1',
    unit: 'acre'
  });
  const [showCalcResults, setShowCalcResults] = useState(false);

  const selectedProduct = useMemo(() => {
    return marketplaceProducts.find(p => p.id === parseInt(calcData.productId));
  }, [calcData.productId]);

  const calculationResults = useMemo(() => {
    if (!selectedProduct || !calcData.area || !selectedProduct.dosage) return null;
    const area = parseFloat(calcData.area);
    const areaInAcres = calcData.unit === 'hectare' ? area * 2.47 : area;
    const totalAmount = selectedProduct.dosage * areaInAcres;
    const totalCost = selectedProduct.price * totalAmount;
    return { totalAmount, totalCost, unit: selectedProduct.unit };
  }, [selectedProduct, calcData]);

  const recommendedCrops = useMemo(() => {
    return regionCropData[selectedDistrict]?.[selectedSeason] || [];
  }, [selectedDistrict, selectedSeason]);

  const handleCalculate = () => {
    if (calcData.productId && calcData.area) {
      setShowCalcResults(true);
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Premium Hero Section */}
      <div className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 overflow-hidden rounded-b-[3rem] shadow-2xl mb-12">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/hero_bg.png")' }}
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
            <Award size={18} />
            <TranslatedText>SMART ADVISORY HUB v3.0</TranslatedText>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]"
          >
            <TranslatedText>Plan Your Success</TranslatedText><br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300 drop-shadow-sm">
              <TranslatedText>Smarter & Better</TranslatedText>
            </span>
          </motion.h1>

          {/* Tab Switcher */}
          <div className="inline-flex p-1.5 bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl relative z-10 shadow-2xl">
            <button
              onClick={() => setActiveTab('recommendation')}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-500 ${
                activeTab === 'recommendation' 
                  ? 'bg-white text-gray-900 shadow-xl scale-100' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Sprout size={18} />
              <TranslatedText>Crop Recommendation</TranslatedText>
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-500 ${
                activeTab === 'calculator' 
                  ? 'bg-white text-gray-900 shadow-xl scale-100' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <CalcIcon size={18} />
              <TranslatedText>Agri Calculator</TranslatedText>
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom max-w-6xl mx-auto -mt-16 relative z-20">
        <AnimatePresence mode="wait">
          {activeTab === 'recommendation' ? (
            <motion.div
              key="recommendation"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Recommendation Content */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* District Selection */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-gray-100 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-[100%] -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700" />
                  <label className="flex items-center gap-4 text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8 relative z-10">
                    <div className="p-3 bg-green-100 text-green-600 rounded-2xl shadow-sm">
                      <MapPin size={24} />
                    </div>
                    <TranslatedText>District</TranslatedText>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10">
                    {districts.map(d => (
                      <button
                        key={d}
                        onClick={() => setSelectedDistrict(d)}
                        className={`px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                          selectedDistrict === d 
                            ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-xl shadow-green-500/20 scale-[1.05]' 
                            : 'bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-green-700'
                        }`}
                      >
                        <TranslatedText>{d}</TranslatedText>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Season Selection */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-gray-100 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-bl-[100%] -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700" />
                  <label className="flex items-center gap-4 text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8 relative z-10">
                    <div className="p-3 bg-yellow-100 text-yellow-600 rounded-2xl shadow-sm">
                      <Sun size={24} />
                    </div>
                    <TranslatedText>Season</TranslatedText>
                  </label>
                  <div className="flex gap-4 relative z-10">
                    {seasons.map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedSeason(s)}
                        className={`flex-1 py-5 rounded-2xl font-black text-xl transition-all duration-300 ${
                          selectedSeason === s 
                            ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-xl shadow-yellow-500/20 scale-[1.05]' 
                            : 'bg-gray-50 text-gray-600 hover:bg-yellow-50'
                        }`}
                      >
                        <TranslatedText>{s}</TranslatedText>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-10">
                <h2 className="text-4xl font-black text-gray-900 flex items-center gap-4 mb-10 px-4">
                  <div className="w-2 h-12 bg-green-500 rounded-full" />
                  <TranslatedText>Recommended Crops</TranslatedText>
                </h2>
                
                <div className="grid md:grid-cols-2 gap-10">
                  {recommendedCrops.map((crop, idx) => (
                    <motion.div
                      key={crop.name.en}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group bg-white rounded-[3rem] p-10 shadow-[0_8px_40px_rgb(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-12 text-gray-100 group-hover:text-green-50 transition-colors">
                        <Sprout size={160} strokeWidth={1} />
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                          <h3 className="text-4xl font-black text-gray-900 tracking-tight">{crop.name[language]}</h3>
                          <div className="px-5 py-2 bg-green-50 text-green-700 rounded-full font-black text-sm border border-green-100">
                            {crop.suitability}% <TranslatedText>Match</TranslatedText>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-10">
                          <div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-100">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2"><TranslatedText>Yield Potential</TranslatedText></span>
                            <span className="text-lg font-bold text-gray-800">{translateInstant(crop.yield)}</span>
                          </div>
                          <div className="bg-green-50/30 p-5 rounded-3xl border border-green-100/50">
                            <span className="text-[10px] font-black text-green-600 uppercase tracking-widest block mb-2"><TranslatedText>Estimated Profit</TranslatedText></span>
                            <span className="text-lg font-bold text-green-700">{translateInstant(crop.profit)}</span>
                          </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-3 py-5 bg-gray-900 text-white rounded-2xl font-black hover:bg-black hover:shadow-xl transition-all group/btn">
                          <TranslatedText>View Cultivation Guide</TranslatedText>
                          <ChevronRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Agri Calculator Content */}
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Form */}
                <div className="bg-white rounded-[2.5rem] p-10 lg:p-12 shadow-[0_30px_60px_rgb(0,0,0,0.08)] border border-gray-100">
                  <h2 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-4">
                    <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
                      <CalcIcon size={28} />
                    </div>
                    <TranslatedText>Agri Calculator</TranslatedText>
                  </h2>

                  <div className="space-y-8">
                    {/* Product Selection */}
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4"><TranslatedText>Select Product</TranslatedText></label>
                      <select 
                        value={calcData.productId}
                        onChange={(e) => {
                          setCalcData({ ...calcData, productId: e.target.value });
                          setShowCalcResults(false);
                        }}
                        className="w-full px-6 py-5 rounded-2xl border-2 border-gray-100 focus:border-green-500 focus:ring-0 bg-gray-50 font-bold text-gray-800 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">-- {language === 'en' ? 'Select a product' : 'उत्पादन निवडा'} --</option>
                        {marketplaceProducts.filter(p => p.dosage).map(p => (
                          <option key={p.id} value={p.id}>{translateInstant(p.name)}</option>
                        ))}
                      </select>
                    </div>

                    {/* Area Input */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-black text-gray-500 mb-3 ml-1 uppercase tracking-widest">
                          <TranslatedText>Farm Area</TranslatedText>
                        </label>
                        <input 
                          type="number"
                          value={calcData.area}
                          onChange={(e) => {
                            setCalcData({ ...calcData, area: e.target.value });
                            setShowCalcResults(false);
                          }}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-bold text-gray-800"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-gray-500 mb-3 ml-1 uppercase tracking-widest">
                          <TranslatedText>Unit</TranslatedText>
                        </label>
                        <select 
                          value={calcData.unit}
                          onChange={(e) => {
                            setCalcData({ ...calcData, unit: e.target.value });
                            setShowCalcResults(false);
                          }}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-bold text-gray-800 appearance-none cursor-pointer"
                        >
                          <option value="acre">{language === 'en' ? 'Acres' : 'एकर'}</option>
                          <option value="hectare">{language === 'en' ? 'Hectares' : 'हेक्टर'}</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      onClick={handleCalculate}
                      className="w-full py-6 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-green-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group"
                    >
                      <TranslatedText>Analyze My Needs</TranslatedText>
                      <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Calculator Results or Preview */}
                <div className="relative">
                  {showCalcResults && calculationResults ? (
                    <motion.div
                      id="results"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gray-900 rounded-[2.5rem] p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-10 opacity-10">
                        <TrendingUp size={200} strokeWidth={1} />
                      </div>
                      
                      <h3 className="text-3xl font-black mb-10 border-b border-white/10 pb-6"><TranslatedText>Requirement Analysis</TranslatedText></h3>
                      
                      <div className="space-y-6 relative z-10">
                        <div className="bg-white/10 p-8 rounded-[2rem] border border-white/20">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-green-500/20 rounded-xl text-green-400">
                              <Package size={24} />
                            </div>
                            <span className="text-sm font-black text-white/50 uppercase tracking-widest"><TranslatedText>Total Requirement</TranslatedText></span>
                          </div>
                          <p className="text-5xl font-black text-white">
                            {calculationResults.totalAmount.toFixed(2)} 
                            <span className="text-xl font-bold text-green-400 ml-3">{translateInstant(selectedProduct.unit)}</span>
                          </p>
                        </div>

                        <div className="bg-white/10 p-8 rounded-[2rem] border border-white/20">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400">
                              <ShoppingCart size={24} />
                            </div>
                            <span className="text-sm font-black text-white/50 uppercase tracking-widest"><TranslatedText>Estimated Cost</TranslatedText></span>
                          </div>
                          <p className="text-5xl font-black text-white">
                            ₹{Math.round(calculationResults.totalCost).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-10 p-6 bg-white/5 rounded-3xl border border-white/5 flex items-start gap-4">
                        <div className="p-2 bg-white/10 rounded-xl"><Info size={20} className="text-blue-300" /></div>
                        <p className="text-sm text-white/70 leading-relaxed font-medium">
                          {language === 'mr' 
                            ? `आपल्या ${calcData.area} ${translateInstant(calcData.unit)} क्षेत्रासाठी ${translateInstant(selectedProduct.name)} ची ही मोजणी आहे.` 
                            : `This calculation is based on the recommended dosage for ${selectedProduct.name} across ${calcData.area} ${calcData.unit}.`}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full bg-white rounded-[2.5rem] p-12 border border-gray-100 flex flex-col items-center justify-center text-center shadow-xl">
                      <div className="w-32 h-32 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-sm">
                        <Package size={64} />
                      </div>
                      <h3 className="text-3xl font-black text-gray-900 mb-4"><TranslatedText>Requirement Analysis</TranslatedText></h3>
                      <p className="text-gray-500 text-lg font-medium max-w-sm">
                        <TranslatedText>Select a product to see calculated requirements for your specific farm area.</TranslatedText>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Footer Disclaimer */}
        <div className="mt-20 p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl flex items-start gap-6">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl shadow-sm"><Info size={32} /></div>
          <div>
            <h4 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-wide"><TranslatedText>Expert Advice Note</TranslatedText></h4>
            <p className="text-gray-600 leading-relaxed font-medium">
              <TranslatedText>These calculations and recommendations are based on regional averages and historical data. For best results, we recommend local soil testing and consulting with an agricultural expert before making large investments.</TranslatedText>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartAdvisor;
