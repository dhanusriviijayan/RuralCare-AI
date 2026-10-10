package com.arogyagram.controller;

import com.arogyagram.model.User;
import com.arogyagram.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        // Demo Authentication Logic
        Map<String, Object> response = new HashMap<>();
        response.put("token", "dummy-jwt-token-arogya-gram-2026");
        response.put("message", "Authentication Successful");
        response.put("email", email);

        if (email != null && email.contains("doctor")) {
            response.put("role", "DOCTOR");
            response.put("name", "Dr. Ananya Sharma");
        } else if (email != null && email.contains("admin")) {
            response.put("role", "ADMIN");
            response.put("name", "Rajesh Kumar (DHO)");
        } else {
            response.put("role", "PATIENT");
            response.put("name", "Ramu Somayya");
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerPatient(@RequestBody Map<String, String> registerRequest) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("message", "Rural Patient registered successfully");
        response.put("patientId", "PAT-" + (1000 + (int)(Math.random() * 9000)));
        response.put("qrCodeHash", "AG-PAT-REGISTERED-SUCCESS");

        return ResponseEntity.ok(response);
    }
}
