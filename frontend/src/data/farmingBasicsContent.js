import { 
  Mountain, Droplet, Sprout, Tractor, Bug, 
  Calendar, Package, AlertCircle, Leaf, 
  Search, Shield, MapPin, CloudRain, Sun, 
  Thermometer, Scissors, TrendingUp, FlaskConical, Award
} from 'lucide-react';

export const farmingBasicsContent = {
  soil: {
    en: {
      title: '🌱 Soil Science - The Foundation of Farming',
      description: 'Understanding soil is the first step to successful farming. Learn about testing, pH, and fertility.',
      sections: [
        {
          title: '🌑 Soil Types in Maharashtra',
          image: '/images/vid_thumb_soil.png',
          items: [
            '🌑 Black Soil (Regur Soil) - Highly retentive of moisture. Excellent for Cotton, Sugarcane, and Jowar. Predominantly found in Vidarbha and Marathwada regions.',
            '🔴 Red Soil - Porous and less fertile naturally. Responds well to fertilizers. Ideal for Groundnut, Millets, and Pulses. Found in Konkan and Eastern Maharashtra.',
            '🟤 Laterite Soil - Rich in iron and aluminum. Excellent for Cashew, Mango, and other plantation crops. Found in the Konkan coastal belt.',
            '🟡 Alluvial Soil - Very fertile, brought down by rivers. Best for intensive agriculture like Vegetables and Rice. Found in major river valleys.'
          ],
          tips: ['Test your soil type before planning your primary cash crop', 'Add 15-20 tons of organic Farm Yard Manure (FYM) per hectare to improve black soil structure']
        },
        {
          title: '🧪 Comprehensive Soil Testing',
          image: '/images/soil_prep.png',
          items: [
            '🧪 Why Test: Identifies exact nutrient deficiencies (NPK, Zinc, Iron), saving you money on unnecessary fertilizers.',
            '🔬 Professional Testing: Collect samples from 5-6 spots in your field. Mix them, dry them, and take 500g to your local Krishi Vigyan Kendra (KVK). Testing usually costs less than ₹100.',
            '📊 What is Tested: pH level (acidity/alkalinity), Electrical Conductivity (EC - salt content), Organic Carbon, Available Nitrogen, Phosphorus, and Potassium.',
            '📅 Schedule: Test your soil every 2-3 years, specifically 1 month before the Kharif sowing season (May).'
          ],
          tips: ['Do not take soil samples near trees, compost pits, or recently fertilized areas', 'Dig a V-shaped hole 6 inches deep to collect a proper sample profile']
        },
        {
          title: '⚖️ Soil pH Management',
          image: '/images/vid_thumb_organic.png',
          items: [
            '🧪 Acidic Soil (pH < 6.0): Restricts phosphorus availability. Correction: Broadcast agricultural lime (Calcium Carbonate) at 2-3 tons/hectare depending on severity. Mix well and irrigate.',
            '🧴 Alkaline Soil (pH > 7.5): Very common in Maharashtra. Restricts iron and zinc. Correction: Apply Gypsum (Calcium Sulfate) or agricultural sulfur. Increase use of organic compost.',
            '📈 Ideal pH Range: 6.5 to 7.2 is the "sweet spot" where all essential nutrients are easily absorbed by roots.',
            '🌾 Crop Specifics: Sugarcane tolerates 6.5-8.0, but Grapes are highly sensitive and strictly require 6.5-7.5 pH.'
          ],
          tips: ['Never apply lime and urea at the same time; it causes nitrogen loss as gas', 'Test pH annually if you rely heavily on chemical fertilizers']
        },
        {
          title: '🌿 Building Soil Fertility organically',
          image: '/images/hero_bg.png',
          items: [
            '🌿 Green Manuring: Sow Dhaincha (Sesbania) or Sunhemp with first rains. Plow it back into the soil after 45 days. Adds massive amounts of nitrogen and organic carbon.',
            '🔄 Crop Rotation: Never plant the same crop family continuously. Rotate heavy feeders (Sugarcane/Cotton) with nitrogen-fixers (Soybean/Gram).',
            '🦠 Bio-fertilizers: Treat seeds or soil with Rhizobium, Azotobacter, and PSB (Phosphorus Solubilizing Bacteria). Costs just ₹50-100/acre but boosts yield by 10-15%.',
            '🍂 Mulching: Cover bare soil with crop residue (like sugarcane trash). It reduces evaporation by 60%, suppresses weeds, and slowly turns into compost.'
          ],
          tips: ['Aim to keep soil Organic Carbon above 0.5%', 'Incorporate Vermicompost at 2 tons/acre for high-value crops like grapes']
        },
        {
          title: '🔬 Micronutrient Management',
          image: '/images/vid_thumb_organic.png',
          items: [
            '⛓️ Zinc (Zn): Most deficient in Maharashtra soils. Deficiency causes "khaira" disease and stunted growth. Apply 10kg/acre Zinc Sulfate in basal dose.',
            '⚙️ Ferrous (Iron): Common in calcareous soils. Causes new leaves to turn yellow while veins stay green. Use Ferrous Sulfate (10kg/acre) or EDTA-Iron sprays.',
            '💧 Boron (B): Critical for flower setting and preventing fruit cracking in Grapes and Pomegranates. Apply 2-3 kg/acre Borax.'
          ],
          tips: ['Always apply micronutrients based on soil reports; excess can be toxic to plants', 'Mix micronutrients with organic manure for better absorption']
        }
      ]
    },
    mr: {
      title: '🌱 मातीची माहिती - शेतीचा पाया',
      description: 'उत्तम शेतीसाठी मातीची ओळख होणे ही पहिली पायरी आहे. माती परीक्षण, pH आणि सुपीकता याबद्दल सविस्तर जाणून घ्या.',
      sections: [
        {
          title: '🌑 महाराष्ट्रातील मातीचे प्रकार',
          image: '/images/vid_thumb_soil.png',
          items: [
            '🌑 काळी कसदार माती (रेगूर माती) - पाणी धरून ठेवण्याची क्षमता जास्त. कापूस, ऊस आणि ज्वारीसाठी सर्वोत्तम. विदर्भ आणि मराठवाड्यात जास्त आढळते.',
            '🔴 लाल माती - पाण्याचा निचरा लवकर होतो. खतांना चांगला प्रतिसाद देते. भुईमूग, तृणधान्ये आणि कडधान्यांसाठी उत्तम. कोकण आणि पूर्व महाराष्ट्रात आढळते.',
            '🟤 जांभी माती - लोह आणि ॲल्युमिनियम भरपूर असते. काजू, आंबा आणि फळबागांसाठी उत्तम. कोकण किनारपट्टीवर आढळते.',
            '🟡 गाळाची माती - नद्यांनी आणलेल्या गाळामुळे अत्यंत सुपीक. भाजीपाला आणि भात शेतीसाठी एक नंबर. मुख्य नद्यांच्या खोऱ्यात आढळते.'
          ],
          tips: ['मुख्य नगदी पीक घेण्यापूर्वी मातीचा प्रकार समजून घ्या', 'काळ्या मातीचा पोत सुधारण्यासाठी हेक्टरी १५-२० टन कुजलेले शेणखत टाका']
        },
        {
          title: '🧪 मातीचे सविस्तर परीक्षण',
          image: '/images/soil_prep.png',
          items: [
            '🧪 का करावे?: पिकाला नक्की कोणत्या खताची (NPK, झिंक, लोह) गरज आहे हे समजते, ज्यामुळे खतांवरील अनावश्यक खर्च वाचतो.',
            '🔬 तपासणी कशी करावी: शेतातील ५-६ ठिकाणांहून माती घ्या. ती एकत्र करा, सुकवा आणि ५०० ग्रॅम माती जवळच्या कृषी विज्ञान केंद्रात (KVK) द्या. तपासणीसाठी साधारण १०० रुपयांपेक्षा कमी खर्च येतो.',
            '📊 काय तपासले जाते: मातीचा सामू (pH), क्षारता (EC), सेंद्रिय कर्ब, उपलब्ध नत्र, स्फुरद आणि पालाश.',
            '📅 वेळापत्रक: दर २-३ वर्षांनी एकदा, विशेषतः खरीप पेरणीच्या १ महिना आधी (मे महिन्यात) माती तपासा.'
          ],
          tips: ['झाडांखालील, खड्ड्यांजवळील किंवा नुकतेच खत दिलेल्या ठिकाणची माती नमुन्यासाठी घेऊ नका', "योग्य नमुना घेण्यासाठी 'V' आकाराचा ६ इंच खोल खड्डा खणा"]
        },
        {
          title: '⚖️ मातीचा गोड-आंबटपणा (pH) सांभाळणे',
          image: '/images/vid_thumb_organic.png',
          items: [
            '🧪 आंबट माती (pH < ६.०): स्फुरद (फॉस्फरस) पिकाला मिळत नाही. उपाय: तीव्रतेनुसार हेक्टरी २-३ टन कृषी चुना (कॅल्शियम कार्बोनेट) टाका. मातीत मिसळून पाणी द्या.',
            '🧴 विम्ल/खारट माती (pH > ७.५): महाराष्ट्रात ही मोठी समस्या आहे. लोह आणि झिंक पिकाला मिळत नाही. उपाय: जिप्सम किंवा कृषी गंधक वापरा. सेंद्रिय खतांचा वापर वाढवा.',
            '📈 योग्य प्रमाण: ६.५ ते ७.२ हा pH सर्वात उत्तम मानला जातो, जिथे सर्व आवश्यक अन्नद्रव्ये मुळांना सहज मिळतात.',
            '🌾 पिकांनुसार बदल: ऊस ६.५-८.० pH सहन करू शकतो, परंतु द्राक्षे अत्यंत संवेदनशील असतात आणि त्यांना ६.५-७.५ pH चीच आवश्यकता असते.'
          ],
          tips: ['चुना आणि युरिया कधीही एकत्र वापरू नका; त्यामुळे नत्र वायूच्या रूपात उडून जातो', 'रासायनिक खतांचा जास्त वापर करत असल्यास दरवर्षी pH तपासा']
        },
        {
          title: '🌿 जमिनीची सुपीकता सेंद्रिय पद्धतीने वाढवणे',
          image: '/images/hero_bg.png',
          items: [
            '🌿 हिरवळीचे खत: पहिल्या पावसात ताग किंवा धैंचा पेरा. ४५ दिवसांनी तो नांगरून जमिनीत गाडा. यातून प्रचंड प्रमाणात नत्र आणि सेंद्रिय कर्ब मिळतो.',
            '🔄 पिकांची फेरपालट: एकाच कुळातील पिके सतत घेऊ नका. जास्त खत खाणारी पिके (ऊस/कापूस) आणि नत्र स्थिर करणारी पिके (सोयाबीन/हरभरा) आलटून पालटून घ्या.',
            '🦠 जिवाणू खते: बियाण्यांवर किंवा मातीत रायझोबियम, अझोटोबॅक्टर आणि PSB चा वापर करा. खर्च फक्त ५०-१00 रुपये/एकर येतो पण उत्पन्न १०-१५% वाढते.',
            '🍂 आच्छादन (Mulching): उघडी माती पिकांच्या अवशेषांनी (उदा. उसाचे पाचट) झाका. यामुळे पाण्याचे बाष्पीभवन ६०% कमी होते, तण नियंत्रणात राहते आणि हळूहळू त्याचे खत बनते.'
          ],
          tips: ['जमिनीतील सेंद्रिय कर्ब ०.५% च्या वर ठेवण्याचे उद्दिष्ट ठेवा', 'द्राक्षांसारख्या जास्त उत्पन्नाच्या पिकांसाठी एकरी २ टन गांडूळ खत वापरा']
        },
        {
          title: '🔬 सूक्ष्म अन्नद्रव्ये व्यवस्थापन',
          image: '/images/vid_thumb_organic.png',
          items: [
            '⛓️ जस्त (Zinc): महाराष्ट्रातील जमिनीत याची सर्वात जास्त कमतरता आहे. यामुळे पिकाची वाढ खुंटते. बेसल डोसमध्ये एकरी १० किलो झिंक सल्फेट वापरा.',
            '⚙️ लोह (Iron): चूनखडीच्या जमिनीत लोहाची कमतरता जास्त दिसते. नवीन पाने पिवळी पडतात पण शिरा हिरव्या राहतात. १० किलो फेरस सल्फेट वापरा किंवा चिलेटेड लोहाची फवारणी करा.',
            '💧 बोरॉन (Boron): फळधारणा आणि फळे तडकण्यापासून वाचवण्यासाठी (विशेषतः द्राक्ष आणि डाळिंब) बोरॉन महत्त्वाचे आहे. एकरी २-३ किलो बोराॅक्स वापरा.'
          ],
          tips: ['सूक्ष्म अन्नद्रव्यांचा वापर नेहमी माती परीक्षण अहवालानुसार करा; जास्त वापर हानिकारक ठरू शकतो', 'चांगल्या रिझल्टसाठी सूक्ष्म अन्नद्रव्ये शेणखतात मिसळून द्या']
        }
      ]
    }
  },
  water: {
    en: {
      title: '💧 Water Management - Smart Irrigation',
      description: 'Efficient water management can save up to 50% of water while improving crop yields and preventing water-logging.',
      sections: [
        {
          title: '💦 Precision Irrigation Types',
          image: '/images/vid_thumb_drip.png',
          items: [
            '💧 Drip Irrigation: 90-95% efficiency. Delivers water directly to the root zone. Essential for Sugarcane, Grapes, and Bananas. Saves up to 50% water compared to flooding.',
            '💦 Sprinkler Irrigation: 70-80% efficiency. Simulates rain. Best for closely spaced crops like Wheat, Gram, and Onions. Great for cooling crops during extreme heat.',
            '🌊 Flood Irrigation: Only 30-40% efficient. Massive water wastage and leads to soil salinity. Should only be used for Paddy (Rice).',
            '📏 Furrow Irrigation: 60% efficiency. Better than flooding. Water flows through small channels. Good for Cotton and Maize.'
          ],
          tips: ['Clean drip irrigation filters daily and flush laterals monthly with acid treatment to prevent clogging', 'Operate sprinklers in early morning or late evening to minimize evaporation loss']
        },
        {
          title: '🏠 Water Conservation & Harvesting',
          image: '/images/water_irrigation.png',
          items: [
            '🏠 Farm Ponds (Shet Tale): Dig a 20x20x3 meter pond with plastic lining. Collects monsoon runoff. Can provide 2-3 critical life-saving irrigations during dry spells.',
            '🍂 Plastic Mulching: Using 25-30 micron silver-black plastic mulch in row crops reduces evaporation by 70%, completely stops weed growth, and increases yield by 20%.',
            '⛰️ Continuous Contour Trenches (CCT): Dig trenches along the slope of your hilly land to slow down runoff, allowing water to percolate and recharge groundwater.',
            '⏰ Deficit Irrigation: Scientifically stressing the plant slightly during non-critical growth stages to force deeper root growth and save water.'
          ],
          tips: ['Government provides up to 80% subsidy for Farm Ponds under Magel Tyala Shet Tale scheme', 'Install a simple tensiometer (soil moisture sensor) to know exactly when to irrigate']
        },
        {
          title: '🧪 Fertigation - Feeding through Water',
          image: '/images/vid_thumb_drip.png',
          items: [
            '🧪 What is Fertigation: Applying water-soluble fertilizers directly through the drip system. It ensures 90% nutrient uptake efficiency compared to 30-40% in traditional broadcasting.',
            '📈 Benefits: Uniform distribution of nutrients, reduced labor cost, and the ability to feed the plant exactly what it needs at each growth stage.',
            '⚠️ Safety First: Always use a Venturi injector or a fertilizer tank. Flush the system for 15 minutes with plain water after every fertigation session to prevent salt buildup.'
          ],
          tips: ['Never mix Calcium and Phosphorus fertilizers in the same tank; they react to form insoluble sludge', 'Check water pH; if it is above 7.5, adding a small amount of phosphoric acid can help keep emitters clean']
        }
      ]
    },
    mr: {
      title: '💧 जल व्यवस्थापन - आधुनिक सिंचन',
      description: 'पाण्याचे योग्य नियोजन केल्यास ५०% पाण्याची बचत होते, पिकाचे उत्पन्न वाढते आणि जमीन खराब होण्यापासून वाचते.',
      sections: [
        {
          title: '💦 सिंचनाचे प्रगत प्रकार',
          image: '/images/vid_thumb_drip.png',
          items: [
            '💧 ठिबक सिंचन (Drip): ९०-९५% कार्यक्षमता. पाणी थेट मुळांना मिळते. ऊस, द्राक्षे आणि केळीसाठी अत्यंत आवश्यक. मोकाट पाण्यापेक्षा ५०% पाणी वाचते.',
            '💦 तुषार सिंचन (Sprinkler): ७०-८०% कार्यक्षमता. पावसासारखे पाणी पडते. गहू, हरभरा आणि कांद्यासारख्या जवळ लावलेल्या पिकांसाठी उत्तम. अति उष्णतेत पिकांना थंडावा देण्यासाठी फायदेशीर.',
            '🌊 मोकाट पाणी: फक्त ३०-४०% कार्यक्षमता. पाण्याची प्रचंड नासाडी होते आणि जमीन खारपड बनते. फक्त भात शेतीसाठीच वापरावे.',
            '📏 सरी-वरंबा पद्धत: ६०% कार्यक्षमता. मोकाट पाण्यापेक्षा बरी. पाणी लहान चरांमधून वाहते. कापूस आणि मक्यासाठी चांगली.'
          ],
          tips: ['ठिबकचे फिल्टर रोज साफ करा आणि चोकअप टाळण्यासाठी दर महिन्याला ॲसिड ट्रीटमेंटने नळ्या स्वच्छ करा', 'पाण्याचे बाष्पीभवन टाळण्यासाठी तुषार सिंचन सकाळी लवकर किंवा संध्याकाळी चालवा']
        },
        {
          title: '🏠 पाणी अडवणे आणि जिरवणे (जलसंधारण)',
          image: '/images/water_irrigation.png',
          items: [
            '🏠 शेततळे: प्लॅस्टिक अस्तरीकरण असलेले २०x२०x३ मीटरचे शेततळे खोदा. पावसाचे पाणी साठवून दुष्काळी काळात पिकाला २-३ जीवदान देणारी पाणी पाळ्या देता येतात.',
            '🍂 प्लॅस्टिक आच्छादन (Mulching): २५-३० मायक्रॉनचे सिल्व्हर-ब्लॅक प्लॅस्टिक मल्चिंग वापरल्यास पाण्याचे बाष्पीभवन ७०% कमी होते, तण पूर्णपणे थांबते आणि उत्पन्न २०% वाढते.',
            '⛰️ समतल चर (CCT): उताराच्या जमिनीवर समपातळीवर चर खोदा. यामुळे वाहून जाणारे पाणी थांबते आणि जमिनीत मुरून भूजल पातळी वाढते.',
            '⏰ संरक्षित सिंचन: पिकाच्या वाढीच्या अत्यंत महत्त्वाच्या टप्प्यांवरच (उदा. फुलोरा अवस्था) नेमके पाणी देणे, इतर वेळी पाणी वाचवणे.'
          ],
          tips: ['"मागेल त्याला शेततळे" योजनेअंतर्गत सरकार शेततळ्यासाठी ८०% पर्यंत अनुदान देते', 'जमिनीत नेमका किती ओलावा आहे हे पाहण्यासाठी टेन्सिओमीटर (ओलावा मापक) बसवा']
        },
        {
          title: '🧪 फर्टिगेशन - पाण्यातून खत व्यवस्थापन',
          image: '/images/vid_thumb_drip.png',
          items: [
            '🧪 फर्टिगेशन म्हणजे काय?: विद्राव्य खते थेट ठिबक संचाद्वारे पिकाला देणे. पारंपारिक पद्धतीपेक्षा (३०-४०%) यात खताची कार्यक्षमता ९०% पर्यंत वाढते.',
            '📈 फायदे: खतांचे समसमान वाटप होते, मजुरीचा खर्च वाचतो आणि पिकाच्या गरजेनुसार आवश्यक अन्नद्रव्ये देता येतात.',
            '⚠️ खबरदारी: खते देण्यासाठी नेहमी व्हेंचुरी किंवा फर्टिलायझर टँकचा वापर करा. खत देऊन झाल्यावर ठिबक संच किमान १५ मिनिटे साध्या पाण्याने चालवा जेणेकरून नळ्या चोकअप होणार नाहीत.'
          ],
          tips: ['कॅल्शियम आणि स्फुरद (फॉस्फरस) असलेली खते कधीही एकाच टाकीत मिसळू नका; त्यांची प्रक्रिया होऊन साका तयार होतो', 'पाण्याचा सामू (pH) ७.५ च्या वर असल्यास, ठिबकच्या नळ्या स्वच्छ ठेवण्यासाठी थोड्या प्रमाणात फॉस्फोरिक ॲसिडचा वापर करा']
        }
      ]
    }
  },
  crops: {
    en: {
      title: '🌾 Crop Science - Maximizing Yields',
      description: 'Different crops have vastly different nutritional, spacing, and climate requirements.',
      sections: [
        {
          title: '🌾 High-Value Cash Crops',
          image: '/images/calc_sugarcane_real.png',
          items: [
            '🎋 Sugarcane: 12-18 month duration. Requires massive water (2000mm+). Best spacing is 4 to 5 feet between rows. Intercropping with cabbage or gram is highly profitable.',
            '🍇 Grapes: Requires heavy initial investment (trellis system). Lifespan of 15+ years. Pruning timing and intensive fungal disease management are critical to success.',
            '🧅 Onion: 3-4 month duration. Very sensitive to water-logging. Requires sulfur application for good pungency and storage life.',
            '🧵 Cotton: 6-8 month duration. Requires deep black soil. Deep tap root system makes it relatively drought-tolerant.'
          ],
          tips: ['For sugarcane, use single-bud setts treated with fungicide to ensure 95% germination', 'Never plant cotton in shallow soils; yields will drop drastically']
        },
        {
          title: '🌧️ Seasonal Planning & Rotations',
          image: '/images/season_calendar.png',
          items: [
            '🌧️ Kharif (June-Oct): Relies on monsoon. Fast-growing crops like Soybean, Moong, Udid, and Bajra. Critical to sow within 15 days of good monsoon onset.',
            '❄️ Rabi (Oct-March): Relies on residual soil moisture and winter dew. Wheat, Gram (Chana), and Rabi Jowar. Sowing must complete by November 15th for best yields.',
            '☀️ Zaid (Summer): Requires assured irrigation. Watermelon, Muskmelon, and Summer Groundnut. Extremely high market rates if harvested before monsoon.',
            '🔄 Best Rotations: Soybean ➔ Wheat, Moong ➔ Rabi Jowar, Sugarcane ➔ Ratoon ➔ Gram.'
          ],
          tips: ['Treat all seeds with Trichoderma before sowing to prevent root rot', 'If monsoon is delayed beyond July 15th, switch from long-duration Tur to short-duration Moong']
        },
        {
          title: '🌱 Seed Treatment & Nursery',
          image: '/images/vid_thumb_soil.png',
          items: [
            '🌱 Bio-Priming: Treating seeds with Rhizobium or Azotobacter can fix 20-30 kg of Nitrogen naturally from the air into the soil.',
            '🧪 Fungicidal Coating: Coating seeds with Carbendazim (2g/kg) protects the seedling from soil-borne diseases for the first 20 days.',
            '🏗️ Pro-tray Nursery: For vegetables, use pro-trays with coco-peat instead of soil beds. This ensures 100% survival after transplanting and prevents root damage.'
          ],
          tips: ['Seed treatment is the cheapest insurance for your crop; costs only ₹50 per acre but saves thousands', 'Always dry seeds in the shade after treatment, never in direct sunlight']
        }
      ]
    },
    mr: {
      title: '🌾 पीक विज्ञान - उत्पन्न वाढीचे तंत्र',
      description: 'प्रत्येक पिकाच्या खतांच्या, अंतराच्या आणि हवामानाच्या गरजा पूर्णपणे वेगळ्या असतात.',
      sections: [
        {
          title: '🌾 जास्त नफा देणारी नगदी पिके',
          image: '/images/calc_sugarcane_real.png',
          items: [
            '🎋 ऊस: १२-१८ महिन्यांचे पीक. प्रचंड पाणी लागते (२००० मिमी+). दोन ओळींत ४ ते ५ फूट अंतर ठेवल्यास सर्वाधिक उत्पन्न मिळते. कोबी किंवा हरभरा आंतरपीक म्हणून घेतल्यास मोठा फायदा होतो.',
            '🍇 द्राक्षे: सुरुवातीला मोठी गुंतवणूक (मंडप/ट्रेलीस सिस्टीम) लागते. आयुष्य १५+ वर्षे. यशस्वी होण्यासाठी छाटणीची योग्य वेळ आणि बुरशीजन्य रोगांचे अचूक नियंत्रण अत्यंत महत्त्वाचे आहे.',
            '🧅 कांदा: ३-४ महिन्यांचे पीक. पाणी साचल्यास लगेच सडतो. कांद्याचा तिखटपणा आणि साठवण क्षमता वाढवण्यासाठी गंधकाचा (सल्फर) वापर करणे आवश्यक आहे.',
            '🧵 कापूस: ६-८ महिन्यांचे पीक. खोल काळी माती लागते. सोटमूळ खोलवर जात असल्याने हे पीक बऱ्यापैकी दुष्काळ सहन करू शकते.'
          ],
          tips: ['उसासाठी एक-डोळा पद्धत (रोपवाटिका) वापरा आणि बुरशीनाशकाची प्रक्रिया करा, ज्यामुळे ९५% उगवण होईल', 'कापूस कधीही उथळ किंवा हलक्या जमिनीत लावू नका; उत्पन्नात मोठी घट येईल']
        },
        {
          title: '🌧️ हंगामानुसार नियोजन आणि फेरपालट',
          image: '/images/season_calendar.png',
          items: [
            '🌧️ खरीप (जून-ऑक्टो): पावसावर अवलंबून. सोयाबीन, मूग, उडीद आणि बाजरी यांसारखी वेगाने वाढणारी पिके. चांगला पाऊस पडल्यानंतर १५ दिवसांच्या आत पेरणी करणे अत्यंत महत्त्वाचे.',
            '❄️ रब्बी (ऑक्टो-मार्च): जमिनीतील ओलावा आणि हिवाळ्यातील दव यावर अवलंबून. गहू, हरभरा आणि रब्बी ज्वारी. सर्वाधिक उत्पन्नासाठी १५ नोव्हेंबरपर्यंत पेरणी पूर्ण होणे आवश्यक.',
            '☀️ उन्हाळी (झैद): खात्रीशीर पाण्याची सोय आवश्यक. कलिंगड, खरबूज आणि उन्हाळी भुईमूग. पावसाळ्यापूर्वी माल बाजारात आल्यास प्रचंड दर मिळतो.',
            '🔄 उत्तम फेरपालट: सोयाबीन ➔ गहू, मूग ➔ रब्बी ज्वारी, ऊस ➔ खोडवा ➔ हरभरा.'
          ],
          tips: ['पेरणीपूर्वी सर्व बियाण्यांवर ट्रायकोडर्माची बीजप्रक्रिया करा जेणेकरून मुळकूज टळेल', 'पाऊस १५ जुलैच्या पुढे गेल्यास, जास्त कालावधीच्या तुरीऐवजी कमी कालावधीचा मूग पेरा']
        },
        {
          title: '🌱 बीजप्रक्रिया आणि रोपवाटिका',
          image: '/images/vid_thumb_soil.png',
          items: [
            '🌱 जैविक बीजप्रक्रिया: बियाण्यांना रायझोबियम किंवा ॲझोटोबॅक्टर लावल्यास हवेतील २०-३० किलो नत्र जमिनीत स्थिर होतो.',
            '🧪 बुरशीनाशक कोटिंग: कार्बेन्डाझिम (२ ग्रॅम/किलो) लावल्यास सुरुवातीच्या २० दिवसांत मातीतील रोगांपासून संरक्षण मिळते.',
            '🏗️ प्रो-ट्रे रोपवाटिका: भाजीपाल्यासाठी गादी वाफ्याऐवजी कोको-पीट आणि प्रो-ट्रेचा वापर करा. यामुळे मुळांना इजा होत नाही आणि रोपे १००% जगतात.'
          ],
          tips: ['बीजप्रक्रिया हा पिकाचा सर्वात स्वस्त विमा आहे; एकरी फक्त ५० रुपये खर्च येतो पण हजारो रुपये वाचतात', 'बीजप्रक्रिया केल्यानंतर बियाणे नेहमी सावलीत सुकवा, कडक उन्हात कधीही ठेवू नका']
        }
      ]
    }
  },
  equipment: {
    en: {
      title: '🚜 Farm Equipment Guide',
      description: 'Choosing the right machinery reduces labor dependency and speeds up operations.',
      sections: [
        {
          title: '🚜 Essential Farm Machinery',
          image: '/images/tractor_equipment.png',
          items: [
            '🚜 Tractor (35-50 HP): The workhorse. Used for deep plowing, harrowing, and heavy transport. Costs ₹6-8 Lakhs. Good for farms over 5 acres.',
            '🔄 Rotavator: Pulverizes the soil into a fine tilth in a single pass. Essential for seedbed preparation. Saves time compared to traditional harrowing.',
            '💨 Boom Sprayer: Tractor-mounted sprayer. Applies pesticides evenly over a large area in minutes. Crucial for large scale pest control.',
            '🌱 Seed Drill: Automatically drops seeds and fertilizer at the exact right depth and spacing. Increases germination rates by 20% compared to manual broadcasting.'
          ],
          tips: ['Service your tractor every 250 hours of operation (oil change, filters)', 'Clean sprayer nozzles with an old toothbrush, never blow through them with your mouth']
        }
      ]
    },
    mr: {
      title: '🚜 शेतीची अवजारे आणि यंत्रे',
      description: 'योग्य यंत्रांची निवड केल्यास मजुरांवरील अवलंबित्व कमी होते आणि कामे वेगाने होतात.',
      sections: [
        {
          title: '🚜 अत्यावश्यक शेती यंत्रे',
          image: '/images/tractor_equipment.png',
          items: [
            '🚜 ट्रॅक्टर (३५-५० HP): शेतीचा कणा. खोल नांगरणी, वखरणी आणि जड वाहतुकीसाठी. किंमत ६-८ लाख रुपये. ५ एकरापुढील शेतीसाठी उपयुक्त.',
            '🔄 रोटाव्हेटर: एकाच फटक्यात मातीची बारीक धूळ करून ढेकळे फोडतो. पेरणीची जमीन तयार करण्यासाठी अत्यंत आवश्यक. पारंपरिक वखरणीच्या तुलनेत वेळ वाचवतो.',
            '💨 बूम स्प्रेअर (फवारणी यंत्र): ट्रॅक्टरला जोडलेला पंप. मोठ्या क्षेत्रावर काही मिनिटांत एकसारखी फवारणी करतो. मोठ्या प्रमाणावरील रोग नियंत्रणासाठी आवश्यक.',
            '🌱 पेरणी यंत्र (Seed Drill): बियाणे आणि खत अचूक खोलीवर आणि योग्य अंतरावर सोडते. हाताने पेरणी करण्यापेक्षा उगवण क्षमता २०% ने वाढते.'
          ],
          tips: ['दर २५० तासांच्या वापरानंतर ट्रॅक्टरची सर्व्हिसिंग (ऑइल आणि फिल्टर बदल) नक्की करा', 'स्प्रेअरचे नोझल जुन्या टूथब्रशने स्वच्छ करा, त्यात कधीही तोंडाने फुंकर मारू नका']
        }
      ]
    }
  },
  pests: {
    en: {
      title: '🐛 Pest & Disease Management',
      description: 'Identify common pests early. Integrated Pest Management (IPM) is cheaper and safer than relying solely on chemical sprays.',
      sections: [
        {
          title: '🐛 Major Insects & Solutions',
          image: '/images/vid_thumb_pest.png',
          items: [
            { name: 'Stem Borer (Sugarcane)', desc: 'Larvae eat the central shoot causing "Dead Heart". Control: Clip infested shoots. Release Trichogramma chilonis egg parasitoids at 50,000/ha.', image: '/images/sugarcane_stem_borer.png' },
            { name: 'Sucking Pests (Aphids/Thrips)', desc: 'Curled leaves, sticky residue, stunted growth. Common in cotton and veg. Control: Spray Neem Seed Kernel Extract (NSKE 5%) or Imidacloprid.', image: '/images/pest_aphids_1777610239133.png' },
            { name: 'White Grub', desc: 'Attacks roots from underground. Plant suddenly wilts and dies. Control: Deep summer plowing exposes grubs to birds. Apply Metarhizium anisopliae in soil.', image: '/images/pest_white_grub_1777610261927.png' },
            { name: 'Fall Armyworm (Maize/Sorghum)', desc: 'Severe leaf damage with large holes. Control: Spray Spinetoram or Emamectin Benzoate inside the whorls.', image: '/images/pest_armyworm_1777610279223.png' }
          ],
          tips: ['Install 10 Yellow Sticky Traps and 5 Pheromone Traps per acre to monitor pest populations early', 'Always spray pesticides in the late afternoon to protect friendly bees']
        },
        {
          title: '🦠 Common Fungal & Viral Diseases',
          image: '/images/guide_gr_disease.png',
          items: [
            { name: 'Powdery Mildew', desc: 'White powder-like spots on leaves. Very common in Grapes and Cucurbits. Control: Spray Wettable Sulfur (2g/liter).', image: '/images/gr_powdery.png' },
            { name: 'Downy Mildew', desc: 'Yellow angular spots on top, fluffy white growth underneath. Control: Spray Copper Oxychloride or Mancozeb.', image: '/images/gr_downy.png' },
            { name: 'Root Rot / Wilt', desc: 'Sudden drying of entire plant while leaves are still green. Control: Drench soil with Trichoderma viride or Carbendazim.', image: '/images/disease_root_rot_1777610296696.png' },
            { name: 'Viral Mosaics', desc: 'Yellow and green mottling on leaves. NO CURE. Virus is spread by Whiteflies. Control: Immediately uproot and burn infected plants. Spray to kill whiteflies.', image: '/images/disease_mosaic_1777610312736.png' }
          ],
          tips: ['Fungal diseases spread fast in high humidity; increase spacing to improve air flow', 'Disinfect pruning scissors with bleach between plants to stop virus spread']
        }
      ]
    },
    mr: {
      title: '🐛 कीड आणि रोगांचे एकात्मिक व्यवस्थापन (IPM)',
      description: 'किडीची वेळेवर ओळख करा. फक्त रासायनिक फवारणीवर अवलंबून न राहता एकात्मिक कीड व्यवस्थापन (IPM) करणे स्वस्त आणि सुरक्षित आहे. पिकाचे १००% नुकसान टाळण्यासाठी प्रतिबंधात्मक उपाययोजना अत्यंत महत्त्वाची आहे.',
      sections: [
        {
          title: '🐛 मुख्य किडी आणि त्यांचे जालीम उपाय',
          image: '/images/vid_thumb_pest.png',
          items: [
            { name: 'खोडकिडा (Stem Borer)', desc: 'उसातील सर्वात भयंकर कीड (१-३ महिने). अळी मुख्य पोंगा खाते ज्यामुळे "डेड हार्ट" (गाभा वाळणे) होते. उपाय: कीडग्रस्त पोंगे जमिनीलगत कापा. जैविक उपाय म्हणून हेक्टरी ५०,००० ट्रायकोग्रामा चिलोनीस (मित्र कीटक) कार्ड्स दर १५ दिवसांनी शेतात लावा. रासायनिक नियंत्रण: क्लोरँट्रानिलिप्रोल १८.५ SC.', image: '/images/sugarcane_stem_borer.png' },
            { name: 'रस शोषक किडी (मावा, तुडतुडे, फुलकिडे)', desc: 'पाने आकसतात, चिकट स्राव सुटतो, आणि काळी बुरशी येते. उपाय: सुरुवातीला ५% निंबोळी अर्काची फवारणी करा. प्रादुर्भाव जास्त असल्यास इमिडाक्लोप्रिड १७.८ SL किंवा थायोमेथोक्झाम २५ WG फवारा.', image: '/images/pest_aphids_1777610239133.png' },
            { name: 'हुमणी अळी (White Grub)', desc: 'जमिनीच्या खालून मुळे कुरतडते. झाड अचानक वाळते. ऑगस्ट-सप्टेंबरमध्ये प्रादुर्भाव जास्त. उपाय: उन्हाळ्यात खोल नांगरणी करून अळ्या पक्ष्यांना खाऊ द्या. जमिनीत मेटारायझियम ॲनिसोप्ली किंवा ब्युव्हेरिया बासियाना (जैविक बुरशी) शेणखतातून द्या.', image: '/images/pest_white_grub_1777610261927.png' },
            { name: 'लष्करी अळी (Fall Armyworm)', desc: 'मका व ज्वारीवरील सर्वांत घातक कीड. पानांना मोठी छिद्रे पाडून भयानक नुकसान करते. उपाय: स्पिनेटोरम ११.७ SC किंवा इमामेक्टिन बेंझोएट थेट पोंग्यामध्ये फवारा. रात्रीच्या वेळी कामगंध सापळे (Pheromone traps) लावा.', image: '/images/pest_armyworm_1777610279223.png' }
          ],
          tips: ['किडीचा प्रादुर्भाव आधीच ओळखण्यासाठी एकरी १० पिवळे व निळे चिकट सापळे आणि ५ कामगंध सापळे नक्की लावा', 'मित्र कीटकांना (मधमाश्या, लेडीबर्ड बीटल) वाचवण्यासाठी नेहमी संध्याकाळी उशिरा फवारणी करा', 'एकच रासायनिक औषध वारंवार फवारू नका, कीड प्रतिकारशक्ती (Resistance) तयार करते']
        },
        {
          title: '🦠 मुख्य बुरशीजन्य आणि विषाणूजन्य रोग',
          image: '/images/guide_gr_disease.png',
          items: [
            { name: 'भुरी (Powdery Mildew)', desc: 'पानांवर व फळांवर पांढऱ्या पावडरसारखे डाग. द्राक्षे आणि वेलवर्गीय पिकात जास्त येते (कोरड्या आणि थंड हवामानात). उपाय: प्रतिबंधात्मक पाण्यात विरघळणारे गंधक (२ ग्रॅम/लिटर) फवारा. जास्त प्रादुर्भावावर हेक्झाकोनाझोल किंवा पेनकोनाझोल वापरा.', image: '/images/gr_powdery.png' },
            { name: 'केवडा/डाऊनी (Downy Mildew)', desc: 'पानांच्या वर पिवळे डाग आणि खाली पांढरी बुरशी. पावसाळ्यात आणि दमट हवामानात वेगाने पसरतो. उपाय: कॉपर ऑक्सिक्लोराईड किंवा मँकोझेबची फवारणी करा. तीव्र प्रादुर्भावावर मेटॅलॅक्सिल + मँकोझेब संयुक्त बुरशीनाशक फवारा.', image: '/images/gr_downy.png' },
            { name: 'मूळकुज / मर रोग (Wilt/Root Rot)', desc: 'पाने हिरवी असतानाच झाड अचानक कोमेजून वाळते. जमिनीत पाणी साचल्यामुळे फायटोप्थोरा आणि फ्युजारियम बुरशी वाढते. उपाय: मुळांजवळ ट्रायकोडर्मा व्हिरिडी किंवा कार्बेन्डाझिमची आळवणी (Drenching) करा.', image: '/images/disease_root_rot_1777610296696.png' },
            { name: 'मोझॅक व्हायरस (तिरंगा रोग)', desc: 'पानांवर पिवळे-हिरवे चट्टे येतात. यावर जगात कोणताही औषधी उपाय नाही! हा रोग पांढऱ्या माशी आणि मावा कीटकामुळे पसरतो. उपाय: रोगग्रस्त झाड मुळासकट लगेच उपटून जाळून टाका. रोग पसरवणारी पांढरी माशी मारण्यासाठी फवारणी करा.', image: '/images/disease_mosaic_1777610312736.png' }
          ],
          tips: ['दमट हवामानात बुरशी वेगाने पसरते; हवा खेळती राहण्यासाठी दोन झाडांतील आणि दोन ओळींतील अंतर योग्य ठेवा', 'व्हायरस पसरू नये म्हणून छाटणीची कात्री एका झाडावरून दुसऱ्यावर वापरताना १% सोडियम हायपोक्लोराईटने निर्जंतुक करा', 'पावसाळ्यात बुरशीनाशकासोबत नक्की स्टिकर (Spreader) वापरा']
        }
      ]
    }
  },
  fertilizers: {
    en: {
      title: '🧪 Scientific Fertilizer Management',
      description: 'Blindly throwing Urea destroys soil health and wastes money. Learn exact nutrient management.',
      sections: [
        {
          title: '🌿 The Big 3: N-P-K',
          image: '/images/calc_grapes_real.png',
          items: [
            '🌿 Nitrogen (Urea 46% N): Drives vegetative green growth. Apply in 2-3 split doses as it leaches away quickly in water. Deficiency: Oldest bottom leaves turn entirely yellow.',
            '🌱 Phosphorus (DAP 46% P, SSP 16% P): Critical for root establishment and flowering. Must be applied at base during sowing because it does not move in the soil. Deficiency: Stunted growth, purple tint on leaves.',
            '🍇 Potassium (MOP 60% K): Essential for fruit size, sweetness, and drought/disease resistance. Crucial for Sugarcane, Grapes, and Bananas. Deficiency: Leaf edges look burnt or brown.'
          ],
          tips: ['Always mix Neem cake with Urea to slow down nitrogen release', 'Use SSP instead of DAP for groundnut and onion, as SSP also provides essential Sulfur']
        },
        {
          title: '🔬 Micronutrients & Foliar Sprays',
          image: '/images/vid_thumb_organic.png',
          items: [
            '⚙️ Zinc & Iron: Soils in Maharashtra are highly deficient in Zinc and Iron. Apply Zinc Sulfate (10kg/acre) and Ferrous Sulfate to soil.',
            '💧 Water Soluble Fertilizers (WSF): Used in drip irrigation (Fertigation). 19:19:19 for early growth, 0:52:34 for flowering, and 0:0:50 for fruit maturity stage.',
            '🍃 Foliar Spray: Spraying nutrients directly on leaves gives instant results within 48 hours. Excellent emergency rescue for nutrient-deficient plants.'
          ],
          tips: ['Do not mix Calcium fertilizers with Phosphorus fertilizers in the same tank; they will react and block drip pipes', 'Add a sticking agent (sticker) to foliar sprays during monsoons']
        }
      ]
    },
    mr: {
      title: '🧪 शास्त्रशुद्ध आणि अचूक खत व्यवस्थापन',
      description: 'अंधाधुंद युरिया फेकल्याने माती खराब होते आणि पैसे वाया जातात. पिकाच्या गरजेनुसारच खतांचे अचूक आणि संतुलित नियोजन शिका.',
      sections: [
        {
          title: '🌿 मुख्य अन्नद्रव्ये: नत्र-स्फुरद-पालाश (N-P-K)',
          image: '/images/calc_grapes_real.png',
          items: [
            '🌿 नत्र (Nitrogen - युरिया ४६% N): पानांच्या आणि झाडाच्या वेगाने वाढीसाठी आवश्यक. पाण्यात लवकर वाहून जात असल्याने व बाष्पीभवन होत असल्याने २-३ हप्त्यांत विभागून द्यावे. कमतरतेची लक्षणे: झाडाची सर्वात खालची जुनी पाने पूर्ण पिवळी पडतात.',
            '🌱 स्फुरद (Phosphorus - DAP ४६% P, SSP १६% P): मजबूत मुळे तयार होण्यासाठी आणि भरपूर फुले येण्यासाठी अत्यंत महत्त्वाचे. हे जमिनीत जास्त हलत नाही (Immobile), त्यामुळे पेरणीच्या वेळीच थेट मुळांजवळ द्यावे. वरून फेकून देऊ नये. कमतरतेची लक्षणे: वाढ खुंटते, पानांवर जांभळट छटा येते.',
            '🍇 पालाश (Potassium - MOP ६०% K, SOP ५०% K): फळांचा आकार, गोडी, रंग आणि रोगाला/दुष्काळाला प्रतिकार करण्यासाठी आवश्यक. ऊस, द्राक्षे आणि केळीसाठी अतिशय महत्त्वाचे. कमतरतेची लक्षणे: पानांच्या कडा जळल्यासारख्या किंवा करपलेल्या दिसतात (Margin burn).'
          ],
          tips: ['युरियाचा वापर करताना त्यात निंबोळी पेंड नक्की मिसळा, ज्यामुळे नत्र हळूहळू (Slow release) आणि जास्त काळ मिळते', 'कांदा आणि भुईमुगासाठी DAP ऐवजी SSP वापरा, कारण SSP मधून पिकाला आवश्यक कॅल्शियम ११% आणि गंधक (सल्फर) ११% मोफत मिळते', 'खते कधीही उघड्यावर फेकू नका, ती मातीत मिसळली जातील याची खात्री करा']
        },
        {
          title: '🔬 दुय्यम, सूक्ष्म अन्नद्रव्ये आणि विद्राव्य खते (Fertigation)',
          image: '/images/vid_thumb_organic.png',
          items: [
            '⚙️ कॅल्शियम, मॅग्नेशियम आणि गंधक (Secondary Nutrients): गंधक कांद्याच्या साठवणुकीसाठी आणि तिखटपणासाठी आवश्यक आहे. मॅग्नेशियम मुळे पाने गडद हिरवी राहतात (प्रकाशसंश्लेषण).',
            '🔬 सूक्ष्म अन्नद्रव्ये (झिंक आणि लोह): महाराष्ट्रातील जमिनीत झिंक आणि लोहाची प्रचंड कमतरता आहे. नवीन पाने पिवळी पण शिरा हिरव्या राहिल्यास लोहाची कमतरता समजावी. एकरी १० किलो झिंक सल्फेट आणि फेरस सल्फेट बेसल डोस मध्ये द्या.',
            '💧 विद्राव्य खते (ठिबकमधून): सुरुवातीच्या वाढीसाठी १९:१९:१९, फुलोरा अवस्थेसाठी ०:५२:३४ आणि फळ पोसण्याच्या अवस्थेत ०:०:५० ठिबकमधून द्यावे. यामुळे खताची कार्यक्षमता ९०% पर्यंत वाढते.',
            '🍃 पानांवरील फवारणी (Foliar Spray): खतांची थेट पानांवर फवारणी केल्यास ४८ तासांत झटपट रिझल्ट मिळतो. पिकात अचानक पिवळेपणा आल्यास १९:१९:१९ ची फवारणी हा सर्वोत्तम आपत्कालीन उपाय आहे.'
          ],
          tips: ['कॅल्शियम नायट्रेट आणि स्फुरद (फॉस्फरस/०:५२:३४) असलेली खते ठिबकच्या टाकीत कधीही एकत्र करू नका; त्यांची रिएक्शन होऊन जिप्सम तयार होतो आणि ठिबकच्या नळ्या पूर्णपणे चोकअप होतात', 'पावसाळ्यात फवारणी करताना औषधात नेहमी चांगल्या प्रतीचा स्टिकर (Spreader/Sticker) वापरा', 'अमावस्येच्या दिवशी किडींची अंडी घालण्याची प्रक्रिया जास्त असते, म्हणून अमावस्येनंतर लगेच कीटकनाशक आणि विद्राव्य खतांची फवारणी करावी']
        }
      ]
    }
  },
  seasons: {
    en: {
      title: '☀️ Season Planning for Maharashtra',
      description: 'Climate change is making farming unpredictable. Timely planning is your best defense.',
      sections: [
        {
          title: '🌧️ Monsoon Preparation (June-August)',
          image: '/images/guide_sc_land.png',
          items: [
            '🏗️ Before Monsoon (May): Deep summer plowing. Repair bunds. Clean drainage channels. Purchase authentic seeds and fertilizers early to avoid shortages.',
            '🌾 Sowing Rule: Do not sow after the first rain. Wait until at least 75-100 mm of cumulative rainfall has occurred and soil moisture is deep.',
            '⚠️ Precautions: Arrange for immediate drainage of water-logged fields within 24 hours to prevent root suffocation.'
          ],
          tips: ['Keep a 10% reserve of early-maturing seeds in case your first sowing fails due to dry spells', 'Apply basal dose of fertilizer at the exact time of sowing, not before']
        },
        {
          title: '❄️ Rabi Season Strategy (October-February)',
          image: '/images/season_calendar.png',
          items: [
            '❄️ Timing is Everything: Sow Rabi crops (Wheat, Gram, Rabi Jowar) when the temperature starts dropping. Delaying wheat sowing beyond Nov 15 reduces yield by 30-40 kg per day per hectare.',
            '💧 Moisture Conservation: Since rains have stopped, preserve residual soil moisture from the monsoon by harrowing immediately after Kharif harvest.',
            '🌾 Seed Treatment: Cold soil can slow germination. Always treat seeds with Trichoderma or Rhizobium to ensure strong root establishment in winter.',
            '📉 Frost Alert: In January, if temperatures drop near 4°C, give a light irrigation at night and create smoke around fields to prevent frost damage to sensitive crops like Grapes or Gram.'
          ],
          tips: ['If soil moisture is low, give a "Pre-sowing irrigation" (Palewar) for uniform germination', 'Prioritize Phosphate fertilizers (DAP/SSP) for Rabi crops as they help in root growth during cold weather']
        },
        {
          title: '☀️ Summer (Zaid) Planning (March-May)',
          image: '/images/calc_grapes_real.png',
          items: [
            '☀️ Heat Resistance: Choose crops that love the heat like Watermelon, Muskmelon, Summer Groundnut, or fodder crops like Maize.',
            '💧 Evaporation Control: Evaporation is at its peak. Use Drip irrigation or Thick Mulching (plastic or organic) to save 60% water. Never flood-irrigate in the afternoon sun.',
            '🥗 Nutrient Boost: High temperatures increase plant metabolism. Use foliar sprays of Potash (0-0-50) to help plants maintain water balance and resist heat stress.',
            '🐝 Pollination Care: For melons and cucumbers, ensure honeybees are active. Avoid spraying chemical pesticides during morning hours when bees are foraging.'
          ],
          tips: ['Summer is the best time for "Soil Solarization" - cover moist soil with plastic for 4-6 weeks to kill soil-borne pests and diseases naturally', 'Ensure your water source (Well/Borewell) has enough capacity to last until the first June rains']
        }
      ]
    },
    mr: {
      title: '☀️ महाराष्ट्राचे अचूक हंगाम नियोजन',
      description: 'बदलत्या हवामानामुळे शेती धोक्यात येत आहे. वेळेवर नियोजन करणे हाच एकमेव बचाव आहे.',
      sections: [
        {
          title: '🌧️ पावसाळ्याची पूर्वतयारी (जून-ऑगस्ट)',
          image: '/images/guide_sc_land.png',
          items: [
            '🏗️ पावसाळ्यापूर्वी (मे महिना): उन्हाळी खोल नांगरणी करा. शेताचे बांध दुरुस्त करा. पाण्याचे चर साफ करा. ऐनवेळी होणारी फसवणूक आणि तुटवडा टाळण्यासाठी बियाणे व खते आधीच खरेदी करून ठेवा.',
            '🌾 पेरणीचा नियम: पहिल्याच पावसानंतर घाईने पेरणी करू नका. जमिनीत किमान ७५-१०० मिमी पाऊस मुरल्यावर आणि चांगला ओलावा झाल्यावरच पेरणी करा.',
            '⚠️ खबरदारी: मुळांना हवा मिळण्यासाठी शेतात साचलेले अतिरिक्त पाणी २४ तासांच्या आत बाहेर काढण्याची सोय ठेवा.'
          ],
          tips: ['पावसाने ओढ दिल्यास दुबार पेरणीची वेळ येऊ शकते, त्यामुळे १०% जलद वाढणाऱ्या वाणाचे बियाणे राखीव ठेवा', 'खताचा पहिला डोस (बेसल डोस) पेरणीच्या वेळेसच द्या, आधी फेकून देऊ नका']
        },
        {
          title: '❄️ रब्बी हंगाम धोरण (ऑक्टोबर-फेब्रुवारी)',
          image: '/images/season_calendar.png',
          items: [
            '❄️ वेळेचे महत्त्व: जेव्हा तापमान कमी होऊ लागते तेव्हाच रब्बी पिकांची (गहू, हरभरा, रब्बी ज्वारी) पेरणी करा. गव्हाची पेरणी १५ नोव्हेंबरनंतर उशिरा केल्यास दररोज हेक्टरी ३०-४० किलो उत्पन्न घटते.',
            '💧 ओलावा टिकवणे: पाऊस थांबलेला असतो, त्यामुळे खरीप काढणीनंतर लगेच कुळवणी करून जमिनीतील पावसाचा ओलावा टिकवून ठेवा.',
            '🌾 बीजप्रक्रिया: थंडीमुळे उगवण उशिरा होऊ शकते. मुळांच्या चांगल्या वाढीसाठी बियाण्यांना ट्रायकोडर्मा किंवा रायझोबियमची प्रक्रिया नक्की करा.',
            '📉 धुक्यापासून बचाव: जानेवारीत तापमान ४°C च्या जवळ गेल्यास, पिकाला रात्री हलके पाणी द्या आणि शेताच्या कडेला धूर करा, जेणेकरून द्राक्षे किंवा हरभऱ्याचे धुक्यापासून संरक्षण होईल.'
          ],
          tips: ['जमिनीत ओलावा कमी असल्यास, एकसमान उगवणीसाठी "पलेवार" (पेरणीपूर्वीचे पाणी) द्या', 'रब्बी पिकांसाठी स्फुरदयुक्त खतांना (DAP/SSP) प्राधान्य द्या, कारण ती थंडीत मुळांच्या वाढीस मदत करतात']
        },
        {
          title: '☀️ उन्हाळी (जायद) नियोजन (मार्च-मे)',
          image: '/images/calc_grapes_real.png',
          items: [
            '☀️ उष्णता सहन करणारी पिके: कलिंगड, खरबूज, उन्हाळी भुईमूग किंवा मक्यासारखी चारा पिके निवडा जी उष्णता सहन करू शकतात.',
            '💧 बाष्पीभवन नियंत्रण: उन्हाळ्यात पाण्याचे बाष्पीभवन जास्त होते. ठिबक सिंचन किंवा जाड मल्चिंगचा वापर करून ६०% पाणी वाचवा. दुपारी रणरणत्या उन्हात कधीही पाणी देऊ नका.',
            '🥗 अन्नद्रव्ये व्यवस्थापन: उच्च तापमानामुळे झाडांची चयापचय क्रिया वाढते. झाडांना पाण्याचा ताण सहन करण्यासाठी पोटॅश (०-०-५०) ची फवारणी करा.',
            '🐝 परागीकरण: कलिंगड आणि काकडीसारख्या पिकांसाठी मधमाश्या महत्त्वाच्या असतात. सकाळी मधमाश्यांच्या कामाच्या वेळी रासायनिक कीटकनाशके फवारणे टाळा.'
          ],
          tips: ['उन्हाळा हा "माती सौरऊर्जीकरण" (Soil Solarization) साठी उत्तम काळ आहे - ओल्या जमिनीवर ४-६ आठवडे प्लॅस्टिक झाकून ठेवा जेणेकरून जमिनीतील कीड आणि रोग नैसर्गिकरित्या नष्ट होतील', 'तुमच्या विहिरीला किंवा बोअरवेलला जूनच्या पहिल्या पावसापर्यंत पुरेल इतके पाणी आहे का, याची खात्री करा']
        }
      ]
    }
  },
  postharvest: {
    en: {
      title: '📦 Harvesting & Post-Harvest Storage',
      description: 'Don\'t lose your hard-earned crop to poor storage. 30% of Indian agricultural produce is wasted post-harvest.',
      sections: [
        {
          title: '🍬 Harvesting Timing & Techniques',
          image: '/images/guide_sc_harvest.png',
          items: [
            '🍬 Sugarcane: Harvest exactly at 10-14 months. Check brix meter reading (>18 is ready). Must be transported to the sugar factory within 24 hours of cutting to prevent weight and sugar loss.',
            '🧅 Onions: Stop irrigation 15 days before harvest. Harvest when 50-70% of tops fall over naturally. Field cure them in shade for 4-5 days before cutting leaves.',
            '🌾 Cereals (Wheat/Soybean): Harvest when grain moisture drops to 12-14%. Harvesting too wet causes fungal rot in storage; too dry causes grain shattering in the field.'
          ],
          tips: ['Harvest grapes and delicate fruits only in the cool early morning hours to increase shelf life', 'Never drag harvested produce on the soil']
        },
        {
          title: '🏭 Storage & Value Addition',
          image: '/images/harvest_boxes.png',
          items: [
            '🧅 Kanda Chawl (Onion Storage): Store onions in a well-ventilated bamboo/wire-mesh structure. Protect from direct rain and sunlight. Regular turning prevents rotting.',
            '🛡️ Grain Storage: Sun-dry grains completely. Store in metal bins or gunny bags treated with Neem leaves or safe grain protectants to prevent weevils.',
            '💰 Value Addition: Instead of selling raw produce at throwaway prices, consider grading, sorting, and packaging. E.g., making Jaggery (Gul) from Sugarcane increases profit margins by 40%.'
          ],
          tips: ['Use breathable jute bags for grains, never airtight plastic bags unless vacuum sealing', 'Check stored grains every 15 days for insect infestation']
        },
        {
          title: '🚜 Cleaning, Grading & Packaging',
          image: '/images/harvest_boxes.png',
          items: [
            '🚜 Primary Processing: Always clean your produce to remove dust, stones, and chaff. This instantly increases the perceived value in the market.',
            '📊 Grading: Separate your harvest into A, B, and C grades based on size and quality. Selling them separately often yields 20% more total revenue than selling a mixed lot.',
            '📦 Professional Packaging: Use standardized crates for fruits and moisture-proof bags for grains. Good labeling with your farm name can help build a direct brand with city customers.'
          ],
          tips: ['Grading should be done in a cool, shaded area to prevent wilting of fresh vegetables', 'Invest in a simple digital weighing scale to ensure accuracy and build trust with buyers']
        }
      ]
    },
    mr: {
      title: '📦 शास्त्रशुद्ध कापणी आणि साठवणूक',
      description: 'चुकीच्या साठवणुकीमुळे कष्टाचे पीक वाया घालवू नका. भारतातील ३०% शेतमाल कापणीनंतर वाया जातो.',
      sections: [
        {
          title: '🍬 कापणीची योग्य वेळ आणि तंत्र',
          image: '/images/guide_sc_harvest.png',
          items: [
            '🍬 ऊस: १०-१४ महिन्यांनी तोडणी करा. ब्रिक्स मीटरवर १८ च्या वर रीडिंग आल्यास ऊस पक्व झाला असे समजावे. वजन आणि साखरेची घट टाळण्यासाठी तोडणीनंतर २४ तासांच्या आत ऊस कारखान्याला गेलाच पाहिजे.',
            '🧅 कांदा: काढणीच्या १५ दिवस आधी पाणी तोडा. ५०-७०% माना पडल्यावरच कांदा काढा. पाने कापण्यापूर्वी कांदा सावलीत ४-५ दिवस सुकू द्या (Curing).',
            '🌾 धान्य (गहू/सोयाबीन): दाण्यातील ओलावा १२-१४% पर्यंत खाली आल्यावर कापणी करा. जास्त ओले असताना काढल्यास साठवणीत बुरशी लागते; जास्त वाळल्यास शेतातच दाणे गळतात.'
          ],
          tips: ['द्राक्षे आणि नाजूक फळे नेहमी पहाटे किंवा सकाळी लवकर थंड वातावरणातच काढावीत, जेणेकरून ती जास्त काळ टिकतात', 'काढलेला शेतमाल थेट जमिनीवर ओढत नेऊ नका']
        },
        {
          title: '🏭 साठवणूक आणि मूल्यवर्धन (Value Addition)',
          image: '/images/harvest_boxes.png',
          items: [
            '🧅 कांदा चाळ: कांदा साठवण्यासाठी हवेशीर आणि तळाला जाळी असलेली चाळ बांधा. थेट पाऊस आणि उन्हापासून संरक्षण करा. सडलेला कांदा वेळोवेळी बाहेर काढा.',
            '🛡️ धान्य साठवणूक: धान्य उन्हात कडकडीत वाळवा. साठवणीसाठी पत्र्याची कोठी किंवा पोत्यात कडुनिंबाचा पाला टाका जेणेकरून सोंडे/टोके लागणार नाहीत.',
            '💰 मूल्यवर्धन: मातीमोल भावाने कच्चा माल विकण्याऐवजी, त्याची प्रतवारी (Grading) आणि पॅकिंग करा. उदा. उसापासून थेट गूळ बनवल्यास नफ्यात ४०% वाढ होते.'
          ],
          tips: ['धान्य साठवण्यासाठी नेहमी हवा खेळती राहणाऱ्या गोणी/पोत्यांचा वापर करा, हवाबंद प्लॅस्टिक कधीही वापरू नका', 'साठवलेल्या धान्याला कीड लागली आहे का, हे दर १५ दिवसांनी तपासा']
        },
        {
          title: '🚜 स्वच्छता, प्रतवारी आणि पॅकेजिंग',
          image: '/images/harvest_boxes.png',
          items: [
            '🚜 प्राथमिक प्रक्रिया: शेतमालातील धूळ, दगड आणि कचरा काढून तो नेहमी स्वच्छ करा. यामुळे बाजारात मालाला चांगला उठाव मिळतो.',
            '📊 प्रतवारी (Grading): मालाच्या आकारानुसार आणि गुणवत्तेनुसार अ, ब आणि क अशी प्रतवारी करा. एकत्रित माल विकण्यापेक्षा प्रतवारी करून विकल्यास २०% जास्त नफा मिळतो.',
            '📦 व्यावसायिक पॅकेजिंग: फळांसाठी क्रेट्स आणि धान्यासाठी ओलावा न लागणारी पोती वापरा. स्वतःच्या ब्रँडचे लेबल लावल्यास थेट ग्राहकांशी संपर्क वाढवता येतो.'
          ],
          tips: ['भाजीपाल्याची प्रतवारी नेहमी सावलीत आणि थंड ठिकाणी करा, जेणेकरून तो सुकणार नाही', 'ग्राहकांचा विश्वास संपादन करण्यासाठी आणि अचूकतेसाठी एका साध्या डिजिटल वजन काट्याचा वापर करा']
        }
      ]
    }
  }
};
