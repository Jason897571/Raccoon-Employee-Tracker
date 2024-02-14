const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config()



const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: process.env.MSQL,
        // MySQL password
        password: process.env.MYSQL_PW,
        database: 'employee_db'
    }
)
