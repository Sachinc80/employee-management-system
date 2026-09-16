package com.sachin.ems.service;

import com.sachin.ems.entity.Employee;
import com.sachin.ems.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> getAll() {
        return repository.findAll();
    }

    public Employee getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    public Employee create(Employee employee) {
        return repository.save(employee);
    }

    public Employee update(Long id, Employee data) {
        Employee employee = getById(id);
        employee.setName(data.getName());
        employee.setEmail(data.getEmail());
        employee.setDepartment(data.getDepartment());
        employee.setSalary(data.getSalary());
        return repository.save(employee);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<Employee> byDepartment(String department) {
        return repository.findByDepartmentIgnoreCase(department);
    }
}
