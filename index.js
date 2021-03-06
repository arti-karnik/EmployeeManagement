const connection = require('./database/connect');
const inquirer = require("inquirer");
const query = require("./database/query");
const DBquery = new query();
const confirm = require('inquirer-confirm')
const cTable = require('console.table');
const { printTable } = require('console-table-printer');
var figlet = require('figlet');
const chalk = require('chalk');


var db = require('./database/connect');
var choice = ["View All Employees", "View All Employee by Department", "View All Employee by Manager","View All Roles", "View All Department", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager",  "Add Department", "Update Department Name",   "Add Roles", "Delete Role", "View the total utilized budget of a department", "Exit"]
setTimeout(function() { start(); }, 500);
console.log(figlet.textSync("Employee Tracker"));

const startAgain = () => {
    inquirer.prompt([ 
        {
            name: "YESorNo",
            type: "list",
            message: "Do you want to start again?",
            choices: ["YES", "NO"]
        }
    ])
    .then(function(answer){
        if (answer.YESorNo == "YES") {
            start(); 
        }    
        else {
            connection.end();
        }
    }); 
};

const start = () => {
    inquirer.prompt([ 
        {
            name: "choice",
            type: "list",
            message: "Please Select option",
            choices: choice
        }
    ])
    .then(function(answer){
        if (answer.choice == "View All Employees") {
            getAllEmployees();
        } else if (answer.choice == "View All Employee by Department"){
            getAllEmployeesByDepartment();
        } else if (answer.choice == "View All Employee by Manager") {
            getAllEmployeesByManager();
        }else if (answer.choice == "View All Roles") {
            getAllRoles();
        } else if (answer.choice == "View All Department"){
            getAllDepartment();
        } else if (answer.choice == "Add Employee"){
            addEmployee();
        } else if (answer.choice == "Remove Employee"){
            removeEmployee();
        }else if (answer.choice == "Update Employee Role"){
            updateEmployeeRole();
        }else if (answer.choice == "Update Employee Manager"){
            updateEmployeeManager();
        }else if (answer.choice == "Add Department"){
            addDepartment();
        }else if (answer.choice == "Update Department Name"){
            updateDepartment();
        }else if (answer.choice == "Add Roles"){
            addRoles();
        } else if (answer.choice == "Delete Role"){
            deleteRole();
        }else if (answer.choice == "View the total utilized budget of a department"){
            getTotalBudgetByDepartment();
        } else {
            console.log("Thank you for using this application. Have a great day!");
            connection.end();
        }
    }); 
};

async function addDepartment() {
    inquirer
    .prompt([
        {
            name: 'departmentName',
            type: 'input',
            message: 'Please Enter Department Name: ',
        }
    ])
    .then(async (answer) => {
        let sql = `INSERT INTO EmployeeDB.department (department_name) VALUES ('${answer.departmentName}')`;

        await DBquery.execute(sql)
        .then(res=>{
            console.log("DEPARTMENT INSERTED...\n");
            startAgain();
        });
    });
}
async function getAllDepartment() {
    await DBquery.execute('SELECT * FROM DEPARTMENT')
    .then(rows => {
        showTable("VIEW ALL EMPLOYEES BY DEPARTMENT", rows);
    })
}
const showTable = (title, rows) => {
    if (rows.length > 0){
        console.log(chalk.white('\n******************** ' + title +'. *************************\n'));
        printTable(rows);        
    } else {
        console.log(chalk.white('\n******************** NO RECORDS AVAILABLE. *************************\n'));
    }
    startAgain();
};
async function getAllEmployees() {
    let sql = `SELECT Employee.id AS ID, Employee.first_name AS "First Name", Employee.last_name AS "Last Name", Role.title AS Title, role.salary AS Salary, department.department_name AS Department FROM EMPLOYEE 
    INNER JOIN ROLE ON EMPLOYEE.ROLEID = ROLE.ROLEID
    INNER JOIN Department ON Role.departmentID = department.department_Id;`

    await DBquery.execute(sql)
    .then(rows => {
        showTable('VIEW EMPLOYEE', rows);
     })
}
async function addRoles()  {
    let departments;
    await DBquery.execute('SELECT * FROM DEPARTMENT')
    .then(rows => {
        departments = rows;
    })
    inquirer
    .prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Please Enter Role Title: ',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Please Enter Role Salary: ',
        },
        {
            name: 'choice',
            type: 'rawlist',
            choices: departments.map(e=>e.department_name),
            message: 'Please Select Department: ',
        }
    ])
    .then(async (answer) => {
        
        let newRole = {
            title: answer.title,
            salary: answer.salary,
            departmentid: departments.find(e=>e.department_name === answer.choice).department_id
        }
        let sql = `INSERT INTO EmployeeDB.role (title, salary, departmentID) VALUES ('${newRole.title}', ${newRole.salary}, ${newRole.departmentid});`; 
        
        await DBquery.execute(sql)
        .then(rows => {
            console.log("ROLE ADDED..");
            startAgain();
        })
    });
};
async function getAllRoles(){
    let sql = 'select * from role';
    
    await DBquery.execute(sql)
    .then(rows => {
        showTable('VIEW ALL ROLES', rows);
    })
};
async function addEmployee()  {
    let roles;
    let manager;
    
    let sqlRoles = 'select * from role';
    let sqlManger = `SELECT id, CONCAT(first_name," " ,last_name) as ManagerName from Employee`;
    
    await DBquery.execute(sqlRoles)
    .then(rows => {
        roles = rows;
        checkForEmptyRecords("Role", rows);
    })
    await DBquery.execute(sqlManger)
    .then(rows => {
        manager = rows;
        manager.push({
            id: "NULL",
            ManagerName: "NONE"
        })
    })
    
    inquirer
    .prompt([{
            name: 'firstName',
            type: 'input',
            message: 'Please Enter First Name: ',
        },{
            name: 'lastName',
            type: 'input',
            message: 'Please Enter Last Name: ',
        },{
            name: 'roleTitle',
            type: 'list',
            choices: roles.map(e=>e.title),
            message: 'Please Select Role: ',
        },{
            name: 'ManagerName',
            type: 'list',
            choices: manager.map(e=>e.ManagerName),
            message: 'Please Select Manager: ',
        }
    ])
    .then(async (answer) => {
        let newEmployee = {
            first_name: answer.firstName,
            last_name: answer.lastName,
            roleId: roles.find(e=>e.title === answer.roleTitle).roleID,
            manageriD: manager.find(e=>e.ManagerName === answer.ManagerName).id
        }
        let sql = `INSERT INTO EmployeeDB.employee (first_name,last_name,roleID, managerID) VALUES ('${newEmployee.first_name}', '${newEmployee.last_name}', ${newEmployee.roleId}, ${newEmployee.manageriD});`; 

        await DBquery.execute(sql)
        .then(res=>{
            console.log("EMPLOYEE INSERTED");
            startAgain();
        });
    });
    
};

