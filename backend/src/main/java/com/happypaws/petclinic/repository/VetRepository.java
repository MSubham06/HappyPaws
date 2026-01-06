package com.happypaws.petclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.happypaws.petclinic.entity.Vet;

@Repository
public interface VetRepository extends JpaRepository<Vet, Long> {
}
