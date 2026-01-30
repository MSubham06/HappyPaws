package com.happypaws.petclinic.controller;

import com.happypaws.petclinic.entity.User;
import com.happypaws.petclinic.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // ✅ Constructor Injection
    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 🟢 READ ALL
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 🟢 CREATE (Fixes "Failed to create user")
    @PostMapping
    public User createUser(@RequestBody User user) {
        // Encrypt the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // 🟠 UPDATE (Fixes "Failed to update user")
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        user.setEmail(userDetails.getEmail());
        user.setRole(userDetails.getRole());
        user.setRelatedEntityId(userDetails.getRelatedEntityId());

        // Only encrypt & update password if a new one is provided
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }

        return userRepository.save(user);
    }
    
    // 🔴 DELETE
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}