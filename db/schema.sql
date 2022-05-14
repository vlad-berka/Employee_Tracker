DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;

USE department_db;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name varchar(30)
);

CREATE TABLE roles (
  role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  job_title varchar(30),
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES departments(department_id),
  salary INT 
);

CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  employee_firstname varchar(30) NOT NULL,
  employee_lastname varchar(30) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  manager_id INT,
  FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);
