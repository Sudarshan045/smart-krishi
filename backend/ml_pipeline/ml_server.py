import base64
import io
import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)
CORS(app)

# ==========================================
# Mock Dictionary Mapping for Frontend
# (Used to translate class names to JSON)
# ==========================================
DISEASE_DB = {
    'Sugarcane_RedRot': {
        "en": {
            "diseaseName": "Sugarcane Red Rot (The 'Cancer' of Sugarcane)",
            "info": "Red Rot is the most devastating disease of sugarcane in India. It is caused by the fungus Colletotrichum falcatum. It spreads through infected seed sets, irrigation water, and soil. If left untreated, it can lead to 100% crop loss and drastically reduces the sucrose content of the cane.",
            "cause": "Fungal pathogen: Colletotrichum falcatum.",
            "symptoms": ["Reddening of internal tissues with white bands", "Yellowing of leaves from top", "Alcoholic smell from stalks"],
            "precautions": ["Selection of resistant varieties", "Hot water treatment of seeds", "3-year crop rotation"],
            "remedies": ["Soil application of Trichoderma viride", "Immediate removal of infected stools", "Drenching with Carbendazim (2g/L)"]
        },
        "mr": {
            "diseaseName": "उसावरील लाल सड - उसाचा 'कर्करोग' (Red Rot)",
            "info": "लाल सड हा भारतातील उसाचा सर्वात विनाशकारी रोग आहे. हा 'कोलेटोट्रिकम फाल्केटम' नावाच्या बुरशीमुळे होतो. हा रोग बाधित बेणे आणि पाण्याद्वारे पसरतो.",
            "cause": "बुरशीजन्य रोगकारक: कोलेटोट्रिकम फाल्केटम.",
            "symptoms": ["उसाचे खोड आतून लाल होणे", "पाने शेंड्याकडून वाळणे", "उसातून आंबट वास येणे"],
            "precautions": ["रोगप्रतिकारक जाती वापरा", "बेण्यावर उष्ण जलप्रक्रिया करा", "पीक फेरपालट करा"],
            "remedies": ["ट्रायकोडर्मा विरिडीचा वापर करा", "रोगग्रस्त झाडे उपटून टाका", "कार्बेन्डाझिमची आळवणी करा"]
        }
    },
    'Sugarcane_Smut': {
        "en": {
            "diseaseName": "Sugarcane Smut",
            "info": "Characterized by the production of a black whip-like structure from the growing point of the sugarcane. It can spread rapidly through wind-borne spores.",
            "cause": "Fungus: Sporisorium scitamineum.",
            "symptoms": ["Black, dusty whip-like structure at the top", "Thin, elongated stalks", "Smaller leaves"],
            "precautions": ["Remove whips carefully in a plastic bag", "Use smut-resistant varieties", "Avoid ratooning infected crops"],
            "remedies": ["Seed treatment with Propiconazole (1ml/L)", "Regular rogueing of infected plants"]
        },
        "mr": {
            "diseaseName": "उसावरील काणी किंवा चाबूक रोग (Smut)",
            "info": "या रोगात उसाच्या शेंड्यातून काळ्या रंगाचा चाबकासारखा भाग बाहेर येतो. हा वाऱ्याद्वारे वेगाने पसरतो.",
            "cause": "बुरशी: स्पोरिसोरियम सायटॅमिनेम.",
            "symptoms": ["शेंड्यावर काळ्या चाबकासारखी वाढ", "काड्या बारीक आणि लांब होणे", "पाने आकुंचन पावणे"],
            "precautions": ["चाबूक प्लास्टिक पिशवीत घालून नष्ट करा", "प्रतिकारक जाती निवडा", "खोडवा घेऊ नका"],
            "remedies": ["प्रोपीकोनॅझोल (१ मिली/लिटर) ने बेणे प्रक्रिया करा", "बाधित झाडे वेळोवेळी काढून टाका"]
        }
    },
    'Sugarcane_GrassyShoot': {
        "en": {
            "diseaseName": "Sugarcane Grassy Shoot (GSD)",
            "info": "Causes the cane to produce numerous thin, chlorotic (yellow/white) shoots from the base, giving it a grassy appearance. No millable canes are produced.",
            "cause": "Phytoplasma (spread by leafhoppers and infected sets).",
            "symptoms": ["Excessive tillering (grassy look)", "Papery white or yellow leaves", "Stunted growth"],
            "precautions": ["Hot air treatment of sets at 54°C", "Control leafhoppers in the field", "Remove and burn GSD affected clumps"],
            "remedies": ["Spray Dimethoate (1.5ml/L) to control vectors", "Apply balanced NPK fertilizers"]
        },
        "mr": {
            "diseaseName": "उसावरील गवत्या वाढ (Grassy Shoot)",
            "info": "या रोगात उसाच्या बुंध्यातून गवतासारखी बारीक आणि पांढरी वाढ होते. यामुळे ऊस वाढत नाही आणि उत्पादन मिळत नाही.",
            "cause": "फायटोप्लाझ्मा (तुडतुड्यांद्वारे प्रसार).",
            "symptoms": ["गवतासारखी असंख्य फुटवे", "पांढरी किंवा पिवळसर पाने", "उसाची वाढ खुंटणे"],
            "precautions": ["बाधित बेटांचा नायनाट करा", "बेण्यावर उष्ण हवा प्रक्रिया करा", "निरोगी बेणे वापरा"],
            "remedies": ["तुडतुड्यांच्या नियंत्रणासाठी डायमेथोएट फवारा", "योग्य खत व्यवस्थापन करा"]
        }
    },
    'Grapes_DownyMildew': {
        "en": {
            "diseaseName": "Grapes Downy Mildew",
            "info": "A major fungal disease in Maharashtra vineyards, especially during rainy or cloudy weather. It affects all green parts.",
            "cause": "Plasmopara viticola.",
            "symptoms": ["Yellowish oil spots on leaves", "White downy growth on leaf underside", "Berries turn brown and drop"],
            "precautions": ["Ensure proper canopy ventilation", "Avoid excess nitrogen", "Monitor humidity (>85%)"],
            "remedies": ["Spray 1% Bordeaux mixture", "Apply Metalaxyl + Mancozeb (2g/L)", "Systemic spray of Dimethomorph (1g/L)"]
        },
        "mr": {
            "diseaseName": "द्राक्षावरील केवडा रोग (Downy Mildew)",
            "info": "पावसाळी आणि ढगाळ हवामानात हा रोग वेगाने पसरतो. यामुळे द्राक्षाच्या पानांचे आणि मण्यांचे मोठे नुकसान होते.",
            "cause": "प्लाझमोपारा विटिकोला.",
            "symptoms": ["पानांवर तेलकट ठिपके", "पानांच्या खालच्या बाजूला पांढरी बुरशी", "मणी सुकणे आणि गळणे"],
            "precautions": ["बागेत हवा खेळती ठेवा", "जास्त नत्रयुक्त खते टाळा", "पावसाळी हवेत लक्ष ठेवा"],
            "remedies": ["१% बोर्डो मिश्रणाची फवारणी करा", "मेटलॅक्सिल + मँकोझेब फवारा", "डायमेथोमॉर्फची फवारणी करा"]
        }
    },
    'Grapes_PowderyMildew': {
        "en": {
            "diseaseName": "Grapes Powdery Mildew",
            "info": "Appears as a white powdery coating on leaves, stems, and berries. Thrives in dry, warm, and shaded conditions.",
            "cause": "Uncinula necator.",
            "symptoms": ["White ash-like powder on leaves/berries", "Cracking of berries", "Stunted shoot growth"],
            "precautions": ["Maintain open canopy", "Regular cleaning of vines", "Use sulfur-resistant varieties"],
            "remedies": ["Spray Wettable Sulfur (2g/L)", "Apply Hexaconazole (1ml/L) or Dinocap", "Maintain proper sanitation"]
        },
        "mr": {
            "diseaseName": "द्राक्षावरील भुरी रोग (Powdery Mildew)",
            "info": "पानांवर आणि मण्यांवर राखेसारखी पांढरी पावडर दिसते. हा रोग कोरड्या आणि उष्ण हवामानात जास्त वाढतो.",
            "cause": "अन्सिन्युला नेकेटर.",
            "symptoms": ["पानांवर/मण्यांवर पांढरी पावडर", "मणी तडकणे", "वेल कमकुवत होणे"],
            "precautions": ["बागेत पुरेसा सूर्यप्रकाश ठेवा", "वेलींची स्वच्छता ठेवा", "प्रतिबंधात्मक गंधकाची धुरळणी करा"],
            "remedies": ["पाण्यात विरघळणारे गंधक फवारा", "हेक्झाकोनॅझोल (१ मिली/लिटर) चा वापर करा"]
        }
    },
    'Cotton_Bollworm': {
        "en": {
            "diseaseName": "Cotton Bollworm (Pest)",
            "info": "A major pest that bores into cotton bolls, destroying the fiber and reducing yield significantly.",
            "cause": "Helicoverpa armigera.",
            "symptoms": ["Holes in cotton bolls", "Presence of larvae inside bolls", "Fallen squares and flowers"],
            "precautions": ["Deep summer ploughing", "Use pheromone traps", "Grow trap crops like Marigold"],
            "remedies": ["Spray Bacillus thuringiensis (Bt)", "Apply Indoxacarb (0.5ml/L) if infestation is high"]
        },
        "mr": {
            "diseaseName": "कापसावरील बोंड अळी (Bollworm)",
            "info": "ही अळी कापसाच्या बोंडांना छिद्र पाडून आतील भाग फस्त करते, ज्यामुळे कापसाची प्रत आणि उत्पादन घटते.",
            "cause": "हेलिकोवर्पा आर्मिगेरा.",
            "symptoms": ["बोंडांना छिद्रे असणे", "बोंडांमध्ये अळी सापडणे", "फुले आणि पाते गळणे"],
            "precautions": ["उन्हाळ्यात खोल नांगरट करा", "कामगंध सापळे वापरा", "झेंडूसारखी सापळा पिके लावा"],
            "remedies": ["बीटी बुरशीनाशकाचा वापर करा", "जास्त प्रादुर्भाव असल्यास इंडोक्झाकार्ब फवारा"]
        }
    },
    'Onion_PurpleBlotch': {
        "en": {
            "diseaseName": "Onion Purple Blotch",
            "info": "A common disease in onion crops during the rainy season, causing purple lesions on leaves.",
            "cause": "Alternaria porri.",
            "symptoms": ["Purple or brownish spots on leaves", "Leaves wither and fall", "Reduced bulb size"],
            "precautions": ["Use healthy seeds", "Ensure crop rotation", "Avoid excessive irrigation"],
            "remedies": ["Spray Mancozeb (2.5g/L)", "Apply Tebuconazole (1ml/L)"]
        },
        "mr": {
            "diseaseName": "कांद्यावरील जांभळा करपा (Purple Blotch)",
            "info": "पावसाळी हंगामात कांद्यावर हा रोग जास्त दिसून येतो, ज्यामुळे पानांवर जांभळट ठिपके पडतात.",
            "cause": "अल्टरनेरिया पोरी.",
            "symptoms": ["पानांवर जांभळे किंवा तांबूस ठिपके", "पाने वाळणे", "कांद्याचा आकार लहान राहणे"],
            "precautions": ["निरोगी बियाणे वापरा", "पीक फेरपालट करा", "पाणी साचू देऊ नका"],
            "remedies": ["मँकोझेबची फवारणी करा", "टेब्युकोनॅझोल (१ मिली/लिटर) फवारा"]
        }
    }
}