async function getTotalBudgetByDepartment() {
    let departments;
    let sql = 'SELECT * from Department';
    
    await DBquery.execute(sql)
    .then(rows => {
        departments = rows;
        checkForEmptyRecords("Department", rows);

    }) ;
    
    inquirer
    .prompt([
        {
            name: 'department',
            type: 'list',
            choices: departments.map(e=>e.department_name),
            message: 'Please Select Department: ',
        }
    ])
    .then(async (answer) => {
        let deptID = departments.find(e=>e.department_name === answer.department).department_id;
        let sql = `SELECT SUM(salary) AS 'Total Budget : ${answer.department}' FROM employee LEFT JOIN role ON employee.roleid=role.roleid  WHERE role.departmentid = ${deptID};`;

        await DBquery.execute(sql)
        .then(rows=>{
            showTable('Total Budget By Department', rows);
        });
    });
}

async function getAllEmployeesByManager()  {
    let manager= [];
    let sql = `SELECT id, CONCAT(first_name," " ,last_name) as ManagerName from Employee`;
    
    await DBquery.execute(sql)
    .then(rows => {
        manager = rows;
        manager.push ({
            id: "NULL",
            ManagerName: "NONE"
        });
    })
    inquirer
    .prompt([
        {
            name: 'ManagerName',
            type: 'list',
            choices: manager.map(e=>e.ManagerName),
            message: 'Please Select Manager: ',
        }
    ])
    .then(async (answer) => {
        let managerId = manager.find(e=>e.ManagerName === answer.ManagerName).id;
        let sql = `select employee.first_name, employee.last_name, role.salary, role.title, department.department_name from Employee INNER join role  ON employee.roleid = role.roleid INNER join department  on role.departmentid = department.department_id where managerid = ${managerId};`;

        await DBquery.execute(sql)
        .then(rows=>{
            showTable('VIEW ALL EMPLOYEES BY MANAGER', rows);
        });
    });
};

