package com.arogyagram.repository;

import com.arogyagram.model.Patient;
import com.arogyagram.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByUser(User user);
    Optional<Patient> findByQrCodeHash(String qrCodeHash);
}
