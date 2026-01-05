package com.happypaws.petclinic.controller;

import java.util.List;

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
import com.happypaws.petclinic.service.OwnerService;

@RestController
@RequestMapping("/api/owners")
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    @PostMapping
    public Owner createOwner(@RequestBody Owner owner) {
        return ownerService.createOwner(owner);
    }

    @GetMapping
    public List<Owner> getAllOwners() {
        return ownerService.getAllOwners();
    }

    @GetMapping("/{id}")
    public Owner getOwnerById(@PathVariable Long id) {
        return ownerService.getOwnerById(id);
    }

    @PutMapping("/{id}")
    public Owner updateOwner(@PathVariable Long id,
                             @RequestBody Owner ownerDetails) {
        return ownerService.updateOwner(id, ownerDetails);
    }

    @DeleteMapping("/{id}")
    public String deleteOwner(@PathVariable Long id) {
        ownerService.deleteOwner(id);
        return "Owner deleted successfully";
    }
}
