package com.happypaws.petclinic.service;

import java.util.List;

import com.happypaws.petclinic.entity.Pet;

public interface PetService {

    Pet savePet(Pet pet);

    List<Pet> getAllPets();

    Pet getPetById(Long id);

    Pet updatePet(Long id, Pet pet);

    void deletePet(Long id);

    void deleteAllPets();

    // ✅ ADD THIS NEW METHOD TO FIX THE CONTROLLER ERROR
    List<Pet> saveAllPets(List<Pet> pets);
}