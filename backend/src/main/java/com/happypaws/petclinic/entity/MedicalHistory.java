package com.happypaws.petclinic.entity;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;

@Embeddable
public class MedicalHistory {

    @ElementCollection
    @CollectionTable(
        name = "pet_genetic_markers",
        joinColumns = @JoinColumn(name = "pet_id")
    )
    private List<String> geneticMarkers;

    @ElementCollection
    @CollectionTable(
        name = "pet_chronic_conditions",
        joinColumns = @JoinColumn(name = "pet_id")
    )
    private List<String> chronicConditions;

    @ElementCollection
    @CollectionTable(
        name = "pet_medications",
        joinColumns = @JoinColumn(name = "pet_id")
    )
    private List<String> medications;

    // ---------- GETTERS & SETTERS ----------

    public List<String> getGeneticMarkers() {
        return geneticMarkers;
    }

    public void setGeneticMarkers(List<String> geneticMarkers) {
        this.geneticMarkers = geneticMarkers;
    }

    public List<String> getChronicConditions() {
        return chronicConditions;
    }

    public void setChronicConditions(List<String> chronicConditions) {
        this.chronicConditions = chronicConditions;
    }

    public List<String> getMedications() {
        return medications;
    }

    public void setMedications(List<String> medications) {
        this.medications = medications;
    }
}
