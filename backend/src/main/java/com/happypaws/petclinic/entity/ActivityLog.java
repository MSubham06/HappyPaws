package com.happypaws.petclinic.entity;

import java.time.LocalDate;

import jakarta.persistence.Embeddable;

@Embeddable
public class ActivityLog {

    private LocalDate date;
    private String activityType;
    private Integer durationMinutes;
    private String intensity;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getActivityType() {
        return activityType;
    }

    public void setActivityType(String activityType) {
        this.activityType = activityType;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public String getIntensity() {
        return intensity;
    }

    public void setIntensity(String intensity) {
        this.intensity = intensity;
    }
}
