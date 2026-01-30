package com.happypaws.petclinic.repository;

import com.happypaws.petclinic.entity.Vet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VetRepository extends JpaRepository<Vet, Long> {
    Optional<Vet> findByEmail(String email);
}