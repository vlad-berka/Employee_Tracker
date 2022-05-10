const inquirer = require('inquirer');
const fs = require('fs');

var mainMenu_option_Array = ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add an Employee", "Update an Employee Role"];

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

function optionHandler(option) {
    switch(option){
        case mainMenu_option_Array[0]:
            break;
    }
}

prompt_MainMenu();