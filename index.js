const connection = require('./database/connect');
const inquirer = require("inquirer");
const cTable = require('console.table');
const query = require("./database/query");
const DBquery = new query();

var db = require('./database/connect');
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

       } else if (answer.choice == "View All Employee by Department"){

       } else if (answer.choice == "View All Employee by Manager") {

        }else if (answer.choice == "View All Roles") {
            getAllRoles();

        } else if (answer.choice == "View All Department"){
            getAllDepartment();

        } else if (answer.choice == "Add Employee"){
            
        }else if (answer.choice == "Remove Employee"){
            
        }else if (answer.choice == "Update Employee Role"){
            
        }else if (answer.choice == "Update Employee Manager"){
            
        }else if (answer.choice == "Add Department"){
            addDepartment();
        }else if (answer.choice == "Update Department Name"){
            
        }else if (answer.choice == "Delete Department"){
            
        } else if (answer.choice == "Add Roles"){
            addRoles();
            
        } else if (answer.choice == "Delete Role"){
            
        }else if (answer.choice == "View the total utilized budget of a department"){
            
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





