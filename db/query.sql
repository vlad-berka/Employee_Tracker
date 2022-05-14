SELECT employees.employee_id AS "ID",
employees.employee_firstname AS "First Name",
employees.employee_lastname AS "Last Name",
roles.job_title AS "Job Title",
departments.department_name AS "Department",
roles.salary AS "Salary",
CONCAT(managers.employee_firstname, " ", managers.employee_lastname) AS "Manager"
FROM employees
LEFT JOIN roles ON employees.role_id = roles.role_id
LEFT JOIN departments ON roles.department_id = departments.department_id
LEFT JOIN employees AS managers ON employees.manager_id = managers.employee_id; 