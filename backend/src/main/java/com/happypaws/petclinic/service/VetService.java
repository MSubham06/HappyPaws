package com.happypaws.petclinic.service;

import java.util.List;

import com.happypaws.petclinic.entity.Vet;

public interface VetService {

    Vet createVet(Vet vet);

    List<Vet> getAllVets();

    Vet getVetById(Long id);

    Vet updateVet(Long id, Vet vet);

    void deleteVet(Long id);
}
