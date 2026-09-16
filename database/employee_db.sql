CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;

CREATE TABLE IF NOT EXISTS employees (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    department VARCHAR(80) NOT NULL,
    salary DOUBLE NOT NULL
);

INSERT INTO employees (name, email, department, salary) VALUES
('Amit Patil', 'amit@example.com', 'IT', 45000),
('Priya Sharma', 'priya@example.com', 'HR', 40000),
('Rahul More', 'rahul@example.com', 'Finance', 50000);
