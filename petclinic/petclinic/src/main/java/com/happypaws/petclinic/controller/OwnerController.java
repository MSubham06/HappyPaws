package com.happypaws.petclinic.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.happypaws.petclinic.entity.Owner;
import com.happypaws.petclinic.repository.OwnerRepository;

@RestController
@RequestMapping("/api/owners")
public class OwnerController {

    @Autowired
    private OwnerRepository ownerRepository;

    // ✅ Create Owner
    @PostMapping
    public Owner createOwner(@RequestBody Owner owner) {
        return ownerRepository.save(owner);
    }

    // ✅ Get All Owners
    @GetMapping
    public List<Owner> getAllOwners() {
        return ownerRepository.findAll();
    }

    // ✅ Get Owner By ID
    @GetMapping("/{id}")
    public Optional<Owner> getOwnerById(@PathVariable Long id) {
        return ownerRepository.findById(id);
    }

    // ✅ Update Owner
    @PutMapping("/{id}")
    public Owner updateOwner(@PathVariable Long id, @RequestBody Owner ownerDetails) {
        Owner owner = ownerRepository.findById(id).orElseThrow();
        owner.setFirstName(ownerDetails.getFirstName());
        owner.setLastName(ownerDetails.getLastName());
        owner.setPhone(ownerDetails.getPhone());
        owner.setEmail(ownerDetails.getEmail());
        owner.setAddress(ownerDetails.getAddress());
        owner.setCity(ownerDetails.getCity());
        return ownerRepository.save(owner);
    }

    // ✅ Delete Owner
    @DeleteMapping("/{id}")
    public String deleteOwner(@PathVariable Long id) {
        ownerRepository.deleteById(id);
        return "Owner deleted successfully";
    }
}
