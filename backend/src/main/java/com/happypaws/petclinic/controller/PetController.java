package com.happypaws.petclinic.controller;

import java.util.List;

import org.springframework.security.core.Authentication; 
import org.springframework.web.bind.annotation.*;

import com.happypaws.petclinic.entity.Owner;
import com.happypaws.petclinic.entity.Pet;
import com.happypaws.petclinic.entity.User;
import com.happypaws.petclinic.repository.OwnerRepository;
import com.happypaws.petclinic.repository.PetRepository;
import com.happypaws.petclinic.repository.UserRepository;
import com.happypaws.petclinic.service.PetService;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "http://localhost:3000") // ✅ Adjusted to specifically allow your React app
public class PetController {

    private final PetService petService;
    private final UserRepository userRepository;
    private final OwnerRepository ownerRepository;
    private final PetRepository petRepository;

    public PetController(PetService petService, 
                         UserRepository userRepository, 
                         OwnerRepository ownerRepository, 
                         PetRepository petRepository) {
        this.petService = petService;
        this.userRepository = userRepository;
        this.ownerRepository = ownerRepository;
        this.petRepository = petRepository;
    }

    // 🐾 1. GET MY PETS (Logged-in Owner Only)
    // This is the endpoint your "My Pets" page calls
    @GetMapping("/my-pets")
    public List<Pet> getMyPets(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Owner owner = ownerRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Owner profile not found"));

        return petRepository.findByOwnerId(owner.getId());
    }

    // ✅ 2. CREATE PET (Automatically assigns to logged-in Owner)
    @PostMapping
    public Pet createPet(@RequestBody Pet pet, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        
        // Find the owner profile associated with this login
        Owner owner = ownerRepository.findByUserId(user.getId())
            .orElseThrow(() -> new RuntimeException("Owner profile not found"));

        pet.setOwner(owner); // Link pet to the logged-in owner
        return petService.savePet(pet);
    }

    // ✅ 3. GET ALL PETS (Admin/Vet Use)
    @GetMapping
    public List<Pet> getAllPets() {
        return petService.getAllPets();
    }

    // ✅ 4. GET PET BY ID
    @GetMapping("/{id}")
    public Pet getPetById(@PathVariable Long id) {
        return petService.getPetById(id);
    }

    // ✅ 5. UPDATE PET
    @PutMapping("/{id}")
    public Pet updatePet(@PathVariable Long id, @RequestBody Pet petDetails) {
        Pet pet = petService.getPetById(id);

        pet.setName(petDetails.getName());
        pet.setType(petDetails.getType());
        pet.setBreed(petDetails.getBreed());
        pet.setBirthDate(petDetails.getBirthDate());
        pet.setGender(petDetails.getGender());
        
        // Detailed fields
        pet.setBiometrics(petDetails.getBiometrics());
        pet.setBehavioralProfile(petDetails.getBehavioralProfile());
        pet.setEnvironmentalContext(petDetails.getEnvironmentalContext());
        pet.setMedicalHistory(petDetails.getMedicalHistory());
        pet.setDietaryPreferences(petDetails.getDietaryPreferences());
        pet.setActivityLog(petDetails.getActivityLog());
        
        return petService.savePet(pet);
    }

    // ✅ 6. DELETE PET BY ID
    @DeleteMapping("/{id}")
    public String deletePetById(@PathVariable Long id) {
        petService.deletePet(id);
        return "Pet deleted successfully";
    }

    // ✅ 7. DELETE ALL PETS
    @DeleteMapping
    public String deleteAllPets() {
        petService.deleteAllPets();
        return "All pets deleted successfully";
    }

    // ✅ 8. BULK INSERT PETS
    @PostMapping("/bulk")
    public List<Pet> createPets(@RequestBody List<Pet> pets) {
        return petService.saveAllPets(pets);
    }
}