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
