package com.happypaws.petclinic.entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class Biometrics {

    private Integer bodyConditionScore;
    private Double idealWeightKg;
    private Double currentWeightKg;
    private String sterilizationStatus;

    public Integer getBodyConditionScore() {
        return bodyConditionScore;
    }

    public void setBodyConditionScore(Integer bodyConditionScore) {
        this.bodyConditionScore = bodyConditionScore;
    }

    public Double getIdealWeightKg() {
        return idealWeightKg;
    }

    public void setIdealWeightKg(Double idealWeightKg) {
        this.idealWeightKg = idealWeightKg;
    }

    public Double getCurrentWeightKg() {
        return currentWeightKg;
    }

    public void setCurrentWeightKg(Double currentWeightKg) {
        this.currentWeightKg = currentWeightKg;
    }

    public String getSterilizationStatus() {
        return sterilizationStatus;
    }

    public void setSterilizationStatus(String sterilizationStatus) {
        this.sterilizationStatus = sterilizationStatus;
    }
}
