// Importing the required NPM packages
const inquirer = require("inquirer");

async function newRolePrompt(Dept_List) {
  let input_data = await inquirer.prompt([
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
      name: "Dept_Options",
      choices: Dept_List.map((dept) => dept.Dept_Name),
    },
  ]);
  return input_data;
}

module.exports = {
  newRolePrompt,
};
