package com.happypaws.petclinic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.happypaws.petclinic.entity.Pet;
import com.happypaws.petclinic.service.PetService;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    @Autowired
    private PetService petService;

    // ✅ Create Pet
    @PostMapping
    public Pet createPet(@RequestBody Pet pet) {
        return petService.savePet(pet);
    }

    // ✅ Get All Pets
    @GetMapping
    public List<Pet> getAllPets() {
        return petService.getAllPets();
    }

    // ✅ Get Pet By ID
    @GetMapping("/{id}")
    public Pet getPetById(@PathVariable Long id) {
        return petService.getPetById(id);
    }

    // ✅ Update Pet
    @PutMapping("/{id}")
    public Pet updatePet(@PathVariable Long id, @RequestBody Pet petDetails) {

        Pet pet = petService.getPetById(id);

        pet.setName(petDetails.getName());
        pet.setType(petDetails.getType());
        pet.setBreed(petDetails.getBreed());
        pet.setBirthDate(petDetails.getBirthDate());
        pet.setGender(petDetails.getGender());

        pet.setBiometrics(petDetails.getBiometrics());
        pet.setBehavioralProfile(petDetails.getBehavioralProfile());
        pet.setEnvironmentalContext(petDetails.getEnvironmentalContext());
        pet.setMedicalHistory(petDetails.getMedicalHistory());
        pet.setDietaryPreferences(petDetails.getDietaryPreferences());
        pet.setActivityLog(petDetails.getActivityLog());
        pet.setOwner(petDetails.getOwner());

        return petService.savePet(pet);
    }

    // ✅ DELETE PET BY ID
    @DeleteMapping("/{id}")
    public String deletePetById(@PathVariable Long id) {
        petService.deletePet(id);
        return "Pet deleted successfully with id " + id;
    }

    // ✅ DELETE ALL PETS
    @DeleteMapping
    public String deleteAllPets() {
        petService.deleteAllPets();
        return "All pets deleted successfully";
    }
}
