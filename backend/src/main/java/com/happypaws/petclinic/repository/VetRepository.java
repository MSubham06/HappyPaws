package com.happypaws.petclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.happypaws.petclinic.entity.Vet;

public interface VetRepository extends JpaRepository<Vet, Long> {
}