async function getAllEmployeesByDepartment()  {
    let sql = 'SELECT * from Department';
    
    await DBquery.execute(sql)
    .then(rows => {
        departments = rows;
        checkForEmptyRecords("Department", rows);
    })  
    
    inquirer
    .prompt([
        {
            name: 'departmentName',
            type: 'list',
            choices: departments.map(e=>e.department_name),
            message: 'Please Select Department: ',
        }
    ])
    .then(async (answer) => {
        let departmentId = departments.find(e=>e.department_name === answer.departmentName).department_id;
        let sql = `SELECT employee.first_name AS 'First Name' , employee.last_name AS 'Last Name', role.salary AS Salary, role.title, department.department_name FROM employee INNER JOIN role ON employee.roleid = role.roleid INNER JOIN department on role.departmentid = department.department_id where department.department_id = ${departmentId};`;

        await DBquery.execute(sql)
        .then(rows => {
            showTable('VIEW ALL EMPLOYEES BY DEPARTMENT', rows);
        });
    });
};

async function removeEmployee() {
    let employee;
    let sql = "SELECT ID, CONCAT( first_name, ' ', last_name) AS name FROM EMPLOYEE;";
    
    await DBquery.execute(sql)
    .then(rows => {
        employee = rows;
        checkForEmptyRecords("Employee", rows);

    })  
    inquirer
    .prompt([
        {
            name: 'EmployeeName',
            type: 'list',
            choices: employee.map(e=>e.name),
            message: 'Please Select Employee: ',
        }
    ])
    .then(async (answer) => {
        let EmployeeId = employee.find(e=>e.name === answer.EmployeeName).ID;
        
        let sql = 'DELETE from Employee WHERE ID = ' + EmployeeId;
        await DBquery.execute(sql)
        .then(rows => {
            console.log("Employee Removed");
            startAgain();
        }) ;
    });
}
function checkForEmptyRecords(params, rows) {
    if (rows.length == 0) {
        console.log("NO "+ params +"ADDED, 'PLEASE ADD AND RETURN BACK..'");
        process.exit(0);
    }
}
async function  updateEmployeeRole() {
    let employee;
    let roles;
    let sql = "SELECT ID, CONCAT( first_name, ' ', last_name) AS name FROM EMPLOYEE;";
    
    await DBquery.execute(sql)
    .then(rows => {
        employee = rows;
        checkForEmptyRecords("Employee", rows);
    }) 
    let sqlRoles = 'SELECT * from Role';
    await DBquery.execute(sqlRoles)
    .then(rows => {
        roles = rows;
        checkForEmptyRecords("Role", rows);
    }) 
    inquirer
    .prompt([
        {
            name: 'EmployeeName',
            type: 'list',
            choices: employee.map(e=>e.name),
            message: 'Please Select Employee: ',
        }, {
            name: 'newRole',
            type: 'list',
            choices: roles.map(e=>e.title),
            message: 'Please Select New Role: ',
        }
    ])
    .then(async (answer) => {
        let EmployeeId = employee.find(e=>e.name === answer.EmployeeName).ID;
        let roleId = roles.find(e=>e.title === answer.newRole).roleID;
        
        let sql = `UPDATE EmployeeDB.employee SET roleID = ${roleId} WHERE id = ${EmployeeId};`;
        
        await DBquery.execute(sql)
        .then(rows => {
            console.log("EMPLOYEE ROLE UPDATED!!");
            startAgain();
            
        });
    });

    console.log("END");
}
async function  updateEmployeeManager() {
    let employee;
    let manager;
    
    let sql = `SELECT id, CONCAT(first_name," " ,last_name) as ManagerName from Employee`;
    await DBquery.execute(sql)
    .then(rows => {
        manager = rows;
        manager.push [{
            id: "NULL",
            ManagerName: "NONE"
        }]
    });
    let sqlEmp = "SELECT ID, CONCAT( first_name, ' ', last_name) AS name FROM EMPLOYEE;";
    await DBquery.execute(sqlEmp)
    .then(rows => {
        employee = rows;
        checkForEmptyRecords("Employee", rows);
    });
    inquirer
    .prompt([
        {
            name: 'EmployeeName',
            type: 'list',
            choices: employee.map(e=>e.name),
            message: 'Please Select Employee: ',
        }, {
            name: 'newManager',
            type: 'list',
            choices: manager.map(e=>e.ManagerName),
            message: 'Please Select New Manager: ',
        }
    ])
    .then(async (answer) => {
        let EmployeeId = employee.find(e=>e.name === answer.EmployeeName).ID;
        let managerId = manager.find(e=>e.ManagerName === answer.newManager).id;
        let sql = `UPDATE EmployeeDB.employee SET managerID = ${managerId} WHERE id = ${EmployeeId};`;

        await DBquery.execute(sql)
        .then(res=>{
            console.log("EMPLOYEE MANAGER UPDATED!!");
            startAgain();
        });
    });
    
    
}
async function updateDepartment() {
    let department;
    
    let sql = `SELECT * FROM DEPARTMENT`;
    await DBquery.execute(sql)
    .then(rows => {
        department = rows;
        checkForEmptyRecords("Department", rows);

    });
   
    inquirer
    .prompt([
        {
            name: 'departmentName',
            type: 'list',
            choices: department.map(e=>e.department_name),
            message: 'Please Select Department: ',
        }, {
            name: 'NewDepartmentName',
            type: 'input',
            message: 'Please Enter new name for this department: ',
        }
    ])
    .then(async (answer) => {
        let deptId = department.find(e=>e.department_name === answer.departmentName).department_id;
        let sql = `UPDATE EmployeeDB.department SET department_name = '${answer.NewDepartmentName}' WHERE department_id = ${deptId};`;
        
        await DBquery.execute(sql)
        .then(rows => {
            console.log("DEPARTMENT UPDATED!!");
            startAgain();
        });
    });
}
async function deleteRole()  {
    let roles;
    let sql = 'SELECT * FROM ROLE';
    
    await DBquery.execute(sql)
    .then(rows=>{
        roles = rows;
    });
    inquirer
    .prompt([
        {
            name: 'role',
            type: 'list',
            message: 'Please Select Role ',
            choices: roles.map(e=>e.title)
        }
    ])
    .then(async (answer) => {
        confirm({
            question: 'Are you sure, you want to delete this Role? All associated employees and department will be delete. Press Y to confirm or N to Cancel', // 'Are you sure?' is default
            default: false 
        })
        .then(async function confirmed() {
            let roleid = roles.find(e=>e.title === answer.role).roleID;
            let sql = `delete from role where roleID = ${roleid};`;
            
            await DBquery.execute(sql)
            .then(rows=>{
                console.log("ROLE DELETED!!");
                startAgain();
            });
        }, function cancelled() {
            console.log("User choose NO, Operation cancelled.");
            startAgain();
        });
    });
};




