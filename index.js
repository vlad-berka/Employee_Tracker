// Importing the required NPM packages
const inquirer = require('inquirer');
const mysql = require("mysql2");
const express = require("express");
const fs = require('fs');

// Setting up ports and express
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Main Menu Array
var mainMenu_option_Array = ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add an Employee", "Update an Employee Role", "Quit"];

// Establishing MYSQL database connection
const db = mysql.createConnection(
    {
      host: "localhost",
      // MySQL username,
      user: "root",
      // TODO: Add MySQL password here
      password: "none",
      database: "department_db",
    },
    console.log(`Connected to the department_db database.`)
  );

function prompt_MainMenu() {
    inquirer
    .prompt([
        {
            type: 'list',
            message: '\nWhich of the following options do you choose?\n',
            name: 'Menu_Options',
            choices: mainMenu_option_Array,
            default: mainMenu_option_Array[0]
        }
    ])
    .then((input_data) => {
        optionHandler(input_data.Menu_Options);
    });
}

// Main handler to 
function optionHandler(option) {
    switch(option){
        //View All Departments
        case mainMenu_option_Array[0]:
            break;
        //View All Roles
        case mainMenu_option_Array[1]:
            break;
        //View All Employees
        case mainMenu_option_Array[2]:
            break;
        //Add a Department
        case mainMenu_option_Array[3]:
            break;
        //Add an Employee
        case mainMenu_option_Array[4]:
            break;
        //Update an Employee Role
        case mainMenu_option_Array[5]:
            break;
        //Quit
        case mainMenu_option_Array[6]:
            break;
    }
}

// Return list of all departments
app.get("/api/departments", (req, res) => {
    const sql = `SELECT department_id AS Department ID, department_name AS Department FROM departments`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: rows,
      });
    });
  });

prompt_MainMenu();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});