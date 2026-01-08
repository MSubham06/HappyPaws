package com.happypaws.petclinic.repository;

import com.happypaws.petclinic.entity.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional; 

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long> {
    
    // Finds the Owner profile linked to a specific User Login ID
    Optional<Owner> findByUserId(Long userId);
}