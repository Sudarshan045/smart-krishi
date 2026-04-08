import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mountain, Droplet, Sprout, Tractor, Bug, 
  Calendar, Package, ChevronRight, Award, AlertCircle,
  CheckCircle, Leaf, BookOpen, Search, Shield,
  MapPin, CloudRain, Sun, Thermometer, Scissors, TrendingUp,
  FlaskConical
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const FarmingBasics = () => {
  const [activeCategory, setActiveCategory] = useState('soil');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);

  // Category Images - Using working Unsplash images
  const categories = [
    { id: 'soil', name: 'Soil Science', nameMarathi: 'मृदा विज्ञान', icon: Mountain, color: 'from-amber-500 to-amber-600', image: 'https://images.pexels.com/photos/1431338/soil-dirt-ground-agriculture-1431338.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 'water', name: 'Water Management', nameMarathi: 'जल व्यवस्थापन', icon: Droplet, color: 'from-blue-500 to-blue-600', image: 'https://images.pexels.com/photos/164504/water-irrigation-canal-river-164504.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 'crops', name: 'Crop Science', nameMarathi: 'पीक विज्ञान', icon: Sprout, color: 'from-green-500 to-green-600', image: 'https://images.pexels.com/photos/1191566/wheat-field-golden-hour-1191566.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 'equipment', name: 'Farm Equipment', nameMarathi: 'शेती उपकरणे', icon: Tractor, color: 'from-orange-500 to-orange-600', image: 'https://images.pexels.com/photos/159767/tractor-farming-agriculture-plowing-159767.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 'pests', name: 'Pest & Disease', nameMarathi: 'कीड व रोग', icon: Bug, color: 'from-red-500 to-red-600', image: 'https://images.pexels.com/photos/1200660/insect-bug-ladybug-nature-1200660.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 'fertilizers', name: 'Fertilizers', nameMarathi: 'खते', icon: FlaskConical, color: 'from-purple-500 to-purple-600', image: 'https://images.pexels.com/photos/760302/fertilizer-soil-nutrients-760302.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 'seasons', name: 'Season Planning', nameMarathi: 'हंगाम नियोजन', icon: Calendar, color: 'from-cyan-500 to-cyan-600', image: 'https://images.pexels.com/photos/2324/sky-sunny-clouds-cloudy.jpg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 'postharvest', name: 'Post-Harvest', nameMarathi: 'कापणी उपरांत', icon: Package, color: 'from-teal-500 to-teal-600', image: 'https://images.pexels.com/photos/1191566/wheat-field-golden-hour-1191566.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }
  ];

  const content = {
    soil: {
      title: '🌱 Soil Science - The Foundation of Farming',
      description: 'Understanding soil is the first step to successful farming.',
      sections: [
        {
          title: '🌑 Soil Types in Maharashtra',
          icon: Mountain,
          image: 'https://images.pexels.com/photos/1431338/soil-dirt-ground-agriculture-1431338.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🌑 Black Soil (Regur Soil) - Best for cotton, sugarcane - Found in Vidarbha, Marathwada',
            '🔴 Red Soil - Good for groundnut, millets - Found in Konkan, Eastern Maharashtra',
            '🟤 Laterite Soil - Good for cashew, fruits - Found in Konkan region',
            '🟡 Alluvial Soil - Best for vegetables - Found in river valleys'
          ],
          tips: ['Test your soil before planting', 'Add organic matter to improve soil health']
        },
        {
          title: '🧪 How to Test Your Soil',
          icon: FlaskConical,
          image: 'https://images.pexels.com/photos/256345/pexels-photo-256345.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🧪 DIY Methods: Jar test for texture, Vinegar test for alkalinity',
            '🔬 Professional Testing: Contact local agricultural officer for free soil testing',
            '📊 What to Test: pH level, NPK levels, Organic matter, Micronutrients',
            '📅 When to Test: Before first planting and every 2-3 years'
          ],
          tips: ['Take samples from 5-6 different spots', 'Sample depth should be 6 inches']
        },
        {
          title: '⚖️ Soil pH Management',
          icon: AlertCircle,
          image: 'https://images.pexels.com/photos/1105015/pexels-photo-1105015.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🧪 Acidic Soil (pH < 6.0): Add lime, Add wood ash, Use organic compost',
            '🧴 Alkaline Soil (pH > 7.5): Add sulfur or gypsum, Add organic matter',
            '📈 Ideal pH Range: 6.0-7.5 for most crops',
            '🌾 Crop Preferences: Potatoes (5.0-6.0), Sugarcane (7.0-8.0), Grapes (6.5-7.0)'
          ],
          tips: ['Test pH annually', 'Adjust gradually over time']
        },
        {
          title: '🌿 Improving Soil Fertility',
          icon: Leaf,
          image: 'https://images.pexels.com/photos/760302/fertilizer-soil-nutrients-760302.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🌿 Add Organic Matter: Compost, Green manure, Crop residues',
            '🔄 Practice Crop Rotation: Different crops use different nutrients',
            '🌱 Use Cover Crops: Legumes fix nitrogen, Grasses add organic matter',
            '🍂 Mulching: Retains moisture, Adds organic matter, Prevents weeds'
          ],
          tips: ['Rotate crops every season', 'Never leave soil bare']
        }
      ]
    },
    water: {
      title: '💧 Water Management - Smart Irrigation',
      description: 'Efficient water management can save up to 50% of water while improving crop yields.',
      sections: [
        {
          title: '💦 Irrigation Types',
          icon: Droplet,
          image: 'https://images.pexels.com/photos/164504/water-irrigation-canal-river-164504.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '💧 Drip Irrigation: 90% efficiency - Best for Sugarcane, Grapes - Saves 40-60% water',
            '💦 Sprinkler Irrigation: 70% efficiency - Best for Cereals, Pulses - Uniform distribution',
            '🌊 Flood Irrigation: 40% efficiency - Low cost - Good for Rice, Sugarcane',
            '📏 Furrow Irrigation: 60% efficiency - Best for Row crops, Vegetables'
          ],
          tips: ['Drip irrigation is most efficient', 'Water early morning or evening']
        },
        {
          title: '🏠 Water Conservation Techniques',
          icon: Calendar,
          image: 'https://images.pexels.com/photos/235725/pexels-photo-235725.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🏠 Rainwater Harvesting: Collect roof water, Farm pond construction',
            '🍂 Mulching: Plastic mulch, Organic mulch - Reduces evaporation by 70%',
            '⛰️ Soil Moisture Conservation: Contour bunding, Terracing',
            '⏰ Scheduling: Water early morning or evening, Avoid windy days'
          ],
          tips: ['Install a farm pond', 'Use moisture sensors']
        },
        {
          title: '🌾 Crop Water Requirements',
          icon: Sprout,
          image: 'https://images.pexels.com/photos/164504/water-irrigation-canal-river-164504.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🌾 Sugarcane: 1500-2500 mm per season, Irrigation every 7-10 days',
            '🍇 Grapes: 500-700 mm per season, Drip irrigation ideal',
            '🥬 Vegetables: 300-500 mm per season, Frequent light irrigation',
            '🌽 Cereals: 400-600 mm per season, Critical at tillering and flowering'
          ],
          tips: ['Over-watering is worse than under-watering', 'Check soil moisture before irrigating']
        }
      ]
    },
    crops: {
      title: '🌾 Crop Science - Understanding Your Plants',
      description: 'Different crops have different growing requirements.',
      sections: [
        {
          title: '🌾 Crop Categories',
          icon: Sprout,
          image: 'https://images.pexels.com/photos/1191566/wheat-field-golden-hour-1191566.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🌾 Cereals: Wheat, Rice, Jowar, Bajra - Staple food crops',
            '🫘 Pulses: Tur, Gram, Moong, Udid - Protein-rich, Fix nitrogen',
            '🥜 Oilseeds: Groundnut, Soybean, Sunflower - Oil production',
            '💰 Cash Crops: Sugarcane, Cotton, Grapes - High profit',
            '🥬 Vegetables: Tomato, Onion, Brinjal - Short duration',
            '🍎 Fruits: Mango, Orange, Pomegranate - Long term investment'
          ],
          tips: ['Start with 1-2 crops', 'Learn as you grow']
        },
        {
          title: '🌧️ Seasonal Crops in Maharashtra',
          icon: Calendar,
          image: 'https://images.pexels.com/photos/2324/sky-sunny-clouds-cloudy.jpg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🌧️ Kharif (June-October): Rice, Jowar, Bajra, Groundnut, Cotton, Tur',
            '❄️ Rabi (October-March): Wheat, Gram, Sunflower, Mustard, Vegetables',
            '☀️ Zaid (March-June): Watermelon, Cucumber, Fodder, Summer vegetables'
          ],
          tips: ['Plan according to season', 'Don\'t grow off-season without protection']
        },
        {
          title: '🔄 Crop Rotation Methods',
          icon: Leaf,
          image: 'https://images.pexels.com/photos/1191566/wheat-field-golden-hour-1191566.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🔄 Two-Year Rotation: Sugarcane → Wheat → Sugarcane',
            '🔄 Three-Year Rotation: Rice → Gram → Jowar → Fallow → Rice',
            '🔄 Legume Rotation: Cotton → Tur → Wheat → Cotton',
            '✅ Benefits: Prevents pest buildup, Improves soil fertility'
          ],
          tips: ['Never grow same crop in same field twice', 'Include legumes in rotation']
        },
        {
          title: '🌿 Companion Planting',
          icon: Award,
          image: 'https://images.pexels.com/photos/1191566/wheat-field-golden-hour-1191566.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🌿 Good Companions: Tomato + Basil (repels pests), Corn + Beans (beans fix nitrogen)',
            '🚫 Bad Companions: Potato + Tomato (same diseases), Onion + Beans (inhibits growth)',
            '✅ Benefits: Natural pest control, Better space utilization'
          ],
          tips: ['Research companion planting for your crops', 'Experiment on small scale first']
        }
      ]
    },
    equipment: {
      title: '🚜 Farm Equipment Guide',
      description: 'From basic hand tools to advanced machinery.',
      sections: [
        {
          title: '⛏️ Manual Tools (Small Farms)',
          icon: Tractor,
          image: 'https://images.pexels.com/photos/159767/tractor-farming-agriculture-plowing-159767.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '⛏️ Spade/Kudali: Digging, turning soil - Cost: ₹300-500',
            '🌾 Hoe/Khurpi: Weeding, earthing up - Cost: ₹150-300',
            '✂️ Sickle/Hasya: Harvesting crops - Cost: ₹200-400',
            '🔪 Pruning Shears: Pruning grapes, trees - Cost: ₹500-1000'
          ],
          tips: ['Clean tools after each use', 'Sharpen blades regularly']
        },
        {
          title: '🚜 Farm Machinery',
          icon: Tractor,
          image: 'https://images.pexels.com/photos/159767/tractor-farming-agriculture-plowing-159767.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🚜 Tractor: Plowing, harrowing, transport - Rental: ₹500-800/hour',
            '🔄 Rotavator: Seedbed preparation - Rental: ₹300-400/hour',
            '🌾 Harvester: Harvesting grains - Rental: ₹1000-1500/hour',
            '💨 Sprayer: Pesticide application - Cost: ₹5,000-10,000'
          ],
          tips: ['Rent machinery if farm is small', 'Join farmer cooperative for sharing']
        },
        {
          title: '💧 Irrigation Equipment',
          icon: Droplet,
          image: 'https://images.pexels.com/photos/164504/water-irrigation-canal-river-164504.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '💧 Drip System: Mainline, Laterals, Emitters - Cost: ₹40,000-60,000/acre',
            '💦 Sprinkler System: Pipes, Sprinklers, Pump - Cost: ₹25,000-35,000/acre',
            '🚰 Water Pumps: Submersible (₹15-30k), Centrifugal (₹8-15k)',
            '🔧 Filters & Fertigation: Sand filter (₹10k), Venturi injector (₹5k)'
          ],
          tips: ['Subsidies available for drip irrigation', 'Maintain pumps regularly']
        },
        {
          title: '🔧 Equipment Maintenance Tips',
          icon: Award,
          image: 'https://images.pexels.com/photos/159767/tractor-farming-agriculture-plowing-159767.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '📅 Daily: Clean after use, Check oil levels',
            '📅 Weekly: Lubricate moving parts, Tighten loose bolts',
            '📅 Seasonal: Replace worn parts, Service engine',
            '🏠 Storage: Clean thoroughly, Keep in dry place'
          ],
          tips: ['Keep maintenance log', 'Store in covered area']
        }
      ]
    },
    pests: {
      title: '🐛 Pest & Disease Management',
      description: 'Identify common pests and diseases early to protect your crops.',
      sections: [
        {
          title: '🐛 Common Pests & Solutions',
          icon: Bug,
          image: 'https://images.pexels.com/photos/1200660/insect-bug-ladybug-nature-1200660.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🐛 Stem Borer (Sugarcane): Dead heart symptom - Use Trichogramma cards',
            '🦟 Aphids (Grapes): Curled leaves - Use Neem oil spray',
            '🪰 Whitefly (Vegetables): Yellowing leaves - Use yellow sticky traps',
            '🐛 Fruit Borer (Tomato): Holes in fruits - Use bird perches'
          ],
          tips: ['Monitor crops daily', 'Start organic control first']
        },
        {
          title: '🍄 Common Diseases & Solutions',
          icon: AlertCircle,
          image: 'https://images.pexels.com/photos/1105015/pexels-photo-1105015.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🍄 Powdery Mildew (Grapes): White powder - Use Sulfur spray',
            '🔴 Red Rot (Sugarcane): Red lesions - Use resistant varieties',
            '💧 Downy Mildew (Grapes): Yellow spots - Use Copper spray',
            '🍅 Blight (Tomato): Brown spots - Use proper spacing'
          ],
          tips: ['Remove infected plants immediately', 'Improve air circulation']
        },
        {
          title: '🌿 Organic Pest Control Methods',
          icon: Leaf,
          image: 'https://images.pexels.com/photos/1200660/insect-bug-ladybug-nature-1200660.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🌿 Neem Oil: Mix 5ml neem oil + 2ml soap in 1L water',
            '🧄 Garlic Spray: Blend 10 garlic cloves + 2 red chilies in 1L water',
            '🌸 Trap Crops: Plant marigold around crops',
            '🐞 Beneficial Insects: Release ladybugs, lacewings'
          ],
          tips: ['Apply early morning or evening', 'Test on small area first']
        },
        {
          title: '🥽 Pesticide Safety Guidelines',
          icon: Shield,
          image: 'https://images.pexels.com/photos/1200660/insect-bug-ladybug-nature-1200660.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🥽 Always wear PPE: Gloves, Mask, Goggles, Full sleeves',
            '📋 Read label carefully: Dosage, Waiting period',
            '🧪 Mix properly: Use clean water, Measure accurately',
            '⏰ Application time: Early morning or evening, Avoid windy days'
          ],
          tips: ['Never mix pesticides', 'Dispose containers safely']
        }
      ]
    },
    fertilizers: {
      title: '🧪 Fertilizers & Nutrient Management',
      description: 'Proper fertilization ensures healthy growth and maximum yields.',
      sections: [
        {
          title: '🌿 Understanding NPK',
          icon: FlaskConical,
          image: 'https://images.pexels.com/photos/760302/fertilizer-soil-nutrients-760302.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🌿 Nitrogen (N): Leaf growth - Deficiency: Yellow leaves',
            '🌱 Phosphorus (P): Root development - Deficiency: Stunted growth',
            '🍇 Potassium (K): Disease resistance - Deficiency: Brown leaf edges'
          ],
          tips: ['Soil test before applying', 'Don\'t over-apply nitrogen']
        },
        {
          title: '🍂 Organic Fertilizers',
          icon: Leaf,
          image: 'https://images.pexels.com/photos/760302/fertilizer-soil-nutrients-760302.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🍂 Compost: 1-1-1 NPK - Apply 10-15 tons/ha - Cost: ₹2-3/kg',
            '🪱 Vermicompost: 3-2-1 NPK - Apply 5-8 tons/ha - Cost: ₹5-8/kg',
            '🐄 Farm Yard Manure: 0.5-0.2-0.5 - Apply 15-20 tons/ha',
            '🌾 Green Manure: Sow and incorporate - Adds organic matter'
          ],
          tips: ['Make your own compost', 'Apply 1 month before planting']
        },
        {
          title: '🧪 Chemical Fertilizers',
          icon: FlaskConical,
          image: 'https://images.pexels.com/photos/760302/fertilizer-soil-nutrients-760302.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🧪 Urea (46% N): 100-200 kg/ha - Split application',
            '🧪 DAP (18-46-0): 50-100 kg/ha - At planting only',
            '🧪 MOP (60% K): 50-100 kg/ha - At flowering',
            '🧪 Complex (19-19-19): 50-100 kg/ha - Water soluble'
          ],
          tips: ['Don\'t mix urea with DAP', 'Apply after irrigation']
        },
        {
          title: '🌱 Application Methods',
          icon: Sprout,
          image: 'https://images.pexels.com/photos/760302/fertilizer-soil-nutrients-760302.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🌱 Basal Application: At planting time, Mix in soil',
            '🌿 Top Dressing: Around growing plants, After irrigation',
            '🍃 Foliar Spray: Liquid fertilizer on leaves, For deficiencies',
            '💧 Fertigation: Through drip system, Most efficient'
          ],
          tips: ['Foliar spray early morning', 'Fertigation saves fertilizer']
        }
      ]
    },
    seasons: {
      title: '☀️ Season Planning for Maharashtra',
      description: 'Plan your farming activities according to Maharashtra\'s climate.',
      sections: [
        {
          title: '⛰️ Maharashtra Climate Zones',
          icon: MapPin,
          image: 'https://images.pexels.com/photos/2324/sky-sunny-clouds-cloudy.jpg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '⛰️ Western Ghats: High rainfall - Suitable for: Fruits, Spices',
            '🌾 Western Maharashtra: Moderate - Suitable for: Sugarcane, Grapes',
            '🏜️ Marathwada: Low rainfall - Suitable for: Sorghum, Cotton',
            '🌳 Vidarbha: Very hot summers - Suitable for: Cotton, Oranges'
          ],
          tips: ['Choose crops suited to your zone', 'Consult local farmers']
        },
        {
          title: '🌧️ Monsoon Preparation (June-August)',
          icon: CloudRain,
          image: 'https://images.pexels.com/photos/2324/sky-sunny-clouds-cloudy.jpg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🏗️ Before Monsoon: Repair bunds, Clean drainage, Purchase seeds',
            '🌾 During Monsoon: Sow Kharif crops, Weed management',
            '⚠️ Precautions: Avoid waterlogging, Watch for fungal diseases',
            '📋 Activities: Land preparation, Sowing, First fertilizer'
          ],
          tips: ['Don\'t delay sowing', 'Keep drainage ready']
        },
        {
          title: '❄️ Winter Planning (October-February)',
          icon: Sun,
          image: 'https://images.pexels.com/photos/2324/sky-sunny-clouds-cloudy.jpg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🌾 Rabi Crop Sowing: Wheat, Gram, Mustard, Vegetables',
            '🍬 Sugarcane Harvesting: Begins in November',
            '✂️ Grapes Pruning: Forward pruning in December',
            '💧 Irrigation: Reduce frequency, Avoid frost damage'
          ],
          tips: ['Protect from frost', 'Winter vegetables need less water']
        },
        {
          title: '☀️ Summer Tips (March-May)',
          icon: Thermometer,
          image: 'https://images.pexels.com/photos/2324/sky-sunny-clouds-cloudy.jpg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🍉 Crops: Watermelon, Cucumber, Fodder crops',
            '💧 Irrigation: Increase frequency, Mulch to retain moisture',
            '🌳 Protection: Provide shade for young plants',
            '📅 Planning: Prepare for next Kharif season'
          ],
          tips: ['Water early morning or evening', 'Use mulch to cool soil']
        }
      ]
    },
    postharvest: {
      title: '📦 Harvesting & Post-Harvest Management',
      description: 'Proper harvesting and storage can reduce losses by up to 30%.',
      sections: [
        {
          title: '🍬 Harvesting Signs',
          icon: Calendar,
          image: 'https://images.pexels.com/photos/1191566/wheat-field-golden-hour-1191566.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🍬 Sugarcane: 10-12 months, Yellow leaves, Sugar content peaks',
            '🍇 Grapes: 120-140 days, Sweet taste, Even color',
            '🌾 Cereals: Grains hard, Stalks dry, Moisture below 14%',
            '🥬 Vegetables: Based on size, color, and days to maturity'
          ],
          tips: ['Harvest at right maturity', 'Don\'t harvest in rain']
        },
        {
          title: '✋ Harvesting Techniques',
          icon: Scissors,
          image: 'https://images.pexels.com/photos/1191566/wheat-field-golden-hour-1191566.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '✋ Manual Harvesting: Use sharp tools, Harvest in cool morning',
            '🤖 Mechanical Harvesting: For large farms, Combine harvesters',
            '📦 Grading: Sort by size and quality, Remove damaged produce',
            '⚠️ Precautions: Avoid bruising, Keep clean'
          ],
          tips: ['Train laborers properly', 'Have packing material ready']
        },
        {
          title: '🏠 Storage Methods',
          icon: Package,
          image: 'https://images.pexels.com/photos/1191566/wheat-field-golden-hour-1191566.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '👜 Traditional: Gunny bags, Earthen pots - For short term',
            '❄️ Modern: Cold storage (0-4°C), Controlled atmosphere',
            '🏠 On-farm storage: Clean area, Pest-proof containers',
            '⚠️ Precautions: Dry produce before storage, Maintain hygiene'
          ],
          tips: ['Clean storage area', 'Use natural repellents']
        },
        {
          title: '💰 Value Addition',
          icon: TrendingUp,
          image: 'https://images.pexels.com/photos/1191566/wheat-field-golden-hour-1191566.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
          items: [
            '🍬 Sugarcane: Jaggery making (Gur), Sugar processing',
            '🍇 Grapes: Raisins, Wine, Juice, Jam',
            '🍎 Fruits: Pickles, Chutney, Dried fruit',
            '🥬 Vegetables: Pickling, Drying, Canning'
          ],
          tips: ['Value addition increases profit', 'Start small, scale up']
        }
      ]
    }
  };

  const currentContent = content[activeCategory];
  const currentCategory = categories.find(c => c.id === activeCategory);
  const IconComponent = currentCategory?.icon || BookOpen;
  const categoryColor = currentCategory?.color || 'from-green-500 to-green-600';
  const categoryImage = currentCategory?.image;

  const filteredSections = currentContent.sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-block"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <BookOpen size={48} className="text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-3">Farming Knowledge Hub</h1>
          <p className="text-xl text-gray-600">शेती ज्ञान केंद्र</p>
          <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">Your complete visual guide to modern farming - from soil to harvest</p>
        </AnimatedSection>

        {/* Search Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search farming topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Category Navigation with Images */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 w-28 text-center transition-all ${
                  activeCategory === cat.id ? 'scale-105' : 'opacity-80 hover:opacity-100'
                }`}
              >
                <div className={`w-20 h-20 mx-auto rounded-2xl overflow-hidden shadow-lg ${
                  activeCategory === cat.id ? 'ring-4 ring-green-500' : ''
                }`}>
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2">
                  <CatIcon size={20} className={`mx-auto ${activeCategory === cat.id ? 'text-green-600' : 'text-gray-500'}`} />
                  <p className={`text-xs font-semibold mt-1 ${activeCategory === cat.id ? 'text-green-700' : 'text-gray-600'}`}>
                    {cat.name}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            {/* Category Banner */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={categoryImage} 
                alt={currentContent.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${categoryColor} opacity-85`} />
              <div className="absolute inset-0 flex items-center p-8 text-white">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                    <IconComponent size={40} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{currentContent.title}</h2>
                    <p className="text-white/90 text-lg mt-1">{currentContent.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="divide-y">
              {filteredSections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
                    className="w-full px-8 py-5 flex justify-between items-center hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden">
                        <img 
                          src={section.image} 
                          alt={section.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl bg-gradient-to-r ${categoryColor} bg-opacity-10`}>
                          {React.createElement(section.icon, { size: 24, className: "text-green-600" })}
                        </div>
                        <span className="text-xl font-semibold text-gray-800">{section.title}</span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedSection === idx ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight size={24} className="text-gray-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedSection === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-8 pb-6"
                      >
                        <div className="bg-gradient-to-r from-green-50 to-amber-50 rounded-2xl p-6">
                          <div className="mb-4 rounded-xl overflow-hidden">
                            <img 
                              src={section.image} 
                              alt={section.title}
                              className="w-full h-64 object-cover"
                            />
                          </div>
                          <ul className="space-y-3">
                            {section.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-700">
                                <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                                <span className="text-base">{item}</span>
                              </li>
                            ))}
                          </ul>
                          {section.tips && (
                            <div className="mt-4 p-4 bg-amber-100 rounded-xl">
                              <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                                <Award size={18} /> 💡 Pro Tips for Farmers
                              </h4>
                              <ul className="space-y-1">
                                {section.tips.map((tip, ti) => (
                                  <li key={ti} className="flex items-start gap-2 text-amber-800">
                                    <ChevronRight size={14} className="mt-1" />
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Tips */}
        <AnimatedSection delay={0.3}>
          <div className="mt-10 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Award size={28} />
              <h3 className="text-xl font-bold">📝 Farmer's Golden Rules</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>🌱 Test soil before every planting season</div>
              <div>💧 Water based on crop need, not calendar</div>
              <div>🔍 Monitor fields daily for pests</div>
              <div>🔄 Rotate crops to maintain soil health</div>
              <div>📚 Keep learning new farming techniques</div>
              <div>🤝 Connect with local agricultural officers</div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default FarmingBasics;