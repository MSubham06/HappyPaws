package com.happypaws.petclinic.service;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happypaws.petclinic.entity.Owner;
import com.happypaws.petclinic.repository.OwnerRepository;

@Service
public class OwnerServiceImpl implements OwnerService {

    @Autowired
    private OwnerRepository ownerRepository;

    @Override
    public Owner createOwner(Owner owner) {
        Objects.requireNonNull(owner, "owner must not be null");
        return ownerRepository.save(owner);
    }

    @Override
    public List<Owner> getAllOwners() {
        return ownerRepository.findAll();
    }

    @Override
    public Owner getOwnerById(Long id) {
        Objects.requireNonNull(id, "id must not be null");
        return ownerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Owner not found"));
    }

    @Override
    public Owner updateOwner(Long id, Owner ownerDetails) {
        Objects.requireNonNull(id, "id must not be null");
        Objects.requireNonNull(ownerDetails, "ownerDetails must not be null");
        Owner owner = getOwnerById(id);
        owner.setFirstName(ownerDetails.getFirstName());
        owner.setLastName(ownerDetails.getLastName());
        owner.setPhone(ownerDetails.getPhone());
        owner.setEmail(ownerDetails.getEmail());
        owner.setAddress(ownerDetails.getAddress());
        owner.setCity(ownerDetails.getCity());
        return ownerRepository.save(owner);
    }

    @Override
    public void deleteOwner(Long id) {
        Objects.requireNonNull(id, "id must not be null");
        ownerRepository.deleteById(id);
    }
}
