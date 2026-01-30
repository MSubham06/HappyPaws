package com.happypaws.petclinic.service; // ✅ Fixed Package

import com.happypaws.petclinic.dto.DiseasePredictionRequest; // ✅ Fixed Import
import com.happypaws.petclinic.dto.DiseasePredictionResponse; // ✅ Fixed Import
import org.springframework.stereotype.Service;

@Service
public class ChatbotService {

    public DiseasePredictionResponse predictDisease(DiseasePredictionRequest request) {
        String symptoms = request.getSymptoms().toLowerCase();
        String disease = "Unknown Condition";
        double confidence = 0.0;
        String vet = "General Practitioner";

        // --- MOCK LOGIC ---
        if (symptoms.contains("limp") || symptoms.contains("walk") || symptoms.contains("leg")) {
            disease = "Arthritis or Injury";
            confidence = 85.5;
            vet = "Dr. Smith (Orthopedic Specialist)";
        } else if (symptoms.contains("vomit") || symptoms.contains("food") || symptoms.contains("stomach")) {
            disease = "Gastritis or Food Poisoning";
            confidence = 92.0;
            vet = "Dr. Emily (Internal Medicine)";
        } else if (symptoms.contains("skin") || symptoms.contains("itch") || symptoms.contains("hair")) {
            disease = "Dermatitis / Allergies";
            confidence = 78.4;
            vet = "Dr. John (Dermatologist)";
        } else {
            disease = "General Fatigue / Viral Infection";
            confidence = 60.0;
            vet = "Dr. Sarah (General Vet)";
        }

        return new DiseasePredictionResponse(disease, confidence, vet);
    }
}