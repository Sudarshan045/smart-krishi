import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  CheckCircle, 
  AlertCircle, 
  Leaf, 
  Droplet, 
  Sun, 
  Wind, 
  ChevronLeft, 
  ChevronRight, 
  Award,
  Info,
  Clock,
  ArrowRight,
  Target,
  Thermometer
} from 'lucide-react';
import TranslatedText from '../components/common/TranslatedText';
import { useLanguage } from '../context/LanguageContext';

const CropCalendar = () => {
  const { language, translateInstant } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('sugarcane');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthMarathi = [
    'जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून',
    'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'
  ];

  const activities = {
    sugarcane: {
      name: 'Sugarcane',
      nameMarathi: 'उस',
      theme: 'green',
      color: 'from-emerald-500 to-green-600',
      icon: Leaf,
      calendar: {
        0: { activity: 'Land Preparation', activityMarathi: 'जमीन तयारी', status: 'ongoing', details: ['Deep plow the field (30-40 cm).', 'Apply 20-25 tonnes of FYM per hectare.', 'Conduct soil tests for NPK levels.'], detailsMarathi: ['जमिनीची खोल नांगरट करा (३०-४० सेमी).', 'हेक्टरी २०-२५ टन शेणखत टाका.', 'NPK पातळीसाठी माती परीक्षण करा.'], icon: '🚜', priority: 'Medium' },
        1: { activity: 'Suru Planting', activityMarathi: 'सुरू लागवड', status: 'critical', details: ['Select disease-free 10-month seed cane.', 'Hot water treatment (50°C) for 2 hours.', 'Row distance of 4 to 4.5 feet.'], detailsMarathi: ['१० महिन्यांचे रोगमुक्त बेणे निवडा.', 'बेण्यावर ५०°C गरम पाण्याची प्रक्रिया करा.', 'दोन ओळीत ४ ते ४.५ फूट अंतर ठेवा.'], icon: '🌱', priority: 'High' },
        2: { activity: 'First Irrigation', activityMarathi: 'पहिले सिंचन', status: 'critical', details: ['Light irrigation after planting.', 'Apply 10% of total Nitrogen dose.', 'Monitor for Early Shoot Borer.'], detailsMarathi: ['लागवडीनंतर हलके पाणी द्या.', 'एकूण नत्राच्या १०% मात्रा द्या.', 'खोडकिडीचे निरीक्षण करा.'], icon: '💧', priority: 'High' },
        3: { activity: 'Weed Control', activityMarathi: 'तण नियंत्रण', status: 'important', details: ['Spray Atrazine within 3 days.', 'Manual hoeing for soil aeration.', 'Maintain adequate soil moisture.'], detailsMarathi: ['३ दिवसात अॅट्राझिनची फवारणी करा.', 'हवेसाठी पहिली खुरपणी करा.', 'जमिनीत पुरेसा ओलावा ठेवा.'], icon: '🌿', priority: 'Medium' },
        4: { activity: 'Tillering Phase', activityMarathi: 'फुटवे येण्याचा काळ', status: 'ongoing', details: ['Apply 40% of Nitrogen dose.', 'Use Trichogramma cards for biological control.', 'Ensure proper drainage for rain.'], detailsMarathi: ['नत्राची ४०% मात्रा द्या.', 'ट्रायकोग्रामा कार्डचा वापर करा.', 'पावसाच्या पाण्यासाठी निचरा ठेवा.'], icon: '💊', priority: 'High' },
        5: { activity: 'Monsoon Prep', activityMarathi: 'मान्सून पूर्व तयारी', status: 'important', details: ['Apply 3rd Nitrogen dose (10%).', 'Clear all drainage channels.', 'Monitor for white grubs.'], detailsMarathi: ['नत्राची तिसरी मात्रा (१०%) द्या.', 'सर्व पाण्याचे चर साफ करा.', 'हुमणी अळीची तपासणी करा.'], icon: '🌧️', priority: 'Medium' },
        6: { activity: 'Earthing Up', activityMarathi: 'भरणी', status: 'critical', details: ['Major earthing up to prevent lodging.', 'Final 40% Nitrogen dose.', 'Foliar spray of 19:19:19 if needed.'], detailsMarathi: ['पिकाला मातीचा आधार द्या.', 'नत्राची उर्वरित ४०% मात्रा द्या.', 'गरज असल्यास १९:१९:१९ फवारा.'], icon: '⛰️', priority: 'High' },
        7: { activity: 'Grand Growth Phase', activityMarathi: 'मुख्य वाढीचा काळ', status: 'ongoing', details: ['Maintain optimum drip irrigation.', 'Monitor for Woolly Aphids.', 'Avoid unnecessary walking in field.'], detailsMarathi: ['ठिबक सिंचन सुरू ठेवा.', 'पांढऱ्या माशीवर लक्ष ठेवा.', 'शेतातून अनावश्यक चालणे टाळा.'], icon: '📈', priority: 'Medium' },
        8: { activity: 'Pest Monitoring', activityMarathi: 'कीड आणि रोग तपासणी', status: 'important', details: ['Remove dried lower leaves.', 'Check for Red Rot symptoms.', 'Stop Nitrogen applications now.'], detailsMarathi: ['खालची सुकलेली पाने काढा.', 'लाल सड रोगाची लक्षणे तपासा.', 'आता नत्रयुक्त खते बंद करा.'], icon: '🐛', priority: 'High' },
        9: { activity: 'Sugar Accumulation', activityMarathi: 'साखर साठवणे', status: 'ongoing', details: ['Slow down vegetative growth.', 'Reduce irrigation frequency.', 'Tie canes together for support.'], detailsMarathi: ['वाढ मंदावते, साखर साठते.', 'पाण्याचे प्रमाण कमी करा.', 'उसाला पा पाचटाने बांधा.'], icon: '🍬', priority: 'Medium' },
        10: { activity: 'Maturity Check', activityMarathi: 'परिपक्वता तपासणी', status: 'ongoing', details: ['Check Brix value (>18-20%).', 'Stop irrigation 15 days before harvest.', 'Coordinate with sugar factory.'], detailsMarathi: ['Brix मूल्य तपासा (१८-२०%).', 'तोडणीपूर्वी १५ दिवस पाणी बंद करा.', 'कारखान्याशी समन्वय साधा.'], icon: '📊', priority: 'Medium' },
        11: { activity: 'Harvesting', activityMarathi: 'तोडणी', status: 'critical', details: ['Cut extremely close to the ground.', 'Transport within 24 hours.', 'Clear field of dry leaves.'], detailsMarathi: ['ऊस जमिनीलगत कापा.', '२४ तासात कारखान्यात पाठवा.', 'पाचट साफ करा.'], icon: '✂️', priority: 'High' }
      }
    },
    grapes: {
      name: 'Grapes',
      nameMarathi: 'द्राक्ष',
      theme: 'purple',
      color: 'from-purple-500 to-indigo-600',
      icon: Award,
      calendar: {
        0: { activity: 'Post-Harvest Rest', activityMarathi: 'विश्रांती काळ', status: 'ongoing', details: ['Complete rest for vines.', 'Apply 15-20 kg FYM per vine.', 'Clean vineyard thoroughly.'], detailsMarathi: ['वेलींना पूर्ण विश्रांती द्या.', 'प्रत्येक वेलीला १५-२० किलो शेणखत द्या.', 'बागेची पूर्ण स्वच्छता करा.'], icon: '💤', priority: 'Low' },
        1: { activity: 'Water Stress', activityMarathi: 'पाण्याचा ताण', status: 'important', details: ['Maintain stress for 15-20 days.', 'Leaves should start dropping.', 'Check for drip line leakages.'], detailsMarathi: ['१५-२० दिवस पाण्याचा ताण द्या.', 'पाने गळण्यास सुरुवात होईल.', 'ठिबक गळती तपासा.'], icon: '🍂', priority: 'Medium' },
        2: { activity: 'Foundation Pruning', activityMarathi: 'खरड छाटणी', status: 'critical', details: ['Leave only 1-2 buds.', 'Apply Dormex paste within 24h.', 'Disinfect shears between vines.'], detailsMarathi: ['१-२ डोळे ठेवून छाटणी करा.', '२४ तासात डॉर्मेक्स लावा.', 'कात्री निर्जंतुक करा.'], icon: '✂️', priority: 'High' },
        3: { activity: 'Vegetative Growth', activityMarathi: 'शाकीय वाढ', status: 'ongoing', details: ['Apply high-Nitrogen fertilizers.', 'Train shoots along wires.', 'Pinch tips at 7-8 leaves.'], detailsMarathi: ['नत्रयुक्त खते द्या.', 'फुटी तारांवर वळवा.', '७-८ पानांवर शेंडे खुडा.'], icon: '📈', priority: 'Medium' },
        4: { activity: 'Canopy Management', activityMarathi: 'कॅनोपी व्यवस्थापन', status: 'important', details: ['Remove excessive water shoots.', 'Foliar spray of micronutrients.', 'Keep canopy open and airy.'], detailsMarathi: ['अतिरिक्त फुटी काढून टाका.', 'सूक्ष्म अन्नद्रव्यांची फवारणी करा.', 'कॅनोपी खुली ठेवा.'], icon: '🌿', priority: 'High' },
        5: { activity: 'Monsoon Protection', activityMarathi: 'मान्सून संरक्षण', status: 'critical', details: ['Spray 1% Bordeaux mixture.', 'Clean trenches for drainage.', 'Systemic spray for Downy Mildew.'], detailsMarathi: ['१% बोर्डो मिश्रणाची फवारणी करा.', 'पाण्याचा निचरा करण्यासाठी चर साफ करा.', 'डाऊनीसाठी फवारणी करा.'], icon: '🌧️', priority: 'High' },
        6: { activity: 'Cane Maturity', activityMarathi: 'काडी परिपक्वता', status: 'ongoing', details: ['Canes turn brown and woody.', 'Apply 0:52:34 for maturity.', 'Stop Nitrogen application.'], detailsMarathi: ['काड्या पक्व आणि तपकिरी होतात.', 'पक्वतेसाठी ०:५२:३४ द्या.', 'नत्र बंद करा.'], icon: '🪵', priority: 'Medium' },
        7: { activity: 'Pre-Fruit Stress', activityMarathi: 'फळ छाटणीपूर्व ताण', status: 'important', details: ['Water stress for 15 days.', 'Bud dissection for fruitfulness.', 'Shift to reproductive phase.'], detailsMarathi: ['१५ दिवस पाण्याचा ताण द्या.', 'डोळे तपासा.', 'वाढीकडून फळधारणेकडे बदल.'], icon: '🌡️', priority: 'High' },
        8: { activity: 'Forward Pruning', activityMarathi: 'गोड छाटणी', status: 'critical', details: ['Leave 5-8 buds per cane.', 'Paste top 2-3 buds with Dormex.', 'Apply full basal dose.'], detailsMarathi: ['५-८ डोळे ठेवून छाटणी करा.', 'वरच्या २-३ डोळ्यांना डॉर्मेक्स लावा.', 'खतांचा बेसल डोस द्या.'], icon: '✂️', priority: 'High' },
        9: { activity: 'Flowering Stage', activityMarathi: 'फुलोरा अवस्था', status: 'critical', details: ['Stop irrigation during bloom.', 'No Copper sprays during bloom.', 'GA3 treatment after berry set.'], detailsMarathi: ['फुलोऱ्यात पाणी बंद करा.', 'तांबेयुक्त औषधे फवारू नका.', 'मणी धरल्यावर GA3 द्या.'], icon: '🌸', priority: 'High' },
        10: { activity: 'Berry Development', activityMarathi: 'मण्यांची वाढ', status: 'ongoing', details: ['Calcium Nitrate for cracking prep.', 'Increase Potash for sugar.', 'Tie canopy for sun protection.'], detailsMarathi: ['कॅल्शियम नायट्रेट द्या.', 'साखरेसाठी पोटॅश वाढवा.', 'कडक उन्हापासून घडांचे रक्षण करा.'], icon: '🍇', priority: 'High' },
        11: { activity: 'Harvesting', activityMarathi: 'कापणी', status: 'critical', details: ['Check TSS (>18° Brix).', 'Stop water 7 days prior.', 'Harvest in cool morning hours.'], detailsMarathi: ['गोडी तपासा (१८° ब्रिक्स).', '७ दिवस आधी पाणी बंद करा.', 'थंड वातावरणात कापणी करा.'], icon: '🛒', priority: 'High' }
      }
    }
  };

  const cropData = activities[selectedCrop];
  const currentActivity = cropData.calendar[currentMonth];

  const getStatusStyle = (status) => {
    switch(status) {
      case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: 'bg-red-500' };
      case 'important': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', icon: 'bg-amber-500' };
      default: return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', icon: 'bg-emerald-500' };
    }
  };

  const getSeasonInfo = (monthIndex) => {
    if (monthIndex >= 5 && monthIndex <= 8) return { en: 'Kharif', mr: 'खरीप', color: 'text-blue-500' };
    if (monthIndex >= 9 || monthIndex <= 1) return { en: 'Rabi', mr: 'रब्बी', color: 'text-orange-500' };
    return { en: 'Summer', mr: 'उन्हाळा', color: 'text-yellow-500' };
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Premium Hero Section */}
      <div className="relative pt-24 pb-32 lg:pt-32 lg:pb-48 overflow-hidden rounded-b-[4rem] shadow-2xl mb-12">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/season_calendar.png")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/95 via-blue-900/80 to-transparent mix-blend-multiply opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80" />
        </div>
        
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-300 text-sm font-black tracking-widest mb-8 shadow-2xl"
          >
            <CalendarIcon size={18} />
            <TranslatedText>Smart Crop Calendar</TranslatedText>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]"
          >
            <TranslatedText>Optimize Your Yield</TranslatedText> <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-300 drop-shadow-sm">
              <TranslatedText>Month by Month</TranslatedText>
            </span>
          </motion.h1>

          {/* Crop Switcher */}
          <div className="inline-flex p-1.5 bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl relative z-10 shadow-2xl">
            {Object.keys(activities).map((crop) => (
              <button
                key={crop}
                onClick={() => setSelectedCrop(crop)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-500 ${
                  selectedCrop === crop 
                    ? 'bg-white text-gray-900 shadow-xl scale-100' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {React.createElement(activities[crop].icon, { size: 18 })}
                <TranslatedText>{activities[crop].name}</TranslatedText>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom max-w-6xl mx-auto -mt-24 relative z-20">
        {/* Month Navigation Strip */}
        <div className="bg-white rounded-[3rem] p-4 shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-gray-100 mb-12 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {months.map((month, idx) => (
            <button
              key={month}
              onClick={() => setCurrentMonth(idx)}
              className={`flex-shrink-0 px-6 py-4 rounded-2xl font-black text-sm transition-all duration-300 ${
                currentMonth === idx 
                  ? 'bg-gray-900 text-white shadow-xl scale-[1.05]' 
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
              }`}
            >
              <TranslatedText>{month.slice(0, 3)}</TranslatedText>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Main Focus Card */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCrop}-${currentMonth}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                className="bg-white rounded-[3rem] p-10 lg:p-12 shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-gray-100 h-full relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${cropData.color} opacity-[0.03] rounded-bl-[100%] -mr-20 -mt-20`} />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
                        <Clock size={16} className="text-blue-500" />
                        <span>{language === 'mr' ? monthMarathi[currentMonth] : months[currentMonth]}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        <span className={getSeasonInfo(currentMonth).color}>
                          {language === 'mr' ? getSeasonInfo(currentMonth).mr : getSeasonInfo(currentMonth).en}
                        </span>
                      </div>
                      <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                        {language === 'mr' ? currentActivity.activityMarathi : currentActivity.activity}
                      </h2>
                    </div>
                    <div className="text-6xl p-4 bg-gray-50 rounded-[2rem] border border-gray-100 shadow-sm">
                      {currentActivity.icon}
                    </div>
                  </div>

                  <div className="space-y-6 mb-12">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Target size={14} className="text-red-500" />
                      <TranslatedText>Key Tasks for this Month</TranslatedText>
                    </h4>
                    <div className="grid gap-4">
                      {(language === 'mr' ? currentActivity.detailsMarathi : currentActivity.details).map((task, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                        >
                          <div className="mt-1 w-6 h-6 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                            <CheckCircle size={14} />
                          </div>
                          <p className="text-gray-700 font-bold leading-relaxed">{task}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-100">
                    <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl ${getStatusStyle(currentActivity.status).bg} ${getStatusStyle(currentActivity.status).text} border ${getStatusStyle(currentActivity.status).border} font-black text-sm uppercase`}>
                      <div className={`w-2 h-2 rounded-full ${getStatusStyle(currentActivity.status).icon}`} />
                      <TranslatedText>
                        {currentActivity.status === 'critical' ? 'Must do this month' : currentActivity.status === 'important' ? 'Should prioritize' : 'Regular maintenance'}
                      </TranslatedText>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100 font-black text-sm uppercase">
                      <Thermometer size={16} />
                      <TranslatedText>{currentActivity.priority}</TranslatedText> <TranslatedText>Priority</TranslatedText>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar / Quick Select */}
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10">
                <CalendarIcon size={120} />
              </div>
              <h3 className="text-2xl font-black mb-6 relative z-10"><TranslatedText>Annual Roadmap</TranslatedText></h3>
              <div className="space-y-4 relative z-10 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
                {months.map((m, i) => (
                  <button
                    key={m}
                    onClick={() => setCurrentMonth(i)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                      currentMonth === i 
                        ? `bg-gradient-to-r ${cropData.color} shadow-lg shadow-green-500/20` 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{cropData.calendar[i].icon}</span>
                      <div className="text-left">
                        <p className={`text-[10px] font-black uppercase tracking-widest ${currentMonth === i ? 'text-white/70' : 'text-gray-500'}`}>
                          {language === 'mr' ? monthMarathi[i] : m}
                        </p>
                        <p className="font-bold text-sm truncate max-w-[120px]">
                          {language === 'mr' ? cropData.calendar[i].activityMarathi : cropData.calendar[i].activity}
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={18} className={currentMonth === i ? 'text-white' : 'text-gray-600'} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
                  <Info size={24} />
                </div>
                <h4 className="font-black text-gray-900 uppercase tracking-widest text-sm"><TranslatedText>Pro Tip</TranslatedText></h4>
              </div>
              <p className="text-gray-600 font-bold leading-relaxed mb-6">
                {language === 'mr' 
                  ? 'हवामानातील बदलांनुसार कामांमध्ये थोडे बदल होऊ शकतात. अचूक वेळेसाठी स्थानिक हवामान अंदाजावर लक्ष ठेवा.'
                  : 'Activity timing may vary slightly based on actual weather conditions. Always monitor local forecasts.'}
              </p>
              <button className="w-full flex items-center justify-center gap-3 py-4 bg-gray-50 text-gray-900 rounded-2xl font-black hover:bg-gray-100 transition-all group">
                <TranslatedText>Expert Advice</TranslatedText>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Global Footer Disclaimer */}
        <div className="mt-20 p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl flex items-start gap-6">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl shadow-sm"><Info size={32} /></div>
          <div>
            <h4 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-wide"><TranslatedText>Note for Farmers</TranslatedText></h4>
            <p className="text-gray-600 leading-relaxed font-medium">
              <TranslatedText>This calendar is a general guide. For specific varieties and micro-climates, consult with a local Krishi Seva Kendra or agricultural expert. High precision results are achieved by maintaining a personal farm diary alongside this digital guide.</TranslatedText>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropCalendar;