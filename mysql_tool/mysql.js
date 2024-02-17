const mysql = require('mysql2');
require('console.table');
const chalk = require('chalk');

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
    
    show_departments(ask_questions){
        
        this.db.execute("SELECT * FROM department;", (err, results) => {
            if (err) {
                console.log("Error:", err);
            }
            else{
                console.table(results)
                ask_questions();
                
            }
            
        })
        
    };

    show_roles(ask_questions){
        this.db.execute("SELECT * FROM role;", (err, results) => {
            if (err) {
                console.log("Error:", err);
            }
            else{
                console.table(results)
                ask_questions()
            }
            
        })
        
    };

    show_employees(ask_questions){
        let sql = `SELECT 
                        a.id,
                        a.first_name,
                        a.last_name,
                        role.title,
                        department.name AS department_name,
                        role.salary,
                        CONCAT(b.first_name, ' ', b.last_name) AS manager
                    FROM employee a 
                    LEFT JOIN role ON role.id = a.role_id 
                    LEFT JOIN department ON role.department_id = department.id
                    LEFT JOIN employee b ON a.manager_id = b.id;`

        this.db.execute(sql, (err, results) => {
            if (err) {
                console.log("Error:", err);
            }
            else{
                console.table(results)
                ask_questions();
            }
            
        })
        
    };

    add_department(department_name,ask_questions){
        this.db.execute("INSERT INTO department (name) VALUES (?);", [department_name], (err, results) => {
            if (err) {
                console.log("Error:", err);
            }
            else{
                console.log(chalk.green(department_name + " department is added"))
                ask_questions();
            }
        })
    };

    add_role(role_title, role_salary, role_department_id,ask_questions){
        this.db.execute('INSERT INTO role (title, salary, department_id) VALUES (?,?,?);', [role_title, role_salary, role_department_id], (err, results) => {
            if (err) {
                console.log("Error:", err);
            }
            else{
                console.log(chalk.green(role_title + " is added"))
                ask_questions();
            }
        })
    };

    add_employee(first_name, last_name, role_id, manager_id,ask_questions){
        this.db.execute('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);', [first_name, last_name, role_id, manager_id], (err, results) => {
            if (err) {
                console.log("Error:", err);
            }
            else{
                console.log(chalk.green("Employee " + first_name + " " + last_name + " is added"))
                ask_questions();
            }
        })
    };

    update_employee_role(employee_id, role_id,ask_questions){
        this.db.execute('UPDATE employee SET role_id = ? WHERE id = ?;', [role_id,employee_id], (err, results) => {
            if(err){
                console.log("Error:", err);
            }
            else{
                console.log(chalk.green("Employee role is updated"))
                ask_questions();
            }
        })
    }

    update_employee_manager(employee_id, manager_id,ask_questions){
        this.db.execute('UPDATE employee SET manager_id = ? WHERE id = ?;', [manager_id,employee_id], (err, results) => {
            if(err){
                console.log("Error:", err);
            }
            else{
                console.log(chalk.green(`The manager for employee ${employee_id} is updated to ${manager_id}`))
                ask_questions();
            }
        })
    };

    show_employee_by_manager(manager_id,ask_questions){
        this.db.execute('SELECT * FROM employee WHERE manager_id = ?;', [manager_id], (err, results) => {
            
            if(err){
                console.log("Error:", err);
            }
            else{
                console.table(results);
                ask_questions();
            }
        })
    };

    show_employee_by_department(department_id,ask_questions){
        this.db.execute('SELECT employee.id,employee.first_name,employee.last_name,employee.role_id,employee.manager_id, role.department_id FROM employee join role on employee.role_id = role.id WHERE role.department_id = ?;', [department_id], (err, results) => {
            if(err){
                console.log("Error:", err);
            }
            else{
                console.table(results);
                ask_questions();
            }
    })
    };

    delete_employee(employee_id,ask_questions){
        this.db.execute('DELETE FROM employee WHERE id = ?;', [employee_id], (err, results) => {
            if(err){
                console.log("Error:", err);
            }
            else{
                console.log(chalk.green(`The employee with id ${employee_id} is deleted`))
                ask_questions();
            }
        })

    }

    delete_role(role_id,ask_questions){
        this.db.execute('DELETE FROM role WHERE id = ?;', [role_id], (err, results) => {
            if(err){
                console.log("Error:", err);
            }
            else{
                console.log(chalk.green(`The role with id ${role_id} is deleted`))
                ask_questions();
            }
        })
    }

    delete_department(department_id,ask_questions){
        this.db.execute('DELETE FROM department WHERE id = ?;', [department_id], (err, results) => {
            if(err){
                console.log("Error:", err);
            }
            else{
                console.log(chalk.green(`The department with id ${department_id} is deleted`))
                ask_questions();
            }
        })
    }

    show_utilized_budget(department_id,ask_questions){
        this.db.execute('SELECT SUM(role.salary) AS utilized_budget FROM employee join role on employee.role_id = role.id where role.department_id = ?;', [department_id],(err, results) => {
            if(err){
                console.log("Error:", err);
            }
            else{
                console.log(chalk.green(`Utilized budget: ${results[0].utilized_budget}`))
                ask_questions();
            }
        })
    }

    get_employee_info = function(){
        return new Promise((resolve, reject) => {
            this.db.execute("SELECT * FROM employee", (err, results) => {
                if (err) {
                    console.log("Error:", err);
                    reject(err);
                }
                else{
                    const choices = results.map(employee => ({
                        name: `${employee.id}. ${employee.first_name} ${employee.last_name}`, // Adjust this according to your database structure
                        value: [employee.id,employee.manager_id] // Assuming `id` is the unique identifier for each employee
                    }));
                    resolve(choices);
                    
                }
                
            })
        }) 
    };

    get_role_info = function(){
        return new Promise((resolve, reject) => {
            this.db.execute("SELECT * FROM role", (err, results) => {
                if (err) {
                    console.log("Error:", err);
                    reject(err);
                }
                else{
                    const choices = results.map(role => ({
                        name: `${role.id}. ${role.title} - ${role.salary}`, // Adjust this according to your database structure
                        value: role.id // Assuming `id` is the unique identifier for each employee
                    }));
                    resolve(choices);
                    
                }
                
            })
        })
       
        
    };

    get_department_info = function(){
        return new Promise((resolve, reject) => {
            this.db.execute("SELECT * FROM department", (err, results) => {
                if (err) {
                    console.log("Error:", err);
                    reject(err);
                }
                else{
                    const choices = results.map(department => ({
                        name: `${department.id}. ${department.name}`, // Adjust this according to your database structure
                        value: department.id // Assuming `id` is the unique identifier for each employee
                    }));
                    resolve(choices);
                    
                }
                
            })
        })
    }
}

module.exports = DatabaseOperation;
