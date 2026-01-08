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
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtils jwtUtils;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, 
                          AuthenticationManager authenticationManager, 
                          UserDetailsService userDetailsService, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
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
        // 1. Authenticate the user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // 2. Get User Details
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // 3. Generate Token
        String token = jwtUtils.generateToken(userDetails);

        // 4. Get Role (We extract the first role/authority)
        String role = userDetails.getAuthorities().stream()
                .findFirst()
                .get().getAuthority();

        // 5. Create Response Map with BOTH Token and Role
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", role);

        return ResponseEntity.ok(response);
    }
}