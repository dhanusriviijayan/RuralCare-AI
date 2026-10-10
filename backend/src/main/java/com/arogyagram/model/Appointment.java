package com.arogyagram.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    private LocalDate appointmentDate;
    private String timeSlot;

    @Enumerated(EnumType.STRING)
    private AppointmentType type; // IN_PERSON, TELEMEDICINE

    @Enumerated(EnumType.STRING)
    private Status status; // PENDING, CONFIRMED, COMPLETED, CANCELLED

    private String symptoms;
    private String severity; // Mild, Moderate, High Emergency

    public enum AppointmentType {
        IN_PERSON, TELEMEDICINE
    }

    public enum Status {
        PENDING, CONFIRMED, COMPLETED, CANCELLED
    }
}
