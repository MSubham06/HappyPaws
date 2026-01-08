package com.happypaws.petclinic.service;

import java.util.List;

import com.happypaws.petclinic.entity.Visit;

public interface VisitService {

    Visit createVisit(Visit visit);

    List<Visit> getAllVisits();

    Visit getVisitById(Long id);

    Visit updateVisit(Long id, Visit visit);

    void deleteVisit(Long id);
    List<Visit> createVisits(List<Visit> visits);

}
