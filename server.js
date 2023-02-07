//module variables
const mysql = require('mysql2')
const inquirer = require('inquirer'); 
const table = require('console.table'); 

//connection function
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'employee_db'
    },
    console.log(`Connected to employee_db.`)
);

//test connection and start prompt
  db.connect(err => {
    if (err) throw err;
    promptUser();
});

//questions prompt using inquirer
promptUser = () => {
    inquirer.prompt (
      {
        type: 'list',
        name: 'userChoice', 
        message: 'What would you like to do?',
        choices: [
            'View all departments', 
            'View all roles', 
            'View all employees', 
            'Add a department', 
            'Add a role', 
            'Add an employee', 
            'Update an employee role',
        ]
      }
    )
    //match users answer with a specific function to get targeted data
      .then((answer) => {
        const { userChoice } = answer; 
  
        if (userChoice === "View all departments") {
          showDepartments();
        }
  
        if (userChoice === "View all roles") {
          showRoles();
        }
  
        if (userChoice === "View all employees") {
          showEmployees();
        }
  
        if (userChoice === "Add a department") {
          addDepartment();
        }
  
        if (userChoice === "Add a role") {
          addRole();
        }
  
        if (userChoice === "Add an employee") {
          addEmployee();
        }
  
        if (userChoice === "Update an employee role") {
          updateEmployee();
      };
  });
}

//shows all data from department table 
showDepartments = () => {
    db.query('SELECT department.id AS "ID", department.name AS "DEPT NAME" FROM department', (err, rows) => {
        console.table(rows);
        promptUser();
  });
}

//shows all data from roles table
showRoles = () => {
    db.query('SELECT role.id AS "ID", role.title AS "ROLE TITLE" , role.salary AS "Salary" , role.department_id AS "DEPT ID" FROM role', (err, rows)  => {
        console.table(rows);
        promptUser();
  });
}

//shows all data from employee table 
showEmployees = () => {
    db.query(`
    SELECT
    employee.id AS "ID",
    employee.first_name AS "FIRST NAME",
    employee.last_name AS "LAST NAME",
    role.title AS "ROLE",
    department.name AS "DEPT",
    role.salary AS "SALARY"
    FROM employee LEFT JOIN role ON role.id = employee.role_id
    LEFT JOIN department ON department.id = role.department_id`, (err, rows) => {
        console.table(rows);
        promptUser();
  });
}

//new department function
addDepartment = () => {
    inquirer.prompt(
        {
        type: 'input', 
        name: 'addNewDepartment',
        message: "What department do you want to add?",
        }
    )
      //inserts users input into department table
    .then(answer =>{
        db.query(`INSERT INTO department (name) VALUES (?)`,  answer.addNewDepartment , (err, rows) => {
          console.table(rows);
          showDepartments()
    });
  });
}

//new role function
addRole = () => {

    //questions for new role
    inquirer.prompt([
        {
        type: 'input', 
        name: 'addNewRole',
        message: "What role do you want to add?",
        },
        {
        type: 'input', 
        name: 'newSalary',
        message: "What is the salary of this role?",
        }
    ])
    //
    .then(roleAnswers =>{
      
       db.query(`SELECT name, id FROM department`, (err, data) => {
          //maps out the data store in the department table for user to choose
          const deptList = data.map (({ name, id }) => ({ name: name, value: id }));

            inquirer.prompt([
                  {
                  type: 'list', 
                  name: 'deptChoice',
                  message: "What department is this role in?",
                  choices: deptList
                  }
                  ])

                  .then((roleDept) => {
                    //adds users answers into the 'newRole' variable
                    const newRole = [roleAnswers.addNewRole, roleAnswers.newSalary,roleDept.deptChoice]
                    //inserts a new role into role table
                    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, newRole , (err, rows) => {
                    console.table(rows);
                    showRoles()
              });
          });
      });
  });
}

//new employee function
addEmployee = () => {
    inquirer.prompt ([
        {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
        },
        {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
        }
    ])

    .then((employeesName) => {

        db.query(`SELECT title, id FROM role`, (err,data) => { 
             //maps out the data store in the employee table for user to choose
            const roleList = data.map(({ title, id }) => ({ name: title, value: id }));

              inquirer.prompt([
                   {
                    type: 'list',
                    name: 'roleChoice',
                    message: "What is the employee's role?",
                    choices: roleList
                    }
                    ])

                    .then((employeeChoice) =>{
                      //adds users answers into the 'newEmployee' variable
                     const newEmployee = [employeesName.firstName,employeesName.lastName,employeeChoice.roleChoice]
                      //inserts a new employee into employee table
                      db.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`, newEmployee , (err, rows) => {
                      console.table(rows);
                      showEmployees()
              });
          });
      });
  });
}

//function to update employees role
updateEmployee = () => {

    db.query(`SELECT * FROM employee`, (err,data) => {
        //maps out the data store in the employee table for user to choose
        const employeeList = data.map(({ id, first_name, last_name }) => ({ name: first_name +" "+ last_name, value: id }));

        inquirer.prompt([
            {
              type: 'list',
              name: 'nameChoice',
              message: "Which employee would you like to update?",
              choices: employeeList
            }
            ])

          .then(employeeChoice => {
  
            db.query(`SELECT * FROM role`, (err, data) => {
                //maps out the data store in the role table for user to choose
                const rolesList = data.map(({ id, title }) => ({ name: title, value: id }));        

                inquirer.prompt([
                    {
                      type: 'list',
                      name: 'roleChoice',
                      message: "What is the employee's new role?",
                      choices: rolesList
                    }
                    ])

                      .then(roleChoice => {
                      //adds users answers into 'employeeUpdate' variable
                      const employeeUpdate = [roleChoice.roleChoice,employeeChoice.nameChoice]
                      //updates employees role 
                      db.query( `UPDATE employee SET role_id = ? WHERE id = ?`, employeeUpdate , (err, rows) => {
                        console.table(rows);
                        showEmployees()
                  });
              });
          });
      });
  });
}