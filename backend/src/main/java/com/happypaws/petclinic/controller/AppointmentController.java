package com.happypaws.petclinic.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.happypaws.petclinic.dto.AppointmentRequest;
import com.happypaws.petclinic.entity.*;
import com.happypaws.petclinic.repository.*;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final OwnerRepository ownerRepository;
    private final PetRepository petRepository;
    private final VetRepository vetRepository;

    public AppointmentController(AppointmentRepository appointmentRepository, UserRepository userRepository, OwnerRepository ownerRepository, PetRepository petRepository, VetRepository vetRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.ownerRepository = ownerRepository;
        this.petRepository = petRepository;
        this.vetRepository = vetRepository;
    }

    // ✅ Admin: Get All Appointments
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // ✅ Owner: Book Appointment
    @PostMapping
    public ResponseEntity<?> bookAppointment(@RequestBody AppointmentRequest request, Authentication authentication) {
        String email = authentication.getName();
        
        // Find Owner by EMAIL
        Owner owner = ownerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Owner profile not found for email: " + email));

        // Check availability
        boolean isSlotTaken = appointmentRepository.existsByVetIdAndDateAndTime(
            request.getVetId(), request.getDate(), request.getTime()
        );

        if (isSlotTaken) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Time slot unavailable.");
        }

        Pet pet = petRepository.findById(request.getPetId()).orElseThrow();
        Vet vet = vetRepository.findById(request.getVetId()).orElseThrow();

        Appointment appointment = new Appointment();
        appointment.setDate(request.getDate());
        appointment.setTime(request.getTime());
        appointment.setReason(request.getReason());
        appointment.setStatus("CONFIRMED");
        appointment.setOwner(owner);
        appointment.setPet(pet);
        appointment.setVet(vet);

        appointmentRepository.save(appointment);

        return ResponseEntity.ok(appointment);
    }

    // ✅ Owner: Get My Appointments
    @GetMapping("/my-appointments")
    public List<Appointment> getMyAppointments(Authentication authentication) {
        String email = authentication.getName();
        
        // ✅ FIXED: Assign to variable to silence "unused field" warning
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User login not found"));

        // Find Owner by EMAIL
        Owner owner = ownerRepository.findByEmail(email).orElseThrow();
        return appointmentRepository.findByOwnerId(owner.getId());
    }
    
    // ✅ Admin: Delete Appointment
    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentRepository.deleteById(id);
    }

    // ✅ Vet: Get Vet Schedule (Required for Vet Panel)
    @GetMapping("/vet-schedule")
    public List<Appointment> getVetSchedule(Authentication authentication) {
        String email = authentication.getName();
        Vet vet = vetRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Vet profile not found"));
        
        return appointmentRepository.findByVetId(vet.getId());
    }
}