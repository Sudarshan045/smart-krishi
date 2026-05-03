import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, ExternalLink, Star, Package, Filter, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TranslatedText from '../components/common/TranslatedText';
import { marketplaceProducts } from '../data/marketplaceProducts';

const Marketplace = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Pesticides', 'Fertilizers', 'Seeds', 'Tools', 'Equipment'];

  const filteredProducts = useMemo(() => {
    return marketplaceProducts.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="py-0 bg-white min-h-screen">
      {/* Premium Hero Section */}
      <div className="relative py-24 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/marketplace_bg.png")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/95 via-[#0f172a]/80 to-transparent" />
        </div>

        <div className="container-custom relative z-10 text-white">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-md px-4 py-2 rounded-full text-green-400 text-sm font-bold mb-6 border border-green-500/30"
            >
              <Award size={18} />
              <span><TranslatedText>Verified Quality Products</TranslatedText></span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            >
              <TranslatedText>Smart Krishi</TranslatedText> <span className="text-green-500"><TranslatedText>Marketplace</TranslatedText></span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 mb-10 leading-relaxed"
            >
              <TranslatedText>Find everything you need for your farm - from top-quality pesticides to modern machinery.</TranslatedText>
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text"
                  placeholder={language === 'en' ? "Search for products..." : "उत्पादने शोधा..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/10 focus:border-green-500 focus:ring-0 backdrop-blur-md transition-all text-white placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="container-custom -mt-10 relative z-20">
        {/* Slidable Categories */}
        <div className="flex overflow-x-auto gap-3 pb-8 no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-4 rounded-2xl whitespace-nowrap font-bold transition-all shadow-xl ${
                activeCategory === cat 
                  ? 'bg-green-600 text-white translate-y-[-4px]' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
              }`}
            >
              <TranslatedText>{cat}</TranslatedText>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 group flex flex-col"
              >
                <div className="aspect-[5/4] overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute top-5 right-5 glass-dark px-3 py-1.5 rounded-full flex items-center gap-1.5 text-white shadow-lg">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-black">{product.rating}</span>
                  </div>
                  <div className="absolute top-5 left-5 flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-100 w-fit">
                      <span className="text-[10px] font-black uppercase tracking-widest text-green-700">
                        <TranslatedText>{product.category}</TranslatedText>
                      </span>
                    </div>
                    {product.crop && (
                      <div className="bg-amber-500/90 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-400 w-fit shadow-lg">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">
                          {product.crop}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase block mb-0.5">Best Price</span>
                      <p className="text-3xl font-bold text-gray-900 leading-none">₹{product.price}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                        Per {product.unit}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 mt-8">
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-4 bg-[#0f172a] text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-black/20 group/btn"
                    >
                      <TranslatedText>Buy Now</TranslatedText>
                      <ExternalLink size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-32 bg-gray-50 rounded-[4rem] border-2 border-dashed border-gray-200">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl text-gray-300">
              <Package size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2"><TranslatedText>No products found</TranslatedText></h3>
            <p className="text-gray-500"><TranslatedText>Try adjusting your search or category filter</TranslatedText></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
