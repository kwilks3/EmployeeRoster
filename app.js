const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
var employees;
var html;
const EmployeeInfo = [
  {
    type: "input",
    name: "name",
    message: "Employee name?",
  },
  {
    type: "input",
    name: "id",
    message: "Employee ID Number?",
  },
  {
    type: "input",
    name: "email",
    message: "Input Employee email address",
  },
  {
    type: "list",
    name: "employee",
    message: "Input Employee job title",
    choices: ["intern", "manager", "engineer"],
  },
];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const init = async () => {
  const { work } = await inquirer.prompt({
    type: "confirm",
    name: "work",
    message: "Do you work here?",
  });
  if (work) {
    getEmployeeInfo();
  }
};

const getEmployeeInfo = async () => {
  employees = employees || [];
  const { name, id, email, employee } = await inquirer.prompt(EmployeeInfo);
  var create;
  switch (employee) {
    case "intern":
      const { school } = await inquirer.prompt({
        type: "input",
        name: "school",
        message: "Intern's school?",
      });
      create = new Intern(name, id, email, school);
      break;

    case "engineer":
      const { github } = await inquirer.prompt({
        type: "input",
        name: "github",
        message: "Engineer's GitHub?",
      });
      create = new Engineer(name, id, email, github);
      break;

    case "manager":
      const { officeNumber } = await inquirer.prompt({
        type: "input",
        name: "officeNumber",
        message: "Manager's office number?",
      });
      create = new Manager(name, id, email, officeNumber);
      break;
  }
  const { more } = await inquirer.prompt({
    type: "confirm",
    name: "more",
    message: "Do you have more employees to add?",
  });

  if (more) {
    employees.push(create);
    getEmployeeInfo();
  } else {
    employees.push(create);

    html = render(employees);
    writeHtml(html);
    // console.log(employees);
  }

  // After the user has input all employees desired, call the `render` function (required
  // above) and pass in an array containing all employee objects; the `render` function will
  // generate and return a block of HTML including templated divs for each employee!
};

init();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

const writeHtml = (htmlData) => {
  fs.writeFile(outputPath, htmlData, (err) => {
    if (err) throw err;
    // console.log("The file has been created!");
  });
};

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
