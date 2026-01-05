package com.happypaws.petclinic.service;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happypaws.petclinic.entity.Visit;
import com.happypaws.petclinic.repository.VisitRepository;

@Service
public class VisitServiceImpl implements VisitService {

    @Autowired
    private VisitRepository visitRepository;

    @Override
    public Visit saveVisit(Visit visit) {
        Objects.requireNonNull(visit, "visit must not be null");
        return visitRepository.save(visit);
    }

    @Override
    public List<Visit> getAllVisits() {
        return visitRepository.findAll();
    }

    @Override
    public Visit getVisitById(Long id) {
        Objects.requireNonNull(id, "id must not be null");
        return visitRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteVisit(Long id) {
        Objects.requireNonNull(id, "id must not be null");
        visitRepository.deleteById(id);
    }
}
