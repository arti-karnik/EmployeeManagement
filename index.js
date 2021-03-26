const connection = require('./database/connect');
const inquirer = require("inquirer");
const cTable = require('console.table');
const query = require("./database/query");
const DBquery = new query();

var db = require('./database/connect');
const role = require('./class/role');
const department = require('./class/department');
var choice = 
["View All Employees", "View All Employee by Department", "View All Employee by Manager","View All Roles", "View All Department", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager",  "Add Department", "Update Department Name", "Delete Department",  "Add Roles", "Delete Role", "View the total utilized budget of a department", "Exit"]

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
     console.log(choice);
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
    console.log(choice);
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
            
        }else if (answer.choice == "Delete Department"){
            
        } else if (answer.choice == "Add Roles"){
            addRoles();
            
        } else if (answer.choice == "Delete Role"){
            
        }else if (answer.choice == "View the total utilized budget of a department"){
            getTotalBudgetByDepartment();
            
        } else {
            connection.end();
        }
   }); 
};

const addDepartment = () => {
    inquirer.prompt([{
        name: "departmentName",
        type: "input",
        message: "Please Enter Department Name: "
    }
    ])
   .then(function(answer){
    console.log('Insert new Department.. \n');
    const query = connection.query('INSERT INTO EmployeeDB.department (department_name) VALUES (?)',
      [answer.departmentName],
      (err, res) => {
        if (err) throw err;
            console.log(`DEPARTMENT ADDED !\n`);
            startAgain();
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
    }); 
};

async function getAllDepartment() {

    await DBquery.getAllDepartments().then(res=>{
        console.table(res);
        startAgain();
    });
}
async function getAllEmployees() {

    await DBquery.getAllEmployees().then(res=>{
        console.table(res);
        startAgain();
    });
}


async function addRoles()  {

    let departments;
    let departmentNames;
    await DBquery.getAllDepartments().then(res=>{
        departmentNames = res.map(e=>e.department_name);
        departments = res;
    });
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
            choices: departmentNames,
            message: 'Please Select Department: ',
        }
        ])
        .then(async (answer) => {
            console.log(departments.find(e=>e.department_name === answer.choice));

            let newRole = {
                title: answer.title,
                salary: answer.salary,
                departmentid: departments.find(e=>e.department_name === answer.choice).department_id
            }
            await DBquery.addRole(newRole).then(res=>{
                startAgain();
            });

        });
 
};


async function getAllRoles(){
    await DBquery.getAllRoles().then(res=>{
        console.table(res);
        startAgain();
    });
};

