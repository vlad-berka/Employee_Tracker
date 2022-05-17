# Employee Tracker 
## Vladimir Berka's Homework #12

## Assignment Description
This is a Javascript homework assignment for the UW Bootcamp. The goal of the assignment is to create a console line application that takes user input information and stores them in a database. The Javascript file is the primary challenge of this assignment with database functionality provided with mySQL. "Inquirer", "mysql2", "sequelize", "dotenv" and "console.table" NPM packages shall be used.

A mockup is provided by the instructor to demonstrate desired application appearance and functionality.

The original user story, acceptance criteria, and mockup for the assignment is copied to the end of this document.

## Assignment Scope
Create a command line script that allows a user to enter in employee and team information storing data in a database using mySQL. Information and data should be stored in appropriate tables inside a database file.

No starting code has been provided.

## Generalized Tasks
- Use NPM "Inquirer" to create command line prompts for user input
- Write a javascript file with multiple functions to handle prompting for user input
- Write database queries to create, retrieve, update, and delete information from a database
- Create an .env file to store sensitive information and prevented from pushing with a .gitignore file

## List of Files
* README.md - This current read me file
* gitignore - Git Ignore file to ignore node_modules, DS.Store (Mac users), and the .env file
* index.js - The primary script file to run in the command line
* db/ - The primary script file to run in the command line
* package.JSON - JSON package that stores modules and settings used
* ~./assets/- Folder for stored screenshots and instructor provided demo.gif

# Original Homework Assignment Details

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## URL to the GitHub Repository

[GitHub Pages Link:https://github.com/vlad-berka/Employee_Tracker](https://github.com/vlad-berka/Employee_Tracker)

## Screenshot of the Team Profile Generator, General Appearance

![Vladimir Berka's Employee Tracker](./assets/Employee_Tracker_ScreenShot.png "Employee Tracker, Screenshot")

## Instructor Provided Mock-Up

The following instructor provided sreenshot demonstrates the desired application appearance:

[![A video thumbnail shows the command-line employee management application with a play button overlaying the view.](./assets/12-sql-homework-video-thumbnail.png)](https://2u-20.wistia.com/medias/2lnle7xnpk)

## License
MIT License

Copyright (c) [2022] [Vladimir Berka]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.