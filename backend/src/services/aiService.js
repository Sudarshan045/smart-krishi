// src/services/aiService.js
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const groq = new OpenAI({ apiKey: process.env.GROQ_API_KEY, baseURL: 'https://api.groq.com/openai/v1' });

// --- THE ULTIMATE SPECIALIST DATABASE: SUGARCANE & GRAPES ONLY ---
const DISEASE_DB = {
  "Sugarcane_RedRot": {
    "en": {
      "diseaseName": "Sugarcane Red Rot (The 'Cancer' of Sugarcane)",
      "info": "Red Rot is the most devastating disease for sugarcane in India. It is caused by a fungus that enters the stalk and destroys the sugar-producing tissues.",
      "cause": "Fungus: Colletotrichum falcatum. It survives in infected sets and soil for several months.",
      "symptoms": [
        "Yellowing of the 3rd or 4th leaf from the top (initial sign).",
        "Reddish discoloration of the internal tissues with white transverse bands.",
        "The stalk becomes hollow and emits a sour, alcohol-like smell.",
        "Small black dots (acervuli) appear on the rind in later stages.",
        "Shriveling of the stalk and drying of the entire clump."
      ],
      "precautions": [
        "Select disease-free sets from healthy nurseries (certified seeds).",
        "Follow a 2-3 year crop rotation with non-host crops like Paddy or Dhaincha.",
        "Burn all infected crop residue and stubble after harvest.",
        "Avoid water-logging in the field; improve drainage.",
        "Avoid planting during peak rainy seasons if history of Red Rot exists."
      ],
      "remedies": [
        "Pre-planting: Treat sets with Carbendazim 0.1% (1g/L) for 15-20 minutes.",
        "Soil Treatment: Apply Trichoderma viride (5kg/acre) mixed with well-rotted FYM.",
        "Curative: If symptoms appear early, drench the base with Copper Oxychloride (2.5g/L).",
        "Hot Water Treatment: Subject sets to 50°C for 2 hours before planting."
      ]
    },
    "mr": {
      "diseaseName": "उसावरील लाल सड (उसाचा 'कर्करोग')",
      "info": "लाल सड हा उसाचा सर्वात विनाशकारी बुरशीजन्य रोग आहे. याला उसाचा 'कर्करोग' मानले जाते कारण तो एकदा पसरला की संपूर्ण पीक नष्ट करू शकतो.",
      "cause": "बुरशी: कोलेटोट्रिचम फाल्केटम. ही बुरशी बाधित बेणे, माती आणि पाण्याद्वारे पसरते.",
      "symptoms": [
        "वरची तिसरी आणि चौथी पाने शेंड्याकडून पिवळी पडू लागतात.",
        "उसाच्या कांड्या उभ्या कापल्यास आत लाल रंग आणि त्यावर पांढरे आडवे पट्टे दिसतात.",
        "बाधित उसातून आंबट किंवा अल्कोहोलसारखा उग्र वास येतो.",
        "उसाच्या सालीवर बारीक काळे ठिपके दिसू लागतात आणि ऊस पोकळ होतो.",
        "संपूर्ण ऊस सुकून जातो आणि वजनात मोठी घट येते."
      ],
      "precautions": [
        "नेहमी खात्रीशीर, रोगमुक्त आणि प्रमाणित बेणेच वापरा.",
        "ऊस काढणीनंतर शेतातील पालापाचोळा आणि बाधित खोडकी जाळून टाका.",
        "शेतात पाणी साचू देऊ नका; निचरा करण्याची उत्तम सोय ठेवा.",
        "पिकांची फेरपालट करा (उदा. ऊस काढल्यानंतर तिथे भात किंवा ताग घ्या).",
        "बेणे मळ्यासाठी स्वतंत्र आणि निरोगी क्षेत्र निवडा."
      ],
      "remedies": [
        "लागवडीपूर्वी बेणे प्रक्रिया: बेणे कार्बेन्डाझिम (०.१%) द्रावणात (१ ग्रॅम प्रति लिटर पाणी) १५-२० मिनिटे बुडवून ठेवा.",
        "गरम पाण्याची प्रक्रिया: बेण्यावर ५०° से. ला २ तास प्रक्रिया करा.",
        "जैविक नियंत्रण: ट्रायकोडर्मा विरिडी (५ किलो प्रति एकर) शेणखतात मिसळून जमिनीत द्या.",
        "आळवणी: पावसाळ्यात उसाच्या बुंध्यापाशी कॉपर ऑक्सीक्लोराईड (२.५ ग्रॅम प्रति लिटर) ची आळवणी करा."
      ]
    }
  },
  "Sugarcane_Smut": {
    "en": {
      "diseaseName": "Sugarcane Smut (Chabuk Kani)",
      "info": "Smut is characterized by a black whip-like growth from the shoot. It can spread rapidly through wind-borne spores.",
      "cause": "Fungus: Sporisorium scitamineum.",
      "symptoms": [
        "Emergence of a long, black, dusty whip-like structure (0.5 to 1.5m) from the apex.",
        "Excessive tillering with thin, grassy leaves.",
        "Stalks become very thin and internodes are shortened.",
        "The black whip is initially covered by a silvery membrane which later ruptures."
      ],
      "precautions": [
        "Do not use sets from infected fields.",
        "Cover the black whip with a plastic bag before uprooting to prevent spore spread.",
        "Uproot the entire infected clump immediately.",
        "Avoid ratoon cropping if smut incidence is high."
      ],
      "remedies": [
        "Set treatment with Propiconazole (1ml/L) for 15 minutes.",
        "Hot water treatment (52°C for 30 minutes).",
        "Spray the crop with Triadimefon 25 WP (1g/L) if incidence is noted."
      ]
    },
    "mr": {
      "diseaseName": "उसावरील कानी / चाबूक कानी (Smut)",
      "info": "या रोगाची मुख्य ओळख म्हणजे उसाच्या शेंड्यातून निघणारा लांब, काळा, चाबकासारखा भाग. हा रोग वाऱ्याद्वारे खूप वेगाने पसरतो.",
      "cause": "बुरशी: स्पोरिसोरियम सायटॅमिनम.",
      "symptoms": [
        "उसाच्या शेंड्यातून काळ्या रंगाचा, धुळीने माखलेला चाबकासारखा भाग (१-१.५ मीटर लांब) बाहेर येतो.",
        "उसाला खूप फुटवे फुटतात आणि पाने गवतासारखी बारीक होतात.",
        "कांड्यांची लांबी कमी होते आणि ऊस बारीक होतो.",
        "सुरवातीला चाबकावर चंदेरी पडदा असतो, जो नंतर फुटून काळी पावडर (बिजाणू) हवेत पसरते."
      ],
      "precautions": [
        "कानी बाधित शेतातील बेणे चुकूनही वापरू नका.",
        "काळा चाबूक दिसताच त्यावर प्लास्टिक पिशवी घालून मगच बेट मुळासकट उपटून टाका.",
        "बाधित क्षेत्रात खोडवा घेऊ नका.",
        "शेतात स्वच्छता ठेवा आणि नियमित पाहणी करा."
      ],
      "remedies": [
        "बेणे प्रक्रिया: लागवडीपूर्वी बेणे प्रोपिकोनाझोल (१ मिली प्रति लिटर पाणी) मध्ये १५ मिनिटे बुडवा.",
        "गरम पाण्याची प्रक्रिया: बेण्यावर ५२° से. ला ३० मिनिटे प्रक्रिया करा.",
        "फवारणी: रोगाचा प्रादुर्भाव दिसल्यास ट्रायडिमेफॉन (१ ग्रॅम प्रति लिटर) ची फवारणी करा."
      ]
    }
  },
  "Grapes_DownyMildew": {
    "en": {
      "diseaseName": "Grapes Downy Mildew (Kevda)",
      "info": "The most destructive disease for grapes in Maharashtra, especially during the monsoon and cloudy weather.",
      "cause": "Fungus-like organism: Plasmopara viticola. Thrives in high humidity (>90%) and mild temperatures.",
      "symptoms": [
        "Small, translucent 'oil spots' on the upper leaf surface.",
        "White, downy growth on the corresponding lower surface.",
        "Infected berries turn dull green, then brown, and finally shrivel (Mummification).",
        "Entire cluster may dry up and drop off."
      ],
      "precautions": [
        "Ensure proper ventilation and sunlight by effective canopy management.",
        "Prune lower leaves to reduce humidity near the ground.",
        "Remove and destroy all fallen leaves and berries.",
        "Balance nitrogen use; avoid excess nitrogen."
      ],
      "remedies": [
        "Preventive: Spray 1% Bordeaux Mixture or Copper Oxychloride (0.25%).",
        "Systemic (Curative): Spray Metalaxyl + Mancozeb (2g/L) or Azoxystrobin (1ml/L).",
        "New Tech: Use Dimethomorph (1g/L) + Mancozeb during high-risk periods."
      ]
    },
    "mr": {
      "diseaseName": "द्राक्षावरील केवडा रोग (Downy Mildew)",
      "info": "द्राक्षावरील सर्वात धोकादायक रोग, विशेषतः पावसाळी आणि ढगाळ हवामानात. हा रोग काही दिवसातच संपूर्ण बाग उध्वस्त करू शकतो.",
      "cause": "बुरशी: प्लाझ्मोपारा विटिकोला. ९०% पेक्षा जास्त आर्द्रता आणि कमी तापमानात हा वेगाने पसरतो.",
      "symptoms": [
        "पानांच्या वरच्या बाजूला पिवळसर, पारदर्शक 'तेलकट ठिपके' दिसतात.",
        "पानांच्या खालच्या बाजूला पांढरी, मऊ बुरशी वाढलेली दिसते.",
        "बाधित मणी निस्तेज होतात, तपकिरी पडतात आणि सुकतात (ममी होणे).",
        "जास्त प्रादुर्भाव झाल्यास संपूर्ण घड सुकून गळून पडतो."
      ],
      "precautions": [
        "द्राक्ष वेलींची छाटणी अशी करा की हवा आणि सूर्यप्रकाश सर्वत्र पोहोचेल.",
        "जमिनीलगतची पाने काढून टाका जेणेकरून आर्द्रता कमी राईल.",
        "पडलेली पाने आणि कुजलेले मणी बागेबाहेर नेऊन नष्ट करा.",
        "नत्रयुक्त खतांचा (युरिया) अतिवापर टाळा."
      ],
      "remedies": [
        "प्रतिबंधात्मक: १% बोडो मिश्रण किंवा कॉपर ऑक्सीक्लोराईड (२.५ ग्रॅम) ची फवारणी करा.",
        "उपचारात्मक: मेटालॅक्सिल + मँकोझेब (२ ग्रॅम) किंवा अझॉक्सीस्ट्रोबिन (१ मिली प्रति लिटर) वापरा.",
        "संकट काळात: डायमेथोमॉर्फ (१ ग्रॅम) + मँकोझेब (२ ग्रॅम) चे द्रावण फवारा."
      ]
    }
  },
  "Grapes_PowderyMildew": {
    "en": {
      "diseaseName": "Grapes Powdery Mildew (Bhuri)",
      "info": "Common during cool and dry periods. It affects all green parts including leaves and berries.",
      "cause": "Fungus: Erysiphe necator.",
      "symptoms": [
        "White or greyish powdery growth on both sides of the leaves.",
        "Affected berries appear dusty and develop brownish discoloration.",
        "Severe infection leads to berry cracking (splitting), exposing seeds.",
        "Leaves may become distorted and drop prematurely."
      ],
      "precautions": [
        "Improve air circulation through proper pruning.",
        "Keep the vineyard floor clean.",
        "Monitor for early signs during late winter (January-February)."
      ],
      "remedies": [
        "Dusting: Apply Sulphur dust (25-30 kg/ha) during early morning.",
        "Spray: Wettable Sulphur (2g/L) or Dinocap (1ml/L).",
        "Systemic: Hexaconazole (1ml/L) or Penconazole (0.5ml/L)."
      ]
    },
    "mr": {
      "diseaseName": "द्राक्षावरील भुरी रोग (Powdery Mildew)",
      "info": "थंड आणि कोरड्या हवामानात (जानेवारी-फेब्रुवारी) हा रोग जास्त आढळतो. हा पानांवर राख टाकल्यासारखा दिसतो.",
      "cause": "बुरशी: एरिसिफे नेकेटर.",
      "symptoms": [
        "पानांच्या दोन्ही बाजूंवर पांढरी किंवा राखाडी पावडर (राखेसारखी) दिसते.",
        "मणी धुळीने माखल्यासारखे निस्तेज दिसतात आणि तपकिरी होतात.",
        "प्रादुर्भाव जास्त झाल्यास मणी तडकतात (Cracking) आणि बिया बाहेर दिसतात.",
        "पाने गोळा होतात, वाकडी होतात आणि गळून पडतात."
      ],
      "precautions": [
        "छाटणी करून हवा खेळती राहील याची काळजी घ्या.",
        "बागेत स्वच्छता ठेवा आणि सूर्यप्रकाश जमिनीपर्यंत पोहोचू द्या.",
        "नत्रयुक्त खतांचा संतुलित वापर करा."
      ],
      "remedies": [
        "धुरळणी: पहाटेच्या वेळी गंधकाची धुरळणी (३० किलो प्रति हेक्टर) करा.",
        "फवारणी: पाण्यात मिसळणारे गंधक (२ ग्रॅम) किंवा डायनोकॅप (१ मिली प्रति लिटर) वापरा.",
        "प्रगत उपचार: हेक्झाकोनाझोल (१ मिली) किंवा पेनकोनाझोल (०.५ मिली) ची फवारणी करा."
      ]
    }
  },
  "Sugarcane_Borer": {
    "en": {
      "diseaseName": "Sugarcane Borer (Stem / Early Shoot Borer)",
      "info": "The most common pest for young sugarcane. The larvae bore into the heart of the plant, killing the growing point.",
      "cause": "Insect Larvae: Chilo infuscatellus.",
      "symptoms": [
        "Formation of a 'Dead Heart' (the central leaf whorl dries up and can be easily pulled out).",
        "Offensive odor from the pulled-out dead heart.",
        "Small holes in the stalk with frass (sawdust-like material) outside.",
        "Spotted larvae (cream colored with dark spots) found inside the tunnel."
      ],
      "precautions": [
        "Avoid late planting (plant before March).",
        "Use resistant varieties.",
        "Collect and destroy egg masses from the leaves.",
        "Release egg parasite Trichogramma chilonis (2.5 lakh/acre)."
      ],
      "remedies": [
        "Soil Application: Apply Carbofuran 3G (13kg/acre) or Fipronil granules at planting.",
        "Foliar Spray: Chlorantraniliprole (Coragen) 18.5 SC at 0.4ml per liter of water.",
        "Drenching: Drench the base with Spinosad (0.3ml/L) in case of severe attack."
      ]
    },
    "mr": {
      "diseaseName": "उसावरील खोड किडा / कांडी किडा (Borer)",
      "info": "हा उसाचा सर्वात सामान्य कीटक आहे. याची अळी उसाच्या पोंग्यात शिरून वाढणारा भाग खाते, ज्यामुळे ऊस वाळतो.",
      "cause": "कीटक: चायलो इन्फस्कॅटेलस (खोड किडा).",
      "symptoms": [
        "वाळलेला पोंगा (Dead Heart): उसाचा मधला भाग वाळतो आणि ओढल्यास सहज हातात येतो.",
        "पोंगा उपटल्यास त्याला कुजल्यासारखा घाणेरडा वास येतो.",
        "उसाच्या कांडीवर बारीक छिद्रे दिसतात आणि त्याबाहेर लाकडाच्या भुशासारखी घाण दिसते.",
        "खोडाच्या आत ठिपके असलेली पांढरट अळी आढळते."
      ],
      "precautions": [
        "उशिरा लागवड टाळा (फेब्रुवारीच्या आधी लागवड पूर्ण करा).",
        "पानांवर दिसणारे अंड्यांचे पुंजके गोळा करून नष्ट करा.",
        "ट्रायकोकार्डचा (Trichogramma) वापर करा (२.५ लाख अंडी प्रति एकर).",
        "उसाला मातीची भर लावा (Earthing up)."
      ],
      "remedies": [
        "जमिनीतून खत: लागवडीवेळी फ्युराडॅन (Carbofuran) ३जी १०-१२ किलो प्रति एकर द्या.",
        "फवारणी: कोराजन (Chlorantraniliprole) ०.४ मिली प्रति लिटर पाण्यातून फवारा.",
        "आळवणी: जास्त प्रादुर्भाव असल्यास स्पिनोसॅड (०.३ मिली) ची बुंध्यापाशी आळवणी करा."
      ]
    }
  },
  "Sugarcane_WhiteGrub": {
    "en": {
      "diseaseName": "Sugarcane White Grub (Humani)",
      "info": "The most dangerous underground pest. It destroys the root system, causing rapid wilting.",
      "cause": "Larvae of Holotrichia beetles. They thrive in sandy-loam soils with high organic matter.",
      "symptoms": [
        "Yellowing and drying of leaves in patches across the field.",
        "Affected plants can be easily pulled out as roots are eaten away.",
        "Presence of 'C-shaped' white grubs with brown heads in the root zone soil."
      ],
      "precautions": [
        "Deep summer ploughing to expose larvae to birds.",
        "Use light traps during the first rains to catch adult beetles.",
        "Avoid using raw (un-decomposed) cow dung manure."
      ],
      "remedies": [
        "Soil Drenching: Chlorpyriphos 20 EC (5ml/L) or Imidacloprid (2ml/L) near the roots.",
        "Biological: Apply Metarhizium anisopliae (5kg/acre) mixed with FYM.",
        "Granules: Apply Fipronil 0.3G (10kg/acre) during earthing up."
      ]
    },
    "mr": {
      "diseaseName": "उसावरील हुमणी अळी (White Grub)",
      "info": "हुमणी हा उसाचा जमिनीखालील सर्वात घातक कीटक आहे. हा उसाची मुळे कुरतडून खातो, ज्यामुळे ऊस अचानक वाळतो.",
      "cause": "कीटक: होलोट्रिचिया भुंग्याची अळी. शेणखताचा अयोग्य वापर आणि वाळूमिश्रित जमिनीत याचा प्रादुर्भाव जास्त होतो.",
      "symptoms": [
        "ऊस ठिकठिकाणी पिवळा पडून वाळू लागतो (पॅचेसमध्ये).",
        "बाधित ऊस ओढल्यास मुळे नसल्यामुळे तो सहज उपटून येतो.",
        "मुळांच्या भोवती जमिनीत पांढऱ्या 'C' आकाराच्या आणि तपकिरी तोंडाच्या अळ्या दिसतात."
      ],
      "precautions": [
        "उन्हाळ्यात खोल नांगरणी करा जेणेकरून अळ्या पक्षी खातील.",
        "पहिल्या पावसानंतर प्रौढ भुंग्यांसाठी शेतात प्रकाश सापळे लावा.",
        "कधीही कच्चे (न कुजलेले) शेणखत वापरू नका; त्यातूनच हुमणीचा प्रसार होतो."
      ],
      "remedies": [
        "आळवणी: क्लोरोपायरीफॉस (५ मिली) किंवा इमिडाक्लोप्रिड (२ मिली) प्रति लिटर पाण्यात मिसळून मुळांशी द्या.",
        "जैविक नियंत्रण: मेटारायझियम (५ किलो प्रति एकर) शेणखतात मिसळून जमिनीत द्या.",
        "खत: भर लावताना फिप्रोनील (०.३ जी) १० किलो प्रति एकर वापरा."
      ]
    }
  },
  "Sugarcane_YellowRust": {
    "en": {
      "diseaseName": "Sugarcane Yellow Rust",
      "info": "A fungal disease characterized by yellow streaks on leaves that eventually turn brown.",
      "cause": "Fungus: Puccinia kuehnii",
      "symptoms": ["Linear yellow spots on leaves", "Orange-brown pustules", "Premature drying of leaves", "Stunted growth"],
      "precautions": ["Plant resistant varieties", "Improve field drainage", "Remove infected leaves"],
      "remedies": ["Spray Mancozeb or Propiconazole (1ml/L)", "Maintain optimal potassium levels"]
    },
    "mr": {
      "diseaseName": "उसावरील तांबेरा (Yellow Rust)",
      "info": "पानांवर पिवळे पट्टे दिसणारा हा एक बुरशीजन्य रोग आहे जो कालांतराने तपकिरी होतो.",
      "cause": "बुरशी: पुक्सिनिया कुहनी",
      "symptoms": ["पानांवर लांबट पिवळे ठिपके", "नारंगी-तपकिरी रंगाचे फोड", "पाने अकाली सुकणे", "उसाची वाढ खुंटणे"],
      "precautions": ["रोगप्रतिकारक जातींची लागवड करा", "पाण्याचा निचरा सुधारा", "बाधित पाने काढून टाका"],
      "remedies": ["मँकोझेब किंवा प्रोपिकोनाझोल (१ मिली/लिटर) ची फवारणी करा"]
    }
  },
  "Grapes_Anthracnose": {
    "en": {
      "diseaseName": "Grape Anthracnose (Karpa)",
      "info": "Common during rainy season. It causes sunken spots on leaves and berries.",
      "cause": "Fungus: Elsinoe ampelina",
      "symptoms": ["Circular, sunken, greyish spots with dark borders ('Bird's Eye')", "Holes in leaves", "Cankers on shoots"],
      "precautions": ["Clean vineyard sanitation", "Prune and destroy infected parts"],
      "remedies": ["Spray Carbendazim (1g/L) or Copper Oxychloride (2.5g/L)"]
    },
    "mr": {
      "diseaseName": "द्राक्षावरील करपा (Anthracnose)",
      "info": "पावसाळ्यात जास्त प्रमाणात आढळणारा रोग. यामुळे पाने आणि मण्यांवर खोल ठिपके पडतात.",
      "cause": "बुरशी: एल्सिनो अँपेलिना",
      "symptoms": ["मण्यांवर पक्ष्याच्या डोळ्यासारखे खोल, राखाडी ठिपके", "पानांना छिद्र पडणे", "काड्यांवर चट्टे दिसणे"],
      "precautions": ["बागेची स्वच्छता ठेवा", "बाधित फांद्या छाटून नष्ट करा"],
      "remedies": ["कार्बेन्डाझिम (१ ग्रॅम) किंवा कॉपर ऑक्सीक्लोराईड (२.५ ग्रॅम) प्रति लिटर पाण्यात मिसळून फवारा"]
    }
  }
};

