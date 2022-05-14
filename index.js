// Importing the required NPM packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const express = require("express");
const fs = require("fs");

// Setting up ports and express
const PORT = process.env.PORT || 3001;
const app = express();

require("console.table");

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Main Menu Array
var mainMenu_option_Array = [
  "View All Departments",
  "View All Roles",
  "View All Employees",
  "Add a Department",
  "Add a Role",
  "Add an Employee",
  "Update an Employee Role",
  "Quit",
];

// Employee List Array (for selecting manager)
var Employee_List = [];

// Establishing MYSQL database connection
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "",
    database: "department_db",
  },
  console.log(`Connected to the department_db database.`)
);

function prompt_MainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "\nWhich of the following options do you choose?\n",
        name: "Menu_Options",
        choices: mainMenu_option_Array,
        default: mainMenu_option_Array[0],
      },
    ])
    .then((input_data) => {
      optionHandler(input_data.Menu_Options);
    });
}

// Main handler to
function optionHandler(option) {
  switch (option) {
    //View All Departments
    case mainMenu_option_Array[0]:
      getDepartments();
      break;
    //View All Roles
    case mainMenu_option_Array[1]:
      getRoles();
      break;
    //View All Employees
    case mainMenu_option_Array[2]:
      getEmployees();
      break;
    //Add a Department
    case mainMenu_option_Array[3]:
      prompt_addDepartment();
      break;
    //Add an Role
    case mainMenu_option_Array[4]:
      prompt_addRole();

      break;
    //Add an Employee
    case mainMenu_option_Array[5]:
      getNameList();
      break;
    //Update an Employee Role
    case mainMenu_option_Array[6]:
      break;
    //Quit
    case mainMenu_option_Array[7]:
      process.exit();
  }
}

// Return list of all departments
function getDepartments() {
  const sql = `SELECT department_id AS "Department ID", department_name AS "Department" FROM departments`;

  db.query(sql, (err, rows) => {
    console.log("\n");
    console.table(rows);
    prompt_MainMenu();
  });
}

// Return list of all roles
function getRoles() {
  const sql = `SELECT roles.role_id AS "Role ID", roles.job_title AS "Title", departments.department_name AS "Department Name", roles.salary AS "Salary" FROM roles LEFT JOIN departments ON roles.department_id = departments.department_id`;

  db.query(sql, (err, rows) => {
    console.log("\n");
    console.table(rows);
    prompt_MainMenu();
  });
}

// Return list of all employees
function getEmployees() {
  const sql = `SELECT employees.employee_id AS "ID",
    employees.employee_firstname AS "First Name",
    employees.employee_lastname AS "Last Name",
    roles.job_title AS "Job Title",
    departments.department_name AS "Department",
    roles.salary AS "Salary",
    CONCAT(managers.employee_firstname, " ", managers.employee_lastname) AS "Manager"
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.role_id
    LEFT JOIN departments ON roles.department_id = departments.department_id
    LEFT JOIN employees AS managers ON employees.manager_id = managers.employee_id`;

  db.query(sql, (err, rows) => {
    console.log("\n");
    console.table(rows);
    prompt_MainMenu();
  });
}

function getNameList() {
  const sql = `SELECT employee_id AS "ID", employee_firstname AS "fname", employee_lastname AS "lname" FROM employees`;

  db.query(sql, (err, rows) => {
    console.log("\n");
    console.log(rows);
    Employee_List = [];
    rows.forEach((object) =>
      Employee_List.push(`${object.fname} ${object.lname} (ID: ${object.ID})`)
    );
    console.log("Inside promise, before return");
    console.log(Employee_List);
    return Employee_List;
  });
}

function prompt_addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "\nWhat is the name of the new department you wish to add?\n",
        name: "Department",
      },
    ])
    .then((input_data) => {
      const sql = `INSERT INTO departments (department_name) VALUES (?) `;

      db.query(sql, input_data.Department, (err, rows) => {
        prompt_MainMenu();
      });
    });
}

const { queryAllDepartments, createNewRole } = require("./queries");
const { newRolePrompt } = require("./prompts");

async function prompt_addRole() {
  // get all existing departments
  let Dept_List = await queryAllDepartments();

  // collect user input
  let input_data = await newRolePrompt(Dept_List);

  // create new role based on user input
  await createNewRole(input_data);

  // reset loop
  prompt_MainMenu();
}

prompt_MainMenu();
