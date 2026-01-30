package com.happypaws.petclinic.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.happypaws.petclinic.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    // ✅ Existing methods
    List<Appointment> findByOwnerId(Long ownerId);
    
    // 🔥 THE FIX: Added this method so the Controller can find appointments by Vet
    List<Appointment> findByVetId(Long vetId);

    // 🔥 THE MAGIC QUERY: Checks if a specific vet is busy at a specific time
    boolean existsByVetIdAndDateAndTime(Long vetId, LocalDate date, LocalTime time);
}
