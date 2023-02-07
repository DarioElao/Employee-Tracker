    SELECT
    employee.id AS "ID",
    employee.first_name AS "FIRST NAME",
    employee.last_name AS "LAST NAME",
    role.title AS "ROLE",
    department.name AS "DEPT",
    role.salary AS "SALARY"
    FROM employee LEFT JOIN role ON role.id = employee.role_id
    LEFT JOIN department ON department.id = role.department_id