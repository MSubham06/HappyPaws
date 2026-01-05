package com.happypaws.petclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.happypaws.petclinic.entity.Visit;

public interface VisitRepository extends JpaRepository<Visit, Long> {
}
