const connection = require('./connect');

/* sQl connection query */
class query {

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
}
module.exports = query;