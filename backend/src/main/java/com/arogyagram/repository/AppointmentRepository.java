package com.arogyagram.repository;

import com.arogyagram.model.Appointment;
import com.arogyagram.model.Doctor;
import com.arogyagram.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatient(Patient patient);
    List<Appointment> findByDoctor(Doctor doctor);
    List<Appointment> findByDoctorAndStatus(Doctor doctor, Appointment.Status status);
}
