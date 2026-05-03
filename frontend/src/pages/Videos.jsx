import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Search, 
  Eye, 
  Clock, 
  MonitorPlay, 
  Award, 
  ChevronRight,
  Video,
  TrendingUp,
  Filter,
  ArrowRight,
  Info
} from 'lucide-react';
import TranslatedText from '../components/common/TranslatedText';
import { useLanguage } from '../context/LanguageContext';

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { language, translateInstant } = useLanguage();

  const videos = [
    {
      id: 1,
      title: 'Sugarcane Cultivation - Complete Guide',
      titleMarathi: 'उस लागवड - संपूर्ण मार्गदर्शन',
      category: 'Sugarcane',
      duration: '15:30',
      views: '125K',
      image: '/images/vid_thumb_sugarcane.png',
      color: 'from-emerald-600 to-green-700',
      description: 'Complete guide for sugarcane farming from land preparation to harvest',
      url: 'https://www.youtube.com/results?search_query=sugarcane+farming+guide+marathi'
    },
    {
      id: 2,
      title: 'Grape Farming Techniques',
      titleMarathi: 'द्राक्ष शेती तंत्र',
      category: 'Grapes',
      duration: '22:15',
      views: '89K',
      image: '/images/vid_thumb_grapes.png',
      color: 'from-purple-600 to-indigo-700',
      description: 'Learn modern grape cultivation techniques for higher yield',
      url: 'https://www.youtube.com/results?search_query=grape+farming+techniques+maharashtra'
    },
    {
      id: 3,
      title: 'Drip Irrigation Maintenance',
      titleMarathi: 'ठिबक सिंचन देखभाल',
      category: 'Irrigation',
      duration: '10:12',
      views: '45K',
      image: '/images/vid_thumb_drip.png',
      color: 'from-blue-600 to-cyan-700',
      description: 'Step-by-step guide to maintaining your drip irrigation filters and lines.',
      url: 'https://www.youtube.com/results?search_query=drip+irrigation+maintenance+marathi'
    },
    {
      id: 4,
      title: 'Organic Dashparni Ark',
      titleMarathi: 'सेंद्रिय दशपर्णी अर्क तयार करणे',
      category: 'Organic',
      duration: '14:50',
      views: '156K',
      image: '/images/vid_thumb_organic.png',
      color: 'from-teal-600 to-emerald-700',
      description: 'How to prepare Dashparni Ark - a powerful natural pesticide at zero cost.',
      url: 'https://www.youtube.com/results?search_query=dashparni+ark+preparation+marathi'
    },
    {
      id: 5,
      title: 'Sugarcane Tissue Culture',
      titleMarathi: 'ऊस उतिसंवर्धन (Tissue Culture)',
      category: 'Sugarcane',
      duration: '18:30',
      views: '34K',
      image: '/images/sugarcane_bg.png',
      color: 'from-green-600 to-teal-700',
      description: 'Understanding the benefits of tissue culture sugarcane for disease resistance.',
      url: 'https://www.youtube.com/results?search_query=tissue+culture+sugarcane+marathi'
    },
    {
      id: 6,
      title: 'Grape Export Quality Management',
      titleMarathi: 'द्राक्ष निर्यात गुणवत्ता व्यवस्थापन',
      category: 'Grapes',
      duration: '25:40',
      views: '62K',
      image: '/images/vid_thumb_grapes.png',
      color: 'from-indigo-600 to-violet-700',
      description: 'Standards and practices required for exporting grapes to European markets.',
      url: 'https://www.youtube.com/results?search_query=grape+export+quality+maharashtra'
    },
    {
      id: 7,
      title: 'Soil Testing Procedure',
      titleMarathi: 'माती परीक्षण करण्याची पद्धत',
      category: 'Soil',
      duration: '08:15',
      views: '112K',
      image: '/images/vid_thumb_soil.png',
      color: 'from-stone-600 to-gray-700',
      description: 'Correct way to collect soil samples for accurate lab testing results.',
      url: 'https://www.youtube.com/results?search_query=soil+testing+procedure+marathi'
    },
    {
      id: 8,
      title: 'Modern Harvesting Tech',
      titleMarathi: 'आधुनिक कापणी तंत्रज्ञान',
      category: 'Harvesting',
      duration: '12:30',
      views: '78K',
      image: '/images/guide_sc_harvest.png',
      color: 'from-orange-600 to-red-700',
      description: 'A look at modern sugarcane and grape harvesting machines in action.',
      url: 'https://www.youtube.com/results?search_query=modern+harvester+machine+india'
    },
    {
      id: 9,
      title: 'ZBNF - Zero Budget Farming',
      titleMarathi: 'झिरो बजेट नैसर्गिक शेती',
      category: 'Organic',
      duration: '32:00',
      views: '245K',
      image: '/images/vid_thumb_organic.png',
      color: 'from-green-700 to-emerald-900',
      description: 'Comprehensive introduction to Zero Budget Natural Farming by experts.',
      url: 'https://www.youtube.com/results?search_query=zbnf+marathi+full+guide'
    },
    {
      id: 10,
      title: 'Pest Control in Sugarcane',
      titleMarathi: 'उसातील कीड नियंत्रण',
      category: 'Pest Control',
      duration: '20:45',
      views: '93K',
      image: '/images/vid_thumb_pest.png',
      color: 'from-red-600 to-rose-700',
      description: 'Effective methods to control White Grub and Stem Borers in sugarcane.',
      url: 'https://www.youtube.com/results?search_query=sugarcane+pest+control+white+grub'
    }
  ];

  const categories = ['all', 'Sugarcane', 'Grapes', 'Irrigation', 'Organic', 'Soil', 'Harvesting', 'Pest Control'];

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const title = language === 'mr' ? video.titleMarathi : video.title;
      const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, language]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Premium Hero Section */}
      <div className="relative pt-24 pb-32 lg:pt-32 lg:pb-48 overflow-hidden rounded-b-[4rem] shadow-2xl mb-12">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/sugarcane_bg.png")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/95 via-red-900/80 to-transparent mix-blend-multiply opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80" />
        </div>
        
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-red-300 text-sm font-black tracking-widest mb-8 shadow-2xl"
          >
            <Play size={18} fill="currentColor" />
            <TranslatedText>Video Learning</TranslatedText>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]"
          >
            <TranslatedText>Learn Modern</TranslatedText> <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-300 drop-shadow-sm">
              <TranslatedText>Farming Skills</TranslatedText>
            </span>
          </motion.h1>

          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-red-400 transition-colors" size={24} />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'mr' ? "व्हिडिओ शोधा..." : "Search for tutorials..."}
              className="w-full bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-3xl py-6 pl-16 pr-8 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-red-400 outline-none transition-all text-xl font-bold"
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
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${
                selectedCategory === cat 
                  ? 'bg-gray-900 text-white shadow-2xl scale-105' 
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
              }`}
            >
              <TranslatedText>{cat === 'all' ? 'All Videos' : cat}</TranslatedText>
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((video, idx) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-[0_8px_40px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all duration-500"
              >
                {/* Thumbnail */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={video.image} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                  
                  {/* Category Badge */}
                  <div className={`absolute top-6 left-6 px-4 py-2 rounded-full bg-gradient-to-r ${video.color} text-white text-[10px] font-black uppercase tracking-widest shadow-lg`}>
                    <TranslatedText>{video.category}</TranslatedText>
                  </div>

                  {/* Play Button Overlay */}
                  <a 
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center group/btn"
                  >
                    <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover/btn:scale-110 transition-transform duration-500">
                      <Play size={32} className="text-red-600 ml-1" fill="currentColor" />
                    </div>
                  </a>

                  {/* Duration Badge */}
                  <div className="absolute bottom-6 right-6 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-white text-xs font-black">
                    {video.duration}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Eye size={14} className="text-blue-500" /> {video.views} Views</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                    <span className="flex items-center gap-1.5"><TrendingUp size={14} className="text-green-500" /> <TranslatedText>Trending</TranslatedText></span>
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-red-600 transition-colors line-clamp-1">
                    {language === 'mr' ? video.titleMarathi : video.title}
                  </h3>

                  <p className="text-gray-500 font-bold leading-relaxed line-clamp-2 mb-8">
                    {language === 'mr' ? translateInstant(video.description) : video.description}
                  </p>

                  <div className="flex items-center justify-between group/link">
                    <span className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                      <TranslatedText>Watch Now</TranslatedText>
                      <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
                    </span>
                    <div className="p-3 rounded-xl bg-red-50 text-red-600 group-hover/link:bg-red-600 group-hover/link:text-white transition-all">
                      <Video size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* YouTube Subscription Banner */}
        <div className="mt-24 p-12 bg-gradient-to-br from-red-600 to-rose-700 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Video size={240} />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/20 backdrop-blur-md mb-8">
                <MonitorPlay size={20} />
                <span className="text-sm font-black uppercase tracking-widest"><TranslatedText>Official Channel</TranslatedText></span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
                <TranslatedText>Subscribe for Weekly</TranslatedText> <br/>
                <span className="text-amber-300"><TranslatedText>Farming Guides</TranslatedText></span>
              </h2>
              <p className="text-xl text-red-50 font-bold mb-8 max-w-lg">
                <TranslatedText>Join 100K+ farmers who are learning to increase their income every week with our video tutorials.</TranslatedText>
              </p>
            </div>
            
            <a 
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-6 bg-white text-red-600 rounded-[2rem] font-black text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
            >
              <Video size={32} />
              <TranslatedText>Subscribe Now</TranslatedText>
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 flex items-start gap-4 px-8 text-gray-400">
          <Info size={16} className="mt-1 flex-shrink-0" />
          <p className="text-xs font-bold leading-relaxed">
            <TranslatedText>These videos are sourced from official agricultural channels and expert farmers. Recommendations may vary based on local conditions. Always verify with a local expert before trying new techniques.</TranslatedText>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Videos;