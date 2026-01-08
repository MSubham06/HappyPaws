package com.happypaws.petclinic.service;

import java.util.List;

import com.happypaws.petclinic.entity.Owner;

public interface OwnerService {
    Owner createOwner(Owner owner);
    List<Owner> getAllOwners();
    Owner getOwnerById(Long id);
    Owner updateOwner(Long id, Owner ownerDetails);
    void deleteOwner(Long id);
}