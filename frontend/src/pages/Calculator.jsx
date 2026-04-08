import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator as CalcIcon, TrendingUp, TrendingDown, IndianRupee, DollarSign, ArrowRight, Leaf, Award } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Calculator = () => {
  const [crop, setCrop] = useState('sugarcane');
  const [landArea, setLandArea] = useState(1);
  const [investment, setInvestment] = useState(0);
  const [yieldAmount, setYieldAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const cropData = {
    sugarcane: {
      name: 'Sugarcane',
      nameMarathi: 'उस',
      avgYield: 85,
      avgPrice: 3200,
      avgInvestment: 100000,
      yieldUnit: 'tonnes',
      priceUnit: 'per tonne',
      color: 'from-green-500 to-green-600',
      icon: Leaf
    },
    grapes: {
      name: 'Grapes',
      nameMarathi: 'द्राक्ष',
      avgYield: 25,
      avgPrice: 60000,
      avgInvestment: 400000,
      yieldUnit: 'tonnes',
      priceUnit: 'per tonne',
      color: 'from-purple-500 to-purple-600',
      icon: Award
    }
  };

  const selectedCrop = cropData[crop];
  
  const totalInvestment = investment || selectedCrop.avgInvestment * landArea;
  const totalYield = yieldAmount || selectedCrop.avgYield * landArea;
  const totalRevenue = (price || selectedCrop.avgPrice) * totalYield;
  const netProfit = totalRevenue - totalInvestment;
  const profitMargin = (netProfit / totalInvestment) * 100;

  const handleCalculate = () => {
    setShowResults(true);
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

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
              <CalcIcon size={40} className="text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold text-green-800 mb-2">Cost & Profit Calculator</h1>
          <p className="text-xl text-gray-600">Calculate your farming investment and returns instantly</p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-semibold text-green-800 mb-6">Enter Farm Details</h2>
            
            {/* Crop Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Crop</label>
              <div className="flex gap-4">
                {Object.keys(cropData).map((c) => (
                  <motion.button
                    key={c}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCrop(c);
                      setShowResults(false);
                    }}
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                      crop === c
                        ? `bg-gradient-to-r ${cropData[c].color} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cropData[c].name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              {[
                { label: 'Land Area (hectares)', value: landArea, set: setLandArea, step: 0.1, min: 0.1, avg: selectedCrop.avgInvestment },
                { label: 'Total Investment (₹)', value: investment, set: setInvestment, step: 1000, placeholder: `Avg: ₹${selectedCrop.avgInvestment.toLocaleString()}/ha` },
                { label: `Total Yield (${selectedCrop.yieldUnit})`, value: yieldAmount, set: setYieldAmount, step: 1, placeholder: `Avg: ${selectedCrop.avgYield} tonnes/ha` },
                { label: `Selling Price (₹ ${selectedCrop.priceUnit})`, value: price, set: setPrice, step: 100, placeholder: `Avg: ₹${selectedCrop.avgPrice.toLocaleString()}` }
              ].map((field, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                  <input
                    type="number"
                    value={field.value}
                    onChange={(e) => {
                      field.set(parseFloat(e.target.value) || 0);
                      setShowResults(false);
                    }}
                    step={field.step}
                    min={field.min}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                  {field.avg && field.value === 0 && (
                    <p className="text-xs text-gray-500 mt-1">Leave empty to use average: ₹{field.avg.toLocaleString()}/hectare</p>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCalculate}
              className="w-full mt-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Calculate Now <ArrowRight size={20} />
            </motion.button>
          </motion.div>

          {/* Results Section */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                id="results"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-green-50 to-amber-50 rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-semibold text-green-800 mb-6">Your Results</h2>
                
                <div className="space-y-4">
                  {[
                    { label: 'Land Area', value: `${landArea} hectares`, icon: '🌾' },
                    { label: 'Total Investment', value: `₹${totalInvestment.toLocaleString()}`, icon: '💰', color: 'text-orange-600' },
                    { label: 'Total Yield', value: `${totalYield.toLocaleString()} ${selectedCrop.yieldUnit}`, icon: '📊' },
                    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: '💵', color: 'text-green-600' },
                    { label: 'Net Profit', value: `₹${netProfit.toLocaleString()}`, icon: netProfit >= 0 ? '📈' : '📉', color: netProfit >= 0 ? 'text-green-600' : 'text-red-600' },
                    { label: 'Profit Margin', value: `${profitMargin.toFixed(1)}%`, icon: '🎯', color: profitMargin >= 0 ? 'text-green-600' : 'text-red-600' }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white rounded-xl p-4 flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-medium text-gray-700">{item.label}</span>
                      </div>
                      <span className={`text-xl font-bold ${item.color || 'text-gray-800'}`}>{item.value}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 bg-amber-100 rounded-xl p-4"
                >
                  <p className="text-amber-800 text-sm">
                    💡 {netProfit >= 0 
                      ? `Great! Your estimated profit is ₹${netProfit.toLocaleString()}. Consider optimizing inputs to increase margins further.`
                      : `Your estimated loss is ₹${Math.abs(netProfit).toLocaleString()}. Review your costs and consider government subsidies available in Schemes page.`}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Calculator;