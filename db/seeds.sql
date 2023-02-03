INSERT INTO department (id, name)
VALUES 
(001 , 'Engineering'),
(002 , 'Finance'),
(003 , 'Legal'),
(004 , 'Sales');

INSERT INTO role (id, department_id, title, salary)
VALUES
(022, 001 , 'Lead Engineer', 130000),
(023, 001 , 'Software Engineer', 95000),
(024, 002 , 'Account Manager', 150000), 
(025, 002 , 'Accountant', 100000),
(026, 003 , 'Legal Team Lead', 90000), 
(027, 003 , 'Lawyer', 80000),
(028, 004 , 'Sales Lead', 85000),
(029, 004 , 'Sales Person', 70000);

INSERT INTO employee (id, role_id, first_name, last_name)
VALUES 
(1 , 022 , 'Dave', 'Watson'),
(2 , 023 , 'Mark', 'Williams'),
(3 , 024 , 'Joe', 'Rodriguez'),
(4 , 025 , 'Ashley', 'Hernandez'),
(5 , 026 , 'Mike', 'Miller'),
(6 , 027 , 'Ana', 'Romero'),
(7 , 028 , 'Lia', 'Jones'),
(8 , 029 , 'Kat', 'Monroe');
