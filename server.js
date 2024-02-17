
const inquirer = require('inquirer');
const express = require('express');
const DatabaseOperation = require('./mysql_tool/mysql.js');
require('./mysql_tool/mysql.js');
require('process')

const db = new DatabaseOperation();

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})



async function getQuestions() {
    const employeeChoices = await db.get_employee_info();
    const roleChoices = await db.get_role_info();
    const departmentChoices = await db.get_department_info();

   
    

    const questions =[{
        type: 'list',
        name: 'all_choice',
        message: 'What would you like to do?',
        choices: ["View All Departments", 
                  "View All Roles", 
                  "View All Employees", 
                  "Add A Department", 
                  "Add A Role", 
                  "Add An Employee", 
                  "Update An Employee Role",
                  "Update employee managers",
                  "View employees by manager",
                  "View employees by department",
                  "Delete departments, roles, and employees",
                  "View the total utilized budget for a department"],
        pageSize: 5,
        loop:false       
    },
    {
        type: 'input',
        name: 'add_department',
        message: 'What is the name of the department you would like to add?',
        when: (answers) => answers.all_choice === "Add A Department"
    
    },
    {
        type: 'input',
        name: 'role_title',
        message: 'What is the name of the role',
        when: (answers) => answers.all_choice === "Add A Role"
    
    },
    {
        type: 'input',
        name: 'role_salary',
        message: 'What is the salary of the role',
        when: (answers) => answers.all_choice === "Add A Role"
    
    },
    {
        type: 'list',
        name: 'role_department',
        message: 'which department does the role belong to',
        choices: departmentChoices,
        when: (answers) => answers.all_choice === "Add A Role"
    
    },
    {
        type: 'input',
        name: 'first_name',
        message: `What is the employee's first name?`,
        when: (answers) => answers.all_choice === "Add An Employee"
    },
    {
        type: 'input',
        name: 'last_name',
        message: `What is the employee's last name?`,
        when: (answers) => answers.all_choice === "Add An Employee"
    },
    {
        type: 'list',
        name: 'role_id',
        message: `What is the employee's role?`,
        choices: roleChoices,
        when: (answers) => answers.all_choice === "Add An Employee"
    },
    {
        type: 'list',
        name: 'manager_id',
        message:"who is the manager for this employee",
        choices: employeeChoices,
        when: (answers) => answers.all_choice === "Add An Employee"
    },
    {
        type: 'list',
        name: 'employee_id',
        message: `which employee you would like to update role?`,
        choices: employeeChoices,
        when: (answers) => answers.all_choice === "Update An Employee Role"
    },
    {
        type: 'list',
        name: 'role_id',
        message: `which role you would like to update for this employee?`,
        choices: roleChoices,
        when: (answers) => answers.all_choice === "Update An Employee Role"
    },
    {
        type: 'list',
        name: 'employee_id',
        message: `which employee you would like to update manager for?`,
        choices: employeeChoices,
        when: (answers) => answers.all_choice === "Update employee managers"
    },
    {
        type: 'list',
        name: 'manager_id',
        message: `who is the manager for this employee?`,
        choices: employeeChoices,
        when: (answers) => answers.all_choice === "Update employee managers"
    },
    {
        type: 'list',
        name: 'manager_id',
        message: `Please choose the manager and view all the employees underneath`,
        choices: employeeChoices,
        when: (answers) => answers.all_choice === "View employees by manager"
    },

    {
        type: 'list',
        name: 'department_id',
        message: `Please choose the department and view all the employees underneath`,
        choices: departmentChoices,
        when: (answers) => answers.all_choice === "View employees by department"
    },

    {
        type: 'list',
        name: 'delete_choice',
        message: `what do you want to delete`,
        choices: ["Delete Departments","Delete Roles", "Delete Employees"],
        when: (answers) => answers.all_choice === "Delete departments, roles, and employees"
    },

    {
        type: 'list',
        name: 'delete_department',
        message: `which department you want to delete?`,
        choices: departmentChoices,
        when: (answers) => answers.delete_choice === "Delete Departments"
    },
    {
        type: 'list',
        name: 'delete_role',
        message: `which role you want to delete?`,
        choices: roleChoices,
        when: (answers) => answers.delete_choice === "Delete Roles"
    },
    {
        type: 'list',
        name: 'delete_employee',
        message: `which employee you want to delete?`,
        choices: employeeChoices,
        when: (answers) => answers.delete_choice === "Delete Employees"
    },

    {
        type: 'list',
        name: 'utilized_budget',
        message: `Please choose the department and view its budget`,
        choices: departmentChoices,
        when: (answers) => answers.all_choice === "View the total utilized budget for a department"
    },
    
    ]
    return questions;

}



const ask_questions = async ()=>{

    const questions = await getQuestions();
    await inquirer
    .prompt(questions)
    .then((answers) => {
        // return new Promise()

        if(answers.all_choice === "View All Departments"){
            db.show_departments(ask_questions);
            

        }
        else if(answers.all_choice === "View All Roles"){
            db.show_roles(ask_questions);
           

        }
        else if(answers.all_choice === "View All Employees"){
            db.show_employees(ask_questions);
           
        }
        else if(answers.all_choice === "Add A Department"){
            db.add_department(answers.add_department,ask_questions);
           
        }
        else if(answers.all_choice === "Add A Role"){
            db.add_role(answers.role_title, answers.role_salary, answers.role_department,ask_questions);
           
        }
        else if(answers.all_choice === "Add An Employee"){
            db.add_employee(answers.first_name, answers.last_name, answers.role_id,answers.manager_id[0],ask_questions);
           
        }
        else if(answers.all_choice === "Update An Employee Role"){

           
            let employee_id = answers.employee_id[0];
            let role_id = answers.role_id;
            db.update_employee_role(employee_id, role_id,ask_questions);
        }
        else if(answers.all_choice === "Update employee managers"){
           
            let employee_id = answers.employee_id[0];
            let manager_id = answers.manager_id[0];
            db.update_employee_manager(employee_id, manager_id,ask_questions);
        }
        else if(answers.all_choice === "View employees by manager"){
           
            let manager_id = answers.manager_id[0];
            db.show_employee_by_manager(manager_id,ask_questions);
        }

        else if(answers.all_choice === "View employees by department"){
           
            let department_id = answers.department_id;
            db.show_employee_by_department(department_id,ask_questions);
        }
        else if(answers.delete_choice === "Delete Departments"){
           
            db.delete_department(answers.delete_department,ask_questions);
        }
        else if(answers.delete_choice === "Delete Roles"){

            db.delete_role(answers.delete_role,ask_questions);
          
        }
        else if(answers.delete_choice === "Delete Employees"){
           
            db.delete_employee(answers.delete_employee,ask_questions);
        }
        else if(answers.all_choice === "View the total utilized budget for a department"){
           
            let department_id = answers.utilized_budget;
            db.show_utilized_budget(department_id,ask_questions);
        }
    })
    
}

ask_questions()















