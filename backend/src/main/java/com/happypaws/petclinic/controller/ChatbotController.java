package com.happypaws.petclinic.controller; // ✅ Fixed Package

import com.happypaws.petclinic.dto.DiseasePredictionRequest; // ✅ Fixed Import
import com.happypaws.petclinic.dto.DiseasePredictionResponse; // ✅ Fixed Import
import com.happypaws.petclinic.service.ChatbotService; // ✅ Fixed Import

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "http://localhost:3000") // Allow React Frontend
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @PostMapping("/predict")
    public ResponseEntity<DiseasePredictionResponse> predictDisease(@RequestBody DiseasePredictionRequest request) {
        DiseasePredictionResponse response = chatbotService.predictDisease(request);
        return ResponseEntity.ok(response);
    }
}