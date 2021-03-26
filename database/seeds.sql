USE EmployeeDB;

INSERT INTO department (department_name) VALUES ('ACCOUNTS');
INSERT INTO department (department_name) VALUES ('ENGINEERING');
INSERT INTO department (department_name) VALUES ('FINANCE');
INSERT INTO department (department_name) VALUES ('LEGAL');
INSERT INTO department (department_name) VALUES ('SALES');


INSERT INTO role (title, salary, departmentID) VALUES ('SALES TRAINEE', 2000.00, 6);
INSERT INTO role (title, salary, departmentID) VALUES ('SOFTWARE ENGINEER', 10000.00, 3);
INSERT INTO role (title, salary, departmentID) VALUES ('SOFTWARE MANAGER', 15000.00, 3);
INSERT INTO role (title, salary, departmentID) VALUES ('SALES MANAGER', 25000.00, 6);
INSERT INTO role (title, salary, departmentID) VALUES ('ACCOUNT MANAGER', 22000.00, 1);
INSERT INTO role (title, salary, departmentID) VALUES ('ACCOUNTANT', 8000.00, 1);
INSERT INTO role (title, salary, departmentID) VALUES ('LEGAL ASSOCIATE', 6000.00, 5);
INSERT INTO role (title, salary, departmentID) VALUES ('LEGAL TEAM LEAD', 18000.00, 5);


INSERT INTO employee (first_name, last_name, roleID, managerID) VALUES ('TAMMER', 'GALAL', 1, NULL);
INSERT INTO employee (first_name, last_name, roleID, managerID) VALUES ('JOHN', 'PAUL', 2, NULL);
INSERT INTO employee (first_name, last_name, roleID, managerID) VALUES ('MICHAEL', 'JORDAN', 3, NULL);
INSERT INTO employee (first_name, last_name, roleID, managerID) VALUES ('JOSEPH', 'FERNANDED', 4, NULL);
INSERT INTO employee (first_name, last_name, roleID, managerID) VALUES ('MARK', 'TWIN', 1, NULL);
INSERT INTO employee (first_name, last_name, roleID, managerID) VALUES ('MEGHA', 'PATEL', 1, 1);
INSERT INTO employee (first_name, last_name, roleID, managerID) VALUES ('JANVI', 'DESAI', 1, 2);
INSERT INTO employee (first_name, last_name, roleID, managerID) VALUES ('ANNA', 'REDDY', 1, 3);
INSERT INTO employee (first_name, last_name, roleID, managerID) VALUES ('ABHIJEET', 'MOKAKSHI', 1, 4);

UPDATE employee SET roleId = 2 WHERE id= 1;

/* VIEW ALL DEPARTMENT */
SELECT * FROM DEPARTMENT

/* VIEW ALL ROLES */

SELECT EmployeeDB.role.roleID, EmployeeDB.role.title, EmployeeDB.role.salary, EmployeeDB.department.department_name FROM EmployeeDB.role 
INNER JOIN EmployeeDB.department ON EmployeeDB.role.departmentid = EmployeeDB.department.department_id;

/* View total budget by Department */
SELECT SUM(salary) AS 'Total Department Budget' FROM employee 
LEFT JOIN role ON employee.roleid=role.roleid
WHERE role.departmentid = 1;

/* View All Employees by Manager */
select employee.first_name, employee.last_name, role.salary, role.title, employee.managerid, department.department_name from Employee
INNER join role 
ON employee.roleid = role.roleid
INNER join department 
on role.departmentid = department.department_id
 where managerid = 1;

 /* VIEW ALL EMPLOYEES BY DEPARTMENT */
 SELECT employee.first_name AS 'First Name' , employee.last_name AS 'Last Name', role.salary AS 'Salary', role.title AS 'Title', department.department_name AS 'Department Name' FROM employee INNER JOIN role ON employee.roleid = role.roleid INNER JOIN department on role.departmentid = department.department_id where department.department_id = 1;

 /* DELETE EMPLOYEE FROM EMPLOYEE TABLE*/
 DELETE FROM EMPLOYEE WHERE ID = 9;

 /* GET ALL EMPLOYEES NAME */
 SELECT ID, CONCAT( first_name," " , last_name) AS NAME FROM EMPLOYEE;

 /* Update department name */
 UPDATE EmployeeDB.department SET department_name = 'HUMAN RESOURCE' WHERE department_id = 1;

 /* UPDATE EMPLOYEE ROLE */
 UPDATE EmployeeDB.employee SET roleID = 6 WHERE id = 3;

 /* UPDATE EMPLOYEE MANAGER */
 UPDATE EmployeeDB.employee SET managerID = 8 WHERE id = 3;

