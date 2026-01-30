package com.happypaws.petclinic.dto; // ✅ Fixed Package

public class DiseasePredictionResponse {
    private String disease;
    private double confidence;
    private String recommendedVet;

    public DiseasePredictionResponse(String disease, double confidence, String recommendedVet) {
        this.disease = disease;
        this.confidence = confidence;
        this.recommendedVet = recommendedVet;
    }

    // Getters and Setters
    public String getDisease() { return disease; }
    public void setDisease(String disease) { this.disease = disease; }

    public double getConfidence() { return confidence; }
    public void setConfidence(double confidence) { this.confidence = confidence; }

    public String getRecommendedVet() { return recommendedVet; }
    public void setRecommendedVet(String recommendedVet) { this.recommendedVet = recommendedVet; }
}