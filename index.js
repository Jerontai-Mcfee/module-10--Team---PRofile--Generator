const fs = require("fs");
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const employeeList = [];

//Questions for Manager
function init() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the team manager's name?",
          name: "managerName",
        },
        {
          type: "input",
          message: "What is the team manager's employee Id?",
          name: "managerId",
        },
        {
          type: "input",
          message: "What is the team manager's email address?",
          name: "managerEmail",
        },
        {
          type: "input",
          message: "What is the team manager's office number?",
          name: "officeNum",
        },
      ])
      .then((res) => {
        let manager = new Manager(
          res.managerName,
          res.managerId,
          res.managerEmail,
          res.officeNum
        );
        console.log(manager);
        employeeList.push(manager);
        addMoreEmployee();
      })
      .catch((err) => console.log(err));
  }
//Question to add more employee
function addMoreEmployee() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Would you like to add another employee?",
          choices: ["yes", "no"],
          name: "addEmployee",
        },
      ])
      .then((res) => {
        if (res.addEmployee === "yes") {
          typeofEmployee();
        } else {
          const html = getHtml();
          fs.writeFile("./dist/my-team.html", html, (err) =>
            err
              ? console.log(err)
              : console.log("Your team profile has been created")
          );
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  
  //Question to add a specific type of employee
  function typeofEmployee() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "What kind of employee would you like to add?",
          choices: ["Manager", "Engineer", "Intern"],
          name: "jobTitle",
        },
      ])
      .then((res) => {
        if (res.jobTitle === "Manager") {
          init();
        } else if (res.jobTitle === "Engineer") {
          addEngineer();
        } else if (res.jobTitle === "Intern") {
          addIntern();
        }
      });
  }
  
  //Questions for Engineer Role
  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the engineer's name?",
          name: "engineerName",
        },
        {
          type: "input",
          message: "What is the engineer's employee Id?",
          name: "engineerId",
        },
        {
          type: "input",
          message: "What is the engineer's email address?",
          name: "engineerEmail",
        },
        {
          type: "input",
          message: "What is the engineer's Github username?",
          name: "engineerGithub",
        },
      ])
      .then((res) => {
        let engineer = new Engineer(
          res.engineerName,
          res.engineerId,
          res.engineerEmail,
          res.engineerGithub
        );
        console.log(engineer);
        employeeList.push(engineer);
        addMoreEmployee();
      })
      .catch((err) => console.log(err));
  }
  
  //Questions for Intern Role
  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the intern's name?",
          name: "internName",
        },
        {
          type: "input",
          message: "What is the intern's employee Id?",
          name: "internId",
        },
        {
          type: "input",
          message: "What is the intern's email address?",
          name: "internEmail",
        },
        {
          type: "input",
          message: "What is the intern's school?",
          name: "internSchool",
        },
      ])
      .then((res) => {
        let intern = new Intern(
          res.internName,
          res.internId,
          res.internEmail,
          res.internSchool
        );
        console.log(intern);
        employeeList.push(intern);
        addMoreEmployee();
      })
      .catch((err) => console.log(err));
  }
  function getEmployeeHtml() {
    const employee = [];
  
    //loop through the list
    for (let i = 0; i < employeeList.length; i++) {
      if (employeeList[i].getRole() === "Manager") {
        console.log("Manager");
        let htmlManager = `<div class="employee card g-col-3 g-col-md-3 shadow p-3 mb-5 bg-body rounded"  style="width: 25rem;">
          <h2 class="card-header">${employeeList[i].getName()}<br>
          <i class="fa-solid fa-user-tie"></i>${employeeList[i].getRole()}</h2>
          <ul class="info list-group list-group-flush">
            <li class="list-group-item">ID: ${employeeList[i].getId()}</li>
            <li class="list-group-item">Email: <a href="mailto:${employeeList[i].getEmail()}">${employeeList[i].getEmail()}</a></li>
            <li class="list-group-item">Office number:  ${employeeList[i].getOfficeNumber()}</li>
          </ul>
        </div>`;
        employee.push(htmlManager);
      } else if (employeeList[i].getRole() === "Engineer") {
        console.log("Engineer");
        let htmlEngineer = `<div class="employee card g-col-3 g-col-md-3 shadow p-3 mb-5 bg-body rounded"  style="width: 25rem;">
        <h2 class="card-header">${employeeList[i].getName()}<br>
        <i class="fa-solid fa-gear"></i>${employeeList[i].getRole()}</h2>
        <ul class="info list-group list-group-flush">
          <li class="list-group-item">ID: ${employeeList[i].getId()}</li>
          <li class="list-group-item">Email: <a href="mailto:${employeeList[i].getEmail()}">${employeeList[i].getEmail()}</a></li>
          <li class="list-group-item">Github: <a href="https://github.com/${employeeList[i].getGithub()}">https://github.com/${employeeList[i].getGithub()}</a></li>
        </ul>
      </div>`;
        employee.push(htmlEngineer);
      } else {
        console.log("Intern");
        let htmlIntern = `<div class="employee card g-col-3 g-col-md-3 shadow p-3 mb-5 bg-body rounded"  style="width: 25rem;">
        <h2 class="card-header">${employeeList[i].getName()}<br>
        <i class="fa-solid fa-child-reaching"></i>${employeeList[i].getRole()}</h2>
        <ul class="info list-group list-group-flush">
          <li class="list-group-item">ID: ${employeeList[i].getId()}</li>
          <li class="list-group-item">Email: <a href="mailto:${employeeList[i].getEmail()}">${employeeList[i].getEmail()}</a></li>
          <li class="list-group-item">School: ${employeeList[i].getSchool()}</li>
        </ul>
      </div>`;
        employee.push(htmlIntern);
      }
    }
    console.log(employee);
    return employee;
  }
  function getHtml() {
    const employeeHtml = getEmployeeHtml();
  
    //html template created when npm i inquirer@8.2.4 and npm i --save-dev jest ran successfully   run node index.js and start 

    const html = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Team Profile Generator</title>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
            crossorigin="anonymous"
          />
          <link rel="stylesheet" href="./style.css" />
        </head>
        <body>
          <header>
          <h1 class="display-1">Meet My Team</h1>
          </header>
          <main>
            <div class="team-members d-flex justify-content-sm-evenly align-items-stretch flex-wrap grid">${employeeHtml}</div>
          </main>
          <footer>&copy Jerontai Mcfee 2023</footer>
        </body>
        <script src="https://kit.fontawesome.com/30f6588d91.js" crossorigin="anonymous"></script>
        <script src="../index.js"></script>
      </html>`;
  
    return html;
  }
  
  init();
