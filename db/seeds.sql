INSERT INTO departments (department_id, department_name)
VALUES (001, "Engineering"),
       (002, "Finance"),
       (003, "Accounting"),
       (004, "Marketing"),
       (005, "Legal");
       
INSERT INTO roles (role_id, job_title, department_id, salary)
VALUES (001, "Developer", 001, 70000),
       (002, "Engineer", 001, 85000),
       (003, "Financer", 002, 80000),
       (004, "Accountant", 003, 81000), 
       (005, "Senior Accountant", 003, 90000),
       (006, "Marketer", 004, 60000),
       (007, "Lawyer", 005, 90000),
       (008, "Senior Lawyer", 005, 100000);
       
INSERT INTO employees (employee_id, employee_firstname, employee_lastname, role_id, manager)
VALUES (001, "Vlad", "B", 001, "John"),
       (002, "John", "Y", 002, ""),
       (003, "James", "Holden", 003, ""),
       (004, "Naomi", "Nagata", 004, ""),
       (005, "Alex", "Kamal", 005, ""),
       (006, "Amos", "Burton", 006, ""),
       (007, "Clarissa", "Mao", 007, ""),
       (008, "Bobbie", "Draper", 008, "");
       