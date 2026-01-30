package com.happypaws.petclinic.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class AppointmentRequest {
    private Long petId;
    private Long vetId;
    private LocalDate date;
    private LocalTime time;
    private String reason;

    // Getters & Setters
    public Long getPetId() { return petId; }
    public void setPetId(Long petId) { this.petId = petId; }
    public Long getVetId() { return vetId; }
    public void setVetId(Long vetId) { this.vetId = vetId; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public LocalTime getTime() { return time; }
    public void setTime(LocalTime time) { this.time = time; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}