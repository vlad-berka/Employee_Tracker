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
var employee_options = [];
var employee_id_list = [];

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
      prompt_addEmployee();
      break;
    //Update an Employee Role
    case mainMenu_option_Array[6]:
      getDepartment_ID();
      break;
    //Quit
    case mainMenu_option_Array[7]:
      process.exit();
  }
}

// Return list of all departments - VIEW ALL DEPARTMENTS
function getDepartments() {
  const sql = `SELECT department_id AS "Department ID", department_name AS "Department" FROM departments`;

  db.query(sql, (err, rows) => {
    console.log("\n");
    console.table(rows);
    prompt_MainMenu();
  });
}

// Return list of all roles - VIEW ALL ROLES
function getRoles() {
  const sql = `SELECT roles.role_id AS "Role ID", roles.job_title AS "Title", departments.department_name AS "Department Name", roles.salary AS "Salary" FROM roles LEFT JOIN departments ON roles.department_id = departments.department_id`;

  db.query(sql, (err, rows) => {
    console.log("\n");
    console.table(rows);
    prompt_MainMenu();
  });
}

// Return list of all employees - VIEW ALL EMPLOYEES
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

function queryAllEmployees() {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT employee_id AS "ID", employee_firstname AS "fname", employee_lastname AS "lname" FROM employees`;
    db.query(sql, function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function queryAllDepartments() {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT department_name AS "Dept_Name" FROM departments`;
    db.query(sql, function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function queryAllRoles() {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT job_title AS "Title" FROM roles`;
    db.query(sql, function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function getDepartment_ID(dept_string) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT department_id AS "ID", department_name AS "Dept_Name" FROM departments`;
    db.query(sql, function (err, rows) {
      if (err) {
        return reject(err);
      }

      let id_array = [];
      let dept_array = [];

      rows.forEach((object) => {
        id_array.push(object.ID);
        dept_array.push(object.Dept_Name);
      });

      resolve(id_array[dept_array.indexOf(dept_string)]);
    });
  });
}

function getRole_ID(title_string) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT role_id AS "ID", job_title AS "Title" FROM roles`;
    db.query(sql, function (err, rows) {
      if (err) {
        return reject(err);
      }

      let id_array = [];
      let title_array = [];

      rows.forEach((object) => {
        id_array.push(object.ID);
        title_array.push(object.Title);
      });

      resolve(id_array[title_array.indexOf(title_string)]);
    });
  });
}

function createNewRole(input_data) {
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO roles (job_title, department_id, salary) VALUES (?, ?, ?)`;
    const params = [
      input_data.Role,
      input_data.Dept_Options,
      input_data.Salary,
    ];
    db.query(sql, params, function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function createNewDepartment(input_data) {
  input_data.Dept_Name;
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO departments (department_name) VALUES (?)`;
    const params = [input_data.Dept_Name];
    db.query(sql, params, function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function createNewEmployee(input_data) {
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO employees (employee_firstname, employee_lastname, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [
      input_data.F_name,
      input_data.L_name,
      input_data.Job_Title,
      input_data.Manager,
    ];
    db.query(sql, params, function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

async function prompt_addRole() {
  let Dept_List = await queryAllDepartments();

  inquirer
    .prompt([
      {
        type: "input",
        message: "\nWhat is the name of the new role you wish to add?\n",
        name: "Role",
      },
      {
        type: "input",
        message: "\nWhat is the salary for the new role?\n",
        name: "Salary",
      },
      {
        type: "list",
        message: "\nSelect which department is associated with the new role.\n",
        pageSize: 12,
        name: "Dept_Options",
        choices: Dept_List.map((dept) => dept.Dept_Name),
      },
    ])
    .then(async (input_data) => {
      let dept_ID = await getDepartment_ID(input_data.Dept_Options);
      input_data.Dept_Options = dept_ID;
      await createNewRole(input_data);
      // reset
      prompt_MainMenu();
    });
}

async function prompt_addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "\nWhat is the name of the new department you wish to add?\n",
        name: "Dept_Name",
      },
    ])
    .then(async (input_data) => {
      await createNewDepartment(input_data);
      // reset
      prompt_MainMenu();
    });
}

async function prompt_addEmployee() {
  let role_List = await queryAllRoles();
  let employee_List = await queryAllEmployees();

  employee_options = [];
  employee_id_list = [];

  employee_List.forEach((object) => {
    employee_options.push(`${object.fname} ${object.lname} (ID: ${object.ID})`);
    employee_id_list.push(object.ID);
  });

  inquirer
    .prompt([
      {
        type: "input",
        message: "\nWhat is first name of the new employee?\n",
        name: "F_name",
      },
      {
        type: "input",
        message: "\nWhat is the last name of the new employee?\n",
        name: "L_name",
      },
      {
        type: "list",
        message: "\nSelect which role is associated with the new employee.\n",
        pageSize: 12,
        name: "Job_Title",
        // choices: role_name,
        choices: role_List.map((roles) => roles.Title),
      },
      {
        type: "list",
        message:
          "\nSelect which manager is associated with the new employee.\n",
        pageSize: 12,
        name: "Manager",
        choices: employee_options,
      },
    ])
    .then(async (input_data) => {
      let manager_index =
        employee_id_list[employee_options.indexOf(input_data.Manager)];
      input_data.Manager = manager_index;
      console.log("Manager ID # is: ", manager_index);

      let role_ID = await getRole_ID(input_data.Job_Title);
      input_data.Job_Title = role_ID;
      console.log("Role ID is: ", role_ID);

      await createNewEmployee(input_data);
      // reset
      prompt_MainMenu();
    });
}

// const {queryAllDepartments, createNewRole} = require('./queries');
// module.exports = {queryAllDepartments, createNewRole};

prompt_MainMenu();
