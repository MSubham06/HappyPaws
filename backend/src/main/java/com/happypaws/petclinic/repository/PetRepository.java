package com.happypaws.petclinic.repository;

import com.happypaws.petclinic.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List; // <--- Import this!

public interface PetRepository extends JpaRepository<Pet, Long> {

    // This fetches all pets belonging to a specific Owner ID
    List<Pet> findByOwnerId(Long ownerId);
}