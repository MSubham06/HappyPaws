package com.happypaws.petclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.happypaws.petclinic.entity.Owner;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
}