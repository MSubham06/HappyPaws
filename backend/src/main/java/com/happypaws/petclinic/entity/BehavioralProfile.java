package com.happypaws.petclinic.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;

@Embeddable
public class BehavioralProfile {

    private String energyLevel;
    private Integer separationAnxietyScore;
    private Double trainabilityIndex;

    @Embedded
    private SocialCompatibility socialCompatibility;

    public String getEnergyLevel() {
        return energyLevel;
    }

    public void setEnergyLevel(String energyLevel) {
        this.energyLevel = energyLevel;
    }

    public Integer getSeparationAnxietyScore() {
        return separationAnxietyScore;
    }

    public void setSeparationAnxietyScore(Integer separationAnxietyScore) {
        this.separationAnxietyScore = separationAnxietyScore;
    }

    public Double getTrainabilityIndex() {
        return trainabilityIndex;
    }

    public void setTrainabilityIndex(Double trainabilityIndex) {
        this.trainabilityIndex = trainabilityIndex;
    }

    public SocialCompatibility getSocialCompatibility() {
        return socialCompatibility;
    }

    public void setSocialCompatibility(SocialCompatibility socialCompatibility) {
        this.socialCompatibility = socialCompatibility;
    }
}
