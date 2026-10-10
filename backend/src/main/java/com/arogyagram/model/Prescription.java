package com.arogyagram.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "prescriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "appointment_id", nullable = false)
    private Appointment appointment;

    private String diagnosis;

    @Column(columnDefinition = "TEXT")
    private String medicationsJson; // JSON array of medication objects

    @Column(length = 1000)
    private String doctorAdvice;

    private LocalDateTime issuedAt;

    @PrePersist
    protected void onPersist() {
        this.issuedAt = LocalDateTime.now();
    }
}
