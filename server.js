
const inquirer = require('inquirer');
const express = require('express');
const DatabaseOperation = require('./mysql_tool/mysql.js');
require('./mysql_tool/mysql.js');

const db = new DatabaseOperation();

const PORT = process.env.PORT || 3001;

const app = express();



const questions =[{
    type: 'list',
    name: 'all_choice',
    message: 'What would you like to do?',
    choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update An Employee Role"]
},
{
    type: 'input',
    name: 'add_department',
    message: 'What is the name of the department you would like to add?',
    when: (answers) => answers.all_choice === "Add A Department"

},
{
    type: 'input',
    name: 'role_name',
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
    type: 'input',
    name: 'role_department',
    message: 'which department does the role belong to',
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
    name: 'role',
    message: `What is the employee's role?`,
    choices: ['Sales Manager', 'Sales Representative', 'Marketing Manager', 'Marketing Specialist', 'Software Engineer', 'QA Engineer', 'HR Manager', 'Recruiter', 'Finance Director', 'Accountant'],
    when: (answers) => answers.all_choice === "Add An Employee"
},
{
    type: 'input',
    name: 'manager',
    message: `What is the employee's manager?`,
    when: (answers) => answers.all_choice === "Add An Employee"
},


]


db.show_utilized_budget();

/* inquirer
    .prompt(questions)
    .then((answers) => {
        
    }) */










app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})


