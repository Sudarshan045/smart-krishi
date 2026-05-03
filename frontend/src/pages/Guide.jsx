import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Droplets, Sun, Shield, Sprout, Tractor, Leaf, ArrowLeft, ChevronRight, Award, Clock, TrendingUp } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';
import TranslatedText from '../components/common/TranslatedText';

const Guide = () => {
  const { cropId } = useParams();
  const { language } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState(cropId || 'sugarcane');
  const [activeSection, setActiveSection] = useState(0);

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
      },
      mr: {
        yield: '७०-१०० टन/हेक्टर',
        profit: '₹१,२०,००० - ₹२,३०,०००/हेक्टर',
        duration: '१०-१२ महिने',
      },
      sections: [
        {
          title: 'Land Preparation',
          titleMarathi: 'जमीन तयारी',
          icon: Tractor,
          image: '/images/guide_sc_land.png',
          en: {
            content: 'Deep plowing of 30-45 cm is essential since sugarcane has a deep root system. Follow this with 2 cross harrowings to achieve fine tilth. Dig furrows at a spacing of 120 cm (4 feet) to allow maximum sunlight and intercropping.',
            tips: ['Soil pH must be between 6.5-8.0 for optimum nutrient uptake', 'Apply 20-25 tons of well-rotted Farm Yard Manure (FYM) per hectare 15 days before planting', 'Treat the soil with Trichoderma (5 kg/ha) mixed with manure to prevent root rot']
          },
          mr: {
            content: 'उसाची मुळे खोल जात असल्याने ३०-४५ सेमी खोल नांगरणी आवश्यक आहे. त्यानंतर जमीन भुसभुशीत करण्यासाठी दोन वेळा वखरणी करा. जास्तीत जास्त सूर्यप्रकाश आणि आंतरपिकासाठी १२० सेमी (४ फूट) अंतरावर सऱ्या पाडा.',
            tips: ['अन्नद्रव्ये घेण्यासाठी जमिनीचा सामू (pH) ६.५-८.० असावा', 'लागवडीपूर्वी १५ दिवस आधी हेक्टरी २०-२५ टन कुजलेले शेणखत टाका', 'मूळकुज टाळण्यासाठी शेणखतात मिसळून ट्रायकोडर्मा (५ किलो/हेक्टर) द्या']
          }
        },
        {
          title: 'Planting',
          titleMarathi: 'लागवड',
          icon: Sprout,
          image: '/images/guide_sc_plant.png',
          en: {
            content: 'Select 10-12 month old healthy cane for seeds (setts). Use two-bud setts planted end-to-end. Optimal planting times are Suru (Jan-Feb), Pre-seasonal (Oct-Nov), and Adsali (July-Aug).',
            tips: ['Soak setts in water for 12 hours, then treat with Carbendazim (1g/lit) for 15 minutes', 'Seed rate: 25,000 to 30,000 two-bud setts per hectare', 'For high yield, use the Single Eye Bud (Tissue Culture) nursery method']
          },
          mr: {
            content: 'बियाण्यासाठी १०-१२ महिने वयाचा निरोगी ऊस निवडा. दोन डोळ्यांचे बेणे सलग लावून लागवड करा. लागवडीच्या सर्वोत्तम वेळा: सुरू (जाने-फेब्रु), पूर्वहंगामी (ऑक्टो-नोव्हे), आणि आडसाली (जुलै-ऑगस्ट).',
            tips: ['बेणे १२ तास पाण्यात भिजवा, नंतर कार्बेन्डाझिमच्या (१ ग्रॅम/लिटर) द्रावणात १५ मिनिटे बुडवा', 'बियाणे प्रमाण: हेक्टरी २५,००० ते ३०,००० दोन डोळ्यांची टिपरी', 'जास्त उत्पादनासाठी एक डोळा पद्धतीचा (रोपवाटिका) वापर करा']
          }
        },
        {
          title: 'Irrigation',
          titleMarathi: 'सिंचन',
          icon: Droplets,
          image: '/images/guide_sc_irrigate.png',
          en: {
            content: 'Sugarcane requires 2000-2500 mm of water throughout its cycle. Give the first light irrigation immediately after planting. Maintain 7-10 days interval in summer and 15-20 days in winter. Stop irrigation 15 days before harvest.',
            tips: ['Install inline drip irrigation (16mm, 4LPH at 40cm spacing) to save 40-50% water', 'During severe drought, spray 2% Urea or Muriate of Potash to reduce water stress', 'Ensure field is completely drained within 24 hours of heavy rains']
          },
          mr: {
            content: 'उसाला त्याच्या पूर्ण आयुष्यात २०००-२५०० मिमी पाण्याची गरज असते. लागवडीनंतर लगेचच हलके पाणी द्या. उन्हाळ्यात ७-१० दिवसांच्या आणि हिवाळ्यात १५-२० दिवसांच्या अंतराने पाणी द्या. तोडणीच्या १५ दिवस आधी पाणी थांबवा.',
            tips: ['४०-५०% पाणी वाचवण्यासाठी ठिबक सिंचन (१६ मिमी, ४ LPH, ४० सेमी अंतर) बसवा', 'कडक दुष्काळात पाण्याचा ताण कमी करण्यासाठी २% युरिया किंवा पालाशची फवारणी करा', 'मुसळधार पाऊस पडल्यास २४ तासांच्या आत शेतातील पाणी बाहेर काढा']
          }
        },
        {
          title: 'Fertilizers',
          titleMarathi: 'खते',
          icon: Leaf,
          image: '/images/guide_sc_fertilize.png',
          en: {
            content: 'Total requirement is 250:115:115 kg N:P:K per hectare. Blindly broadcasting urea leads to severe nitrogen leaching and weak stems. Apply full dose of P & K at planting at a depth of 10-15 cm. Split Nitrogen into 4 specific doses: 10% at planting, 40% at 6-8 weeks (tillering phase), 10% at 12-14 weeks, and the crucial remaining 40% exactly at earthing up (120 days) to prevent lodging.',
            tips: ['Mix Neem cake with Urea in a 1:5 ratio to slow down nitrogen release and protect roots from nematodes', 'Use Azotobacter and PSB bio-fertilizers (10 kg/ha mixed with FYM) to save 25% on chemical fertilizer costs', 'Apply Zinc Sulphate (20 kg/ha) and Ferrous Sulphate (15 kg/ha) mixed with compost if leaves turn pale white/yellow (Chlorosis)', 'Earthing up (putting soil at the base of the plant) at 120 days is non-negotiable to prevent tall sugarcane from falling over during heavy winds']
          },
          mr: {
            content: 'एकूण गरज २५०:११५:११५ किलो नत्र:स्फुरद:पालाश प्रति हेक्टर आहे. अंधाधुंद युरिया फेकल्याने नत्र वाहून जाते आणि ऊस कमकुवत होतो. स्फुरद आणि पालाशचा पूर्ण डोस लागवडीच्या वेळीच १०-१५ सेमी खोल मातीत द्या. नत्र (युरिया) ४ अचूक हप्त्यांत द्या: १०% लागवडीवेळी, ४०% ६-८ आठवड्यांनी (फुटवे फुटताना), १०% १२-१४ आठवड्यांनी, आणि अत्यंत महत्त्वाचे उरलेले ४०% मोठी बांधणी करताना (१२० दिवस).',
            tips: ['नत्र हळूहळू मिळण्यासाठी आणि मुळांना सुत्रकृमींपासून वाचवण्यासाठी युरियामध्ये निंबोळी पेंड १:५ या प्रमाणात मिसळा', 'रासायनिक खतांचा २५% खर्च वाचवण्यासाठी ॲझोटोबॅक्टर आणि PSB जिवाणू खतांचा (१० किलो/हेक्टर शेणखतातून) वापर करा', 'पाने पांढरी किंवा पिवळी पडल्यास झिंक सल्फेट (२० किलो/हेक्टर) आणि फेरस सल्फेट (१५ किलो/हेक्टर) कुजलेल्या खतातून द्या', 'जोराच्या वाऱ्यात ऊस पडू नये म्हणून १२० व्या दिवशी मातीची मोठी बांधणी करणे १००% अनिवार्य आहे']
          }
        },
        {
          title: 'Pest Management',
          titleMarathi: 'किड नियंत्रण',
          icon: Shield,
          image: '/images/guide_sc_pest.png',
          en: {
            content: 'Sugarcane pests can destroy both the yield and the sugar recovery rate. Early detection is key.',
            tips: ['Do not rely solely on chemicals. Release Trichogramma Chilonis egg parasitoid cards (50,000 eggs/ha) 6 times at 15-day intervals for Borer control', 'Spray Imidacloprid (0.5 ml/lit) or Thiamethoxam to instantly control Woolly Aphids. Avoid excessive nitrogen which attracts them', 'Apply Metarhizium Anisopliae (5 kg/ha) in soil during the very first monsoon rain to biologically kill White Grubs hiding deep in the soil'],
            pests: [
              { name: 'Early Shoot Borer', desc: 'Causes "dead heart" in young crops (1-3 months). The central leaf dries up and can be pulled out easily.', image: '/images/sugarcane_stem_borer.png' },
              { name: 'Woolly Aphids', desc: 'Form white cotton-like patches on leaves, sucking sap and severely reducing sugar recovery. Leaves turn yellow.', image: '/images/pest_aphids_1777610239133.png' },
              { name: 'White Grub (Humani)', desc: 'Catastrophic pest. Larvae eat roots from underground leading to sudden drying of entire full-grown clumps. Very difficult to control once established.', image: '/images/pest_white_grub_1777610261927.png' }
            ]
          },
          mr: {
            content: 'उसावरील किडीमुळे उत्पादनात आणि साखरेच्या उताऱ्यात मोठी घट होते. किडीचा वेळेवर बंदोबस्त करणे आवश्यक आहे.',
            tips: ['फक्त रासायनिक औषधांवर विसंबून राहू नका. खोडकिडीसाठी ट्रायकोग्रामा चिलोनीस कार्ड्स (५०,००० अंडी/हेक्टर) १५ दिवसांच्या अंतराने ६ वेळा शेतात लावा', 'लोकरी मावा नियंत्रणासाठी इमिडाक्लोप्रिडची (०.५ मिली/लिटर) फवारणी करा. युरियाचा अतिवापर टाळा कारण त्यामुळे मावा जास्त आकर्षित होतो', 'हुमणी अळी मारण्यासाठी पावसाळ्याच्या पहिल्याच पावसात जमिनीत मेटारायझियम ॲनिसोप्ली (जैविक बुरशी - ५ किलो/हेक्टर) द्या'],
            pests: [
              { name: 'खोडकिड (Early Shoot Borer)', desc: 'उसातील सर्वात भयंकर कीड (१-३ महिने). अळी मुख्य पोंगा खाते ज्यामुळे "डेड हार्ट" (गाभा वाळणे) होते.', image: '/images/sugarcane_stem_borer.png' },
              { name: 'पांढरी माशी / लोकरी मावा (Woolly Aphids)', desc: 'पानांवर पांढरे कापसासारखे डाग तयार करते आणि रस शोषून साखरेचा उतारा भयंकर कमी करते.', image: '/images/pest_aphids_1777610239133.png' },
              { name: 'हुमणी अळी (White Grub)', desc: 'जमिनीखाली मुळे खाते ज्यामुळे वाढलेला ऊस अचानक वाळतो. एकदा प्रादुर्भाव झाल्यावर नियंत्रण खूप कठीण जाते.', image: '/images/pest_white_grub_1777610261927.png' }
            ]
          }
        },
        {
          title: 'Disease Management',
          titleMarathi: 'रोग नियंत्रण',
          icon: Shield,
          image: '/images/guide_sc_disease.png',
          en: {
            content: 'Sugarcane diseases can drastically reduce sugar recovery and overall yield. Preventative measures are always cheaper than cures.',
            tips: ['Always use disease-free seed sets from certified nurseries', 'Hot water treatment of sets at 50°C for 2 hours eliminates most seed-borne pathogens'],
            diseases: [
              { name: 'Red Rot', desc: 'The most destructive disease. Leaves dry from top to bottom. The internal pith becomes red with cross white patches and smells like alcohol. Uproot and burn infected clumps immediately.', image: '/images/sc_redrot.png' },
              { name: 'Whip Smut', desc: 'The central shoot converts into a long, black, whip-like structure covered in powdery spores. Use resistant varieties and avoid ratooning if smut is observed.', image: '/images/sc_smut.png' },
              { name: 'Grassy Shoot', desc: 'Profuse tillering with narrow, pale leaves. The plant looks like a bunch of grass and does not produce millable canes. Caused by Phytoplasma spread by aphids.', image: '/images/sc_grassyshoot.png' }
            ]
          },
          mr: {
            content: 'उसावरील रोगांमुळे साखरेचा उतारा आणि एकूण उत्पादनात मोठी घट होते. रोग आल्यावर उपाय करण्यापेक्षा तो येऊ न देणे नेहमीच स्वस्त असते.',
            tips: ['नेहमी प्रमाणित रोपवाटिकेतील रोगमुक्त बेणेच वापरा', 'लागवडीपूर्वी बेण्यावर ५०°C तापमानाच्या गरम पाण्याची २ तास प्रक्रिया केल्यास अनेक रोग टळतात'],
            diseases: [
              { name: 'तांबेरा (Red Rot)', desc: 'सर्वांत भयंकर रोग. पाने वरून खाली वाळत जातात. उसाचा गाभा लाल होतो आणि त्यातून दारूसारखा वास येतो. रोगग्रस्त ऊस मुळासकट उपटून जाळून टाकावा.', image: '/images/sc_redrot.png' },
              { name: 'चाबूक काणी (Whip Smut)', desc: 'मुख्य पोंग्याचे रूपांतर काळ्या, चाबकासारख्या लांब सोट्यात होते, ज्यावर काळी पावडर असते. रोगप्रतिकारक वाण वापरा आणि रोग दिसल्यास खोडवा घेऊ नका.', image: '/images/sc_smut.png' },
              { name: 'गवती वाढ (Grassy Shoot)', desc: 'खूप जास्त फुटवे येतात आणि पाने बारीक व पिवळी पडतात. झाड गवताच्या बेटासारखे दिसते आणि त्याला ऊस लागत नाही. हा रोग मावा कीटकामुळे पसरतो.', image: '/images/sc_grassyshoot.png' }
            ]
          }
        },
        {
          title: 'Harvesting',
          titleMarathi: 'कापणी',
          icon: Tractor,
          image: '/images/guide_sc_harvest.png',
          en: {
            content: 'Harvest exactly between 10-14 months depending on the variety. Test the Brix value with a hand refractometer; a reading above 18-20% indicates maturity. The cane must reach the sugar factory within 24 hours of cutting.',
            tips: ['Cut the cane extremely close to the ground, as the bottom internodes contain the highest sugar', 'Do not harvest immediately after heavy rain; wait for the field to dry', 'Strip dry leaves and remove immature tops before transport']
          },
          mr: {
            content: 'वाणानुसार बरोबर १०-१४ महिन्यांच्या दरम्यान तोडणी करा. ब्रिक्स मीटरने साखरेचे प्रमाण तपासा; १८-२०% च्या वर रीडिंग आल्यास ऊस पक्व झाला. वजन घटू नये म्हणून तोडणीनंतर २४ तासांच्या आत ऊस कारखान्याला गेलाच पाहिजे.',
            tips: ['ऊस जमिनीलगत कापा, कारण उसाच्या खालच्या कांड्यांमध्ये सर्वात जास्त साखर असते', 'मुसळधार पावसानंतर लगेच तोडणी करू नका; शेत सुकू द्या', 'वाहतुकीपूर्वी सुकलेली पाने (पाचट) काढा आणि कोवळा शेंडा मोडा']
          }
        }
      ]
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
        duration: '120-140 days',
      },
      mr: {
        yield: '२०-३० टन/हेक्टर',
        profit: '₹५,००,००० - ₹१९,००,०००/हेक्टर',
        duration: '१२०-१४० दिवस',
      },
      sections: [
        {
          title: 'Land Preparation',
          titleMarathi: 'जमीन तयारी',
          icon: Tractor,
          image: '/images/guide_sc_land.png',
          en: {
            content: 'Grapes require deep, extremely well-drained loamy to sandy loam soil. The water table should be below 2 meters. Dig trenches of 60 cm width and 60 cm depth. Fill with a mixture of topsoil, FYM, and superphosphate.',
            tips: ['Optimal soil pH is 6.5 to 7.5. High salinity is highly toxic to grapes', 'Space rows at 3 meters (10 feet) and plants at 1.5 meters (5 feet)', 'Install the Bower (Mandap) or Y-Trellis system immediately after trenching']
          },
          mr: {
            content: 'द्राक्षासाठी खोल, पाण्याचा उत्तम निचरा होणारी पोयट्याची किंवा वालुकामय पोयट्याची जमीन आवश्यक आहे. पाण्याची पातळी २ मीटरच्या खाली असावी. ६० सेमी रुंद आणि ६० सेमी खोल चर खोदा. चर चांगल्या माती, शेणखत आणि सुपरफॉस्फेटने भरा.',
            tips: ['मातीचा pH ६.५ ते ७.५ असावा. खारट जमीन द्राक्षासाठी अत्यंत घातक आहे', 'दोन ओळींत ३ मीटर (१० फूट) आणि दोन झाडांत १.५ मीटर (५ फूट) अंतर ठेवा', 'लागवडीनंतर लगेचच मंडप (Bower) किंवा Y-ट्रेलीस सिस्टीम उभी करा']
          }
        },
        {
          title: 'Planting',
          titleMarathi: 'लागवड',
          icon: Sprout,
          image: '/images/guide_sc_plant.png',
          en: {
            content: 'Commercial planting is done using rooted cuttings grafted on Dogridge rootstock (which is highly drought and salinity tolerant). The best planting time in Maharashtra is January to February.',
            tips: ['Purchase 6-month old disease-free grafted plants from certified nurseries', 'Dip roots in Trichoderma solution before planting', 'Use a bamboo stick to support the delicate main stem up to the trellis wire (usually 4 feet high)']
          },
          mr: {
            content: 'दुष्काळ आणि क्षारता सहन करू शकणाऱ्या "डोगरिज" (Dogridge) खुंटावर कलमे करून व्यावसायिक लागवड केली जाते. महाराष्ट्रात लागवडीसाठी जानेवारी ते फेब्रुवारी हा सर्वोत्तम काळ आहे.',
            tips: ['अधिकृत रोपवाटिकांमधून ६ महिने वयाची रोगमुक्त कलमे खरेदी करा', 'लागवडीपूर्वी मुळे ट्रायकोडर्माच्या द्रावणात बुडवा', 'नाजूक खोडाला आधार देण्यासाठी तारांच्या मांडवापर्यंत (साधारण ४ फूट) बांबूची काठी लावा']
          }
        },
        {
          title: 'Pruning',
          titleMarathi: 'छाटणी',
          icon: Leaf,
          image: '/images/guide_gr_prune.png',
          en: {
            content: 'Grapes require two distinct prunings per year for survival and yield. "Foundation/Back Pruning" (April) develops new canes and foliage after the previous harvest. "Forward/Fruit Pruning" (October) forces the vine to produce fruit-bearing bunches. Timing is critical: Pruning 15 days late can reduce yield by 30%.',
            tips: ['Apply Hydrogen Cyanamide (Dormex) paste on buds within 24 hours after Forward pruning to ensure uniform sprouting', 'Retain exactly 30-40 canes per vine based on the thickness (8-10mm pencil size is ideal). Remove all weak or excessive water shoots', 'Strictly disinfect your pruning shears with 1% Sodium Hypochlorite between every single vine to prevent the spread of Leaf Roll Virus', 'Stop irrigation completely for 15 days before both prunings to induce forced dormancy']
          },
          mr: {
            content: 'द्राक्षाला टिकून राहण्यासाठी आणि उत्पादनासाठी वर्षातून दोन वेळा अचूक छाटणी करावी लागते. "खरड/बॅक छाटणी" (एप्रिल) केल्याने नवीन काड्या आणि पाने फुटतात. "गोड/फळ छाटणी" (ऑक्टोबर) केल्याने वेलीवर फळांचे घड लागतात. वेळेचे महत्त्व: छाटणी १५ दिवस उशिरा झाल्यास ३०% उत्पन्न घटते.',
            tips: ['गोड छाटणीनंतर २४ तासांच्या आत डोळे एकसारखे फुटण्यासाठी "डॉरमेक्स" (हायड्रोजन सायनामाइड) ची पेस्ट नक्की लावा', 'जाडीनुसार (८-१० मिमी पेन्सिलच्या आकाराची) एका वेलीवर फक्त ३०-४० निरोगी काड्या ठेवा. अतिरिक्त आणि कमकुवत फुटी (Water shoots) काढून टाका', 'व्हायरस (Leaf Roll Virus) पसरू नये म्हणून एका वेलीची छाटणी झाल्यावर दुसऱ्या वेलीला कात्री लावण्यापूर्वी ती १% सोडियम हायपोक्लोराईटने निर्जंतुक करा', 'दोन्ही छाटण्यांच्या १५ दिवस आधी पाण्याचा प्रचंड ताण द्या, जेणेकरून वेल विश्रांती अवस्थेत जाईल']
          }
        },
        {
          title: 'Irrigation',
          titleMarathi: 'सिंचन',
          icon: Droplets,
          image: '/images/guide_sc_irrigate.png',
          en: {
            content: 'Grapes require precise water stress management. Over-watering during flowering will cause flower drop. Under-watering during berry development will cause cracking and small berry size. Drip irrigation is 100% mandatory.',
            tips: ['Use inline double lateral drip lines (16mm, 4 LPH)', 'Apply massive water stress 15 days before both prunings to push the plant into dormancy', 'Maintain high soil moisture from berry shatter to veraison (color change) stage']
          },
          mr: {
            content: 'द्राक्षाला पाण्याचे अचूक नियोजन लागते. फुलोरा अवस्थेत जास्त पाणी दिल्यास फुले गळतात. मणी पोसण्याच्या अवस्थेत पाणी कमी पडल्यास मण्यांना तडे जातात आणि आकार लहान राहतो. ठिबक सिंचन १००% आवश्यक आहे.',
            tips: ['दोन बाजूंनी ठिबकच्या नळ्या (१६ मिमी, ४ LPH) वापरा', 'दोन्ही छाटण्यांच्या १५ दिवस आधी पाण्याचा प्रचंड ताण द्या, जेणेकरून वेल विश्रांती अवस्थेत जाईल', 'मणी सेट झाल्यापासून ते मण्यांचा रंग बदलेपर्यंत जमिनीत उत्तम ओलावा ठेवा']
          }
        },
        {
          title: 'Disease Management',
          titleMarathi: 'रोग नियंत्रण',
          icon: Shield,
          image: '/images/guide_gr_disease.png',
          en: {
            content: 'Grapes are highly susceptible to fungal diseases due to dense canopy and high moisture. If unchecked, diseases can destroy 100% of the crop.',
            tips: ['Spray prophylactic Copper fungicides (Bordeaux mixture 1%) before the monsoon arrives. Never spray copper during flowering', 'Release Cryptolaemus Montrouzieri (Australian Ladybird beetles) at 1500/acre to naturally control Mealybugs', 'Keep the canopy open to allow sunlight and cross-ventilation; humidity above 80% is the primary trigger for fungal explosions'],
            diseases: [
              { name: 'Downy Mildew', desc: 'Yellow oil spots on top of leaves, white fluff below. Destroys the crop rapidly during monsoons. Use systemic fungicides like Metalaxyl immediately if oil spots appear.', image: '/images/gr_downy.png' },
              { name: 'Powdery Mildew', desc: 'White ash-like powder covers leaves and berries. Attacks during dry, cool winters causing berries to crack. Spray wettable sulfur (2g/L).', image: '/images/gr_powdery.png' },
              { name: 'Anthracnose', desc: 'Deep black/brown sunken lesions on leaves, stems, and berries (Bird-eye spots). Prune and burn infected parts. Spray Propiconazole.', image: '/images/gr_anthracnose.png' }
            ]
          },
          mr: {
            content: 'द्राक्षे रोगांसाठी अत्यंत संवेदनशील असतात. दाट कॅनोपी आणि ओलाव्यामुळे बुरशीजन्य रोग वेगाने पसरतात. नियंत्रण न केल्यास १००% पीक नष्ट होऊ शकते.',
            tips: ['पावसाळा सुरू होण्यापूर्वीच बोर्डो मिश्रण (१%) सारख्या तांब्रयुक्त (Copper) बुरशीनाशकांची प्रतिबंधात्मक फवारणी करा. फुलोरा अवस्थेत तांबे वापरू नका', 'पिठ्या ढेकूण नियंत्रणासाठी ऑस्ट्रेलियन लेडीबर्ड बीटल हे मित्र कीटक एकरी १५०० या प्रमाणात शेतात सोडा', 'वेलीमध्ये हवा खेळती राहील आणि सूर्यप्रकाश पोहोचेल अशी कॅनोपी (Canopy) ठेवा; ८०% पेक्षा जास्त आर्द्रता बुरशीचा स्फोट घडवून आणते'],
            diseases: [
              { name: 'केवडा / डाऊनी मिल्ड्यू', desc: 'पानांच्या वर पिवळे तेलासारखे डाग आणि खाली पांढरी बुरशी. पावसाळ्यात भयंकर वेगाने पसरतो. डाग दिसल्यास लगेच मेटॅलॅक्सिल सारखे आंतरप्रवाही बुरशीनाशक वापरा.', image: '/images/gr_downy.png' },
              { name: 'भुरी / पावडरी मिल्ड्यू', desc: 'पाने आणि मण्यांवर पांढऱ्या राखेसारखी पावडर. थंड आणि कोरड्या हिवाळ्यात येते ज्यामुळे मण्यांना तडे जातात. पाण्यात विरघळणारे गंधक (२ ग्रॅम/लिटर) फवारा.', image: '/images/gr_powdery.png' },
              { name: 'करपा / अँथ्रॅकनोज', desc: 'पाने, खोड आणि मण्यांवर काळे/तपकिरी खोलगट डाग (पक्ष्याच्या डोळ्यासारखे डाग). रोगग्रस्त भाग छाटून जाळून टाका. प्रोपिकोनाझोल फवारा.', image: '/images/gr_anthracnose.png' }
            ]
          }
        },
        {
          title: 'Harvesting',
          titleMarathi: 'कापणी',
          icon: Tractor,
          image: '/images/guide_gr_harvest.png',
          en: {
            content: 'Harvesting occurs 120-140 days after the October fruit pruning. Do not harvest based on color alone. Check the TSS (Total Soluble Solids) using a refractometer. Market standard requires a minimum of 18° Brix sweetness.',
            tips: ['Stop all irrigation completely 7 days before harvest to maximize sugar accumulation', 'Harvest only in the cool early morning (before 10 AM) to maintain export-quality crunchiness', 'Handle bunches exclusively by the stalk to avoid rubbing off the natural white waxy bloom on berries']
          },
          mr: {
            content: 'ऑक्टोबरच्या फळ छाटणीनंतर १२०-१४० दिवसांनी द्राक्षे काढणीस तयार होतात. फक्त रंगावरून काढणी करू नका. रिफ्रॅक्टोमीटरने गोडी (TSS) तपासा. बाजारात उत्तम दरासाठी किमान १८° ब्रिक्स गोडी आवश्यक आहे.',
            tips: ['साखर वाढवण्यासाठी काढणीच्या ७ दिवस आधी पूर्णपणे पाणी तोडा', 'द्राक्षांचा कडकपणा टिकवून ठेवण्यासाठी फक्त पहाटे किंवा सकाळी लवकर (१० च्या आत) काढणी करा', 'मण्यांवरील नैसर्गिक पांढरा थर (Bloom) पुसून जाऊ नये म्हणून घडांना फक्त देठाकडूनच पकडा']
          }
        }
      ]
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
              {language === 'mr' ? crops[crop].nameMarathi : crops[crop].name}
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
                <h1 className="text-4xl font-bold">{language === 'mr' ? crop.nameMarathi : crop.name}</h1>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <Award size={20} />
                <div>
                  <div className="text-sm opacity-80"><TranslatedText>Average Yield</TranslatedText></div>
                  <div className="font-semibold">{language === 'mr' ? crop.mr.yield : crop.en.yield}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <TrendingUp size={20} />
                <div>
                  <div className="text-sm opacity-80"><TranslatedText>Expected Profit</TranslatedText></div>
                  <div className="font-semibold">{language === 'mr' ? crop.mr.profit : crop.en.profit}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <Clock size={20} />
                <div>
                  <div className="text-sm opacity-80"><TranslatedText>Growing Duration</TranslatedText></div>
                  <div className="font-semibold">{language === 'mr' ? crop.mr.duration : crop.en.duration}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Navigation */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
          {crops[selectedCrop].sections.map((section, idx) => (
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
              {language === 'mr' ? section.titleMarathi : section.title}
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
            <div className={`bg-gradient-to-r ${crops[selectedCrop].color} p-6 text-white`}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-full">
                  {React.createElement(crops[selectedCrop].sections[activeSection].icon, { size: 24 })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {language === 'mr' ? crops[selectedCrop].sections[activeSection].titleMarathi : crops[selectedCrop].sections[activeSection].title}
                  </h2>
                </div>
              </div>
            </div>
            <div className="p-8">
              {crops[selectedCrop].sections[activeSection].image && (
                <div className="mb-6 rounded-2xl overflow-hidden shadow-md">
                  <img src={crops[selectedCrop].sections[activeSection].image} alt={crops[selectedCrop].sections[activeSection].title} className="w-full h-48 object-cover" />
                </div>
              )}
              
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {crops[selectedCrop].sections[activeSection][language]?.content || crops[selectedCrop].sections[activeSection].en.content}
              </p>

              {crops[selectedCrop].sections[activeSection][language]?.diseases && (
                <div className="space-y-4 mb-8">
                  {crops[selectedCrop].sections[activeSection][language].diseases.map((d, i) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={i} 
                      className="flex flex-col md:flex-row gap-6 items-start bg-gray-50 border border-gray-100 p-5 rounded-xl hover:shadow-md transition-shadow"
                    >
                      {d.image && (
                        <div className="shrink-0 w-full md:w-48 h-32 rounded-lg overflow-hidden shadow-sm">
                          <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-lg text-gray-800 mb-2">{d.name}</h4>
                        <p className="text-gray-600 leading-relaxed">{d.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {crops[selectedCrop].sections[activeSection][language]?.pests && (
                <div className="space-y-4 mb-8">
                  {crops[selectedCrop].sections[activeSection][language].pests.map((p, i) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={i} 
                      className="flex flex-col md:flex-row gap-6 items-start bg-red-50 border border-red-100 p-5 rounded-xl hover:shadow-md transition-shadow"
                    >
                      {p.image && (
                        <div className="shrink-0 w-full md:w-48 h-32 rounded-lg overflow-hidden shadow-sm">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-lg text-red-800 mb-2">{p.name}</h4>
                        <p className="text-red-900/80 leading-relaxed">{p.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="bg-amber-50 rounded-xl p-6">
                <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                  <Sun size={20} /> <TranslatedText>Pro Tips & Best Practices</TranslatedText>
                </h3>
                <ul className="space-y-3">
                  {(crops[selectedCrop].sections[activeSection][language]?.tips || crops[selectedCrop].sections[activeSection].en.tips).map((tip, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <ChevronRight size={18} className="text-amber-600 mt-1 shrink-0" />
                      <span className="leading-relaxed">{tip}</span>
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