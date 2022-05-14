// Importing the required NPM packages
const mysql = require("mysql2");

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

function queryAllDepartments() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT department_name AS "Dept_Name" FROM departments`;
    db.query(sql, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function createNewRole(input_data) {
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO roles (job_title, department_id, salary) VALUES (?, ?, ?)`;
    const params = [input_data.Role, 1, input_data.Salary];
    db.query(sql, params, function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

module.exports = {
  queryAllDepartments,
  createNewRole,
};
