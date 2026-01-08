package com.happypaws.petclinic.service;

import java.util.List;
import java.util.Objects; // <--- Added for validation

import org.springframework.stereotype.Service;

import com.happypaws.petclinic.entity.Vet;
import com.happypaws.petclinic.repository.VetRepository;

@Service
public class VetServiceImpl implements VetService {

    private final VetRepository vetRepository;

    // ✅ Constructor Injection
    public VetServiceImpl(VetRepository vetRepository) {
        this.vetRepository = vetRepository;
    }

    @Override
    public Vet createVet(Vet vet) {
        Objects.requireNonNull(vet, "Vet details must not be null");
        return vetRepository.save(vet);
    }

    @Override
    public List<Vet> getAllVets() {
        return vetRepository.findAll();
    }

    @Override
    public Vet getVetById(Long id) {
        Objects.requireNonNull(id, "Vet ID must not be null");
        return vetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vet not found with id: " + id));
    }

    @Override
    public Vet updateVet(Long id, Vet vetDetails) {
        Objects.requireNonNull(id, "Vet ID must not be null");
        Objects.requireNonNull(vetDetails, "Vet details for update must not be null");

        Vet vet = getVetById(id);
        
        // Update all fields, INCLUDING THE NEW EMAIL
        vet.setFirstName(vetDetails.getFirstName());
        vet.setLastName(vetDetails.getLastName());
        vet.setEmail(vetDetails.getEmail()); // <--- CRITICAL UPDATE
        vet.setSpecialization(vetDetails.getSpecialization());
        vet.setPhone(vetDetails.getPhone());
        vet.setQualification(vetDetails.getQualification());
        vet.setYearsOfExperience(vetDetails.getYearsOfExperience());
        vet.setConsultationFee(vetDetails.getConsultationFee());
        vet.setEmergencyAvailable(vetDetails.getEmergencyAvailable());
        vet.setGender(vetDetails.getGender());

        return vetRepository.save(vet);
    }

    @Override
    public void deleteVet(Long id) {
        Objects.requireNonNull(id, "Vet ID must not be null");
        Vet vet = getVetById(id); // Ensures vet exists before deleting
        vetRepository.delete(vet);
    }
}