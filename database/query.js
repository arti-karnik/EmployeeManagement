const department = require('../class/department');
const connection = require('./connect');

/* sQl connection query */
class query {

    async execute(sql) {
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (err) throw err;
                resolve(result);
            });
        });
    }
    /*
    async getAllManagerName(){
        return new Promise((resolve,reject)=>{ 
            let query = `SELECT id, CONCAT(first_name," " ,last_name) as ManagerName from Employee`;
            connection.query(query, (err,res)=>{
                if (err) throw err;
                let noObject = {
                    "id": "NULL",
                    "ManagerName": "None",  
                }
                res.push(noObject);
               
                console.log(res);
                console.log(res.length);
                resolve(res);
            }); 
        });
    }

    async getAllDepartments(){
        return new Promise((resolve,reject)=>{          
            
            let query = "select * from department";
            
            connection.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }
    async getAllRoles(){
        return new Promise((resolve,reject)=>{          
            
            let query = "select * from role";
            
            connection.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }
    async addRole(role){
        return new Promise((resolve,reject)=>{          
            
            let query = `INSERT INTO EmployeeDB.role (title, salary, departmentID) VALUES ('${role.title}', ${role.salary}, ${role.departmentid});`; 
            connection.query(query, (err,res)=>{
                if (err) throw err;
                console.log("ROLE INSERTED");
                resolve(res.insertId);
            });  
        });
    }
    async addEmployee(emp){
        return new Promise((resolve,reject)=>{          
            
            let query = `INSERT INTO EmployeeDB.employee (first_name,last_name,roleID, managerID) VALUES ('${emp.first_name}', '${emp.last_name}', ${emp.roleId}, ${emp.manageriD});`; 
            connection.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res.insertId);
            });  
        });
    }

    async getAllEmployees(){
        return new Promise((resolve,reject)=>{          
            
            let query = "select * from employee";
            
            connection.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }

    async getAllEmployeesNames(){
        return new Promise((resolve,reject)=>{          
        let query = "SELECT ID, CONCAT( first_name, ' ', last_name) AS name FROM EMPLOYEE;";
            
            connection.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            }); 
        });
    }

    async getTotalSalaryByDepartment(departmentid, departmentName){
        return new Promise((resolve,reject)=>{          
            let query = `SELECT SUM(salary) AS 'Total Budget : ${departmentName}' FROM employee LEFT JOIN role ON employee.roleid=role.roleid  WHERE role.departmentid = ${departmentid};`;
            connection.query(query, (err,res)=>{
                if (err) throw err;
                console.log(res)
                resolve(res);
            });    
             
        });
    }

    async getEmployeeByManger(managerID){
        return new Promise((resolve,reject)=>{          
            
            let query = `select employee.first_name, employee.last_name, role.salary, role.title, department.department_name from Employee INNER join role  ON employee.roleid = role.roleid INNER join department  on role.departmentid = department.department_id where managerid = ${managerID};`;
            
            connection.query(query, (err,res)=>{
                if (err) throw err;
                console.log(res)
                resolve(res);
            });    
             
        });
    }
    async getEmployeeByDepartment(departmentid){
        return new Promise((resolve,reject)=>{          
            
            let query = `SELECT employee.first_name AS 'First Name' , employee.last_name AS 'Last Name', role.salary AS Salary, role.title, department.department_name FROM employee INNER JOIN role ON employee.roleid = role.roleid INNER JOIN department on role.departmentid = department.department_id where department.department_id = ${departmentid};`;
            
            connection.query(query, (err,res)=>{
                if (err) throw err;
                console.log(res)
                resolve(res);
            });    
             
        });
    }

    async removeEmployee(empID){
        return new Promise((resolve,reject)=>{
            let query = `DELETE FROM EMPLOYEE WHERE ID = ${empID};`;
            
            connection.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }

    async updateDepartment(departmentID, departmentName){
        return new Promise((resolve,reject)=>{
            let query = `UPDATE EmployeeDB.department SET department_name = '${departmentName}' WHERE department_id = ${departmentID};`;
            
            connection.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });  
        });
    }
    async updateEmployeeRole(empId, roleId){
        return new Promise((resolve,reject)=>{
            let query = `UPDATE EmployeeDB.employee SET roleID = ${roleId} WHERE id = ${empId};`;
            
            connection.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });  
        });
    }
    async updateEmployeeManager(empId, managerId){
        return new Promise((resolve,reject)=>{
            let query = `UPDATE EmployeeDB.employee SET managerID = ${managerId} WHERE id = ${empId};`;
            
            connection.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });  
        });
    }

    async deleteRole(roleID){
        return new Promise((resolve,reject)=>{
            let query = `delete from role where roleID = ${roleID};`;
            
            connection.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });  
        });
    }*/
}
module.exports = query;