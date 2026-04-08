import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Calculator, Calendar, Video, HelpCircle, Shield, ArrowRight, TrendingUp, Leaf, Users } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Home = () => {
  const features = [
    { icon: BookOpen, title: 'Crop Guides', description: 'Expert guides for Sugarcane & Grapes', link: '/guide/sugarcane', color: 'from-green-500 to-green-600', image: '🌾' },
    { icon: Calculator, title: 'Cost Calculator', description: 'Calculate profits & investments', link: '/calculator', color: 'from-amber-500 to-amber-600', image: '💰' },
    { icon: Calendar, title: 'Crop Calendar', description: 'Monthly farming activities', link: '/calendar', color: 'from-blue-500 to-blue-600', image: '📅' },
    { icon: Shield, title: 'Govt Schemes', description: 'Latest agriculture schemes', link: '/schemes', color: 'from-purple-500 to-purple-600', image: '🛡️' },
    { icon: Video, title: 'Video Learning', description: 'Watch farming tutorials', link: '/videos', color: 'from-red-500 to-red-600', image: '🎥' },
    { icon: HelpCircle, title: '24/7 Support', description: 'Get farming assistance', link: '/help', color: 'from-teal-500 to-teal-600', image: '💬' },
  ];

  const stats = [
    { number: '50K+', label: 'Active Farmers', icon: Users },
    { number: '100+', label: 'Expert Guides', icon: BookOpen },
    { number: '95%', label: 'Satisfaction Rate', icon: TrendingUp },
    { number: '20+', label: 'Govt Schemes', icon: Shield },
  ];

  return (
    <div>
      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-800/85 to-amber-800/90" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: '100vh', x: Math.random() * 100 + '%' }}
              animate={{ y: '-20vh' }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{ left: Math.random() * 100 + '%' }}
            />
          ))}
        </div>

        <div className="container-custom relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4 inline-block">
                🌱 Welcome to Smart Farming
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Grow Smarter with
              <span className="block text-amber-300">Smart Krishi</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-2xl mx-auto">
              Your AI-powered farming companion for higher yields and better profits
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition shadow-lg"
                >
                  Start Farming Journey
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/guide/sugarcane"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/30 transition border border-white/30"
                >
                  Explore Crop Guides
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="text-green-600" size={32} />
                  </div>
                  <div className="text-3xl font-bold text-green-800">{stat.number}</div>
                  <div className="text-gray-600 mt-1">{stat.label}</div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-amber-50">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-800 mb-4">Smart Farming Solutions</h2>
            <p className="text-xl text-gray-600">Everything you need to succeed in modern agriculture</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <Link to={feature.link}>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <div className={`bg-gradient-to-r ${feature.color} p-6 text-white relative overflow-hidden`}>
                        <div className="absolute right-0 bottom-0 opacity-10 text-8xl transform translate-x-4 translate-y-4">
                          {feature.image}
                        </div>
                        <feature.icon size={48} className="relative z-10" />
                        <h3 className="text-2xl font-bold mt-4 relative z-10">{feature.title}</h3>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-600 mb-4">{feature.description}</p>
                        <span className="inline-flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                          Learn More <ArrowRight size={18} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Parallax */}
      <section className="relative py-20 bg-fixed bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600")'
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-800/90" />
        <div className="container-custom relative z-10 text-center text-white">
          <AnimatedSection>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block mb-6"
            >
              <Leaf size={64} className="mx-auto" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Transform Your Farming?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers already using Smart Krishi to increase their yields
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition shadow-lg"
              >
                Get Started Today
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;