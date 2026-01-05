package com.happypaws.petclinic.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "pets")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private String breed;
    private LocalDate birthDate;
    private String gender;

    @Embedded
    private Biometrics biometrics;

    @Embedded
    private BehavioralProfile behavioralProfile;

    @Embedded
    private EnvironmentalContext environmentalContext;

    @Embedded
    private MedicalHistory medicalHistory;

    @Embedded
    private DietaryPreferences dietaryPreferences;

    @ElementCollection
    @CollectionTable(name = "pet_activity_log", joinColumns = @JoinColumn(name = "pet_id"))
    private List<ActivityLog> activityLog;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private Owner owner;

    // ✅ Getters & Setters (ALL PUBLIC)

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getBreed() { return breed; }
    public void setBreed(String breed) { this.breed = breed; }

    public LocalDate getBirthDate() { return birthDate; }
    public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public Biometrics getBiometrics() { return biometrics; }
    public void setBiometrics(Biometrics biometrics) { this.biometrics = biometrics; }

    public BehavioralProfile getBehavioralProfile() { return behavioralProfile; }
    public void setBehavioralProfile(BehavioralProfile behavioralProfile) {
        this.behavioralProfile = behavioralProfile;
    }

    public EnvironmentalContext getEnvironmentalContext() { return environmentalContext; }
    public void setEnvironmentalContext(EnvironmentalContext environmentalContext) {
        this.environmentalContext = environmentalContext;
    }

    public MedicalHistory getMedicalHistory() { return medicalHistory; }
    public void setMedicalHistory(MedicalHistory medicalHistory) {
        this.medicalHistory = medicalHistory;
    }

    public DietaryPreferences getDietaryPreferences() { return dietaryPreferences; }
    public void setDietaryPreferences(DietaryPreferences dietaryPreferences) {
        this.dietaryPreferences = dietaryPreferences;
    }

    public List<ActivityLog> getActivityLog() { return activityLog; }
    public void setActivityLog(List<ActivityLog> activityLog) { this.activityLog = activityLog; }

    public Owner getOwner() { return owner; }
    public void setOwner(Owner owner) { this.owner = owner; }
}
