package com.happypaws.petclinic.service;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.happypaws.petclinic.entity.Pet;
import com.happypaws.petclinic.repository.PetRepository;

@Service
public class PetServiceImpl implements PetService {

    private final PetRepository petRepository;

    public PetServiceImpl(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    @Override
    public Pet savePet(Pet pet) {
        Objects.requireNonNull(pet, "pet must not be null");
        return petRepository.save(pet);
    }

    // ✅ NEW METHOD IMPLEMENTATION
    @Override
    public List<Pet> saveAllPets(List<Pet> pets) {
        Objects.requireNonNull(pets, "pets list must not be null");
        return petRepository.saveAll(pets);
    }

    @Override
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    @Override
    public Pet getPetById(Long id) {
        Objects.requireNonNull(id, "id must not be null");
        return petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found with id: " + id));
    }

    @Override
    public Pet updatePet(Long id, Pet pet) {
        Objects.requireNonNull(id, "id must not be null");
        Objects.requireNonNull(pet, "pet must not be null");
        Pet existing = getPetById(id);

        existing.setName(pet.getName());
        existing.setType(pet.getType());
        existing.setBreed(pet.getBreed());
        existing.setBirthDate(pet.getBirthDate());
        existing.setGender(pet.getGender());
        existing.setBiometrics(pet.getBiometrics());
        existing.setBehavioralProfile(pet.getBehavioralProfile());
        existing.setEnvironmentalContext(pet.getEnvironmentalContext());
        existing.setMedicalHistory(pet.getMedicalHistory());
        existing.setDietaryPreferences(pet.getDietaryPreferences());
        existing.setActivityLog(pet.getActivityLog());
        existing.setOwner(pet.getOwner());

        return petRepository.save(existing);
    }

    @Override
    public void deletePet(Long id) {
        Objects.requireNonNull(id, "id must not be null");
        petRepository.deleteById(id);
    }

    @Override
    public void deleteAllPets() {
        petRepository.deleteAll();
    }
}