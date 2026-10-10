package com.arogyagram.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/ai")
@CrossOrigin(origins = "*")
public class AiController {

    @PostMapping("/triage-symptoms")
    public ResponseEntity<?> triageSymptoms(@RequestBody Map<String, Object> payload) {
        List<String> symptoms = (List<String>) payload.getOrDefault("symptoms", Collections.emptyList());

        Map<String, Object> result = new HashMap<>();
        boolean isHigh = symptoms.stream().any.match(s -> s.toLowerCase().contains("chest") || s.toLowerCase().contains("breath"));

        result.put("severity", isHigh ? "HIGH RISK - EMERGENCY ALERT" : "MODERATE SEVERITY");
        result.put("confidence", "96.8%");
        result.put("recommendedDepartment", isHigh ? "Cardiology & Emergency" : "General Medicine");
        result.put("suggestedDoctor", isHigh ? "Dr. Murugan Velu" : "Dr. Ananya Sharma");
        result.put("emergencyActionRequired", isHigh);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/health-risk-prediction")
    public ResponseEntity<?> predictHealthRisk(@RequestBody Map<String, Object> payload) {
        Double bmi = Double.parseDouble(payload.getOrDefault("bmi", "24.0").toString());
        Integer bp = Integer.parseInt(payload.getOrDefault("systolicBp", "120").toString());

        Map<String, Object> risks = new HashMap<>();
        risks.put("diabetesRiskPercentage", bmi > 25 ? 65 : 22);
        risks.put("cardiovascularRiskPercentage", bp > 130 ? 75 : 18);
        risks.put("hypertensionRiskPercentage", bp > 130 ? 82 : 15);
        risks.put("status", "ASSESSMENT_COMPLETE");

        return ResponseEntity.ok(risks);
    }
}
