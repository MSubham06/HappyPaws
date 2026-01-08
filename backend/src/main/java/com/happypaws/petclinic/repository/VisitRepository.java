package com.happypaws.petclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.happypaws.petclinic.entity.Visit;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Long> {
}
