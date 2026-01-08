package com.happypaws.petclinic.repository;

import com.happypaws.petclinic.entity.Vet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional; 

@Repository
public interface VetRepository extends JpaRepository<Vet, Long> {
    
    // Finds the Vet profile linked to a specific User Login ID
    Optional<Vet> findByUserId(Long userId);
}