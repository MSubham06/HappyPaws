package com.happypaws.petclinic.controller;

import com.happypaws.petclinic.dto.AuthRequest;
import com.happypaws.petclinic.entity.User;
import com.happypaws.petclinic.repository.UserRepository;
import com.happypaws.petclinic.util.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    // ✅ REMOVED: userDetailsService (Not used directly here)
    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, 
                          AuthenticationManager authenticationManager, 
                          JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already taken!");
        }

        User newUser = new User();
        newUser.setEmail(request.getEmail());
        newUser.setRole(request.getRole());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(newUser);

        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody AuthRequest request) {
        // 1. Authenticate the user (AuthenticationManager uses UserDetailsService internally)
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // 2. Get User Details from the authenticated object
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // 3. Generate Token
        String token = jwtUtils.generateToken(userDetails);

        // 4. Get Role
        String role = userDetails.getAuthorities().stream()
                .findFirst()
                .get().getAuthority();

        // 5. Create Response
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", role);

        return ResponseEntity.ok(response);
    }
}