async function addEmployee()  {

    let roles;
    let rolesName;
    let manager;
    let managerNames;

    await DBquery.getAllRoles().then(res=>{
        rolesName = res.map(e=>e.title);
        roles = res;
    });
    await DBquery.getAllManagerName().then(res=>{
        managerNames = res.map(e=>e.ManagerName);
        manager = res;
    });
    inquirer
        .prompt([
        {
                name: 'firstName',
                type: 'input',
                message: 'Please Enter First Name: ',
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'Please Enter Last Name: ',
        },
        {
            name: 'roleTitle',
            type: 'list',
            choices: rolesName,
            message: 'Please Select Role: ',
        },
        {
            name: 'ManagerName',
            type: 'list',
            choices: managerNames,
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
           console.log(manager.find(e=>e.ManagerName === answer.ManagerName).id);
           console.log(roles.find(e=>e.title === answer.roleTitle).roleID);
            console.log(newEmployee);

            await DBquery.addEmployee(newEmployee)
                .then(res=>{
                    console.log("EMPLOYEE INSERTED");
                    startAgain();
                });
        });
 
};

async function getTotalBudgetByDepartment() {
let departmentNames, departments;

    await DBquery.getAllDepartments().then(res=>{
        departmentNames = res.map(e=>e.department_name);
        departments = res;
    });

    inquirer
        .prompt([
        {
            name: 'department',
            type: 'list',
            choices: departmentNames,
            message: 'Please Select Department: ',
        }
        ])
        .then(async (answer) => {
           let deptID = departments.find(e=>e.department_name === answer.department).department_id;

           await DBquery.getTotalSalaryByDepartment(deptID,answer.department)
           .then(res=>{
               console.table(res);
               startAgain();
           });
        });
}

async function getAllEmployeesByManager()  {
     let manager;
    let managerNames;

    await DBquery.getAllManagerName().then(res=>{
        managerNames = res.map(e=>e.ManagerName);
        manager = res;
    });
    inquirer
        .prompt([
        {
            name: 'ManagerName',
            type: 'list',
            choices: managerNames,
            message: 'Please Select Manager: ',
        }
        ])
        .then(async (answer) => {
            
           console.log(manager.find(e=>e.ManagerName === answer.ManagerName).id);
            let managerId = manager.find(e=>e.ManagerName === answer.ManagerName).id;

            await DBquery.getEmployeeByManger(managerId)
                .then(res=>{
                    console.table(res);
                    startAgain();
                });
        });
 
};

async function getAllEmployeesByDepartment()  {
    let departments;
    let departmentNames;
    await DBquery.getAllDepartments().then(res=>{
        departmentNames = res.map(e=>e.department_name);
        departments = res;
    });
   inquirer
       .prompt([
       {
           name: 'departmentName',
           type: 'list',
           choices: departmentNames,
           message: 'Please Select Department: ',
       }
       ])
       .then(async (answer) => {
           
            console.log(departments.find(e=>e.department_name === answer.departmentName).department_id);
            let departmentId = departments.find(e=>e.department_name === answer.departmentName).department_id;

           await DBquery.getEmployeeByDepartment(departmentId)
               .then(res=>{
                   console.table(res);
                   startAgain();
               });
       });
};

async function removeEmployee() {
    let employee, employeeName;

    await DBquery.getAllEmployeesNames().then(res=>{
        employeeName = res.map(e=>e.name);
        employee = res;
    });
    inquirer
        .prompt([
        {
            name: 'EmployeeName',
            type: 'list',
            choices: employeeName,
            message: 'Please Select Employee: ',
        }
        ])
        .then(async (answer) => {
            let EmployeeId = employee.find(e=>e.name === answer.EmployeeName).ID;

            await DBquery.removeEmployee(EmployeeId)
                .then(res=>{
                    console.log("EMPLOYEE DELETED!!");
                    startAgain();
                });
        });

}
async function  updateEmployeeRole() {
    let employee, employeeName;
    let rolesName, roles;

    await DBquery.getAllRoles().then(res=>{
        rolesName = res.map(e=>e.title);
        roles = res;
    });
    await DBquery.getAllEmployeesNames().then(res=>{
        employeeName = res.map(e=>e.name);
        employee = res;
    });
    inquirer
        .prompt([
        {
            name: 'EmployeeName',
            type: 'list',
            choices: employeeName,
            message: 'Please Select Employee: ',
        }, {
            name: 'newRole',
            type: 'list',
            choices: rolesName,
            message: 'Please Select New Role: ',
        }
        ])
        .then(async (answer) => {
            let EmployeeId = employee.find(e=>e.name === answer.EmployeeName).ID;
            let roleId = roles.find(e=>e.title === answer.newRole).roleID;

            await DBquery.updateEmployeeRole(EmployeeId, roleId)
                .then(res=>{
                    console.log("EMPLOYEE ROLE UPDATED!!");
                    startAgain();
                });
        });

    
}
async function  updateEmployeeManager() {
    let employee, employeeName;
    let managerName, manager;

    await DBquery.getAllManagerName().then(res=>{
        managerName = res.map(e=>e.ManagerName);
        manager = res;
    });
    await DBquery.getAllEmployeesNames().then(res=>{
        employeeName = res.map(e=>e.name);
        employee = res;
    });
    inquirer
        .prompt([
        {
            name: 'EmployeeName',
            type: 'list',
            choices: employeeName,
            message: 'Please Select Employee: ',
        }, {
            name: 'newManager',
            type: 'list',
            choices: managerName,
            message: 'Please Select New Manager: ',
        }
        ])
        .then(async (answer) => {
            let EmployeeId = employee.find(e=>e.name === answer.EmployeeName).ID;
            let managerId = manager.find(e=>e.ManagerName === answer.newManager).id;
            console.log(managerId, EmployeeId);
            console.log(manager, employee);

            await DBquery.updateEmployeeManager(EmployeeId, managerId)
                .then(res=>{
                    console.log("EMPLOYEE MANAGER UPDATED!!");
                    startAgain();
                });
        });

    
}
async function updateDepartment() {
    let department, departmentName;

    await DBquery.getAllDepartments().then(res=>{
        departmentName = res.map(e=>e.department_name);
        department = res;
    });
    inquirer
        .prompt([
        {
            name: 'departmentName',
            type: 'list',
            choices: departmentName,
            message: 'Please Select Department: ',
        }, {
            name: 'NewDepartmentName',
            type: 'input',
            message: 'Please Enter new name for this department: ',
        }
        ])
        .then(async (answer) => {
            let deptId = department.find(e=>e.department_name === answer.departmentName).department_id;
            console.log(department);
            console.log(deptId);

            await DBquery.updateDepartment(deptId, answer.NewDepartmentName)
                .then(res=>{
                    console.log("DEPARTMENT UPDATED!!");
                    startAgain();
                });
        });

}

/*
const getAllEmployees = db.query('SELECT * FROM employee', function(err, result) {
    if (err) throw err;
    console.log(result);
});
const getAllDepartment = db.query('SELECT * FROM department', function(err, result) {
    if (err) throw err;
    console.log(result);
});
const getAllRoles = db.query('SELECT * FROM role', function(err, result) {
    if (err) throw err;
    console.log(result);
});


const getEmployeeByManager = (managerId) => {
    db.query('SELECT first_name from employee where manageriD = ?', [managerId], function(err, result) {
        if (err) throw err;
        console.log(result);
    })
};

const updateRole = (EmpId, newRoleId) => {
    db.query('UPDATE employee SET roleId = ? WHERE id= ?', [newRoleId, EmpId], function(err, result){
        if (err) throw err;
        console.log("Employee Updated!!!");
    });
}
*/

const addDepartmen1t = (departmentName) => {
    console.log('Insert new Role.. \n');
    const query = connection.query('INSERT INTO EmployeeDB.department (department_name) VALUES (?)',
      [departmentName],
      (err, res) => {
        if (err) throw err;
        console.log(`product inserted!\n`);
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
  }; 

start();





