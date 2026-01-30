package com.happypaws.petclinic.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.persistence.*;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime time;

    @Column(nullable = false)
    private String reason; 

    // ✅ FIXED: Using String so you don't need an Enum file
    @Column(nullable = false)
    private String status; 

    @ManyToOne
    @JoinColumn(name = "pet_id", nullable = false)
    private Pet pet;

    @ManyToOne
    @JoinColumn(name = "vet_id", nullable = false)
    private Vet vet;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private Owner owner;

    // --- GETTERS & SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public LocalTime getTime() { return time; }
    public void setTime(LocalTime time) { this.time = time; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Pet getPet() { return pet; }
    public void setPet(Pet pet) { this.pet = pet; }

    public Vet getVet() { return vet; }
    public void setVet(Vet vet) { this.vet = vet; }

    public Owner getOwner() { return owner; }
    public void setOwner(Owner owner) { this.owner = owner; }
}