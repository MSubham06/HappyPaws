package com.happypaws.petclinic.service;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happypaws.petclinic.entity.Vet;
import com.happypaws.petclinic.repository.VetRepository;

@Service
public class VetServiceImpl implements VetService {

    @Autowired
    private VetRepository vetRepository;

    @Override
    public Vet saveVet(Vet vet) {
        Objects.requireNonNull(vet, "vet must not be null");
        return vetRepository.save(vet);
    }

    @Override
    public List<Vet> getAllVets() {
        return vetRepository.findAll();
    }

    @Override
    public Vet getVetById(Long id) {
        Objects.requireNonNull(id, "id must not be null");
        return vetRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteVet(Long id) {
        Objects.requireNonNull(id, "id must not be null");
        vetRepository.deleteById(id);
    }
}
