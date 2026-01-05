package com.happypaws.petclinic.service;

import java.util.List;

import com.happypaws.petclinic.entity.Visit;

public interface VisitService {

    Visit saveVisit(Visit visit);

    List<Visit> getAllVisits();

    Visit getVisitById(Long id);

    void deleteVisit(Long id);
}
