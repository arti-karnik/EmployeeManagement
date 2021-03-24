const connection = require('./database/connect');
var db = require('./database/connect');


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
updateRole(1, 3);

connection.end();


