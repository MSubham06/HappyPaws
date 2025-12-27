package com.happypaws.petclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.happypaws.petclinic.entity.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {
}