const SYSTEM_PROMPT = `You are "Smart Krishi Sahayak" (स्मार्ट कृषी सहाय्यक), a professional and friendly AI farming expert from Maharashtra.

CRITICAL RULES:
1. SPECIALIZATION: You are an expert ONLY in Sugarcane (ऊस) and Grapes (द्राक्ष). Do not provide detailed advice on other crops.
2. LANGUAGE: If the user speaks in Marathi, respond in PERFECT, natural, colloquial Marathi used in Maharashtra villages. 
3. NO HALLUCINATIONS: Never mix English characters inside Marathi words (e.g., don't say 'गavr'). Use the word 'ऊस' for Sugarcane and 'द्राक्ष' for Grapes.
4. TONE: Be respectful (use 'तुमच्या', 'आपण'), encouraging, and practical. 
5. CONCISE: Keep responses to 2-3 sentences unless the farmer asks for a detailed guide.

Expert Knowledge Areas:
- Sugarcane (ऊस): Red Rot (लाल सड), Smut (कानी), White Grub (हुमणी), Grassy Shoot (गवताळ वाढ).
- Grapes (द्राक्ष): Downy Mildew (केवडा), Powdery Mildew (भुरी), Anthracnose (करपा), Thrips (फुलकिडे).
- Irrigation, Fertilizers (खते), and Market Prices (बाजारभाव) for these two crops.

If asked about other crops, politely say you are a specialist in Sugarcane and Grapes and suggest consulting a local Krishi Kendra.`;

