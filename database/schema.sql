DROP DATABASE IF EXISTS EmployeeDB;
CREATE DATABASE EmployeeDB;
USE EmployeeDB;

CREATE TABLE department(
	department_id int NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY(department_id)
);

CREATE TABLE role (
	roleID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,4) NOT NULL,
	departmentID INT,
	FOREIGN KEY (departmentID) REFERENCES department(department_id)
);

CREATE TABLE employee (
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    roleID int NOT NULL,
    managerID int null references employee,
    FOREIGN KEY(roleID) REFERENCES role(roleID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (managerID) REFERENCES employee(id) ON UPDATE CASCADE ON DELETE CASCADE
);

