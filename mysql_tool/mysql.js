const mysql = require('mysql2');
const cTable = require('console.table');

class DatabaseOperation {
    constructor(){
        this.db = mysql.createConnection(
            {
                host: 'localhost',
                // MySQL username,
                user: 'root',
                // MySQL password
                password: '',
                database: 'employee_db'
            },
            console.log("DB connected")
        )
    };
    
    show_departments(){
        this.db.query("SELECT * FROM department", (err, results) => {
            if (err) {
                console.log("Error:", err);
            }
            else{
                console.table(results)
            }
            
        })
        
    };

    show_roles(){
        this.db.query("SELECT * FROM role", (err, results) => {
            if (err) {
                console.log("Error:", err);
            }
            else{
                console.table(results)
            }
            
        })
        
    };

    show_employees(){
        this.db.query("SELECT * FROM employee", (err, results) => {
            if (err) {
                console.log("Error:", err);
            }
            else{
                console.table(results)
            }
            
        })
        
    };

    add_department(department_name){
        this.db.query("INSERT INTO department (name) VALUES (?)", department_name, (err, results) => {
            if (err) {
                console.log("Error:", err);
            }
            else{
                console.log(department_name + " department is added")
            }
        })
    };

    add_role(role_title, role_salary, role_department_id){
        this.db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?);', [role_title, role_salary, role_department_id], (err, results) => {
            if (err) {
                console.log("Error:", err);
            }
            else{
                console.log(role_title + " is added")
            }
        })
    };

    add_employee(first_name, last_name, role_id, manager_id){
        this.db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);', [first_name, last_name, role_id, manager_id], (err, results) => {
            if (err) {
                console.log("Error:", err);
            }
            else{
                console.log("Employee " + first_name + " " + last_name + " is added")
            }
        })
    };

    update_employee_manager(employee_id, manager_id){
        this.db.query('UPDATE employee SET manager_id = ? WHERE id = ?;', [manager_id,employee_id], (err, results) => {
            if(err){
                console.log("Error:", err);
            }
            else{
                console.log(`The manager for employee ${employee_id} is updated to ${manager_id}`)
            }
        })
    };

    show_employee_by_manager(manager_id){
        this.db.query('SELECT * FROM employee WHERE manager_id = ?;', [manager_id], (err, results) => {
            
            if(err){
                console.log("Error:", err);
            }
            else{
                console.table(results);
            }
        })
    };

    show_employee_by_department(department_id){
        this.db.query('SELECT employee.id,employee.first_name,employee.last_name,employee.role_id,employee.manager_id, role.department_id FROM employee join role on employee.role_id = role.id WHERE role.department_id = ?;', [department_id], (err, results) => {
            if(err){
                console.log("Error:", err);
            }
            else{
                console.table(results);
        }
    })
    };

    delete_employee(employee_id){
        this.db.query('DELETE FROM employee WHERE id = ?;', [employee_id], (err, results) => {
            if(err){
                console.log("Error:", err);
            }
            else{
                console.log(`The employee with id ${employee_id} is deleted`)
            }
        })

    }

    delete_role(role_id){
        this.db.query('DELETE FROM role WHERE id = ?;', [role_id], (err, results) => {
            if(err){
                console.log("Error:", err);
            }
            else{
                console.log(`The role with id ${role_id} is deleted`)
            }
        })
    }

    delete_department(department_id){
        this.db.query('DELETE FROM department WHERE id = ?;', [department_id], (err, results) => {
            if(err){
                console.log("Error:", err);
            }
            else{
                console.log(`The department with id ${department_id} is deleted`)
            }
        })
    }

    show_utilized_budget(){
        this.db.query('SELECT SUM(role.salary) AS utilized_budget FROM employee join role on employee.role_id = role.id;', (err, results) => {
            if(err){
                console.log("Error:", err);
            }
            else{
                console.log(`Utilized budget: ${results[0].utilized_budget}`)
            }
        })
    }
}

module.exports = DatabaseOperation;