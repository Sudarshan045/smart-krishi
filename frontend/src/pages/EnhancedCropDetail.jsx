import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { 
  Droplets, Sun, Shield, Sprout, Tractor, Leaf, 
  ArrowLeft, ChevronRight, Award, Clock, TrendingUp,
  AlertTriangle, CheckCircle, Calendar, DollarSign,
  Thermometer, Wind, Bug, Scissors, Package, BookOpen,
  MapPin, CloudRain, Search, FlaskConical, Image as ImageIcon
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const EnhancedCropDetail = () => {
  const { cropId } = useParams();
  const [selectedCrop, setSelectedCrop] = useState(cropId || 'sugarcane');
  const [activeSection, setActiveSection] = useState(0);
  const [showTroubleshooter, setShowTroubleshooter] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const crops = {
    sugarcane: {
      name: 'Sugarcane',
      nameMarathi: 'उस',
      icon: <Sprout size={24} />,
      color: 'from-green-500 to-green-600',
      bgImage: 'https://images.unsplash.com/photo-1598113389038-2f74f2c1e4b5?w=1200',
      yield: '70-100 tonnes/ha',
      profit: '₹1,20,000 - ₹2,30,000/ha',
      duration: '10-12 months',
      bestSeason: 'February-March (Spring), October-November (Autumn)',
      tempRange: '20-35°C',
      rainfall: '1000-1500 mm',
      soilType: 'Well-drained loamy soil, pH 6.5-7.5',
      sections: [
        {
          id: 1,
          title: 'Climate & Location Requirements',
          icon: Thermometer,
          image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600',
          details: [
            '🌡️ Temperature: 20-35°C (optimum 24-32°C)',
            '☔ Rainfall: 1000-1500 mm annually',
            '⛰️ Altitude: Up to 1000 meters above sea level',
            '☀️ Sunlight: 8-10 hours daily',
            '💧 Humidity: 60-80% relative humidity ideal'
          ],
          warnings: ['❌ Avoid frost-prone areas', '❌ Avoid waterlogged areas', '❌ Avoid very high temperatures (>40°C)'],
          tips: ['Choose location with good sunlight', 'Ensure proper drainage']
        },
        {
          id: 2,
          title: 'Soil Selection & Preparation',
          icon: MapPin,
          image: 'https://images.unsplash.com/photo-1516245834210-c4c142785335?w=600',
          details: [
            '🌱 Soil Type: Deep well-drained loamy or clay loam soil',
            '🧪 pH Range: 6.5-7.5',
            '📏 Soil Depth: Minimum 1 meter',
            '💧 Drainage: Excellent drainage required',
            '🔄 Previous Crop: Best after leguminous crops'
          ],
          steps: [
            'Deep plowing with disc plow (30-40 cm depth)',
            'Harrowing 2-3 times to break clods',
            'Leveling with laser leveler',
            'Apply FYM 25-30 tons/ha',
            'Create furrows at 90-120 cm spacing'
          ],
          cost: '₹8,000-12,000 per hectare'
        },
        {
          id: 3,
          title: 'Variety Selection',
          icon: Leaf,
          image: 'https://images.unsplash.com/photo-1598113389038-2f74f2c1e4b5?w=600',
          varieties: [
            { name: 'Co 86032', duration: '12 months', yield: '85-90 t/ha', sugar: '18-20%', bestFor: 'Sugar production' },
            { name: 'CoM 0265', duration: '11 months', yield: '90-95 t/ha', sugar: '19-21%', bestFor: 'High sugar recovery' },
            { name: 'Co 94012', duration: '10 months', yield: '80-85 t/ha', sugar: '17-19%', bestFor: 'Early maturity' },
            { name: 'Co 62175', duration: '11 months', yield: '75-80 t/ha', sugar: '16-18%', bestFor: 'Jaggery making' }
          ],
          tips: ['Buy seeds from certified nurseries', 'Check for disease-free setts', 'Consider local climate conditions']
        },
        {
          id: 4,
          title: 'Pest Management with Visual Guide',
          icon: Bug,
          image: 'https://images.unsplash.com/photo-1587137854008-5df6d3a2b95f?w=600',
          pests: [
            { 
              name: 'Stem Borer', 
              image: 'https://images.unsplash.com/photo-1587137854008-5df6d3a2b95f?w=400',
              symptoms: 'Dead heart (central leaf dries)', 
              organic: 'Trichogramma cards, Pheromone traps', 
              chemical: 'Carbofuran 3G 8 kg/ha', 
              prevention: 'Remove infected plants, resistant varieties' 
            },
            { 
              name: 'Pyrilla (Leaf Hopper)', 
              image: 'https://images.unsplash.com/photo-1587137854008-5df6d3a2b95f?w=400',
              symptoms: 'Yellowing leaves, sooty mold', 
              organic: 'Release Epiricania melanoleuca', 
              chemical: 'Malathion 1.5 ml/L', 
              prevention: 'Avoid excess nitrogen' 
            },
            { 
              name: 'White Grub', 
              image: 'https://images.unsplash.com/photo-1587137854008-5df6d3a2b95f?w=400',
              symptoms: 'Wilting, dead plants in patches', 
              organic: 'Light traps, Bird perches', 
              chemical: 'Chlorpyriphos 2 ml/L', 
              prevention: 'Summer plowing' 
            },
            { 
              name: 'Termites', 
              image: 'https://images.unsplash.com/photo-1587137854008-5df6d3a2b95f?w=400',
              symptoms: 'Plants dry, can be pulled easily', 
              organic: 'Neem cake application', 
              chemical: 'Chlorpyriphos dust', 
              prevention: 'Treat setts before planting' 
            }
          ],
          tips: ['Monitor crops daily', 'Use integrated pest management', 'Rotate pesticides']
        },
        {
          id: 5,
          title: 'Disease Management with Visual Guide',
          icon: Shield,
          image: 'https://images.unsplash.com/photo-1587137854008-5df6d3a2b95f?w=600',
          diseases: [
            { 
              name: 'Red Rot', 
              image: 'https://images.unsplash.com/photo-1587137854008-5df6d3a2b95f?w=400',
              symptoms: 'Red lesions inside cane', 
              organic: 'Resistant varieties (Co 86032)', 
              chemical: 'Carbendazim 1g/L seed treatment', 
              prevention: 'Treat setts, crop rotation' 
            },
            { 
              name: 'Smut', 
              image: 'https://images.unsplash.com/photo-1587137854008-5df6d3a2b95f?w=400',
              symptoms: 'Whip-like structure from top', 
              organic: 'Hot water treatment (50°C for 2 hours)', 
              chemical: 'Triademefon spray', 
              prevention: 'Remove infected clumps' 
            },
            { 
              name: 'Wilt', 
              image: 'https://images.unsplash.com/photo-1587137854008-5df6d3a2b95f?w=400',
              symptoms: 'Leaf yellowing, stunted growth', 
              organic: 'FYM application, Trichoderma', 
              chemical: 'Carbendazim drench', 
              prevention: 'Well-drained soil' 
            },
            { 
              name: 'Grassy Shoot', 
              image: 'https://images.unsplash.com/photo-1587137854008-5df6d3a2b95f?w=400',
              symptoms: 'Thin, grassy tillers', 
              organic: 'Rogue infected plants', 
              chemical: 'No chemical control', 
              prevention: 'Use disease-free setts' 
            }
          ],
          tips: ['Use disease-free seeds', 'Remove infected plants', 'Practice crop rotation']
        },
        {
          id: 6,
          title: 'Fertilizer Management',
          icon: FlaskConical,
          image: 'https://images.unsplash.com/photo-1589923158776-cb4486d99fba?w=600',
          schedule: [
            { month: 'At planting', fertilizer: 'Basal dose', npk: '50:100:50 kg/ha', tips: 'Mix with soil' },
            { month: '30-45 days', fertilizer: '1st Top dressing', npk: '75:25:25 kg/ha', tips: 'After irrigation' },
            { month: '60-75 days', fertilizer: '2nd Top dressing', npk: '75:0:25 kg/ha', tips: 'At earthing up' },
            { month: '90-105 days', fertilizer: '3rd Top dressing', npk: '50:0:25 kg/ha', tips: 'Before monsoon' }
          ],
          organic: ['FYM: 25-30 tons/ha', 'Vermicompost: 5-8 tons/ha', 'Green Manure: Sunhemp'],
          totalNPK: '250:125:125 kg/ha',
          tips: ['Split applications for better uptake', 'Apply after irrigation']
        },
        {
          id: 7,
          title: 'Irrigation Schedule',
          icon: Droplets,
          image: 'https://images.unsplash.com/photo-1531753468986-5e4e3e2f05a7?w=600',
          schedule: [
            { stage: 'Immediately after planting', frequency: 'First irrigation', tips: 'Flood irrigation' },
            { stage: 'Germination (0-30 days)', frequency: 'Every 5-7 days', tips: 'Keep soil moist' },
            { stage: 'Tillering (30-90 days)', frequency: 'Every 7-10 days', tips: 'Promotes tillering' },
            { stage: 'Grand growth (90-240 days)', frequency: 'Every 10-12 days', tips: 'Critical period' },
            { stage: 'Maturity (240-300 days)', frequency: 'Every 15-20 days', tips: 'Reduce water' },
            { stage: '15 days before harvest', frequency: 'Stop irrigation', tips: 'Improves sugar content' }
          ],
          waterRequirement: '1500-2500 mm per season',
          tips: ['Drip irrigation saves 40-50% water', 'Avoid water logging']
        },
        {
          id: 8,
          title: 'Harvesting & Post-Harvest',
          icon: Scissors,
          image: 'https://images.unsplash.com/photo-1594655385075-9f10f3a6da0a?w=600',
          signs: [
            'Top leaves turn yellow and dry',
            'Canes become hard',
            'Sugar content peaks (20-22% brix)',
            '10-12 months after planting'
          ],
          methods: [
            { method: 'Manual Harvesting', tools: 'Sugarcane knife', labor: '20-25 laborers/ha', cost: '₹5,000-7,000/ha' },
            { method: 'Mechanical Harvesting', tools: 'Harvester', labor: '2-3 operators', cost: '₹10,000-12,000/ha' }
          ],
          tips: ['Harvest in dry weather', 'Cut close to ground', 'Process within 24 hours']
        },
        {
          id: 9,
          title: 'Profit Maximization Tips',
          icon: TrendingUp,
          image: 'https://images.unsplash.com/photo-1594655385075-9f10f3a6da0a?w=600',
          tips: [
            '💰 Use drip irrigation - Save 40% water and increase yield by 20%',
            '🌾 Practice intercropping - Earn ₹20,000-30,000 extra per hectare',
            '🍬 Make jaggery instead of selling to mill - 50% higher profit',
            '🌱 Use organic farming - Premium price in market',
            '🤝 Join farmer cooperative - Better bargaining power',
            '📅 Harvest at right time - Maximum sugar content'
          ],
          schemes: ['PM-KISAN: ₹6,000/year', 'Micro Irrigation Subsidy: 80%', 'Soil Health Card: Free testing']
        }
      ],
      troubleshooter: {
        problems: [
          { problem: 'Poor germination', causes: ['Old setts', 'Dry soil', 'Deep planting'], solutions: ['Use fresh setts', 'Irrigate immediately', 'Maintain 5-8 cm depth'] },
          { problem: 'Yellow leaves', causes: ['Nitrogen deficiency', 'Waterlogging'], solutions: ['Apply urea', 'Improve drainage'] },
          { problem: 'Thin canes', causes: ['Low nitrogen', 'Water stress'], solutions: ['Top dress urea', 'Regular irrigation'] },
          { problem: 'Low sugar', causes: ['Early harvest', 'Excess water'], solutions: ['Harvest at 10-12 months', 'Stop irrigation 15 days before'] }
        ]
      },
      checklist: {
        items: [
          { season: 'Pre-Planting', tasks: ['Soil testing', 'Land preparation', 'Arrange seeds', 'Budget planning'] },
          { season: 'Planting', tasks: ['Sett cutting', 'Seed treatment', 'Furrow making', 'Planting', 'Basal fertilizer'] },
          { season: 'Early Growth', tasks: ['First irrigation', 'Gap filling', 'First weeding', 'First fertilizer'] },
          { season: 'Active Growth', tasks: ['Regular irrigation', 'Second fertilizer', 'Pest monitoring', 'Intercropping'] },
          { season: 'Maturity', tasks: ['Stop irrigation', 'Sugar testing', 'Harvest planning', 'Arrange labor'] },
          { season: 'Harvest', tasks: ['Harvesting', 'Processing', 'Record keeping', 'Field cleanup'] }
        ]
      }
    },
    grapes: {
      name: 'Grapes',
      nameMarathi: 'द्राक्ष',
      icon: <Leaf size={24} />,
      color: 'from-purple-500 to-purple-600',
      bgImage: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=1200',
      yield: '20-30 tonnes/ha',
      profit: '₹5,00,000 - ₹19,00,000/ha',
      duration: '120-140 days after pruning',
      bestSeason: 'January-February (pruning), March (bud break)',
      tempRange: '15-35°C',
      rainfall: '500-700 mm',
      soilType: 'Well-drained sandy loam, pH 6.5-7.0',
      sections: [
        {
          id: 1,
          title: 'Climate & Location Requirements',
          icon: Thermometer,
          image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600',
          details: [
            '🌡️ Temperature: 15-35°C (optimum 25-30°C)',
            '☔ Rainfall: 500-700 mm',
            '⛰️ Altitude: 200-800 meters',
            '☀️ Sunlight: Full sun exposure required',
            '🌙 Dry spell: 2-3 months dry period needed'
          ],
          warnings: ['Avoid high humidity areas', 'Avoid frost-prone areas', 'Avoid heavy rainfall during flowering']
        },
        {
          id: 2,
          title: 'Soil Selection & Preparation',
          icon: MapPin,
          image: 'https://images.unsplash.com/photo-1516245834210-c4c142785335?w=600',
          details: [
            '🌱 Soil Type: Sandy loam to clay loam, well-drained',
            '🧪 pH Range: 6.5-7.5',
            '📏 Soil Depth: Minimum 1.5 meters',
            '🌿 Organic Matter: 1-2% ideal',
            '💧 Drainage: Excellent drainage required'
          ],
          steps: [
            'Deep plowing (60-90 cm depth)',
            'Add FYM (25-30 tons/ha)',
            'Dig pits 90x90x90 cm at 3x3 m spacing',
            'Mix soil with compost and bone meal',
            'Install trellis/pandhal system before planting'
          ],
          cost: '₹15,000-20,000 per hectare'
        },
        {
          id: 3,
          title: 'Pest Management',
          icon: Bug,
          image: 'https://images.unsplash.com/photo-1587137854008-5df6d3a2b95f?w=600',
          pests: [
            { name: 'Thrips', symptoms: 'Silvery streaks', organic: 'Blue sticky traps', chemical: 'Spinosad', prevention: 'Monitor from bud break' },
            { name: 'Mites', symptoms: 'Reddish-brown leaves', organic: 'Sulfur dust', chemical: 'Dicofol', prevention: 'Avoid water stress' },
            { name: 'Mealybugs', symptoms: 'White cottony mass', organic: 'Release Cryptolaemus', chemical: 'Buprofezin', prevention: 'Prune infested parts' }
          ],
          tips: ['Install pheromone traps', 'Use neem oil 5 ml/L every 10 days', 'Remove infested parts']
        },
        {
          id: 4,
          title: 'Disease Management',
          icon: Shield,
          image: 'https://images.unsplash.com/photo-1587137854008-5df6d3a2b95f?w=600',
          diseases: [
            { name: 'Downy Mildew', symptoms: 'Yellow spots', organic: 'Copper spray', chemical: 'Metalaxyl', prevention: 'Avoid overhead irrigation' },
            { name: 'Powdery Mildew', symptoms: 'White powder', organic: 'Milk spray', chemical: 'Sulfur', prevention: 'Good air circulation' },
            { name: 'Anthracnose', symptoms: 'Brown spots', organic: 'Garlic extract', chemical: 'Carbendazim', prevention: 'Prune affected parts' }
          ],
          tips: ['Regular monitoring', 'Remove infected leaves', 'Maintain proper spacing']
        },
        {
          id: 5,
          title: 'Pruning Guide',
          icon: Scissors,
          image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600',
          pruning: [
            { season: 'Back Pruning (April-May)', purpose: 'Summer crop', method: 'Cut back to 2-3 buds' },
            { season: 'Forward Pruning (October-November)', purpose: 'Winter crop', method: 'Cut to 4-6 buds' }
          ],
          steps: [
            'Select healthy canes for fruiting',
            'Remove dead, diseased, weak canes',
            'Cut selected canes at 45° angle',
            'Leave 2-6 buds per cane',
            'Apply Bordeaux paste on cuts'
          ],
          tips: ['Use sharp, clean tools', 'Don\'t prune in wet weather', 'Disinfect tools between plants']
        },
        {
          id: 6,
          title: 'Fertilizer Management',
          icon: FlaskConical,
          image: 'https://images.unsplash.com/photo-1589923158776-cb4486d99fba?w=600',
          schedule: [
            { stage: 'Pre-planting', fertilizer: 'FYM 25 t/ha + SSP 500 kg/ha' },
            { stage: 'After pruning', fertilizer: 'Urea 100 kg + MOP 100 kg/ha' },
            { stage: 'Bud break', fertilizer: '19:19:19 100 kg/ha (foliar)' },
            { stage: 'Shoot growth', fertilizer: 'Urea 50 kg + DAP 100 kg/ha' },
            { stage: 'Flowering', fertilizer: '0:52:34 50 kg/ha' },
            { stage: 'Fruit set', fertilizer: '13:0:45 100 kg/ha' },
            { stage: 'Berry development', fertilizer: '12:61:0 50 kg/ha + MOP 150 kg' },
            { stage: 'Veraison', fertilizer: 'SOP 100 kg/ha' }
          ],
          tips: ['Balance fertilizers', 'Reduce nitrogen after flowering', 'Emphasis on potash for quality']
        },
        {
          id: 7,
          title: 'Harvesting & Post-Harvest',
          icon: Scissors,
          image: 'https://images.unsplash.com/photo-1594655385075-9f10f3a6da0a?w=600',
          signs: [
            'Sweet taste (15-20% TSS)',
            'Characteristic color of variety',
            'Easy detachment from pedicel'
          ],
          tips: ['Harvest early morning', 'Cut bunches with 5-10 cm stem', 'Grade by size and quality', 'Store in cold storage at 0-2°C']
        },
        {
          id: 8,
          title: 'Profit Maximization',
          icon: TrendingUp,
          image: 'https://images.unsplash.com/photo-1594655385075-9f10f3a6da0a?w=600',
          tips: [
            '💰 Use drip irrigation - Save 40% water, increase yield 20%',
            '🍇 Practice fruit thinning - Double berry size',
            '🍇 Make raisins - 3x profit compared to fresh',
            '📦 Export quality production - 3-4x price premium',
            '🌱 Organic certification - 50% premium price',
            '💊 Use GA3 for seedless varieties - 50% larger berries'
          ],
          returns: '₹5-20 lakhs net profit per hectare per year'
        }
      ],
      troubleshooter: {
        problems: [
          { problem: 'Poor bud break', causes: ['Insufficient chilling', 'Weak vines'], solutions: ['Apply Dormex 2%', 'Balanced nutrition'] },
          { problem: 'Flower drop', causes: ['High temperature', 'Boron deficiency'], solutions: ['Spray water', 'Boron 0.2% spray'] },
          { problem: 'Small berries', causes: ['No thinning', 'Water stress'], solutions: ['Thin to 30 bunches', 'Regular irrigation'] },
          { problem: 'Berry cracking', causes: ['Irregular water', 'Calcium deficiency'], solutions: ['Drip irrigation', 'Calcium spray'] }
        ]
      },
      checklist: {
        items: [
          { season: 'Pre-Planting', tasks: ['Soil testing', 'Trellis installation', 'Pit digging', 'Arrange vines'] },
          { season: 'Planting', tasks: ['Planting vines', 'Initial irrigation', 'Mulching', 'Training'] },
          { season: 'Pruning', tasks: ['Back/forward pruning', 'Apply Bordeaux paste', 'Remove pruned material'] },
          { season: 'Growth', tasks: ['Regular irrigation', 'Training & tying', 'Weed control', 'Pest monitoring'] },
          { season: 'Fruit Development', tasks: ['Thinning', 'GA3 application', 'Calcium spray', 'Cover bunches'] },
          { season: 'Harvest', tasks: ['Check maturity', 'Stop irrigation', 'Arrange packing', 'Grade & pack'] }
        ]
      }
    }
  };

  const crop = crops[selectedCrop];
  const currentSection = crop.sections[activeSection];

  const filteredSections = crop.sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Back Button & Controls */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex flex-wrap justify-between items-center gap-4 mb-6"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowTroubleshooter(!showTroubleshooter)}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200"
            >
              <AlertTriangle size={16} /> Troubleshooter
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowChecklist(!showChecklist)}
              className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200"
            >
              <CheckCircle size={16} /> Checklist
            </motion.button>
          </div>
        </motion.div>

        {/* Crop Selection Tabs */}
        <div className="flex gap-4 mb-8 justify-center">
          {['sugarcane', 'grapes'].map((c) => (
            <motion.button
              key={c}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedCrop(c);
                setActiveSection(0);
                setShowTroubleshooter(false);
                setShowChecklist(false);
              }}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                selectedCrop === c
                  ? `bg-gradient-to-r ${crops[c].color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {crops[c].name} ({crops[c].nameMarathi})
            </motion.button>
          ))}
        </div>

        {/* Crop Header with Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden mb-8 h-96"
        >
          <img 
            src={crop.bgImage} 
            alt={crop.name}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${crop.color} opacity-80`} />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                {crop.icon}
              </div>
              <div>
                <h1 className="text-4xl font-bold">{crop.name}</h1>
                <p className="text-xl opacity-90">{crop.nameMarathi}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <div className="text-sm opacity-80">Yield</div>
                <div className="font-bold">{crop.yield}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <div className="text-sm opacity-80">Profit</div>
                <div className="font-bold">{crop.profit}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <div className="text-sm opacity-80">Duration</div>
                <div className="font-bold">{crop.duration}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <div className="text-sm opacity-80">Temperature</div>
                <div className="font-bold">{crop.tempRange}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <div className="text-sm opacity-80">Soil</div>
                <div className="font-bold text-sm">{crop.soilType.substring(0, 25)}...</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search topics in this guide..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Troubleshooter Modal */}
        <AnimatePresence>
          {showTroubleshooter && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-50 rounded-2xl p-6 mb-8 border-2 border-red-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-red-800 flex items-center gap-2">
                  <AlertTriangle /> Quick Troubleshooter
                </h2>
                <button onClick={() => setShowTroubleshooter(false)} className="text-red-600">✕</button>
              </div>
              <div className="space-y-4">
                {crop.troubleshooter.problems.map((problem, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4">
                    <h3 className="font-bold text-red-700 mb-2">{problem.problem}</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold">Causes:</p>
                        <ul className="list-disc list-inside text-gray-600">
                          {problem.causes.map((cause, i) => <li key={i}>{cause}</li>)}
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold">Solutions:</p>
                        <ul className="list-disc list-inside text-gray-600">
                          {problem.solutions.map((solution, i) => <li key={i}>{solution}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Seasonal Checklist Modal */}
        <AnimatePresence>
          {showChecklist && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-50 rounded-2xl p-6 mb-8 border-2 border-green-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-green-800 flex items-center gap-2">
                  <Calendar /> Seasonal Checklist
                </h2>
                <button onClick={() => setShowChecklist(false)} className="text-green-600">✕</button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {crop.checklist.items.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4">
                    <h3 className="font-bold text-green-700 mb-2">{item.season}</h3>
                    <ul className="space-y-1">
                      {item.tasks.map((task, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <CheckCircle size={14} className="text-green-500 mt-0.5" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Navigation */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
          {filteredSections.map((section, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveSection(idx)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-2 ${
                activeSection === idx
                  ? `bg-gradient-to-r ${crop.color} text-white shadow-md`
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {React.createElement(section.icon, { size: 16 })}
              {section.title}
            </motion.button>
          ))}
        </div>

        {/* Active Section Content with Images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className={`bg-gradient-to-r ${crop.color} p-6 text-white`}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-xl">
                  {React.createElement(currentSection.icon, { size: 24 })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{currentSection.title}</h2>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              {/* Section Image */}
              {currentSection.image && (
                <div className="mb-6 rounded-xl overflow-hidden">
                  <img 
                    src={currentSection.image} 
                    alt={currentSection.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Details */}
              {currentSection.details && (
                <div className="mb-6">
                  <h3 className="font-semibold text-green-800 mb-3">📋 Key Requirements:</h3>
                  <ul className="space-y-2">
                    {currentSection.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 text-base">
                        <span className="text-green-600 mt-1">✓</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Steps */}
              {currentSection.steps && (
                <div className="mb-6">
                  <h3 className="font-semibold text-green-800 mb-3">📝 Step-by-Step Process:</h3>
                  <div className="space-y-3">
                    {currentSection.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 font-bold">{i + 1}</span>
                        </div>
                        <span className="text-gray-700 text-base">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Varieties Table */}
              {currentSection.varieties && (
                <div className="mb-6 overflow-x-auto">
                  <h3 className="font-semibold text-green-800 mb-3">🌱 Recommended Varieties:</h3>
                  <table className="min-w-full bg-gray-50 rounded-xl">
                    <thead className="bg-green-600 text-white">
                      <tr>
                        <th className="p-3 text-left">Variety</th>
                        <th className="p-3 text-left">Duration</th>
                        <th className="p-3 text-left">Yield</th>
                        <th className="p-3 text-left">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSection.varieties.map((variety, i) => (
                        <tr key={i} className="border-b">
                          <td className="p-3 font-semibold">{variety.name}</td>
                          <td className="p-3">{variety.duration}</td>
                          <td className="p-3">{variety.yield}</td>
                          <td className="p-3">{variety.bestFor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pests with Images */}
              {currentSection.pests && currentSection.pests[0]?.image && (
                <div className="mb-6">
                  <h3 className="font-semibold text-red-800 mb-3">🐛 Pest Control Guide:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {currentSection.pests.map((pest, i) => (
                      <div key={i} className="bg-red-50 rounded-xl p-4">
                        {pest.image && (
                          <img src={pest.image} alt={pest.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                        )}
                        <h4 className="font-bold text-red-700 mb-2">{pest.name}</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-semibold">Symptoms:</span> {pest.symptoms}</p>
                          <p><span className="font-semibold">Organic:</span> {pest.organic}</p>
                          <p><span className="font-semibold">Chemical:</span> {pest.chemical}</p>
                          <p><span className="font-semibold">Prevention:</span> {pest.prevention}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Simple Pests List (without images) */}
              {currentSection.pests && !currentSection.pests[0]?.image && (
                <div className="mb-6">
                  <h3 className="font-semibold text-red-800 mb-3">🐛 Pest Control Guide:</h3>
                  <div className="space-y-4">
                    {currentSection.pests.map((pest, i) => (
                      <div key={i} className="bg-red-50 rounded-xl p-4">
                        <h4 className="font-bold text-red-700 mb-2">{pest.name}</h4>
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div><span className="font-semibold">Symptoms:</span> {pest.symptoms}</div>
                          <div><span className="font-semibold">Organic:</span> {pest.organic}</div>
                          <div><span className="font-semibold">Chemical:</span> {pest.chemical}</div>
                          <div><span className="font-semibold">Prevention:</span> {pest.prevention}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Diseases with Images */}
              {currentSection.diseases && currentSection.diseases[0]?.image && (
                <div className="mb-6">
                  <h3 className="font-semibold text-red-800 mb-3">🦠 Disease Management:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {currentSection.diseases.map((disease, i) => (
                      <div key={i} className="bg-red-50 rounded-xl p-4">
                        {disease.image && (
                          <img src={disease.image} alt={disease.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                        )}
                        <h4 className="font-bold text-red-700 mb-2">{disease.name}</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-semibold">Symptoms:</span> {disease.symptoms}</p>
                          <p><span className="font-semibold">Organic:</span> {disease.organic}</p>
                          <p><span className="font-semibold">Chemical:</span> {disease.chemical}</p>
                          <p><span className="font-semibold">Prevention:</span> {disease.prevention}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Simple Diseases List */}
              {currentSection.diseases && !currentSection.diseases[0]?.image && (
                <div className="mb-6">
                  <h3 className="font-semibold text-red-800 mb-3">🦠 Disease Management:</h3>
                  <div className="space-y-4">
                    {currentSection.diseases.map((disease, i) => (
                      <div key={i} className="bg-red-50 rounded-xl p-4">
                        <h4 className="font-bold text-red-700 mb-2">{disease.name}</h4>
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div><span className="font-semibold">Symptoms:</span> {disease.symptoms}</div>
                          <div><span className="font-semibold">Organic:</span> {disease.organic}</div>
                          <div><span className="font-semibold">Chemical:</span> {disease.chemical}</div>
                          <div><span className="font-semibold">Prevention:</span> {disease.prevention}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Schedule */}
              {currentSection.schedule && (
                <div className="mb-6">
                  <h3 className="font-semibold text-green-800 mb-3">📅 Schedule:</h3>
                  <div className="space-y-3">
                    {currentSection.schedule.map((item, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-4">
                        <div className="grid md:grid-cols-3 gap-3 text-sm">
                          <div><span className="font-semibold">Stage:</span> {item.stage || item.month}</div>
                          <div><span className="font-semibold">Fertilizer:</span> {item.fertilizer || item.frequency}</div>
                          {item.npk && <div><span className="font-semibold">NPK:</span> {item.npk}</div>}
                          {item.tips && <div><span className="font-semibold">Tips:</span> {item.tips}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              {currentSection.tips && (
                <div className="mb-6 bg-amber-50 rounded-xl p-4">
                  <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                    <Award size={18} /> 💡 Expert Tips for Success
                  </h3>
                  <ul className="space-y-2">
                    {currentSection.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-amber-800">
                        <ChevronRight size={14} className="mt-1" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warnings */}
              {currentSection.warnings && (
                <div className="mb-6 bg-red-50 rounded-xl p-4">
                  <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                    <AlertTriangle size={18} /> ⚠️ Important Warnings
                  </h3>
                  <ul className="space-y-1">
                    {currentSection.warnings.map((warning, i) => (
                      <li key={i} className="text-red-700">{warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cost */}
              {currentSection.cost && (
                <div className="mt-6 bg-green-50 rounded-xl p-4">
                  <p className="text-green-800"><strong>💰 Estimated Cost:</strong> {currentSection.cost}</p>
                  {currentSection.waterRequirement && <p className="text-green-800 mt-1"><strong>💧 Water Requirement:</strong> {currentSection.waterRequirement}</p>}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnhancedCropDetail;