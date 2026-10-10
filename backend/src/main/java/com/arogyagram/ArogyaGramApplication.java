package com.arogyagram;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ArogyaGramApplication {
    public static void main(String[] args) {
        SpringApplication.run(ArogyaGramApplication.class, args);
        System.out.println("\n=======================================================");
        System.out.println("  ArogyaGram Rural Healthcare REST APIs Running!");
        System.out.println("  Portal URL : http://localhost:8080");
        System.out.println("  H2 Console : http://localhost:8080/h2-console");
        System.out.println("=======================================================\n");
    }
}
