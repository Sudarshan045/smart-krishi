import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calculator, 
  Calendar, 
  Video, 
  HelpCircle, 
  Shield, 
  ArrowRight, 
  TrendingUp, 
  Leaf, 
  Users,
  Zap,
  Globe,
  Award,
  ChevronRight,
  PlayCircle
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';
import TranslatedText from '../components/common/TranslatedText';

const Home = () => {
  const { language } = useLanguage();

  const features = [
    { 
      icon: BookOpen, 
      title: 'Smart Crop Guides', 
      description: 'Expert cultivation techniques for Sugarcane, Grapes, and more.', 
      link: '/guide/sugarcane', 
      color: 'from-emerald-500 to-green-600', 
      bgImage: '/images/home_crop_guides.png',
      tag: 'Expertise'
    },
    { 
      icon: Calculator, 
      title: 'Agri Advisor', 
      description: 'AI-driven profit analysis and resource planning for your farm.', 
      link: '/smart-advisor', 
      color: 'from-amber-400 to-orange-600', 
      bgImage: '/images/home_calculator.png',
      tag: 'AI Tools'
    },
    { 
      icon: Calendar, 
      title: 'Growth Calendar', 
      description: 'Dynamic schedule for watering, fertilizing, and harvesting.', 
      link: '/calendar', 
      color: 'from-blue-500 to-indigo-600', 
      bgImage: '/images/home_calendar.png',
      tag: 'Schedule'
    },
    { 
      icon: Shield, 
      title: 'Govt Schemes', 
      description: 'Unlock subsidies and financial support from the government.', 
      link: '/schemes', 
      color: 'from-purple-500 to-fuchsia-600', 
      bgImage: '/images/harvest_boxes.png',
      tag: 'Benefits'
    },
    { 
      icon: Video, 
      title: 'Learning Hub', 
      description: 'Cinematic video tutorials on modern agricultural practices.', 
      link: '/videos', 
      color: 'from-red-500 to-rose-600', 
      bgImage: '/images/sugarcane_bg.png',
      tag: 'Education'
    },
    { 
      icon: HelpCircle, 
      title: '24/7 Assistance', 
      description: 'Connect with local experts and get instant troubleshooting.', 
      link: '/help', 
      color: 'from-teal-500 to-cyan-600', 
      bgImage: '/images/water_irrigation.png',
      tag: 'Support'
    },
  ];

  const stats = [
    { number: '50,000+', label: 'Active Farmers', icon: Users, color: 'text-emerald-500' },
    { number: '120+', label: 'Digital Guides', icon: BookOpen, color: 'text-amber-500' },
    { number: '98%', label: 'Accuracy Rate', icon: Zap, color: 'text-blue-500' },
    { number: '₹4.5Cr+', label: 'Farmer Profits', icon: TrendingUp, color: 'text-purple-500' },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-20 rounded-b-[3rem] lg:rounded-b-[5rem] overflow-hidden shadow-2xl">
        <div className="absolute inset-0">
          <img 
            src="/images/hero_bg.png" 
            alt="Farming" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-400 text-sm font-black tracking-widest mb-8"
            >
              <Zap size={18} fill="currentColor" />
              <TranslatedText>Revolutionizing Agriculture</TranslatedText>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.95] text-left">
              <TranslatedText>Cultivate</TranslatedText> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">
                <TranslatedText>The Future</TranslatedText>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 font-bold mb-12 max-w-xl leading-relaxed text-left">
              <TranslatedText>Join Maharashtra's most advanced digital farming ecosystem. Increase yield, reduce risk, and maximize profits with AI.</TranslatedText>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-start items-center sm:items-start">
              <Link
                to="/register"
                className="group relative px-10 py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-4 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <TranslatedText>Start Free Journey</TranslatedText>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <Link
                to="/videos"
                className="px-10 py-6 bg-white/10 backdrop-blur-md text-white border-2 border-white/20 rounded-[2rem] font-black text-xl hover:bg-white/20 transition-all flex items-center justify-center gap-4"
              >
                <PlayCircle size={24} />
                <TranslatedText>Watch Demo</TranslatedText>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modern Stats Section */}
      <section className="relative z-20 py-24 -mt-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-10 rounded-[4rem] shadow-[0_8px_60px_rgb(0,0,0,0.06)] border border-gray-100 text-center hover:shadow-2xl transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-6 shadow-inner`}>
                  <stat.icon className={stat.color} size={32} />
                </div>
                <div className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">{stat.number}</div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <TranslatedText>{stat.label}</TranslatedText>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Grid */}
      <section className="py-32 bg-gray-50/50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-6">
                <Globe size={14} />
                <TranslatedText>Full Ecosystem</TranslatedText>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight">
                <TranslatedText>Master Every Step Of Your Cultivation</TranslatedText>
              </h2>
            </div>
            <p className="text-xl text-gray-500 font-bold max-w-sm">
              <TranslatedText>Everything from seed selection to marketplace distribution, localized for Maharashtra.</TranslatedText>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative h-[500px] rounded-[4rem] overflow-hidden shadow-xl"
              >
                <Link to={feature.link} className="block w-full h-full">
                  {/* Background Image & Overlay */}
                  <img 
                    src={feature.bgImage} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={feature.title}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent group-hover:via-gray-900/60 transition-all duration-500`} />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-12 flex flex-col justify-end">
                    <div className="mb-6">
                      <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest mb-4 border border-white/10">
                        <TranslatedText>{feature.tag}</TranslatedText>
                      </div>
                      <h3 className="text-4xl font-black text-white mb-4 leading-none">
                        <TranslatedText>{feature.title}</TranslatedText>
                      </h3>
                      <p className="text-gray-300 font-bold text-lg mb-8 line-clamp-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <TranslatedText>{feature.description}</TranslatedText>
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-8 border-t border-white/10">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10 group-hover:bg-emerald-500 transition-colors">
                        <feature.icon size={28} />
                      </div>
                      <ChevronRight size={32} className="text-white/40 group-hover:text-white transition-all transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="bg-gray-900 rounded-[4rem] p-16 lg:p-24 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
              <Award size={400} />
            </div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-5xl font-black mb-8 leading-[0.95] tracking-tighter">
                  <TranslatedText>Built for Maharashtra's Soils</TranslatedText>
                </h2>
                <p className="text-2xl text-gray-400 font-bold mb-12">
                  <TranslatedText>We combine generational farming wisdom with state-of-the-art satellite data and machine learning.</TranslatedText>
                </p>
                <div className="flex flex-col gap-6">
                  {[
                    'Deep localization for 36 districts',
                    'Marathi-first educational experience',
                    'Offline support for remote villages'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Shield size={16} className="text-emerald-400" />
                      </div>
                      <span className="text-xl font-bold"><TranslatedText>{item}</TranslatedText></span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Yield Growth', value: '+35%', icon: TrendingUp },
                  { label: 'Risk Reduc.', value: '-50%', icon: Shield },
                  { label: 'Expert Hours', value: '24/7', icon: HelpCircle },
                  { label: 'Free Access', value: '100%', icon: Globe }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem]">
                    <item.icon className="text-emerald-400 mb-4" size={32} />
                    <div className="text-4xl font-black mb-1 tracking-tighter">{item.value}</div>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-40 overflow-hidden bg-white">
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-inner">
              <Leaf size={48} />
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-none">
              <TranslatedText>Ready to Transform Your Farm?</TranslatedText>
            </h2>
            <p className="text-2xl text-gray-500 font-bold mb-12 max-w-2xl mx-auto">
              <TranslatedText>Join thousands of successful farmers who have already digitized their operations with Smart Krishi.</TranslatedText>
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-4 px-12 py-8 bg-gray-900 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:bg-black transition-all group"
            >
              <TranslatedText>Join Now for Free</TranslatedText>
              <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
        
        {/* Background Decorations */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-100 rounded-full blur-[120px] opacity-50 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-50 -translate-y-1/2" />
      </section>
    </div>
  );
};

export default Home;