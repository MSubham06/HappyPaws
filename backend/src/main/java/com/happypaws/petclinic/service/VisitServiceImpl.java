package com.happypaws.petclinic.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.happypaws.petclinic.entity.Visit;
import com.happypaws.petclinic.repository.VisitRepository;

@Service
public class VisitServiceImpl implements VisitService {

    private final VisitRepository visitRepository;

    public VisitServiceImpl(VisitRepository visitRepository) {
        this.visitRepository = visitRepository;
    }

    // CREATE
    @Override
    public Visit createVisit(Visit visit) {
        return visitRepository.save(visit);
    }

    // READ ALL
    @Override
    public List<Visit> getAllVisits() {
        return visitRepository.findAll();
    }

    // READ BY ID
    @Override
    public Visit getVisitById(Long id) {
        return visitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visit not found with id: " + id));
    }

    // UPDATE
    @Override
    public Visit updateVisit(Long id, Visit visit) {
        Visit existingVisit = getVisitById(id);

        existingVisit.setVisitDate(visit.getVisitDate());
        existingVisit.setVisitType(visit.getVisitType());
        existingVisit.setDescription(visit.getDescription()); // ✅ ADDED
        existingVisit.setSymptoms(visit.getSymptoms());
        existingVisit.setDiagnosis(visit.getDiagnosis());
        existingVisit.setTreatment(visit.getTreatment());
        existingVisit.setPet(visit.getPet());
        existingVisit.setVet(visit.getVet());

        return visitRepository.save(existingVisit);
    }

    // DELETE
    @Override
    public void deleteVisit(Long id) {
        visitRepository.deleteById(id);
    }

    // BULK INSERT
    @Override
    public List<Visit> createVisits(List<Visit> visits) {
        return visitRepository.saveAll(visits);
    }
}
