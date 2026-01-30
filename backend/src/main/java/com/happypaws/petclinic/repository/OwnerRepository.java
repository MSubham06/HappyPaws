package com.happypaws.petclinic.repository;

import com.happypaws.petclinic.entity.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional; 

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long> {
    
    // ✅ CRITICAL FIX: Find Owner by Email (since linked by email, not just user_id)
    Optional<Owner> findByEmail(String email);

    // Keep this as a backup
    Optional<Owner> findByUserId(Long userId);
}