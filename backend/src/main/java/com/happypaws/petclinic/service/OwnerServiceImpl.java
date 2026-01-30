package com.happypaws.petclinic.service;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.happypaws.petclinic.entity.Owner;
import com.happypaws.petclinic.repository.OwnerRepository;

@Service
public class OwnerServiceImpl implements OwnerService {

    private final OwnerRepository ownerRepository;

    // ✅ Constructor Injection (Cleaner & Safer than @Autowired field)
    public OwnerServiceImpl(OwnerRepository ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

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

        // 1. Fetch existing owner
        Owner owner = getOwnerById(id);

        // 2. Update fields
        owner.setFirstName(ownerDetails.getFirstName());
        owner.setLastName(ownerDetails.getLastName());
        owner.setPhone(ownerDetails.getPhone());
        owner.setAddress(ownerDetails.getAddress());
        owner.setCity(ownerDetails.getCity());

        // ⚠️ NOTE: We typically DO NOT update email here because it breaks 
        // the link with the 'User' login table. Email updates usually require 
        // a separate process.
        // owner.setEmail(ownerDetails.getEmail()); 

        // 3. Save changes
        return ownerRepository.save(owner);
    }

    @Override
    public void deleteOwner(Long id) {
        Objects.requireNonNull(id, "id must not be null");
        ownerRepository.deleteById(id);
    }
}