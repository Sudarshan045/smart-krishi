import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Droplets, Sun, Shield, Sprout, Tractor, Leaf, ArrowLeft, ChevronRight, Award, Clock, TrendingUp } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Guide = () => {
  const { cropId } = useParams();
  const [selectedCrop, setSelectedCrop] = useState(cropId || 'sugarcane');
  const [activeSection, setActiveSection] = useState(0);

  const crops = {
    sugarcane: {
      name: 'Sugarcane',
      nameMarathi: 'उस',
      icon: <Sprout size={24} />,
      color: 'from-green-500 to-green-600',
      bgImage: 'https://images.unsplash.com/photo-1598113389038-2f74f2c1e4b5?w=800',
      yield: '70-100 tonnes/ha',
      profit: '₹1,20,000 - ₹2,30,000/ha',
      duration: '10-12 months',
      sections: [
        {
          title: 'Land Preparation',
          titleMarathi: 'जमीन तयारी',
          icon: Tractor,
          content: 'Deep plowing with disc plow followed by harrowing. Create furrows at 90-120 cm spacing.',
          tips: ['Use well-drained soil', 'pH should be 6.5-7.5', 'Apply FYM 25-30 tons/ha']
        },
        {
          title: 'Planting',
          titleMarathi: 'लागवड',
          icon: Sprout,
          content: 'Planting time: February-March (spring) and October-November (autumn). Use healthy setts with 3-4 buds.',
          tips: ['Soak setts in water for 24 hours', 'Treat with fungicide', 'Maintain row spacing']
        },
        {
          title: 'Irrigation',
          titleMarathi: 'सिंचन',
          icon: Droplets,
          content: 'First irrigation immediately after planting. Subsequent irrigations at 7-10 days interval.',
          tips: ['Drip irrigation saves 40% water', 'Avoid water logging', 'Stop irrigation 15 days before harvest']
        },
        {
          title: 'Fertilizers',
          titleMarathi: 'खते',
          icon: Leaf,
          content: 'Apply 250:125:125 kg NPK per hectare. Split application in 3 doses.',
          tips: ['Use organic manure', 'Apply zinc sulphate if deficient', 'Foliar spray of micronutrients']
        },
        {
          title: 'Pest Management',
          titleMarathi: 'किड नियंत्रण',
          icon: Shield,
          content: 'Common pests: Stem borer, Pyrilla, White grub. Use integrated pest management.',
          tips: ['Install pheromone traps', 'Use resistant varieties', 'Biological control with Trichogramma']
        },
        {
          title: 'Harvesting',
          titleMarathi: 'कापणी',
          icon: Tractor,
          content: 'Harvest at 10-12 months when cane is mature. Sugar content peaks at this time.',
          tips: ['Harvest during dry weather', 'Cut close to ground', 'Process within 24 hours']
        }
      ]
    },
    grapes: {
      name: 'Grapes',
      nameMarathi: 'द्राक्ष',
      icon: <Leaf size={24} />,
      color: 'from-purple-500 to-purple-600',
      bgImage: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800',
      yield: '20-30 tonnes/ha',
      profit: '₹5,00,000 - ₹19,00,000/ha',
      duration: '120-140 days',
      sections: [
        {
          title: 'Land Preparation',
          titleMarathi: 'जमीन तयारी',
          icon: Tractor,
          content: 'Deep plowing and leveling. Dig pits of 90x90x90 cm at 3x3 m spacing.',
          tips: ['Well-drained sandy loam soil', 'pH 6.5-7.0', 'Add compost and bone meal']
        },
        {
          title: 'Planting',
          titleMarathi: 'लागवड',
          icon: Sprout,
          content: 'Planting time: December-January. Use grafted vines from certified nurseries.',
          tips: ['Plant at 3x3 m spacing', 'Install trellis system', 'Mulch around plants']
        },
        {
          title: 'Pruning',
          titleMarathi: 'छाटणी',
          icon: Leaf,
          content: 'Two pruning seasons: Back pruning (April-May) and forward pruning (October-November).',
          tips: ['Use sharp, clean tools', 'Remove dead wood', 'Maintain fruiting canes']
        },
        {
          title: 'Irrigation',
          titleMarathi: 'सिंचन',
          icon: Droplets,
          content: 'Drip irrigation is ideal. Water requirement varies by growth stage.',
          tips: ['Reduce water during flowering', 'Increase during berry development', 'Stop before harvest']
        },
        {
          title: 'Disease Management',
          titleMarathi: 'रोग नियंत्रण',
          icon: Shield,
          content: 'Major diseases: Downy mildew, Powdery mildew, Anthracnose.',
          tips: ['Sulfur spray for powdery mildew', 'Copper fungicides for downy mildew', 'Remove infected parts']
        },
        {
          title: 'Harvesting',
          titleMarathi: 'कापणी',
          icon: Tractor,
          content: 'Harvest at 120-140 days after pruning when berries are sweet and colored.',
          tips: ['Harvest in cool morning hours', 'Cut bunches with scissors', 'Handle carefully']
        }
      ]
    }
  };

  const crop = crops[selectedCrop];

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Back Button */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-6"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700">
            <ArrowLeft size={20} /> Back to Home
          </Link>
        </motion.div>

        {/* Crop Selection Tabs */}
        <div className="flex gap-4 mb-8 justify-center">
          {['sugarcane', 'grapes'].map((crop) => (
            <motion.button
              key={crop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCrop(crop)}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                selectedCrop === crop
                  ? `bg-gradient-to-r ${crops[crop].color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {crops[crop].name} ({crops[crop].nameMarathi})
            </motion.button>
          ))}
        </div>

        {/* Crop Header with Parallax */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden mb-12"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${crop.bgImage})` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${crop.color} opacity-90`} />
          </div>
          <div className="relative p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                {crop.icon}
              </div>
              <div>
                <h1 className="text-4xl font-bold">{crop.name}</h1>
                <p className="text-xl opacity-90">{crop.nameMarathi}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <Award size={20} />
                <div>
                  <div className="text-sm opacity-80">Average Yield</div>
                  <div className="font-semibold">{crop.yield}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <TrendingUp size={20} />
                <div>
                  <div className="text-sm opacity-80">Expected Profit</div>
                  <div className="font-semibold">{crop.profit}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <Clock size={20} />
                <div>
                  <div className="text-sm opacity-80">Growing Duration</div>
                  <div className="font-semibold">{crop.duration}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Navigation */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
          {crop.sections.map((section, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveSection(idx)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeSection === idx
                  ? `bg-gradient-to-r ${crop.color} text-white shadow-md`
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {section.title}
            </motion.button>
          ))}
        </div>

        {/* Active Section Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className={`bg-gradient-to-r ${crop.color} p-6 text-white`}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-full">
                  {React.createElement(crop.sections[activeSection].icon, { size: 24 })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{crop.sections[activeSection].title}</h2>
                  <p className="opacity-90">{crop.sections[activeSection].titleMarathi}</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <p className="text-gray-700 text-lg mb-6">{crop.sections[activeSection].content}</p>
              <div className="bg-amber-50 rounded-xl p-6">
                <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                  <Sun size={20} /> Pro Tips & Best Practices
                </h3>
                <ul className="space-y-2">
                  {crop.sections[activeSection].tips.map((tip, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <ChevronRight size={16} className="text-amber-600 mt-1" />
                      {tip}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Guide;