# ==========================================
# Load ML Model (if exists)
# ==========================================
HAS_MODEL = False
model = None
class_indices = {}

try:
    import tensorflow as tf
    import numpy as np
    
    MODEL_PATH = 'crop_disease_model.h5'
    if os.path.exists(MODEL_PATH) and os.path.exists('class_indices.json'):
        model = tf.keras.models.load_model(MODEL_PATH)
        with open('class_indices.json', 'r') as f:
            indices = json.load(f)
            class_indices = {v: k for k, v in indices.items()} # reverse mapping
        HAS_MODEL = True
        print("[SUCCESS] TensorFlow ML Model loaded successfully!")
    else:
        print("[INFO] Model file not found. Running in MOCK Mode.")
except ImportError:
    print("[INFO] TensorFlow not installed. Running in MOCK Mode for UI testing.")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if not data or 'image' not in data:
        return jsonify({"success": False, "message": "No image provided"}), 400

    forced_class = data.get('forcedClass')
    base64_img = data['image']
    if ',' in base64_img:
        base64_img = base64_img.split(',')[1]

    try:
        # Decode image
        img_bytes = base64.b64decode(base64_img)
        img = Image.open(io.BytesIO(img_bytes)).convert('RGB')
        
        predicted_class = "Sugarcane_RedRot" # Default

        if forced_class and forced_class in DISEASE_DB:
            predicted_class = forced_class
            print(f"[AI] Frontend detected: '{forced_class}'. Fetching detailed info...")
        elif HAS_MODEL:
            import numpy as np
            # Preprocess image
            img = img.resize((224, 224))
            img_array = np.array(img) / 255.0
            img_array = np.expand_dims(img_array, axis=0)
            
            # Predict
            predictions = model.predict(img_array)
            class_idx = np.argmax(predictions[0])
            predicted_class = class_indices.get(class_idx, "Unknown")
        else:
            # Smart Mocking: Cycle through the database so user sees different diseases
            # This demonstrates that the system is ready for the real model
            disease_list = list(DISEASE_DB.keys())
            import time
            mock_idx = int(time.time()) % len(disease_list)
            predicted_class = disease_list[mock_idx]
            print(f"[MOCK] Neural Network simulation: Detected '{predicted_class}'")
        
        # Look up detailed info from our dictionary
        import copy
        db_entry = DISEASE_DB.get(predicted_class, DISEASE_DB['Sugarcane_RedRot'])
        result_data = copy.deepcopy(db_entry)
        
        # Extract confidence label from request (sent by frontend)
        ai_confidence = data.get('aiConfidence', 'Visual AI')

        # Add the AI confidence label for UI feedback
        for lang in result_data:
            result_data[lang]['detectedAs'] = ai_confidence

        return jsonify({
            "success": True,
            "data": result_data,
            "is_mock": not HAS_MODEL
        })

    except Exception as e:
        print(f"Prediction Error: {str(e)}")
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == '__main__':
    print("Starting Smart Krishi ML Microservice on port 8000...")
    app.run(port=8000, debug=True)
