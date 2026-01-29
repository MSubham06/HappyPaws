from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import SGDClassifier
import os
import re

app = Flask(__name__)
CORS(app)

print("⏳ Training HappyPaws Hybrid AI...")

# Setup Directory
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

try:
    # 1. LOAD DATA
    visits_df = pd.read_csv('clinic_visits.csv')
    
    # 2. DISEASE CATEGORIZER (For Training Data Labels)
    def get_category(disease):
        d = str(disease).lower()
        if any(x in d for x in ['arthritis', 'dysplasia', 'joint', 'limp', 'strain', 'fracture', 'broken', 'pain']): return 'Orthopedic_Issue'
        if any(x in d for x in ['dermatitis', 'allergy', 'mange', 'flea', 'tick', 'ringworm', 'hot spot', 'skin', 'itch', 'feather', 'molting', 'fur']): return 'Dermatology_Issue'
        if any(x in d for x in ['gastritis', 'bloat', 'vomit', 'diarrhea', 'stasis', 'weight', 'obesity', 'eating', 'appetite']): return 'Internal_Medicine'
        if any(x in d for x in ['dental', 'tooth', 'teeth', 'gum', 'gingivitis', 'tartar', 'beak']): return 'Dental_Issue'
        if any(x in d for x in ['infection', 'fever', 'virus', 'cold', 'flu', 'pneumonia', 'respiratory', 'cough', 'sneeze', 'nasal']): return 'Infection'
        if any(x in d for x in ['ear', 'eye', 'conjunctivitis', 'cataract', 'glaucoma', 'deaf', 'blind', 'discharge']): return 'ENT_Issue'
        if any(x in d for x in ['behavior', 'anxiety', 'aggression', 'stress', 'screaming', 'plucking', 'biting']): return 'Behavioral_Issue'
        return 'General_Checkup'

    # 3. TRAIN TEXT MODEL (The "Fuzzy" Brain)
    visits_clean = visits_df.dropna(subset=['symptoms', 'diagnosis'])
    X_text = visits_clean['symptoms']
    y_text = visits_clean['diagnosis'].apply(get_category)
    
    text_model = make_pipeline(TfidfVectorizer(stop_words='english'), SGDClassifier(loss='modified_huber', random_state=42))
    text_model.fit(X_text, y_text)
    
    print("✅ Hybrid AI Ready! Listening on Port 5000...")

except Exception as e:
    print(f"❌ Error during training: {e}")

# --- KEYWORD TRIGGERS (The "Rule" Brain) ---
# These override the ML model if found in the text
KEYWORD_RULES = {
    'plucking': 'Behavioral_Issue',
    'screaming': 'Behavioral_Issue',
    'aggression': 'Behavioral_Issue',
    'biting': 'Behavioral_Issue',
    'feathers': 'Dermatology_Issue',
    'itch': 'Dermatology_Issue',
    'scratch': 'Dermatology_Issue',
    'fur': 'Dermatology_Issue',
    'skin': 'Dermatology_Issue',
    'vomit': 'Internal_Medicine',
    'diarrhea': 'Internal_Medicine',
    'stomach': 'Internal_Medicine',
    'eating': 'Internal_Medicine',
    'limp': 'Orthopedic_Issue',
    'leg': 'Orthopedic_Issue',
    'walk': 'Orthopedic_Issue',
    'ear': 'ENT_Issue',
    'eye': 'ENT_Issue',
    'teeth': 'Dental_Issue',
    'beak': 'Dental_Issue',
    'cough': 'Infection',
    'sneeze': 'Infection'
}

def extract_smart_data(text):
    data = {}
    age_match = re.search(r'(\d+)\s*(?:year|yr|yrs)', text, re.IGNORECASE)
    if age_match: data['age'] = int(age_match.group(1))
    
    weight_match = re.search(r'(\d+)\s*(?:kg|kilo)', text, re.IGNORECASE)
    if weight_match: data['current_weight_kg'] = float(weight_match.group(1))
    
    return data

@app.route('/predict', methods=['POST'])
def predict():
    try:
        req_data = request.get_json()
        user_text = req_data.get('symptoms', '').lower()
        
        # 1. Extract Age/Weight
        extracted = extract_smart_data(user_text)
        
        # 2. HYBRID PREDICTION LOGIC
        prediction = None
        confidence = 0
        
        # A. Check Rules First (Guaranteed accuracy for known words)
        for keyword, category in KEYWORD_RULES.items():
            if keyword in user_text:
                prediction = category
                confidence = 95.0 # High confidence for explicit keywords
                break # Stop searching if we found a strong match
        
        # B. If no rule matched, ask the ML Model
        if not prediction:
            prediction = text_model.predict([user_text])[0]
            confidence = np.max(text_model.predict_proba([user_text])) * 100
            confidence = round(confidence, 1)

        # 3. Map to Vets
        vet_map = {
            'Orthopedic_Issue': 'Dr. Smith (Orthopedics)',
            'Dermatology_Issue': 'Dr. Sarah (Dermatology)',
            'Internal_Medicine': 'Dr. Emily (Internal Med)',
            'Dental_Issue': 'Dr. Mark (Dentistry)',
            'Infection': 'General Vet Clinic',
            'ENT_Issue': 'Dr. Lisa (ENT Specialist)',
            'Behavioral_Issue': 'Pet Behavioralist',
            'General_Checkup': 'General Veterinarian'
        }
        
        # 4. Construct Response
        return jsonify({
            'disease': prediction.replace('_', ' '),
            'confidence': confidence,
            'recommendedVet': vet_map.get(prediction, 'General Vet'),
            'extracted_info': {
                'age': extracted.get('age', 'Unknown'),
                'current_weight_kg': extracted.get('current_weight_kg', 'Unknown')
            }
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
