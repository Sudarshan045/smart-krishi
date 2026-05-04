import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, RefreshCw, AlertTriangle, CheckCircle, Search, Droplets, FlaskConical, ChevronRight, Shield, Zap } from 'lucide-react';
import TranslatedText from '../components/common/TranslatedText';
import { useLanguage } from '../context/LanguageContext';
import { diseaseProductMap } from '../data/diseaseProducts';
import { ShoppingCart, ExternalLink } from 'lucide-react';

const DiseaseDetection = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [manualMode, setManualMode] = useState(false);
  const [wizardStep, setWizardStep] = useState(1); // 1: Crop, 2: Symptoms, 3: Final
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const fileInputRef = useRef(null);
  const { language } = useLanguage();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(language === 'mr' ? 'प्रतिमा ५ MB पेक्षा लहान असावी.' : 'Image must be smaller than 5 MB.');
        return;
      }
      setError(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setImage(reader.result.split(',')[1]); // get base64 part
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetect = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);

    try {
      console.log("Initiating Specialist Vision Analysis...");
      
      // Send image to our Specialist Backend AI
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const apiUrl = baseUrl.replace(/\/api$/, '') + '/api/ai/analyze-image';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          image, 
          crop: selectedCrop, 
          symptoms: selectedSymptoms 
        }),
      });

      const data = await response.json();

      if (data.success && data.data) {
        if (data.data.uncertain && !selectedCrop) {
          setManualMode(true);
          setWizardStep(1);
        } else {
          setResult(data.data);
          setManualMode(false);
        }
      } else {
        setManualMode(true);
        setWizardStep(1);
      }
    } catch (err) {
      console.error(err);
      setError(language === 'mr' 
        ? 'विश्लेषण करताना त्रुटी आली. कृपया इंटरनेट तपासा आणि पुन्हा प्रयत्न करा.' 
        : 'Analysis error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetDetection = () => {
    setImage(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setManualMode(false);
    setWizardStep(1);
    setSelectedCrop(null);
    setSelectedSymptoms([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Premium Hero Section */}
      <div className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 overflow-hidden rounded-b-[3rem] shadow-2xl mb-12">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/grapes_disease.png")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/95 via-green-900/80 to-transparent mix-blend-multiply opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80" />
        </div>
        
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-green-300 mb-6 shadow-xl"
          >
            <Search size={40} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-2xl"
          >
            <TranslatedText>Smart Disease Detection</TranslatedText>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg lg:text-xl text-gray-300 font-medium mb-10 max-w-2xl mx-auto"
          >
            {language === 'mr' ? 'तुमच्या पिकाचा फोटो अपलोड करा आणि रोग, कीड किंवा कमतरता ओळखून अचूक उपाय मिळवा.' : 'Upload a photo of your crop to instantly identify diseases, pests, or deficiencies and get actionable remedies.'}
          </motion.p>
        </div>
      </div>

      <div className="container-custom max-w-4xl mx-auto -mt-24 relative z-20">
        {/* Upload Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgb(0,0,0,0.1)] border border-gray-100 overflow-hidden"
        >
          <div className="p-8">
            {!previewUrl ? (
              <div 
                className="border-2 border-dashed border-green-300 bg-green-50/30 rounded-3xl p-12 text-center hover:bg-green-50 transition-colors cursor-pointer group"
                onClick={() => fileInputRef.current.click()}
              >
                <div className="flex justify-center gap-4 mb-6">
                  <div className="bg-white p-5 rounded-full text-green-600 shadow-md group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <div className="bg-white p-5 rounded-full text-green-600 shadow-md group-hover:scale-110 transition-transform delay-75">
                    <Camera size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  <TranslatedText>Click to Upload or Take Photo</TranslatedText>
                </h3>
                <p className="text-gray-500 mb-6">
                  <TranslatedText>Supports JPG, PNG (Max 5MB)</TranslatedText>
                </p>
                <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-green-700 transition-colors">
                  <TranslatedText>Select Image</TranslatedText>
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <img 
                    id="preview-image"
                    src={previewUrl} 
                    alt="Crop preview" 
                    className="max-h-80 rounded-2xl shadow-md object-cover"
                  />
                  {!loading && !result && (
                    <button 
                      onClick={resetDetection}
                      className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {!result && (
                  <div>
                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mb-4"></div>
                        <p className="text-lg font-semibold text-gray-700 animate-pulse">
                          <TranslatedText>Analyzing crop image...</TranslatedText>
                        </p>
                      </div>
                    ) : (
                      <button 
                        onClick={handleDetect}
                        className="w-full md:w-auto bg-gradient-to-r from-green-500 to-green-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mx-auto"
                      >
                        <Search size={24} /> <TranslatedText>Analyze Image</TranslatedText>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              capture="environment"
              className="hidden" 
            />

            {error && (
              <div className="mt-6 bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3">
                <AlertTriangle size={20} />
                <p className="font-semibold">{error}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {manualMode && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-2xl border border-green-100 relative overflow-hidden"
            >
              {/* Wizard Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="bg-green-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">
                    {wizardStep}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 leading-none mb-1">
                      {wizardStep === 1 ? <TranslatedText>Select Your Crop</TranslatedText> : 
                       wizardStep === 2 ? <TranslatedText>What do you see?</TranslatedText> : 
                       <TranslatedText>Expert Diagnosis</TranslatedText>}
                    </h3>
                    <p className="text-gray-500 font-medium text-sm">
                      {wizardStep === 1 ? <TranslatedText>Choose the crop you are currently farming.</TranslatedText> : 
                       wizardStep === 2 ? <TranslatedText>Check all symptoms visible on your plant.</TranslatedText> : 
                       <TranslatedText>Analyzing your input for a precise result...</TranslatedText>}
                    </p>
                  </div>
                </div>
                <button onClick={resetDetection} className="text-gray-400 hover:text-red-500 transition-colors">
                  <RefreshCw size={24} />
                </button>
              </div>

              {/* Step 1: Crop Selection */}
              {wizardStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button 
                    onClick={() => { setSelectedCrop('Sugarcane'); setWizardStep(2); }}
                    className="group relative h-48 rounded-[2rem] overflow-hidden border-2 border-transparent hover:border-green-500 transition-all shadow-xl"
                  >
                    <img src="/images/sugarcane_bg.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Sugarcane" />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-left">
                      <h4 className="text-2xl font-black text-white leading-none"><TranslatedText>Sugarcane</TranslatedText></h4>
                      <p className="text-green-100 font-medium opacity-80 text-sm mt-1">ऊस</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => { setSelectedCrop('Grapes'); setWizardStep(2); }}
                    className="group relative h-48 rounded-[2rem] overflow-hidden border-2 border-transparent hover:border-green-500 transition-all shadow-xl"
                  >
                    <img src="/images/grapes_bg.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Grapes" />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-left">
                      <h4 className="text-2xl font-black text-white leading-none"><TranslatedText>Grapes</TranslatedText></h4>
                      <p className="text-purple-100 font-medium opacity-80 text-sm mt-1">द्राक्ष</p>
                    </div>
                  </button>
                </div>
              )}

              {/* Step 2: Symptom Checkboxes */}
              {wizardStep === 2 && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(selectedCrop === 'Sugarcane' ? [
                      { en: "Drying of central leaf (Dead Heart)", mr: "मधला पोंगा वाळणे (Dead Heart)" },
                      { en: "Reddish color inside the stalk", mr: "कांड्या कापल्यास आतून लाल दिसणे" },
                      { en: "Sour, fermented smell", mr: "आंबट किंवा अल्कोहोलसारखा वास येणे" },
                      { en: "Black whip-like structure at top", mr: "शेंड्यातून काळा चाबकासारखा भाग येणे" },
                      { en: "Spotted larvae on leaves/stalk", mr: "पानांवर किंवा खोडात ठिपके असलेली अळी" },
                      { en: "Holes in the stem", mr: "खोडावर किंवा कांड्यांवर छिद्रे असणे" },
                      { en: "Yellowing of top 3-4 leaves", mr: "वरची ३-४ पाने पिवळी पडणे" },
                      { en: "C-shaped white grubs in soil", mr: "मुळाशी जमिनीत पांढऱ्या 'C' आकाराच्या अळ्या" }
                    ] : [
                      { en: "Yellowish 'oil spots' on leaf top", mr: "पानावर पिवळसर तेलकट ठिपके दिसणे" },
                      { en: "White powdery growth under leaves", mr: "पानांच्या खालच्या बाजूला पांढरी बुरशी" },
                      { en: "White ash-like powder on leaf top", mr: "पानांवर पांढरी किंवा राखेसारखी पावडर" },
                      { en: "Berries cracking or splitting", mr: "मणी तडकणे किंवा फाटणे" },
                      { en: "Sunken grey spots on berries", mr: "मण्यांवर खोलवर राखाडी ठिपके (करपा)" },
                      { en: "Holes in leaves (Bird's eye spots)", mr: "पानांना छिद्रे पडणे (पक्ष्याचा डोळा)" },
                      { en: "Curled leaves or stunted fruit", mr: "पाने गोळा होणे किंवा वाढ खुंटणे" }
                    ]).map((s, idx) => (
                      <label 
                        key={idx}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedSymptoms.includes(s.en) ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-green-200 bg-gray-50/50'}`}
                      >
                        <input 
                          type="checkbox"
                          className="w-6 h-6 rounded-lg border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                          checked={selectedSymptoms.includes(s.en)}
                          onChange={() => {
                            if (selectedSymptoms.includes(s.en)) {
                              setSelectedSymptoms(prev => prev.filter(item => item !== s.en));
                            } else {
                              setSelectedSymptoms(prev => [...prev, s.en]);
                            }
                          }}
                        />
                        <span className="font-semibold text-gray-800 text-sm lg:text-base">
                          {language === 'mr' ? s.mr : s.en}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                    <button 
                      onClick={() => setWizardStep(1)}
                      className="text-gray-500 font-bold hover:text-gray-700 flex items-center gap-2"
                    >
                      ← <TranslatedText>Back</TranslatedText>
                    </button>
                    <button 
                      onClick={handleDetect}
                      disabled={selectedSymptoms.length === 0}
                      className={`px-10 py-4 rounded-full font-black text-lg shadow-xl transition-all ${selectedSymptoms.length > 0 ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    >
                      <TranslatedText>Generate Expert Prediction</TranslatedText> →
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {result && !manualMode && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6"
            >
              {/* Header result */}
              <div className={`bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 relative overflow-hidden`}>
                {/* Status Indicator Bar */}
                <div className={`absolute top-0 left-0 bottom-0 w-3 ${result?.[language]?.diseaseName?.includes('Healthy') || result?.[language]?.diseaseName?.includes('निरोगी') ? 'bg-green-500' : 'bg-red-500'}`} />

                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-full ${result?.[language]?.diseaseName?.includes('Healthy') || result?.[language]?.diseaseName?.includes('निरोगी') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {result?.[language]?.diseaseName?.includes('Healthy') || result?.[language]?.diseaseName?.includes('निरोगी') ? <CheckCircle size={32} /> : <AlertTriangle size={32} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
                        {result?.[language]?.diseaseName}
                      </h2>
                      {result?.[language]?.detectedAs && (
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            AI Confidence: High
                          </span>
                          <button 
                            onClick={() => {
                              setResult(null);
                              setManualMode(true);
                              setWizardStep(1);
                            }}
                            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold hover:bg-purple-200 transition-colors flex items-center gap-1 border border-purple-200"
                          >
                            <Zap size={12} />
                            {language === 'mr' ? "चुकीचे वाटते? पुन्हा तपासा" : "Wrong? Re-check manually"}
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {result?.[language]?.info}
                    </p>
                  </div>
                </div>
              </div>

              {/* Symptoms and Cause */}
              {!(result[language].diseaseName.includes('Healthy') || result[language].diseaseName.includes('निरोगी')) && (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Symptoms */}
                  <div className="bg-purple-50 rounded-3xl p-6 border border-purple-100 shadow-md">
                    <h3 className="text-xl font-semibold text-purple-800 flex items-center gap-2 mb-4">
                      <Search size={24} /> <TranslatedText>Key Symptoms</TranslatedText>
                    </h3>
                    <ul className="space-y-2 mb-6">
                      {result[language].symptoms ? result[language].symptoms.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-purple-900">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" /> {s}
                        </li>
                      )) : <li className="text-purple-900">N/A</li>}
                    </ul>

                    {/* Manual Override Button */}
                    <div className="pt-4 border-t border-purple-200">
                      <p className="text-xs text-purple-600 mb-2 italic">
                        {language === 'mr' ? "वरील माहिती बरोबर वाटत नाही का? तज्ञांची मदत घ्या:" : "Doesn't look right? Use our Expert Wizard:"}
                      </p>
                      <button 
                        onClick={() => {
                          setResult(null);
                          setWizardStep(1);
                        }}
                        className="w-full py-2 bg-white border border-purple-300 text-purple-700 rounded-xl text-sm font-bold hover:bg-purple-100 transition-all flex items-center justify-center gap-2"
                      >
                        <Zap size={16} />
                        {language === 'mr' ? "तज्ञांची मदत (Wizard)" : "Expert Wizard"}
                      </button>
                    </div>
                  </div>

                  {/* Cause */}
                  <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100 shadow-md">
                    <h3 className="text-xl font-semibold text-orange-800 flex items-center gap-2 mb-4">
                      <Droplets size={24} /> <TranslatedText>Primary Cause</TranslatedText>
                    </h3>
                    <p className="text-orange-900 leading-relaxed font-medium">{result[language].cause}</p>
                  </div>
                </div>
              )}

              {/* Precautions and Remedies */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Precautions */}
                <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 shadow-md h-full">
                  <h3 className="text-xl font-semibold text-blue-800 flex items-center gap-2 mb-4">
                    <Shield size={24} /> <TranslatedText>Precautions</TranslatedText>
                  </h3>
                  <ul className="space-y-3">
                    {result[language].precautions.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-blue-900">
                        <ChevronRight size={18} className="mt-0.5 flex-shrink-0 text-blue-400" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Remedies */}
                <div className="bg-green-50 rounded-3xl p-6 border border-green-100 shadow-md h-full">
                  <h3 className="text-xl font-semibold text-green-800 flex items-center gap-2 mb-4">
                    <FlaskConical size={24} /> <TranslatedText>Remedies & Treatment</TranslatedText>
                  </h3>
                  <div className="space-y-3">
                    {result[language].remedies.map((r, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white p-3 rounded-xl shadow-sm">
                        <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">
                          {i + 1}
                        </div>
                        <p className="text-gray-800 text-sm leading-snug">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Recommendations */}
              {diseaseProductMap[result?.en?.detectedAs || result?.en?.diseaseName] && (
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
                    <ShoppingCart className="text-green-600" size={28} />
                    <TranslatedText>Recommended Products & Tools</TranslatedText>
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(diseaseProductMap[result.en.detectedAs || result.en.diseaseName]).map(([type, products]) => (
                      products.map((p, i) => (
                        <div key={`${type}-${i}`} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-green-200 transition-all group">
                          <span className="text-[10px] font-black uppercase tracking-widest text-green-600 mb-1 block">
                            {type}
                          </span>
                          <h4 className="font-semibold text-gray-800 mb-3 text-sm">{p.name}</h4>
                          <a 
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-green-600 px-4 py-2 rounded-full hover:bg-green-700 transition-all w-full justify-center"
                          >
                            Buy Now <ExternalLink size={12} />
                          </a>
                        </div>
                      ))
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center mt-8">
                <button 
                  onClick={resetDetection}
                  className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-full font-bold hover:bg-green-50 transition-colors flex items-center gap-2"
                >
                  <RefreshCw size={20} /> <TranslatedText>Analyze Another Image</TranslatedText>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DiseaseDetection;
