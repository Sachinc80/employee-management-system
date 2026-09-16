# Employee Management System

A portfolio-ready Java Full Stack CRUD application.

## Features
- Add employee
- View all employees
- Search employees
- Update employee
- Delete employee
- Department filtering endpoint
- MySQL database
- REST API with Spring Boot
- Responsive React UI

## Tech Stack
- Java 25 LTS
- Spring Boot 3
- Spring Data JPA / Hibernate
- REST API
- MySQL
- React
- Axios
- Vite
- Maven

## Project Structure
- `backend/` → Spring Boot REST API
- `frontend/` → React application
- `database/employee_db.sql` → database script

## Setup

### 1. MySQL
Create the database:
```sql
CREATE DATABASE employee_db;
```
Or run `database/employee_db.sql`.

Open:
`backend/src/main/resources/application.properties`

Change:
```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### 2. Start Backend
Open terminal inside `backend`:
```bash
mvn spring-boot:run
```
Backend:
`http://localhost:8080`

API:
`http://localhost:8080/api/employees`

### 3. Start Frontend
Open another terminal inside `frontend`:
```bash
npm install
npm run dev
```
Frontend:
`http://localhost:5173`

## Resume Description
**Employee Management System | Java Full Stack**
Built a full-stack employee management application using Java, Spring Boot, REST APIs, React, and MySQL. Implemented CRUD operations, JPA/Hibernate persistence, search functionality, validation, and a responsive dashboard UI.

## Interview Explanation
The frontend sends HTTP requests using Axios to Spring Boot REST endpoints. The controller receives requests, the service layer handles business logic, and the JPA repository communicates with MySQL. Hibernate maps the Employee entity to the database table.