export async function getAIResponse(message, history = []) {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...history,
      { role: "user", content: message }
    ],
  });
  return response.choices[0].message.content;
}

export async function analyzeCropImage(base64Image, farmerCrop = null, farmerSymptoms = []) {
  const fallback = DISEASE_DB["Sugarcane_RedRot"];
  
  try {
    const isWizardMode = farmerCrop && farmerSymptoms.length > 0;
    
    // --- PATH 1: DETERMINISTIC EXPERT MATCHING (NEVER FAILS) ---
    if (isWizardMode) {
      // Map UI symptom keywords directly to Disease DB Keys
      const symptomToKeyMap = {
        "dead heart": "Sugarcane_Borer",
        "मधला पोंगा": "Sugarcane_Borer",
        "छिद्रे": "Sugarcane_Borer",
        "अळी": "Sugarcane_Borer",
        "larvae": "Sugarcane_Borer",
        "holes": "Sugarcane_Borer",
        
        "c-shaped": "Sugarcane_WhiteGrub",
        "'c' आकाराच्या": "Sugarcane_WhiteGrub",
        "grub": "Sugarcane_WhiteGrub",
        
        "reddish": "Sugarcane_RedRot",
        "लाल": "Sugarcane_RedRot",
        "sour": "Sugarcane_RedRot",
        "आंबट": "Sugarcane_RedRot",
        "yellowing of top": "Sugarcane_RedRot",
        
        "black whip": "Sugarcane_Smut",
        "चाबकासारखा": "Sugarcane_Smut",
        
        "oil spots": "Grapes_DownyMildew",
        "तेलकट": "Grapes_DownyMildew",
        
        "powdery": "Grapes_PowderyMildew",
        "पावडर": "Grapes_PowderyMildew",
        
        "bird's eye": "Grapes_Anthracnose",
        "खोल ठिपके": "Grapes_Anthracnose",
      };

      let bestMatch = null;
      let maxScore = 0;
      const scoreMap = {};

      farmerSymptoms.forEach(fs => {
        const fsLower = fs.toLowerCase();
        for (const [keyword, dbKey] of Object.entries(symptomToKeyMap)) {
          if (fsLower.includes(keyword)) {
            scoreMap[dbKey] = (scoreMap[dbKey] || 0) + 1;
          }
        }
      });

      for (const [key, score] of Object.entries(scoreMap)) {
        if (score > maxScore) {
          maxScore = score;
          bestMatch = key;
        }
      }

      if (bestMatch && DISEASE_DB[bestMatch]) {
        console.log(`Expert Exact Match: ${bestMatch}`);
        const expertData = JSON.parse(JSON.stringify(DISEASE_DB[bestMatch]));
        expertData.en.detectedAs = bestMatch.replace(/_/g, ' ');
        expertData.mr.detectedAs = expertData.mr.diseaseName;
        expertData.uncertain = false;
        expertData.matchType = "Expert Symptom Match";
        return expertData;
      }
    }

    // --- PATH 2: AI VISION PATH (FOR INITIAL SCAN) ---
    const specialistPrompt = `You are an Expert Agricultural Pathologist. Analyze this Sugarcane/Grape image.
Options: [Sugarcane_RedRot, Sugarcane_Smut, Sugarcane_Aphids, Sugarcane_WhiteGrub, Sugarcane_YellowRust, Sugarcane_Borer, Grapes_DownyMildew, Grapes_PowderyMildew, Grapes_Anthracnose].

VISUAL IDENTIFICATION RULES:
- If you see a LARVA/WORM: It is Sugarcane_Borer.
- Sugarcane_RedRot is INTERNAL stalk disease. Don't select it if you see a worm.
- Return JSON: { "selectedKey": "KEY_NAME", "confidence": 0.0-1.0, "isAgricultural": true }`;

    const response = await groq.chat.completions.create({
      model: "llama-3.2-11b-vision-preview",
      messages: [{
        role: "user",
        content: [
          { type: "text", text: specialistPrompt },
          { type: "image_url", image_url: { url: base64Image.startsWith('data:') ? base64Image : `data:image/jpeg;base64,${base64Image}` } }
        ]
      }],
      response_format: { type: "json_object" }
    });

    const aiChoice = JSON.parse(response.choices[0].message.content);
    const validKeys = Object.keys(DISEASE_DB);
    const key = aiChoice.selectedKey;
    const isCertain = aiChoice.confidence >= 0.90;

    if (!aiChoice.isAgricultural || !validKeys.includes(key) || !isCertain) {
      return { ...fallback, uncertain: true };
    }
    
    const expertData = JSON.parse(JSON.stringify(DISEASE_DB[key]));
    expertData.en.detectedAs = key.replace(/_/g, ' ');
    expertData.mr.detectedAs = expertData.mr.diseaseName;
    expertData.uncertain = false;
    expertData.matchType = "AI Vision Detection";

    return expertData;
  } catch (error) {
    console.error('Vision System Failure:', error);
    return { ...fallback, uncertain: true };
  }
}
