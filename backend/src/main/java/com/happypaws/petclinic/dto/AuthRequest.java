package com.happypaws.petclinic.dto;

import com.happypaws.petclinic.enums.UserRole;

// This class handles data coming FROM the frontend/Postman
public class AuthRequest {
    private String email;
    private String password;
    private UserRole role; // Only needed for registration

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }
}