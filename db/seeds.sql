INSERT INTO departments (department_name)
VALUES ("Engineering"),
       ("Finance"),
       ("Accounting"),
       ("Marketing"),
       ("Legal");
       
INSERT INTO roles (job_title, department_id, salary)
VALUES ("Developer", 001, 70000),
       ("Engineer", 001, 85000),
       ("Financer", 002, 80000),
       ("Accountant", 003, 81000), 
       ("Senior Accountant", 003, 90000),
       ("Marketer", 004, 60000),
       ("Lawyer", 005, 90000),
       ("Senior Lawyer", 005, 100000);
       
INSERT INTO employees (employee_firstname, employee_lastname, role_id, manager_id)
VALUES 
       ("John", "Young", 002, null),
       ("Vlad", "Berka", 001, 1),
       ("James", "Holden", 003, null),
       ("Naomi", "Nagata", 004, null),
       ("Alex", "Kamal", 005, null),
       ("Amos", "Burton", 006, null),
       ("Clarissa", "Mao", 007, null),
       ("Bobbie", "Draper", 008, null);
       