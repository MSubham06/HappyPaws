package com.happypaws.petclinic.service;

import java.util.List;

import com.happypaws.petclinic.entity.Vet;

public interface VetService {
    Vet saveVet(Vet vet);
    List<Vet> getAllVets();
    Vet getVetById(Long id);
    void deleteVet(Long id);
}