INSERT INTO department (name)
VALUES 
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Lead Engineer', 130000 , 1),
('Software Engineer', 95000 , 1),
('Account Manager', 150000 , 2), 
('Accountant', 100000 , 2),
('Legal Team Lead', 90000 , 3), 
('Lawyer', 80000 , 3),
('Sales Lead', 85000 , 4),
('Sales Person', 70000 , 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES 
('Dave', 'Watson' , 1),
('Mark', 'Williams' , 2),
('Joe', 'Rodriguez' , 3),
('Ashley', 'Hernandez' , 4),
('Mike', 'Miller' , 5),
('Ana', 'Romero' , 6),
('Lia', 'Jones' , 7),
('Kat', 'Monroe' , 8);
