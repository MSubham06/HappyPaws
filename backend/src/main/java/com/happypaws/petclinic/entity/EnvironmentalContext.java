package com.happypaws.petclinic.entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class EnvironmentalContext {

    private String dwellingType;
    private Double outdoorAccessHours;
    private String noiseExposureLevel;
    private String climateZone;

    public String getDwellingType() {
        return dwellingType;
    }

    public void setDwellingType(String dwellingType) {
        this.dwellingType = dwellingType;
    }

    public Double getOutdoorAccessHours() {
        return outdoorAccessHours;
    }

    public void setOutdoorAccessHours(Double outdoorAccessHours) {
        this.outdoorAccessHours = outdoorAccessHours;
    }

    public String getNoiseExposureLevel() {
        return noiseExposureLevel;
    }

    public void setNoiseExposureLevel(String noiseExposureLevel) {
        this.noiseExposureLevel = noiseExposureLevel;
    }

    public String getClimateZone() {
        return climateZone;
    }

    public void setClimateZone(String climateZone) {
        this.climateZone = climateZone;
    }
}
