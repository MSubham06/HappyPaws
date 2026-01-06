package com.happypaws.petclinic.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.happypaws.petclinic.entity.Vet;
import com.happypaws.petclinic.repository.VetRepository;

@Service
public class VetServiceImpl implements VetService {

    private final VetRepository vetRepository;

    public VetServiceImpl(VetRepository vetRepository) {
        this.vetRepository = vetRepository;
    }

    // ✅ CREATE
    @Override
    public Vet createVet(Vet vet) {
        return vetRepository.save(vet);
    }

    // ✅ READ ALL
    @Override
    public List<Vet> getAllVets() {
        return vetRepository.findAll();
    }

    // ✅ READ BY ID
    @Override
    public Vet getVetById(Long id) {
        return vetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vet not found with id: " + id));
    }

    // ✅ UPDATE
    @Override
    public Vet updateVet(Long id, Vet vet) {
        Vet existingVet = getVetById(id);

        existingVet.setFirstName(vet.getFirstName());
        existingVet.setLastName(vet.getLastName());
        existingVet.setGender(vet.getGender());
        existingVet.setSpecialization(vet.getSpecialization());
        existingVet.setPhone(vet.getPhone());
        existingVet.setQualification(vet.getQualification());
        existingVet.setYearsOfExperience(vet.getYearsOfExperience());
        existingVet.setConsultationFee(vet.getConsultationFee());
        existingVet.setEmergencyAvailable(vet.getEmergencyAvailable());

        return vetRepository.save(existingVet);
    }

    // ✅ DELETE
    @Override
    public void deleteVet(Long id) {
        vetRepository.deleteById(id);
    }
}
