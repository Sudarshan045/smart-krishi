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
import TranslatedText from '../components/common/TranslatedText';
import { useLanguage } from '../context/LanguageContext';

const EnhancedCropDetail = () => {
  const { cropId } = useParams();
  const [selectedCrop, setSelectedCrop] = useState(cropId || 'sugarcane');
  const [activeSection, setActiveSection] = useState(0);
  const [showTroubleshooter, setShowTroubleshooter] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useLanguage();

  const crops = {
    sugarcane: {
      name: 'Sugarcane',
      nameMarathi: 'उस',
      icon: <Sprout size={24} />,
      color: 'from-green-500 to-green-600',
      bgImage: '/images/sugarcane_bg.png',
      en: {
        yield: '70-100 tonnes/ha',
        profit: '₹1,20,000 - ₹2,30,000/ha',
        duration: '10-12 months',
        bestSeason: 'February-March (Spring), October-November (Autumn)',
        tempRange: '20-35°C',
        rainfall: '1000-1500 mm',
        soilType: 'Well-drained loamy soil, pH 6.5-7.5',
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
      mr: {
        yield: '७०-१०० टन/हेक्टर',
        profit: '₹१,२०,००० - ₹२,३०,०००/हेक्टर',
        duration: '१०-१२ महिने',
        bestSeason: 'फेब्रुवारी-मार्च (सुरू), ऑक्टोबर-नोव्हेंबर (पूर्वहंगामी)',
        tempRange: '२०-३५°C',
        rainfall: '१०००-१५०० मिमी',
        soilType: 'पाण्याचा निचरा होणारी पोयट्याची माती, pH ६.५-७.५',
        troubleshooter: {
          problems: [
            { problem: 'कमी उगवण', causes: ['जुने बेणे', 'कोरडी माती', 'खोल लागवड'], solutions: ['ताजे बेणे वापरा', 'लगेच पाणी द्या', '५-८ सेमी खोली ठेवा'] },
            { problem: 'पिवळी पाने', causes: ['नत्राची कमतरता', 'पाणी साचणे'], solutions: ['युरिया द्या', 'पाण्याचा निचरा सुधारा'] },
            { problem: 'बारीक ऊस', causes: ['कमी नत्र', 'पाण्याची कमतरता'], solutions: ['युरियाचा डोस द्या', 'नियमित पाणी द्या'] },
            { problem: 'कमी साखर', causes: ['लवकर तोडणी', 'जास्त पाणी'], solutions: ['१०-१२ महिन्यांनी तोडणी करा', '१५ दिवस आधी पाणी थांबवा'] }
          ]
        },
        checklist: {
          items: [
            { season: 'लागवडीपूर्वी', tasks: ['माती परीक्षण', 'जमीन तयारी', 'बेण्याची व्यवस्था', 'बजेट नियोजन'] },
            { season: 'लागवड', tasks: ['बेणे कापणे', 'बेणे प्रक्रिया', 'सऱ्या पाडणे', 'लागवड', 'पायाभूत खत'] },
            { season: 'सुरुवातीची वाढ', tasks: ['पहिले पाणी', 'नांगे भरणे', 'पहिली खुरपणी', 'पहिला खताचा डोस'] },
            { season: 'मुख्य वाढ', tasks: ['नियमित पाणी', 'दुसरा खताचा डोस', 'कीड पाहणी', 'आंतरपीक'] },
            { season: 'पक्वता', tasks: ['पाणी थांबवणे', 'साखर तपासणी', 'तोडणी नियोजन', 'मजुरांची व्यवस्था'] },
            { season: 'तोडणी', tasks: ['तोडणी', 'प्रक्रिया', 'नोंद ठेवणे', 'शेताची स्वच्छता'] }
          ]
        }
      },
      sections: [
        {
          id: 1,
          icon: Thermometer,
          image: '/images/hero_bg.png',
          en: {
            title: 'Climate & Location Requirements',
            details: [
              '🌡️ Temperature: 20-35°C (optimum 24-32°C for growth, 15-20°C for ripening)',
              '☔ Rainfall: 1000-1500 mm annually with well-distributed showers',
              '⛰️ Altitude: Up to 1000 meters; above this, growth slows significantly',
              '☀️ Sunlight: 8-10 hours daily; critical for high sucrose accumulation',
              '💧 Humidity: 60-80% during growth; low humidity (<40%) during ripening increases sugar',
              '🌬️ Wind: Protection from high winds (use windbreaks) to prevent lodging'
            ],
            warnings: ['❌ Avoid frost-prone areas (frost kills the terminal bud)', '❌ Avoid waterlogged areas (causes root rot)', '❌ Avoid prolonged drought during tillering'],
            tips: ['Choose location with unobstructed morning sunlight', 'Ensure field has a 1-2% slope for natural drainage']
          },
          mr: {
            title: 'हवामान आणि स्थान आवश्यकता',
            details: [
              '🌡️ तापमान: २०-३५°C (वाढीसाठी २४-३२°C आणि पक्वतेसाठी १५-२०°C उत्तम)',
              '☔ पर्जन्यमान: वार्षिक १०००-१५०० मिमी, योग्य वेळी पडणारा पाऊस हवा',
              '⛰️ उंची: समुद्रसपाटीपासून १००० मीटरपर्यंत; त्यापेक्षा जास्त उंचीवर वाढ मंदावते',
              '☀️ सूर्यप्रकाश: दररोज ८-१० तास; जास्त साखरेसाठी प्रखर सूर्यप्रकाश आवश्यक',
              '💧 आर्द्रता: वाढीच्या काळात ६०-८०%; काढणीच्या वेळी कमी आर्द्रता साखरेसाठी चांगली'
            ],
            warnings: ['❌ दंव पडणारी ठिकाणे टाळा (दवामुळे शेंडा मरतो)', '❌ पाणी साचणारी ठिकाणे टाळा (मुळे सडतात)', '❌ फुटवे येताना प्रदीर्घ दुष्काळ टाळा'],
            tips: ['सकाळचा सूर्यप्रकाश अडथळ्याशिवाय मिळेल असे ठिकाण निवडा', 'नैसर्गिक निचऱ्यासाठी शेतात १-२% उतार ठेवा']
          }
        },
        {
          id: 2,
          icon: MapPin,
          image: '/images/soil_prep.png',
          en: {
            title: 'Soil Selection & Preparation',
            details: [
              '🌱 Soil Type: Deep (1m+) well-drained loamy or clay loam soil (Heavy black soil)',
              '🧪 pH Range: 6.5-7.5 (Slightly alkaline up to 8.0 is tolerated)',
              '📏 Soil Depth: Minimum 1 meter for deep root system',
              '💧 Drainage: Sub-surface drainage is critical for heavy soils',
              '🔄 Previous Crop: Best after Green Manure (Dhaincha) or Legumes'
            ],
            steps: [
              'Deep plowing with disc/moldboard plow (30-40 cm depth) in Summer',
              'Harrowing 2-3 times + Clod crushing with rotavator',
              'Laser Leveling: Prevents water stagnation and saves 20% water',
              'Trench Method: Dig trenches 30cm deep at 4-5 feet spacing (Best for high yield)',
              'Apply FYM 25-30 tons/ha + Neem Cake 500kg/ha during final harrowing'
            ],
            cost: '₹12,000-15,000 per hectare for preparation'
          },
          mr: {
            title: 'माती निवड आणि तयारी',
            details: [
              '🌱 मातीचा प्रकार: खोल (१ मी+) पाण्याचा निचरा होणारी मध्यम ते भारी काळी माती',
              '🧪 pH श्रेणी: ६.५-७.५ (८.० पर्यंत सामू असेल तरी चालतो)',
              '📏 मातीची खोली: खोल मुळांच्या वाढीसाठी किमान १ मीटर खोली हवी',
              '💧 निचरा: भारी जमिनीसाठी अंतर्गत निचरा प्रणाली अत्यंत महत्त्वाची',
              '🔄 मागील पीक: हिरवळीच्या पिकांनंतर (ताग/धैंचा) किंवा कडधान्यांनंतर उत्तम'
            ],
            steps: [
              'उन्हाळ्यात डिस्क किंवा पलटी नांगराने खोल नांगरट (३०-४० सेमी)',
              '२-३ वेळा कुळवणी + रोटाव्हेटरने ढेकळे फोडणे',
              'लेझर लेव्हलिंग: पाणी साचणे थांबवते आणि २०% पाण्याची बचत करते',
              'पट्टा/ट्रेन्च पद्धत: ४-५ फूट अंतरावर ३० सेमी खोल सऱ्या पाडणे (विक्रमी उत्पन्नासाठी उत्तम)',
              'शेवटच्या कुळवणीवेळी हेक्टरी २५-३० टन शेणखत + ५०० किलो निंबोळी पेंड टाका'
            ],
            cost: 'जमीन तयारीसाठी ₹१२,०००-१५,००० प्रति हेक्टर'
          }
        },
        {
          id: 3,
          icon: Leaf,
          image: '/images/sugarcane_bg.png',
          en: {
            title: 'Variety Selection',
            varieties: [
              { name: 'Co 86032', duration: '12 months', yield: '85-90 t/ha', sugar: '18-20%', bestFor: 'Sugar production' },
              { name: 'CoM 0265', duration: '11 months', yield: '90-95 t/ha', sugar: '19-21%', bestFor: 'High sugar recovery' },
              { name: 'Co 94012', duration: '10 months', yield: '80-85 t/ha', sugar: '17-19%', bestFor: 'Early maturity' },
              { name: 'Co 62175', duration: '11 months', yield: '75-80 t/ha', sugar: '16-18%', bestFor: 'Jaggery making' }
            ],
            tips: ['Buy seeds from certified nurseries', 'Check for disease-free setts', 'Consider local climate conditions']
          },
          mr: {
            title: 'वाण निवड',
            varieties: [
              { name: 'को ८६०३२', duration: '१२ महिने', yield: '८५-९० टन/हेक्टर', sugar: '१८-२०%', bestFor: 'साखर उत्पादन' },
              { name: 'कोएम ०२६५', duration: '११ महिने', yield: '९०-९५ टन/हेक्टर', sugar: '१९-२१%', bestFor: 'जास्त साखर उतारा' },
              { name: 'को ९४०१२', duration: '१० महिने', yield: '८०-८५ टन/हेक्टर', sugar: '१७-१९%', bestFor: 'लवकर पक्वता' },
              { name: 'को ६२१७५', duration: '११ महिने', yield: '७५-८० टन/हेक्टर', sugar: '१६-१८%', bestFor: 'गुळ निर्मिती' }
            ],
            tips: ['प्रमाणित रोपवाटिकेतून बेणे खरेदी करा', 'रोगमुक्त बेणे असल्याची खात्री करा', 'स्थानिक हवामानाचा विचार करा']
          }
        },
        {
          id: 4,
          icon: Bug,
          image: '/images/pest_disease.png',
          en: {
            title: 'Pest Management with Visual Guide',
            pests: [
              { name: 'Stem Borer', image: '/images/sugarcane_stem_borer.png', symptoms: 'Dead heart (central leaf dries)', organic: 'Trichogramma cards, Pheromone traps', chemical: 'Carbofuran 3G 8 kg/ha', prevention: 'Remove infected plants, resistant varieties' },
              { name: 'Pyrilla (Leaf Hopper)', image: '/images/pest_aphids_1777610239133.png', symptoms: 'Yellowing leaves, sooty mold', organic: 'Release Epiricania melanoleuca', chemical: 'Malathion 1.5 ml/L', prevention: 'Avoid excess nitrogen' },
              { name: 'White Grub', image: '/images/pest_white_grub_1777610261927.png', symptoms: 'Wilting, dead plants in patches', organic: 'Light traps, Bird perches', chemical: 'Chlorpyriphos 2 ml/L', prevention: 'Summer plowing' },
              { name: 'Termites', image: '/images/pest_armyworm_1777610279223.png', symptoms: 'Plants dry, can be pulled easily', organic: 'Neem cake application', chemical: 'Chlorpyriphos dust', prevention: 'Treat setts before planting' }
            ],
            tips: ['Monitor crops daily', 'Use integrated pest management', 'Rotate pesticides']
          },
          mr: {
            title: 'कीड व्यवस्थापन आणि सचित्र मार्गदर्शक',
            pests: [
              { name: 'खोडकीड (Stem Borer)', image: '/images/sugarcane_stem_borer.png', symptoms: 'मध्यवर्ती पान सुकणे (डेड हार्ट)', organic: 'ट्रायकोग्रामा कार्ड, कामगंध सापळे', chemical: 'कार्बोफ्युरॉन ३जी ८ किलो/हेक्टर', prevention: 'कीडग्रस्त रोपे काढा, रोगप्रतिकारक वाण' },
              { name: 'पांढरी माशी / पायरिला (Pyrilla)', image: '/images/pest_aphids_1777610239133.png', symptoms: 'पाने पिवळी पडणे, काळी बुरशी', organic: 'एपिरीकेनिया मेलानोल्युका सोडा', chemical: 'मॅलाथिऑन १.५ मिली/लिटर', prevention: 'अतिरिक्त नत्र टाळा' },
              { name: 'हुमणी अळी (White Grub)', image: '/images/pest_white_grub_1777610261927.png', symptoms: 'रोपे कोमेजणे, पट्ट्यांमध्ये रोपे मरणे', organic: 'प्रकाश सापळे, पक्षी थांबे', chemical: 'क्लोरोपायरीफॉस २ मिली/लिटर', prevention: 'उन्हाळी नांगरट' },
              { name: 'वाळवी (Termites)', image: '/images/pest_armyworm_1777610279223.png', symptoms: 'रोपे सुकतात, सहज उपटली जातात', organic: 'निंबोळी पेंड वापर', chemical: 'क्लोरोपायरीफॉस पावडर', prevention: 'लागवडीपूर्वी बेण्यावर प्रक्रिया' }
            ],
            tips: ['दररोज पिकांची पाहणी करा', 'एकात्मिक कीड व्यवस्थापन वापरा', 'कीटकनाशके बदलून वापरा']
          }
        },
        {
          id: 5,
          icon: Shield,
          image: '/images/pest_disease.png',
          en: {
            title: 'Disease Management with Visual Guide',
            diseases: [
              { name: 'Red Rot', image: '/images/sc_redrot.png', symptoms: 'Red lesions inside cane', organic: 'Resistant varieties (Co 86032)', chemical: 'Carbendazim 1g/L seed treatment', prevention: 'Treat setts, crop rotation' },
              { name: 'Smut', image: '/images/sc_smut.png', symptoms: 'Whip-like structure from top', organic: 'Hot water treatment (50°C for 2 hours)', chemical: 'Triademefon spray', prevention: 'Remove infected clumps' },
              { name: 'Wilt', image: '/images/disease_root_rot_1777610296696.png', symptoms: 'Leaf yellowing, stunted growth', organic: 'FYM application, Trichoderma', chemical: 'Carbendazim drench', prevention: 'Well-drained soil' },
              { name: 'Grassy Shoot', image: '/images/sc_grassyshoot.png', symptoms: 'Thin, grassy tillers', organic: 'Rogue infected plants', chemical: 'No chemical control', prevention: 'Use disease-free setts' }
            ],
            tips: ['Use disease-free seeds', 'Remove infected plants', 'Practice crop rotation']
          },
          mr: {
            title: 'रोग व्यवस्थापन आणि सचित्र मार्गदर्शक',
            diseases: [
              { name: 'लाल सड (Red Rot)', image: '/images/sc_redrot.png', symptoms: 'उसाच्या आत लाल डाग', organic: 'रोगप्रतिकारक वाण (को ८६०३२)', chemical: 'कार्बेंडाझिम १ ग्रॅम/लिटर बीजप्रक्रिया', prevention: 'बेण्यावर प्रक्रिया, पीक फेरपालट' },
              { name: 'काणी (Smut)', image: '/images/sc_smut.png', symptoms: 'शेंड्याकडून चाबकासारखी रचना', organic: 'गरम पाण्याची प्रक्रिया (५०°C २ तास)', chemical: 'ट्रायडेमेफॉन फवारणी', prevention: 'रोगग्रस्त बेटे काढा' },
              { name: 'मर रोग (Wilt)', image: '/images/disease_root_rot_1777610296696.png', symptoms: 'पाने पिवळी पडणे, खुंटलेली वाढ', organic: 'शेणखत आणि ट्रायकोडर्माचा वापर', chemical: 'कार्बेंडाझिम आळवणी', prevention: 'पाण्याचा चांगला निचरा' },
              { name: 'गवताळ वाढ (Grassy Shoot)', image: '/images/sc_grassyshoot.png', symptoms: 'बारीक, गवतासारखे फुटवे', organic: 'रोगग्रस्त रोपे उपटून नष्ट करा', chemical: 'रासायनिक नियंत्रण नाही', prevention: 'रोगमुक्त बेणे वापरा' }
            ],
            tips: ['रोगमुक्त बेणे वापरा', 'रोगग्रस्त रोपे काढून टाका', 'पीक फेरपालट करा']
          }
        },
        {
          id: 6,
          icon: FlaskConical,
          image: '/images/soil_prep.png',
          en: {
            title: 'Fertilizer Management',
            schedule: [
              { month: 'At planting', fertilizer: 'Basal dose', npk: '50:100:50 kg/ha', tips: 'Mix with soil' },
              { month: '30-45 days', fertilizer: '1st Top dressing', npk: '75:25:25 kg/ha', tips: 'After irrigation' },
              { month: '60-75 days', fertilizer: '2nd Top dressing', npk: '75:0:25 kg/ha', tips: 'At earthing up' },
              { month: '90-105 days', fertilizer: '3rd Top dressing', npk: '50:0:25 kg/ha', tips: 'Before monsoon' }
            ],
            organic: ['FYM: 25-30 tons/ha', 'Vermicompost: 5-8 tons/ha', 'Green Manure: Sunhemp', 'Neem Cake: 500 kg/ha'],
            totalNPK: '250:125:125 kg/ha',
            micronutrients: ['Zinc Sulfate: 20 kg/ha', 'Ferrous Sulfate: 25 kg/ha', 'Borax: 5 kg/ha'],
            tips: ['Split nitrogen into 4 doses for 90% efficiency', 'Apply micronutrients along with FYM during basal dose', 'Use water-soluble fertilizers (19:19:19, 0:52:34) through drip for 30% yield boost']
          },
          mr: {
            title: 'खत व्यवस्थापन',
            schedule: [
              { month: 'लागवडीच्या वेळी', fertilizer: 'पायाभूत खत (Basal)', npk: '५०:१००:५० किलो/हेक्टर', tips: 'मातीत मिसळा' },
              { month: '३०-४५ दिवस', fertilizer: 'पहिला डोस', npk: '७५:२५:२५ किलो/हेक्टर', tips: 'पाणी दिल्यानंतर' },
              { month: '६०-७५ दिवस', fertilizer: 'दुसरा डोस', npk: '७५:०:२५ किलो/हेक्टर', tips: 'भरणीच्या वेळी' },
              { month: '९०-१०५ दिवस', fertilizer: 'तिसरा डोस', npk: '५०:०:२५ किलो/हेक्टर', tips: 'पावसाळ्यापूर्वी' }
            ],
            organic: ['शेणखत: २५-३० टन/हेक्टर', 'गांडूळ खत: ५-८ टन/हेक्टर', 'हिरवळीचे खत: ताग', 'निंबोळी पेंड: ५०० किलो/हेक्टर'],
            totalNPK: '२५०:१२५:१२५ किलो/हेक्टर',
            micronutrients: ['झिंक सल्फेट: २० किलो/हेक्टर', 'फेरस सल्फेट: २५ किलो/हेक्टर', 'बोराॅक्स: ५ किलो/हेक्टर'],
            tips: ['९०% कार्यक्षमतेसाठी नत्र ४ हप्त्यात विभागून द्या', 'पायाभूत डोसमध्ये शेणखतासोबत सूक्ष्म अन्नद्रव्ये मिसळून द्या', '३०% अधिक उत्पन्नासाठी ठिबकमधून विद्राव्य खतांचा (१९:१९:१९, ०:५२:३४) वापर करा']
          }
        },
        {
          id: 7,
          icon: Droplets,
          image: '/images/water_irrigation.png',
          en: {
            title: 'Irrigation Schedule',
            schedule: [
              { stage: 'Immediately after planting', frequency: 'First irrigation', tips: 'Flood irrigation' },
              { stage: 'Germination (0-30 days)', frequency: 'Every 5-7 days', tips: 'Keep soil moist' },
              { stage: 'Tillering (30-90 days)', frequency: 'Every 7-10 days', tips: 'Promotes tillering' },
              { stage: 'Grand growth (90-240 days)', frequency: 'Every 10-12 days', tips: 'Critical period' },
              { stage: 'Maturity (240-300 days)', frequency: 'Every 15-20 days', tips: 'Reduce water' },
              { stage: '15 days before harvest', frequency: 'Stop irrigation', tips: 'Improves sugar content' }
            ],
            waterRequirement: '1500-2500 mm per season',
            criticalStages: [
              '🌱 Germination (0-45 days): Light but frequent irrigation needed',
              '🌾 Tillering (45-120 days): Most critical stage; water stress here reduces tiller count',
              '🏗️ Grand Growth (120-270 days): Maximum water requirement; maintain soil moisture at 75%',
              '🍬 Ripening (270-360 days): Gradually reduce water to increase sucrose percentage'
            ],
            tips: ['Drip irrigation saves 40-50% water and prevents salt accumulation', 'Use automated soil moisture sensors to trigger irrigation']
          },
          mr: {
            title: 'सिंचन वेळापत्रक',
            schedule: [
              { stage: 'लागवडीनंतर लगेच', frequency: 'पहिले पाणी', tips: 'मोकळे पाणी द्या' },
              { stage: 'उगवण (०-३० दिवस)', frequency: 'दर ५-७ दिवसांनी', tips: 'मातीत ओलावा ठेवा' },
              { stage: 'फुटवे येणे (३०-९० दिवस)', frequency: 'दर ७-१० दिवसांनी', tips: 'फुटवे येण्यास मदत' },
              { stage: 'मुख्य वाढ (९०-२४० दिवस)', frequency: 'दर १०-१२ दिवसांनी', tips: 'अत्यंत महत्त्वाचा काळ' },
              { stage: 'पक्वता (२४०-३०० दिवस)', frequency: 'दर १५-२० दिवसांनी', tips: 'पाणी कमी करा' },
              { stage: 'तोडणीच्या १५ दिवस आधी', frequency: 'पाणी देणे थांबवा', tips: 'साखरेचे प्रमाण वाढते' }
            ],
            waterRequirement: '१५००-२५०० मिमी प्रति हंगाम',
            criticalStages: [
              '🌱 उगवण अवस्था (०-४५ दिवस): हलके पण वारंवार पाणी द्या',
              '🌾 फुटवे येणे (४५-१२० दिवस): अत्यंत महत्त्वाचा काळ; पाण्याचा ताण पडल्यास फुटवे कमी येतात',
              '🏗️ मुख्य वाढीचा काळ (१२०-२७० दिवस): जास्तीत जास्त पाण्याची गरज; मातीत ७५% ओलावा टिकवा',
              '🍬 पक्वता अवस्था (२७०-३६० दिवस): साखरेचे प्रमाण वाढवण्यासाठी हळूहळू पाणी कमी करा'
            ],
            tips: ['ठिबक सिंचनाने ४०-५०% पाणी वाचते आणि जमीन खारपड होण्यापासून वाचते', 'सिंचनासाठी स्वयंचलित ओलावा मापक यंत्रांचा (Sensors) वापर करा']
          }
        },
        {
          id: 8,
          icon: Scissors,
          image: '/images/hero_bg.png',
          en: {
            title: 'Harvesting & Post-Harvest',
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
          mr: {
            title: 'तोडणी आणि काढणीपश्चात',
            signs: [
              'वरची पाने पिवळी आणि कोरडी होतात',
              'ऊस कडक होतो',
              'साखरेचे प्रमाण सर्वोच्च असते (२०-२२% ब्रिक्स)',
              'लागवडीनंतर १०-१२ महिने'
            ],
            methods: [
              { method: 'मानवी तोडणी', tools: 'उसाचा कोयता', labor: '२०-२५ मजूर/हेक्टर', cost: '₹५,०००-७,०००/हेक्टर' },
              { method: 'यांत्रिक तोडणी', tools: 'हार्वेस्टर', labor: '२-३ ऑपरेटर', cost: '₹१०,०००-१२,०००/हेक्टर' }
            ],
            tips: ['कोरड्या हवामानात तोडणी करा', 'जमिनीलगत कापा', '२४ तासांच्या आत कारखान्यात पाठवा']
          }
        },
        {
          id: 9,
          icon: TrendingUp,
          image: '/images/hero_bg.png',
          en: {
            title: 'Profit Maximization Tips',
            tips: [
              '💰 Use drip irrigation - Save 40% water and increase yield by 20%',
              '🌾 Practice intercropping - Earn ₹20,000-30,000 extra per hectare',
              '🍬 Make jaggery instead of selling to mill - 50% higher profit',
              '🌱 Use organic farming - Premium price in market',
              '🤝 Join farmer cooperative - Better bargaining power',
              '📅 Harvest at right time - Maximum sugar content'
            ],
            schemes: ['PM-KISAN: ₹6,000/year', 'Micro Irrigation Subsidy: 80%', 'Soil Health Card: Free testing']
          },
          mr: {
            title: 'नफा वाढवण्याच्या टिप्स',
            tips: [
              '💰 ठिबक सिंचन वापरा - ४०% पाणी वाचवा आणि २०% उत्पादन वाढवा',
              '🌾 आंतरपीक घ्या - हेक्टरी ₹२०,०००-३०,००० अतिरिक्त मिळवा',
              '🍬 कारखान्याला विकण्याऐवजी गूळ बनवा - ५०% जास्त नफा',
              '🌱 सेंद्रिय शेती करा - बाजारात जास्त भाव',
              '🤝 शेतकरी सहकारी संस्थेत सामील व्हा - चांगला भाव मिळवण्यासाठी',
              '📅 योग्य वेळी तोडणी करा - जास्तीत जास्त साखर'
            ],
            schemes: ['पीएम-किसान: ₹६,०००/वर्ष', 'सूक्ष्म सिंचन अनुदान: ८०%', 'मृदा आरोग्य पत्रिका: मोफत तपासणी']
          }
        }
      ],


    },
    grapes: {
      name: 'Grapes',
      nameMarathi: 'द्राक्ष',
      icon: <Leaf size={24} />,
      color: 'from-purple-500 to-purple-600',
      bgImage: '/images/grapes_bg.png',
      en: {
        yield: '20-30 tonnes/ha',
        profit: '₹5,00,000 - ₹19,00,000/ha',
        duration: '120-140 days after pruning',
        bestSeason: 'January-February (pruning), March (bud break)',
        tempRange: '15-35°C',
        rainfall: '500-700 mm',
        soilType: 'Well-drained sandy loam, pH 6.5-7.0',
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
      },
      mr: {
        yield: '२०-३० टन/हेक्टर',
        profit: '₹५,००,००० - ₹१९,००,०००/हेक्टर',
        duration: 'छाटणीनंतर १२०-१४० दिवस',
        bestSeason: 'जानेवारी-फेब्रुवारी (छाटणी), मार्च (डोळे फुटणे)',
        tempRange: '१५-३५°C',
        rainfall: '५००-७०० मिमी',
        soilType: 'पाण्याचा चांगला निचरा होणारी वालुकामय पोयट्याची माती, pH ६.५-७.०',
        troubleshooter: {
          problems: [
            { problem: 'कमी डोळे फुटणे', causes: ['पुरेशी थंडी नसणे', 'कमकुवत वेली'], solutions: ['Dormex २% लावा', 'संतुलित खत व्यवस्थापन'] },
            { problem: 'फुले गळणे', causes: ['उच्च तापमान', 'बोरॉनची कमतरता'], solutions: ['पाण्याची फवारणी', 'बोरॉन ०.२% फवारणी'] },
            { problem: 'लहान मणी', causes: ['विरळणी न करणे', 'पाण्याचा ताण'], solutions: ['३० घडांपर्यंत विरळणी करा', 'नियमित सिंचन'] },
            { problem: 'मणी तडकणे', causes: ['अनियमित पाणी', 'कॅल्शियमची कमतरता'], solutions: ['ठिबक सिंचन', 'कॅल्शियम फवारणी'] }
          ]
        },
        checklist: {
          items: [
            { season: 'लागवडीपूर्वी', tasks: ['माती परीक्षण', 'मंडप उभारणी', 'खड्डे खोदणे', 'रोपांची व्यवस्था'] },
            { season: 'लागवड', tasks: ['रोपे लावणे', 'पहिले पाणी', 'आच्छादन (मल्चिंग)', 'वळण देणे'] },
            { season: 'छाटणी', tasks: ['खरड/गोड छाटणी', 'बोर्डो पेस्ट लावणे', 'छाटलेला भाग काढणे'] },
            { season: 'वाढ', tasks: ['नियमित पाणी', 'वळण व बांधणी', 'तण नियंत्रण', 'कीड पाहणी'] },
            { season: 'फळ विकास', tasks: ['विरळणी', 'GA3 फवारणी', 'कॅल्शियम फवारणी', 'घड झाकणे'] },
            { season: 'कापणी', tasks: ['पक्वता तपासणे', 'पाणी थांबवणे', 'पॅकिंग व्यवस्था', 'प्रतवारी व पॅकिंग'] }
          ]
        }
      },
      sections: [
        {
          id: 1,
          icon: Thermometer,
          image: '/images/grapes_bg.png',
          en: {
            title: 'Climate & Location Requirements',
            details: [
              '🌡️ Temperature: 15-35°C (optimum 25-30°C for ripening; 10-15°C for bud break)',
              '☔ Rainfall: 500-700 mm; rain during flowering or ripening causes massive fungal disease',
              '⛰️ Altitude: 200-800 meters; Nashik/Sangli regions in Maharashtra are ideal',
              '☀️ Sunlight: Full sun (2500+ hours/year); shaded vines have poor fruit set',
              '🌙 Chilling: 100-200 chilling hours needed during dormancy for uniform bud break',
              '💧 Humidity: Dry climate (<40% RH) during fruit growth is critical to prevent Downy Mildew'
            ],
            warnings: ['Avoid high humidity areas (>60% RH)', 'Avoid frost-prone areas in winter', 'Avoid heavy rainfall during fruit ripening (causes berry cracking)'],
            tips: ['Nashik and Sangli regions are world-class for grapes due to their unique micro-climate']
          },
          mr: {
            title: 'हवामान आणि स्थान आवश्यकता',
            details: [
              '🌡️ तापमान: १५-३५°C (पक्वतेसाठी २५-३०°C आणि डोळे फुटण्यासाठी १०-१५°C उत्तम)',
              '☔ पर्जन्यमान: ५००-७०० मिमी; फुलोऱ्यात किंवा पक्वतेच्या वेळी पाऊस पडल्यास रोगांचा प्रादुर्भाव वाढतो',
              '⛰️ उंची: २००-८०० मीटर; महाराष्ट्रातील नाशिक आणि सांगली भाग आदर्श आहेत',
              '☀️ सूर्यप्रकाश: पूर्ण सूर्यप्रकाश (वर्षाला २५००+ तास); सावलीत फळधारणा कमी होते',
              '🌙 थंडी: डोळे एकसमान फुटण्यासाठी विश्रांती काळात १००-२०० तासांची थंडी आवश्यक',
              '💧 आर्द्रता: केवडा (Downy Mildew) रोगापासून वाचण्यासाठी कोरडे हवामान (<४०% आर्द्रता) गरजेचे'
            ],
            warnings: ['जास्त आर्द्रता असलेली ठिकाणे टाळा (>६०%)', 'हिवाळ्यात दंव पडणारी ठिकाणे टाळा', 'फळे पिकताना मुसळधार पाऊस टाळा (मणी तडकतात)'],
            tips: ['नाशिक आणि सांगली येथील हवामान द्राक्ष शेतीसाठी जागतिक दर्जाचे आहे']
          }
        },
        {
          id: 2,
          icon: MapPin,
          image: '/images/soil_prep.png',
          en: {
            title: 'Soil Selection & Preparation',
            details: [
              '🌱 Soil Type: Well-drained sandy loam or gravelly soil (Phadala/Karal soil)',
              '🧪 pH Range: 6.5-7.5 (Saline soil >1.5 EC causes salt injury)',
              '📏 Soil Depth: Minimum 1.5 meters for root expansion',
              '🌿 Organic Matter: Use green manuring (Dhaincha) before planting',
              '💧 Drainage: Soil should not hold water for more than 2 hours after rain'
            ],
            steps: [
              'Deep Trenching: Dig trenches 1 meter deep and 1 meter wide at 3x1.5m spacing',
              'Filling: Fill trenches with FYM (25 tons), Pressmud, and Bone Meal',
              'Rootstock: Use Dogridge or 110R rootstock for saline soils/water stress',
              'Trellis: Install Y-trellis or Extended-Y system for better sunlight and aeration',
              'Mulching: Use organic mulch (Wheat straw) to protect shallow roots'
            ],
            cost: '₹20,000-25,000 per hectare for land preparation'
          },
          mr: {
            title: 'माती निवड आणि तयारी',
            details: [
              '🌱 मातीचा प्रकार: पाण्याचा उत्तम निचरा होणारी वालुकामय पोयटा किंवा खडकाळ (फादळा) जमीन',
              '🧪 pH श्रेणी: ६.५-७.५ (क्षारयुक्त जमिनीत >१.५ EC असल्यास वाढ खुंटते)',
              '📏 मातीची खोली: मुळांच्या वाढीसाठी किमान १.५ मीटर खोली हवी',
              '🌿 सेंद्रिय कर्ब: लागवडीपूर्वी हिरवळीच्या खतांचा (धैंचा) वापर करा',
              '💧 निचरा: पाऊस पडल्यानंतर २ तासांच्या आत पाणी निचरा होणे आवश्यक'
            ],
            steps: [
              'ट्रेन्च पद्धत: ३x१.५ मीटर अंतरावर १ मीटर खोल आणि १ मीटर रुंद चर खोदा',
              'भरणी: चरांमध्ये २५ टन शेणखत, प्रेस मड आणि बोन मील भरा',
              'खोड (Rootstock): क्षारयुक्त जमीन किंवा पाण्याच्या ताणासाठी डोगरिज किंवा ११०R खुंट वापरा',
              'मंडप उभारणी: सूर्यप्रकाश आणि हवेसाठी Y-ट्रेन्च किंवा विस्तारित Y पद्धत वापरा',
              'आच्छादन: उथळ मुळांच्या संरक्षणासाठी गव्हाच्या काडाचे सेंद्रिय आच्छादन करा'
            ],
            cost: 'जमीन तयारीसाठी प्रति हेक्टर ₹२०,०००-२५,०००'
          }
        },
        {
          id: 3,
          icon: Bug,
          image: '/images/grapes_pest.png',
          en: {
            title: 'Pest Management',
            pests: [
              { name: 'Thrips', image: '/images/pest_aphids_1777610239133.png', symptoms: 'Silvery streaks', organic: 'Blue sticky traps', chemical: 'Spinosad', prevention: 'Monitor from bud break' },
              { name: 'Mites', image: '/images/grapes_pest.png', symptoms: 'Reddish-brown leaves', organic: 'Sulfur dust', chemical: 'Dicofol', prevention: 'Avoid water stress' },
              { name: 'Mealybugs', image: '/images/pest_white_grub_1777610261927.png', symptoms: 'White cottony mass', organic: 'Release Cryptolaemus', chemical: 'Buprofezin', prevention: 'Prune infested parts' }
            ],
            tips: ['Install pheromone traps', 'Use neem oil 5 ml/L every 10 days', 'Remove infested parts']
          },
          mr: {
            title: 'कीड व्यवस्थापन',
            pests: [
              { name: 'फुलकिडे (Thrips)', image: '/images/pest_aphids_1777610239133.png', symptoms: 'चांदीसारखे पट्टे', organic: 'निळे चिकट सापळे', chemical: 'स्पिनोसॅड', prevention: 'डोळे फुटल्यापासून पाहणी करा' },
              { name: 'कोळी (Mites)', image: '/images/grapes_pest.png', symptoms: 'लालसर-तपकिरी पाने', organic: 'सल्फर पावडर', chemical: 'डायकोफोल', prevention: 'पाण्याचा ताण टाळा' },
              { name: 'पिठ्या ढेकूण (Mealybugs)', image: '/images/pest_white_grub_1777610261927.png', symptoms: 'पांढरा कापसासारखा थर', organic: 'क्रिप्टोलेमस सोडा', chemical: 'बुप्रोफेझिन', prevention: 'कीडग्रस्त भाग छाटा' }
            ],
            tips: ['कामगंध सापळे लावा', 'दर १० दिवसांनी ५ मिली/लिटर निम अर्क वापरा', 'कीडग्रस्त भाग काढून टाका']
          }
        },
        {
          id: 4,
          icon: Shield,
          image: '/images/grapes_disease.png',
          en: {
            title: 'Disease Management',
            diseases: [
              { name: 'Downy Mildew', image: '/images/gr_downy.png', symptoms: 'Yellow spots', organic: 'Copper spray', chemical: 'Metalaxyl', prevention: 'Avoid overhead irrigation' },
              { name: 'Powdery Mildew', image: '/images/gr_powdery.png', symptoms: 'White powder', organic: 'Milk spray', chemical: 'Sulfur', prevention: 'Good air circulation' },
              { name: 'Anthracnose', image: '/images/gr_anthracnose.png', symptoms: 'Brown spots', organic: 'Garlic extract', chemical: 'Carbendazim', prevention: 'Prune affected parts' }
            ],
            tips: ['Regular monitoring', 'Remove infected leaves', 'Maintain proper spacing']
          },
          mr: {
            title: 'रोग व्यवस्थापन',
            diseases: [
              { name: 'डाऊनी मिल्ड्यू (केवडा)', image: '/images/gr_downy.png', symptoms: 'पिवळे डाग', organic: 'कॉपर फवारणी', chemical: 'मेटॅलॅक्सिल', prevention: 'तुषार सिंचन टाळा' },
              { name: 'भुरी (Powdery Mildew)', image: '/images/gr_powdery.png', symptoms: 'पांढरी पावडर', organic: 'दुधाची फवारणी', chemical: 'सल्फर', prevention: 'हवा खेळती ठेवा' },
              { name: 'अँथ्रॅकनोज (करपा)', image: '/images/gr_anthracnose.png', symptoms: 'तपकिरी डाग', organic: 'लसूण अर्क', chemical: 'कार्बेंडाझिम', prevention: 'रोगग्रस्त भाग छाटा' }
            ],
            tips: ['नियमित पाहणी करा', 'रोगग्रस्त पाने काढा', 'योग्य अंतर ठेवा']
          }
        },
        {
          id: 5,
          icon: Scissors,
          image: '/images/grapes_bg.png',
          en: {
            title: 'Pruning Guide',
            pruning: [
              { season: 'Back Pruning (April-May)', purpose: 'Summer crop', method: 'Cut back to 2-3 buds' },
              { season: 'Forward Pruning (October-November)', purpose: 'Winter crop', method: 'Cut to 4-6 buds' }
            ],
            steps: [
              '1. Back Pruning (April): Cut all canes to 2 buds to grow new, healthy vegetative shoots.',
              '2. Forward Pruning (Oct): Cut mature canes to 4-8 buds for fruit production.',
              '3. Shoot Thinning: Remove extra shoots to ensure 15-20 shoots per square meter.',
              '4. Sub-girdling: Cut a thin ring of bark on the trunk to increase berry size (highly technical).',
              '5. GA3 Application: Dip bunches in Gibberellic Acid at 4mm, 6mm, and 8mm berry sizes for elongation.'
            ],
            tips: ['Always use sterilized secateurs to prevent Spread of Bacterial Canker', 'Pruning should be completed within 10 days for uniform bud break across the vineyard']
          },
          mr: {
            title: 'छाटणी मार्गदर्शक',
            pruning: [
              { season: 'खरड/बॅक छाटणी (एप्रिल-मे)', purpose: 'नवीन शाकीय वाढीसाठी', method: '२ डोळे ठेवून पूर्ण छाटणी करा' },
              { season: 'गोड/फॉरवर्ड छाटणी (ऑक्टोबर-नोव्हेंबर)', purpose: 'फळधारणेसाठी', method: 'काड्यांच्या जाडीनुसार ४-८ डोळे ठेवा' }
            ],
            steps: [
              '१. खरड छाटणी: एप्रिलमध्ये सर्व काड्या २ डोळ्यांवर छाटा जेणेकरून नवीन जोमदार फुटी येतील.',
              '२. गोड छाटणी: ऑक्टोबरमध्ये पक्व काड्या ४-८ डोळ्यांवर छाटा.',
              '३. काड्यांची विरळणी: हवा आणि सूर्यप्रकाशासाठी जास्तीच्या फुटी काढून टाका.',
              '४. सब-गर्डलिंग: मण्याचा आकार वाढवण्यासाठी खोडावर एक पातळ रिंग काढा (हे अनुभवी मजुरांकडून करून घ्या).',
              '५. GA3 प्रक्रिया: मण्यांचा आकार आणि लांबी वाढवण्यासाठी ४, ६ आणि ८ मिमी आकार असताना संजीवकांचे बुडवण (Dipping) करा.'
            ],
            tips: ['बॅक्टेरिअल कॅन्करचा प्रसार रोखण्यासाठी नेहमी निर्जंतुक केलेली कात्री वापरा', 'बागेत डोळे एकसमान फुटण्यासाठी १० दिवसांच्या आत छाटणी पूर्ण करा']
          }
        },
        {
          id: 6,
          icon: FlaskConical,
          image: '/images/soil_prep.png',
          en: {
            title: 'Fertilizer Management',
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
            micronutrients: ['Zinc: 10kg', 'Boron: 5kg', 'Magnesium: 25kg per hectare'],
            petioleTesting: 'Test leaves at 45 days after pruning to adjust fertilizer doses accurately.',
            tips: ['Use Fertigation (Drip) for 95% efficiency', 'Stop Nitrogen after flowering to prevent excessive vegetative growth', 'Potash is key for berry sweetness and color']
          },
          mr: {
            title: 'खत व्यवस्थापन',
            schedule: [
              { stage: 'लागवडीपूर्वी', fertilizer: 'शेणखत २५ टन + एसएसपी ५०० किलो/हेक्टर' },
              { stage: 'छाटणीनंतर', fertilizer: 'युरिया १०० किलो + एमओपी १०० किलो/हेक्टर' },
              { stage: 'डोळे फुटताना', fertilizer: '१९:१९:१९ १०० किलो/हेक्टर (फवारणी)' },
              { stage: 'फुटीच्या वाढीला', fertilizer: 'युरिया ५० किलो + डीएपी १०० किलो/हेक्टर' },
              { stage: 'फुलोऱ्यात', fertilizer: '०:५२:३४ ५० किलो/हेक्टर' },
              { stage: 'फळधारणेला', fertilizer: '१३:०:४५ १०० किलो/हेक्टर' },
              { stage: 'मण्याची वाढ होताना', fertilizer: '१२:६१:० ५० किलो/हेक्टर + एमओपी १५० किलो' },
              { stage: 'रंग येताना', fertilizer: 'एसओपी १०० किलो/हेक्टर' }
            ],
            micronutrients: ['झिंक: १० किलो', 'बोरॉन: ५ किलो', 'मॅग्नेशियम: २५ किलो प्रति हेक्टर'],
            petioleTesting: 'अचूक खत नियोजनासाठी छाटणीनंतर ४५ दिवसांनी देठ (Petiole) परीक्षण करा.',
            tips: ['९५% कार्यक्षमतेसाठी ठिबक सिंचनातून खते (Fertigation) द्या', 'फुलोऱ्यानंतर नत्र बंद करा जेणेकरून वेलीची जास्तीची वाढ थांबेल', 'मण्यांची गोडी आणि रंगासाठी पोटॅश अत्यंत महत्त्वाचे आहे']
          }
        },
        {
          id: 7,
          icon: Droplets,
          image: '/images/water_irrigation.png',
          en: {
            title: 'Irrigation Management',
            schedule: [
              { stage: 'Bud break to Flowering', frequency: 'Daily (2-4 liters/vine)', tips: 'Crucial for uniform growth' },
              { stage: 'Flowering', frequency: 'Reduce by 50%', tips: 'Prevents flower drop' },
              { stage: 'Fruit set to Veraison', frequency: 'Daily (5-8 liters/vine)', tips: 'Peak water requirement' },
              { stage: 'Maturity (Harvest)', frequency: 'Stop 10 days before', tips: 'Increases TSS (Sugar)' }
            ],
            tips: ['Always use drip irrigation', 'Irrigate in early morning to reduce disease risk']
          },
          mr: {
            title: 'सिंचन व्यवस्थापन',
            schedule: [
              { stage: 'डोळे फुटणे ते फुलोरा', frequency: 'दररोज (२-४ लिटर/वेल)', tips: 'एकसमान वाढीसाठी आवश्यक' },
              { stage: 'फुलोरा अवस्था', frequency: '५०% ने कमी करा', tips: 'फूलगळ थांबवण्यासाठी' },
              { stage: 'फळधारणा ते रंग येणे', frequency: 'दररोज (५-८ लिटर/वेल)', tips: 'जास्तीत जास्त पाण्याची गरज' },
              { stage: 'काढणीपूर्वी', frequency: '१० दिवस आधी बंद करा', tips: 'गोडी वाढवण्यासाठी' }
            ],
            tips: ['नेहमी ठिबक सिंचनाचाच वापर करा', 'रोगांचा धोका टाळण्यासाठी सकाळी लवकर पाणी द्या']
          }
        },
        {
          id: 8,
          icon: Scissors,
          image: '/images/hero_bg.png',
          en: {
            title: 'Harvesting & Post-Harvest',
            signs: [
              'Sweet taste (15-20% TSS)',
              'Characteristic color of variety',
              'Easy detachment from pedicel'
            ],
            tips: ['Harvest early morning', 'Cut bunches with 5-10 cm stem', 'Grade by size and quality', 'Store in cold storage at 0-2°C']
          },
          mr: {
            title: 'कापणी आणि काढणीपश्चात',
            signs: [
              'गोड चव (१५-२०% TSS)',
              'वाणानुसार विशिष्ट रंग',
              'देठापासून सहज वेगळे होणे'
            ],
            tips: ['पहाटेच्या वेळी कापणी करा', '५-१० सेमी देठासह घड कापा', 'आकार आणि दर्जानुसार प्रतवारी करा', '०-२°C तापमानात कोल्ड स्टोरेजमध्ये ठेवा']
          }
        },
        {
          id: 9,
          icon: TrendingUp,
          image: '/images/hero_bg.png',
          en: {
            title: 'Profit Maximization',
            tips: [
              '💰 Use drip irrigation - Save 40% water, increase yield 20%',
              '🍇 Practice fruit thinning - Double berry size',
              '🍇 Make raisins - 3x profit compared to fresh',
              '📦 Export quality production - 3-4x price premium',
              '🌱 Organic certification - 50% premium price',
              '💊 Use GA3 for seedless varieties - 50% larger berries'
            ],
            returns: '₹5-20 lakhs net profit per hectare per year'
          },
          mr: {
            title: 'नफा वाढवण्याच्या टिप्स',
            tips: [
              '💰 ठिबक सिंचन वापरा - ४०% पाणी वाचवा, २०% उत्पादन वाढवा',
              '🍇 घड विरळणी करा - मण्याचा आकार दुप्पट करा',
              '🍇 बेदाणे बनवा - ताज्या द्राक्षांपेक्षा तिप्पट नफा',
              '📦 निर्यातीसाठी उत्पादन - ३-४ पट जास्त भाव',
              '🌱 सेंद्रिय प्रमाणन - ५०% जास्त भाव',
              '💊 सीडलेस वाणांसाठी GA3 वापरा - ५०% मोठे मणी'
            ],
            returns: 'प्रति हेक्टर ₹५-२० लाख निव्वळ नफा प्रति वर्ष'
          }
        }
      ],


    }
  };

  const crop = crops[selectedCrop];
  const langData = crop[language];
  const currentSection = crop.sections[activeSection];
  const secLangData = currentSection[language];

  const filteredSections = crop.sections.filter(section =>
    section[language].title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Premium Hero Section */}
      <div className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden rounded-b-[3rem] shadow-2xl mb-12">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${crop.bgImage})` }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br from-[#0f172a]/95 ${selectedCrop === 'sugarcane' ? 'via-green-900/80' : 'via-purple-900/80'} to-transparent`} />
        </div>
        
        <div className="container-custom relative z-10">
          {/* Header Controls */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-wrap justify-between items-center gap-4 mb-8"
          >
            <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white font-medium transition-colors border border-white/20 shadow-lg">
              <ArrowLeft size={18} /> <TranslatedText>Back to Home</TranslatedText>
            </Link>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowTroubleshooter(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-500/90 text-white rounded-full hover:bg-red-600 shadow-lg backdrop-blur-md border border-red-400/50"
              >
                <AlertTriangle size={16} /> <TranslatedText>Troubleshooter</TranslatedText>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowChecklist(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-500/90 text-white rounded-full hover:bg-green-600 shadow-lg backdrop-blur-md border border-green-400/50"
              >
                <CheckCircle size={16} /> <TranslatedText>Checklist</TranslatedText>
              </motion.button>
            </div>
          </motion.div>

          {/* Main Hero Content */}
          <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-end mb-4">
            <div className="flex-1">
              {/* Crop Selection Tabs */}
              <div className="flex flex-wrap gap-3 mb-8">
                {Object.keys(crops).map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setSelectedCrop(c);
                      setActiveSection(0);
                      setShowTroubleshooter(false);
                      setShowChecklist(false);
                    }}
                    className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 border border-white/20 ${
                      selectedCrop === c
                        ? 'bg-white text-gray-900 shadow-xl scale-105'
                        : 'bg-white/10 text-white hover:bg-white/30 backdrop-blur-md shadow-lg'
                    }`}
                  >
                    {language === 'mr' ? crops[c].nameMarathi : crops[c].name}
                  </button>
                ))}
              </div>

              {/* Title Area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-5 mb-4"
              >
                <div className="bg-white/20 backdrop-blur-md p-4 lg:p-5 rounded-2xl border border-white/30 text-white shadow-xl">
                  {React.cloneElement(crop.icon, { size: 36 })}
                </div>
                <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight drop-shadow-2xl">
                  {language === 'mr' ? crop.nameMarathi : crop.name}
                </h1>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg lg:text-xl text-gray-300 font-medium max-w-xl mb-6"
              >
                {language === 'mr' ? 'जमीन तयार करण्यापासून ते उत्तम कापणीच्या तंत्रापर्यंत संपूर्ण पीक मार्गदर्शन.' : 'Comprehensive cultivation guide, covering everything from land preparation to optimal harvest techniques.'}
              </motion.p>

              {/* Search Bar MOVED into Hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative max-w-xl group mt-6"
              >
                <Search className={`absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors ${selectedCrop === 'sugarcane' ? 'group-focus-within:text-green-400' : 'group-focus-within:text-purple-400'}`} size={22} />
                <input
                  type="text"
                  placeholder={language === 'mr' ? "या मार्गदर्शकात शोधा..." : "Search topics in this guide..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-14 pr-6 py-4 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-white/20 transition-all font-medium shadow-xl ${selectedCrop === 'sugarcane' ? 'focus:ring-green-400' : 'focus:ring-purple-400'}`}
                />
              </motion.div>

            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4 w-full lg:w-auto"
            >
              {[
                { label: 'Yield', val: langData.yield },
                { label: 'Profit', val: langData.profit },
                { label: 'Duration', val: langData.duration },
                { label: 'Temp', val: langData.tempRange },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white hover:bg-white/20 transition-all shadow-lg hover:-translate-y-1 min-w-[140px]">
                  <div className="text-xs font-bold text-white/70 mb-2 uppercase tracking-widest"><TranslatedText>{item.label}</TranslatedText></div>
                  <div className="font-extrabold text-lg leading-tight">{item.val}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-custom">
        {/* Modal: Troubleshooter */}
        <AnimatePresence>
          {showTroubleshooter && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
            >
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-red-100 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                <div className="bg-red-50 p-6 lg:p-8 flex justify-between items-center border-b border-red-100">
                  <h2 className="text-2xl lg:text-3xl font-black text-red-800 flex items-center gap-4">
                    <div className="p-3 bg-red-100 text-red-600 rounded-2xl shadow-inner"><AlertTriangle size={28} /></div>
                    <TranslatedText>Quick Troubleshooter</TranslatedText>
                  </h2>
                  <button onClick={() => setShowTroubleshooter(false)} className="p-3 bg-white hover:bg-red-100 rounded-full text-red-600 shadow-sm transition-colors border border-red-100">✕</button>
                </div>
                <div className="p-6 lg:p-8 overflow-y-auto space-y-6 bg-gray-50/50">
                  {langData.troubleshooter.problems.map((problem, idx) => (
                    <div key={idx} className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold text-red-700 mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        {problem.problem}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6 text-base">
                        <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                          <p className="font-black text-orange-800 mb-3 tracking-wide">{language === 'mr' ? 'कारणे:' : 'Causes:'}</p>
                          <ul className="space-y-2">
                            {problem.causes.map((cause, i) => <li key={i} className="flex gap-3 text-gray-700 font-medium"><span className="text-orange-400 font-black">•</span>{cause}</li>)}
                          </ul>
                        </div>
                        <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                          <p className="font-black text-green-800 mb-3 tracking-wide">{language === 'mr' ? 'उपाय:' : 'Solutions:'}</p>
                          <ul className="space-y-2">
                            {problem.solutions.map((solution, i) => <li key={i} className="flex gap-3 text-gray-700 font-medium"><span className="text-green-500 font-black">✓</span>{solution}</li>)}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal: Checklist */}
        <AnimatePresence>
          {showChecklist && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
            >
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-green-100 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
                <div className="bg-green-50 p-6 lg:p-8 flex justify-between items-center border-b border-green-100">
                  <h2 className="text-2xl lg:text-3xl font-black text-green-800 flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-2xl shadow-inner"><Calendar size={28} /></div>
                    <TranslatedText>Seasonal Checklist</TranslatedText>
                  </h2>
                  <button onClick={() => setShowChecklist(false)} className="p-3 bg-white hover:bg-green-100 rounded-full text-green-600 shadow-sm transition-colors border border-green-100">✕</button>
                </div>
                <div className="p-6 lg:p-8 overflow-y-auto bg-gray-50/50">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {langData.checklist.items.map((item, idx) => (
                      <div key={idx} className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="absolute right-0 top-0 opacity-[0.03] text-8xl font-black -mr-4 -mt-4 text-green-900">{idx + 1}</div>
                        <div className="relative z-10 flex items-center gap-4 mb-6 border-b border-gray-50 pb-4">
                          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center font-black text-lg">{idx + 1}</div>
                          <h3 className="font-black text-lg text-gray-900">{item.season}</h3>
                        </div>
                        <ul className="space-y-3 relative z-10">
                          {item.tasks.map((task, i) => (
                            <li key={i} className="text-base text-gray-600 flex items-start gap-3">
                              <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                              <span className="font-medium">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Navigation Tabs */}
        <div className="bg-white rounded-full shadow-sm border border-gray-100 p-2 flex overflow-x-auto gap-2 mb-10 mx-auto max-w-6xl no-scrollbar">
          {filteredSections.map((section, idx) => {
            const isActive = crop.sections[activeSection].id === section.id;
            return (
              <button
                key={idx}
                onClick={() => setActiveSection(crop.sections.findIndex(s => s.id === section.id))}
                className={`px-5 py-3 rounded-full whitespace-nowrap transition-all duration-300 flex items-center gap-2 font-bold text-sm ${
                  isActive
                    ? `bg-gradient-to-r ${crop.color} text-white shadow-md scale-[1.02]`
                    : 'bg-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className={isActive ? 'text-white' : 'text-gray-400'}>
                  {React.createElement(section.icon, { size: 18 })}
                </div>
                {section[language].title}
              </button>
            );
          })}
        </div>

        {/* Active Section Content Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="relative p-10 lg:p-16 text-white overflow-hidden group">
                {currentSection.image ? (
                  <>
                    <img 
                      src={currentSection.image} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${crop.color} opacity-70 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90" />
                  </>
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-r ${crop.color}`} />
                )}
                
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/20 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />
                <div className="absolute left-0 bottom-0 w-48 h-48 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3 blur-2xl" />
                
                <div className="relative z-10 flex items-center gap-6">
                  <div className="bg-white/20 backdrop-blur-md p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/30">
                    {React.createElement(currentSection.icon, { size: 40, className: "text-white drop-shadow-md" })}
                  </div>
                  <div>
                    <h2 className="text-3xl lg:text-5xl font-black tracking-tight drop-shadow-xl">{secLangData.title}</h2>
                  </div>
                </div>
              </div>
              
              {/* Content Body */}
              <div className="p-8 lg:p-12 space-y-10">
                {/* Details */}
                {secLangData.details && (
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2">{language === 'mr' ? '📋 मुख्य आवश्यकता:' : '📋 Key Requirements:'}</h3>
                    <ul className="grid md:grid-cols-2 gap-4">
                      {secLangData.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-gray-200 transition-all group">
                          <div className="p-1 bg-green-100 rounded-full mt-0.5"><CheckCircle size={14} className="text-green-600" /></div>
                          <span className="text-gray-700 font-medium text-lg leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Steps */}
                {secLangData.steps && (
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2">{language === 'mr' ? '📝 टप्प्याटप्प्याने प्रक्रिया:' : '📝 Step-by-Step Process:'}</h3>
                    <div className="space-y-4">
                      {secLangData.steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-green-100 shadow-inner">
                            <span className="text-green-600 font-black text-lg">{i + 1}</span>
                          </div>
                          <span className="text-gray-700 font-medium text-lg leading-relaxed pt-1">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Varieties Table */}
                {secLangData.varieties && (
                  <div className="overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-black text-gray-900 p-6 bg-gray-50 border-b border-gray-100">{language === 'mr' ? '🌱 शिफारस केलेले वाण:' : '🌱 Recommended Varieties:'}</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-500 uppercase text-xs font-black tracking-wider">
                          <tr>
                            <th className="p-6 border-b border-gray-100">{language === 'mr' ? 'वाण' : 'Variety'}</th>
                            <th className="p-6 border-b border-gray-100">{language === 'mr' ? 'कालावधी' : 'Duration'}</th>
                            <th className="p-6 border-b border-gray-100">{language === 'mr' ? 'उत्पादन' : 'Yield'}</th>
                            <th className="p-6 border-b border-gray-100">{language === 'mr' ? 'उत्तम वापर' : 'Best For'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {secLangData.varieties.map((variety, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                              <td className="p-6 font-bold text-gray-900 text-lg">{variety.name}</td>
                              <td className="p-6 text-gray-600 font-medium">{variety.duration}</td>
                              <td className="p-6 text-gray-600 font-medium">{variety.yield}</td>
                              <td className="p-6 text-gray-600 font-medium">
                                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-bold border border-green-100">{variety.bestFor}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Pests with Images */}
                {secLangData.pests && secLangData.pests[0]?.image && (
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-5">{language === 'mr' ? '🐛 कीड नियंत्रण मार्गदर्शक:' : '🐛 Pest Control Guide:'}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {secLangData.pests.map((pest, i) => (
                        <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl transition-all group">
                          {pest.image && (
                            <div className="relative h-48 overflow-hidden bg-gray-100">
                              <img src={pest.image} alt={pest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <h4 className="absolute bottom-4 left-4 font-black text-2xl text-white drop-shadow-md">{pest.name}</h4>
                            </div>
                          )}
                          <div className="p-6 space-y-4 bg-white relative z-10">
                            <div className="flex gap-3 text-sm">
                              <div className="font-bold text-gray-400 uppercase tracking-wide w-24 shrink-0">{language === 'mr' ? 'लक्षणे:' : 'Symptoms:'}</div>
                              <div className="text-gray-800 font-medium">{pest.symptoms}</div>
                            </div>
                            <div className="flex gap-3 text-sm">
                              <div className="font-bold text-gray-400 uppercase tracking-wide w-24 shrink-0">{language === 'mr' ? 'सेंद्रिय:' : 'Organic:'}</div>
                              <div className="text-green-700 font-medium bg-green-50 px-3 py-1 rounded-lg border border-green-100">{pest.organic}</div>
                            </div>
                            <div className="flex gap-3 text-sm">
                              <div className="font-bold text-gray-400 uppercase tracking-wide w-24 shrink-0">{language === 'mr' ? 'रासायनिक:' : 'Chemical:'}</div>
                              <div className="text-red-700 font-medium bg-red-50 px-3 py-1 rounded-lg border border-red-100">{pest.chemical}</div>
                            </div>
                            <div className="flex gap-3 text-sm">
                              <div className="font-bold text-gray-400 uppercase tracking-wide w-24 shrink-0">{language === 'mr' ? 'प्रतिबंध:' : 'Prevention:'}</div>
                              <div className="text-blue-700 font-medium bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">{pest.prevention}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Diseases with Images */}
                {secLangData.diseases && secLangData.diseases[0]?.image && (
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-5">{language === 'mr' ? '🦠 रोग व्यवस्थापन:' : '🦠 Disease Management:'}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {secLangData.diseases.map((disease, i) => (
                        <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl transition-all group">
                          {disease.image && (
                            <div className="relative h-48 overflow-hidden bg-gray-100">
                              <img src={disease.image} alt={disease.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <h4 className="absolute bottom-4 left-4 font-black text-2xl text-white drop-shadow-md">{disease.name}</h4>
                            </div>
                          )}
                          <div className="p-6 space-y-4 bg-white relative z-10">
                            <div className="flex gap-3 text-sm">
                              <div className="font-bold text-gray-400 uppercase tracking-wide w-24 shrink-0">{language === 'mr' ? 'लक्षणे:' : 'Symptoms:'}</div>
                              <div className="text-gray-800 font-medium">{disease.symptoms}</div>
                            </div>
                            <div className="flex gap-3 text-sm">
                              <div className="font-bold text-gray-400 uppercase tracking-wide w-24 shrink-0">{language === 'mr' ? 'सेंद्रिय:' : 'Organic:'}</div>
                              <div className="text-green-700 font-medium bg-green-50 px-3 py-1 rounded-lg border border-green-100">{disease.organic}</div>
                            </div>
                            <div className="flex gap-3 text-sm">
                              <div className="font-bold text-gray-400 uppercase tracking-wide w-24 shrink-0">{language === 'mr' ? 'रासायनिक:' : 'Chemical:'}</div>
                              <div className="text-red-700 font-medium bg-red-50 px-3 py-1 rounded-lg border border-red-100">{disease.chemical}</div>
                            </div>
                            <div className="flex gap-3 text-sm">
                              <div className="font-bold text-gray-400 uppercase tracking-wide w-24 shrink-0">{language === 'mr' ? 'प्रतिबंध:' : 'Prevention:'}</div>
                              <div className="text-blue-700 font-medium bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">{disease.prevention}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Schedule & Micronutrients */}
                {secLangData.schedule && (
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-5">{language === 'mr' ? '📅 वेळापत्रक:' : '📅 Schedule:'}</h3>
                    <div className="space-y-4">
                      {secLangData.schedule.map((item, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-gray-200 transition-colors">
                          <div className="grid md:grid-cols-3 gap-6">
                            <div>
                              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{language === 'mr' ? 'टप्पा/महिना:' : 'Stage/Month:'}</div>
                              <div className="text-lg font-black text-gray-900">{item.stage || item.month}</div>
                            </div>
                            <div>
                              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{language === 'mr' ? 'खत/वारंवारता:' : 'Fertilizer/Freq:'}</div>
                              <div className="font-medium text-gray-800">{item.fertilizer || item.frequency}</div>
                            </div>
                            {(item.npk || item.tips) && (
                              <div className="md:border-l border-gray-100 md:pl-6">
                                {item.npk && <div className="mb-2"><span className="text-xs font-bold text-gray-400 uppercase tracking-wider">NPK:</span> <span className="font-bold text-green-700 ml-2 bg-green-50 px-2 py-0.5 rounded">{item.npk}</span></div>}
                                {item.tips && <div><span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">{language === 'mr' ? 'टिप्स:' : 'Tips:'}</span> <span className="text-gray-600 font-medium text-sm">{item.tips}</span></div>}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {secLangData.micronutrients && (
                      <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border border-blue-100/50 shadow-sm">
                        <h4 className="text-blue-900 font-black text-lg mb-4 flex items-center gap-2"><FlaskConical size={20} /> {language === 'mr' ? 'सूक्ष्म अन्नद्रव्ये (Micronutrients):' : 'Micronutrients:'}</h4>
                        <div className="flex flex-wrap gap-3">
                          {secLangData.micronutrients.map((m, i) => (
                            <span key={i} className="px-4 py-2 bg-white text-blue-800 rounded-xl text-sm font-bold shadow-sm border border-blue-100">{m}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {secLangData.petioleTesting && (
                      <div className="mt-6 p-6 bg-indigo-50 rounded-3xl border border-indigo-100 text-indigo-900 shadow-sm flex gap-4 items-start">
                        <div className="p-3 bg-white rounded-xl shadow-sm"><FlaskConical size={24} className="text-indigo-600" /></div>
                        <div>
                          <strong className="block text-lg font-black mb-1">{language === 'mr' ? 'देठ परीक्षण (Petiole Test)' : 'Petiole Testing'}</strong>
                          <span className="font-medium">{secLangData.petioleTesting}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Critical Growth Stages */}
                {secLangData.criticalStages && (
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2"><Droplets className="text-cyan-600"/> {language === 'mr' ? 'सिंचनाचे संवेदनशील टप्पे:' : 'Critical Irrigation Stages:'}</h3>
                    <div className="grid gap-4">
                      {secLangData.criticalStages.map((stage, i) => (
                        <div key={i} className="flex items-start gap-4 p-5 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-100/50 text-cyan-900 shadow-sm">
                          <div className="mt-1 w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] flex-shrink-0" />
                          <span className="text-base font-medium leading-relaxed">{stage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pruning (Grapes specific) */}
                {secLangData.pruning && (
                  <div className="overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-black text-gray-900 p-6 bg-gray-50 border-b border-gray-100 flex items-center gap-2"><Scissors size={20} className="text-gray-600" /> {language === 'mr' ? 'छाटणी वेळापत्रक:' : 'Pruning Schedule:'}</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-500 uppercase text-xs font-black tracking-wider">
                          <tr>
                            <th className="p-6 border-b border-gray-100">{language === 'mr' ? 'हंगाम' : 'Season'}</th>
                            <th className="p-6 border-b border-gray-100">{language === 'mr' ? 'उद्देश' : 'Purpose'}</th>
                            <th className="p-6 border-b border-gray-100">{language === 'mr' ? 'पद्धत' : 'Method'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {secLangData.pruning.map((p, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                              <td className="p-6 font-bold text-gray-900 text-lg">{p.season}</td>
                              <td className="p-6 text-gray-700 font-medium">{p.purpose}</td>
                              <td className="p-6 text-gray-700 font-medium">
                                <span className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-bold">{p.method}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Signs */}
                {secLangData.signs && (
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2">👁️ {language === 'mr' ? 'पक्वतेची लक्षणे:' : 'Signs of Maturity:'}</h3>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {secLangData.signs.map((sign, i) => (
                        <li key={i} className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                          <div className="p-1.5 bg-green-100 rounded-full"><CheckCircle size={16} className="text-green-600" /></div>
                          <span className="text-gray-800 font-medium text-lg">{sign}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Methods */}
                {secLangData.methods && (
                  <div className="overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-black text-gray-900 p-6 bg-gray-50 border-b border-gray-100 flex items-center gap-2"><Tractor size={20} className="text-gray-600" /> {language === 'mr' ? 'तोडणी पद्धती:' : 'Harvesting Methods:'}</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-500 uppercase text-xs font-black tracking-wider">
                          <tr>
                            <th className="p-6 border-b border-gray-100">{language === 'mr' ? 'पद्धत' : 'Method'}</th>
                            <th className="p-6 border-b border-gray-100">{language === 'mr' ? 'अवजारे' : 'Tools'}</th>
                            <th className="p-6 border-b border-gray-100">{language === 'mr' ? 'मजूर' : 'Labor'}</th>
                            <th className="p-6 border-b border-gray-100">{language === 'mr' ? 'खर्च' : 'Cost'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {secLangData.methods.map((method, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                              <td className="p-6 font-bold text-gray-900 text-lg">{method.method}</td>
                              <td className="p-6 text-gray-700 font-medium">{method.tools}</td>
                              <td className="p-6 text-gray-700 font-medium">{method.labor}</td>
                              <td className="p-6 font-bold text-green-700">{method.cost}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Expert Tips */}
                {secLangData.tips && (
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-100/50 shadow-sm">
                    <h3 className="text-2xl font-black text-amber-900 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-amber-200 text-amber-700 rounded-xl shadow-inner"><Award size={24} /></div>
                      {language === 'mr' ? 'तज्ञांच्या टिप्स' : 'Expert Tips for Success'}
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {secLangData.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-3 bg-white/60 p-4 rounded-2xl border border-white">
                          <div className="mt-1 p-1 bg-amber-100 rounded-full"><ChevronRight size={14} className="text-amber-600" /></div>
                          <span className="text-amber-900 font-medium">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Warnings */}
                {secLangData.warnings && (
                  <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-3xl p-8 border border-red-100/50 shadow-sm">
                    <h3 className="text-2xl font-black text-red-900 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-red-200 text-red-700 rounded-xl shadow-inner"><AlertTriangle size={24} /></div>
                      {language === 'mr' ? 'महत्त्वाचे इशारे' : 'Important Warnings'}
                    </h3>
                    <ul className="grid gap-3">
                      {secLangData.warnings.map((warning, i) => (
                        <li key={i} className="flex items-center gap-3 bg-white/60 p-4 rounded-2xl border border-white text-red-800 font-bold text-lg">
                          <span className="text-red-500 font-black text-xl">⚠️</span> {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cost & Water */}
                {(secLangData.cost || secLangData.waterRequirement) && (
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {secLangData.cost && (
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100/50 shadow-sm flex items-center gap-6">
                        <div className="p-4 bg-white rounded-2xl shadow-sm text-green-600"><DollarSign size={32} /></div>
                        <div>
                          <div className="text-sm font-bold text-green-800 uppercase tracking-widest mb-1">{language === 'mr' ? 'अंदाजित खर्च:' : 'Estimated Cost:'}</div>
                          <div className="text-xl font-black text-green-900">{secLangData.cost}</div>
                        </div>
                      </div>
                    )}
                    {secLangData.waterRequirement && (
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100/50 shadow-sm flex items-center gap-6">
                        <div className="p-4 bg-white rounded-2xl shadow-sm text-blue-600"><CloudRain size={32} /></div>
                        <div>
                          <div className="text-sm font-bold text-blue-800 uppercase tracking-widest mb-1">{language === 'mr' ? 'पाण्याची आवश्यकता:' : 'Water Requirement:'}</div>
                          <div className="text-xl font-black text-blue-900">{secLangData.waterRequirement}</div>
                        </div>
                      </div>
                    )}
                    {secLangData.returns && (
                      <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-3xl p-8 border border-purple-100/50 shadow-sm flex items-center gap-6 md:col-span-2">
                        <div className="p-4 bg-white rounded-2xl shadow-sm text-purple-600"><TrendingUp size={32} /></div>
                        <div>
                          <div className="text-sm font-bold text-purple-800 uppercase tracking-widest mb-1">{language === 'mr' ? 'अंदाजित नफा:' : 'Estimated Returns:'}</div>
                          <div className="text-2xl font-black text-purple-900">{secLangData.returns}</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnhancedCropDetail;
