const connection = require('./connect');

/* sQl connection query */
class query {

    async getAllManagerName(){
        return new Promise((resolve,reject)=>{ 
            let query = 'SELECT id, CONCAT(first_name," " ,last_name) as ManagerName from Employee where id in (SELECT managerID FROM EmployeeDB.employee where (managerID != "" || managerID != NULL));';
            connection.query(query, (err,res)=>{
                if (err) throw err;
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
}
module.exports = query;