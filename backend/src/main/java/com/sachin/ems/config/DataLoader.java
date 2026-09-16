package com.sachin.ems.config;

import com.sachin.ems.entity.Employee;
import com.sachin.ems.repository.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {
    @Bean
    CommandLineRunner seed(EmployeeRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new Employee("Amit Patil", "amit@example.com", "IT", 45000));
                repository.save(new Employee("Priya Sharma", "priya@example.com", "HR", 40000));
                repository.save(new Employee("Rahul More", "rahul@example.com", "Finance", 50000));
            }
        };
    }
}
